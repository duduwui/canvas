import { getUniqueSelector } from './utils.js';

const STORAGE_KEY = 'canvas_saved_modifications';

// Cache of original element states before modification
// Format: { selector: { styles: { prop: originalValue }, text: originalText } }
const originalStates = new Map();

/**
 * Gets the current page key (pathname + search) to scope modifications.
 * @returns {string}
 */
function getPageKey() {
  return window.location.origin + window.location.pathname;
}

/**
 * Loads all saved modifications from localStorage.
 * @returns {Object}
 */
export function getAllSavedModifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Canvas: Failed to parse saved modifications', e);
    return {};
  }
}

/**
 * Gets modifications for the current page.
 * @returns {Object} { [selector]: { styles: {}, text: '' } }
 */
export function getPageModifications() {
  const all = getAllSavedModifications();
  return all[getPageKey()] || {};
}

/**
 * Saves page modifications to localStorage.
 * @param {Object} pageMods 
 */
export function savePageModifications(pageMods) {
  const all = getAllSavedModifications();
  all[getPageKey()] = pageMods;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * Injects a Google Font stylesheet link into the head of the light DOM.
 * @param {string} url 
 */
export function injectFontStylesheet(url) {
  if (!url) return;
  // Standardize Google Font URL structure
  if (!url.startsWith('http') && !url.startsWith('//')) {
    // If it's just a font name, we can try importing from Google Fonts
    const fontName = encodeURIComponent(url.trim());
    url = `https://fonts.googleapis.com/css2?family=${fontName}:wght@300;400;500;600;700;900&display=swap`;
  }
  
  if (document.querySelector(`link[href="${url}"]`)) return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

/**
 * Applies a set of modifications to the page elements.
 * Backs up original values before applying modifications.
 * 
 * @param {Object} modifications { [selector]: { styles: {}, text: '' } }
 * @param {boolean} isDraft Whether these are temporary draft changes
 */
export function applyModifications(modifications, isDraft = false) {
  Object.entries(modifications).forEach(([selector, changes]) => {
    if (selector === '__fontImports') return; // Skip metadata key
    const element = document.querySelector(selector);
    if (!element) return;

    // Backup original state if not already backed up
    if (!originalStates.has(selector)) {
      const originalStyles = {};
      if (changes.styles) {
        Object.keys(changes.styles).forEach(prop => {
          originalStyles[prop] = element.style[prop] || '';
        });
      }
      originalStates.set(selector, {
        styles: originalStyles,
        text: element.innerHTML, // Store innerHTML to preserve structure/child elements if any
        display: element.style.display || ''
      });
    }

    // Apply inline styles
    if (changes.styles) {
      Object.entries(changes.styles).forEach(([prop, val]) => {
        element.style[prop] = val;
      });
    }

    // Apply text content changes
    // Using innerHTML/innerText appropriately depending on content type
    if (changes.text !== undefined && changes.text !== null) {
      // If the node contains tags, we preserve or set them, otherwise text
      if (element.children.length === 0) {
        element.textContent = changes.text;
      } else {
        // Fallback for complex layouts, but standard is text editing for leaf nodes
        element.innerHTML = changes.text;
      }
    }
  });
}

/**
 * Reverts the current draft changes back to their original states.
 * @param {Object} draftModifications 
 */
export function revertModifications(draftModifications) {
  Object.keys(draftModifications).forEach(selector => {
    if (selector === '__fontImports') return;
    const element = document.querySelector(selector);
    const original = originalStates.get(selector);
    
    if (element && original) {
      // Revert styles
      if (original.styles) {
        Object.entries(original.styles).forEach(([prop, val]) => {
          element.style[prop] = val;
        });
      }
      
      // Revert text
      if (original.text !== undefined) {
        element.innerHTML = original.text;
      }
    }
    
    // Remove from original state tracker
    originalStates.delete(selector);
  });
}

/**
 * Initializes and applies saved modifications from localStorage on page load.
 */
export function initSavedModifications() {
  const pageMods = getPageModifications();
  
  // Inject saved custom fonts
  if (pageMods.__fontImports && Array.isArray(pageMods.__fontImports)) {
    pageMods.__fontImports.forEach(url => {
      try {
        injectFontStylesheet(url);
      } catch (e) {
        console.error('Canvas: Failed to inject font URL', url, e);
      }
    });
  }

  // Load binary font attachments from IndexedDB
  loadFontsFromDB();

  applyModifications(pageMods, false);
}

/**
 * Clears saved modifications from localStorage for this page and reverts them.
 */
export function clearPageModifications() {
  const pageMods = getPageModifications();
  revertModifications(pageMods);
  
  const all = getAllSavedModifications();
  delete all[getPageKey()];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/* --- IndexedDB Local Font Binary DB Storage --- */
const DB_NAME = 'CanvasFontDB';
const DB_VERSION = 1;
const STORE_NAME = 'fonts';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveFontToDB(name, dataBuffer) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ name, data: dataBuffer });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getFontsFromDB() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function loadFontsFromDB() {
  try {
    const fonts = await getFontsFromDB();
    for (const font of fonts) {
      try {
        const fontFace = new FontFace(font.name, font.data);
        await fontFace.load();
        document.fonts.add(fontFace);
        console.log(`Canvas: Local font "${font.name}" successfully registered from DB!`);
      } catch (err) {
        console.error(`Canvas: Failed to register font "${font.name}" from DB`, err);
      }
    }
  } catch (e) {
    console.warn('Canvas: Could not access local Font DB (IndexedDB)', e);
  }
}
