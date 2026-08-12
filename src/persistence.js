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
 * Applies a set of modifications to the page elements.
 * Backs up original values before applying modifications.
 * 
 * @param {Object} modifications { [selector]: { styles: {}, text: '' } }
 * @param {boolean} isDraft Whether these are temporary draft changes
 */
export function applyModifications(modifications, isDraft = false) {
  Object.entries(modifications).forEach(([selector, changes]) => {
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
