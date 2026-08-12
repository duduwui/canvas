/**
 * Generates a unique CSS selector for a given HTML element.
 * Useful for persisting styling overrides across reloads.
 * 
 * @param {HTMLElement} el 
 * @returns {string}
 */
export function getUniqueSelector(el) {
  if (!(el instanceof Element)) return '';
  
  if (el.id) {
    // Escape ID if it contains special characters
    const escapedId = CSS.escape(el.id);
    return `#${escapedId}`;
  }
  
  const path = [];
  let current = el;
  
  while (current && current.nodeType === Node.ELEMENT_NODE) {
    let selector = current.nodeName.toLowerCase();
    
    if (selector === 'html' || selector === 'body') {
      path.unshift(selector);
      break;
    }
    
    // Add classes if available
    if (current.classList && current.classList.length > 0) {
      // Escape class names to handle weird naming schemas like Tailwind
      const classes = Array.from(current.classList)
        .map(c => CSS.escape(c))
        .join('.');
      if (classes) {
        selector += '.' + classes;
      }
    }
    
    // Calculate nth-of-type index
    let sibling = current;
    let nth = 1;
    while (sibling = sibling.previousElementSibling) {
      if (sibling.nodeName === current.nodeName) {
        nth++;
      }
    }
    
    let hasSiblings = false;
    sibling = current;
    while (sibling = sibling.nextElementSibling) {
      if (sibling.nodeName === current.nodeName) {
        hasSiblings = true;
        break;
      }
    }
    
    if (nth > 1 || hasSiblings) {
      selector += `:nth-of-type(${nth})`;
    }
    
    path.unshift(selector);
    current = current.parentNode;
  }
  
  return path.join(' > ');
}

/**
 * Converts camelCase to kebab-case (e.g. borderRadius -> border-radius)
 * @param {string} str 
 * @returns {string}
 */
export function camelToKebab(str) {
  return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}

/**
 * Converts kebab-case to camelCase (e.g. border-radius -> borderRadius)
 * @param {string} str 
 * @returns {string}
 */
export function kebabToCamel(str) {
  return str.replace(/-./g, match => match[1].toUpperCase());
}

/**
 * Formats a size value. If it's a number, appends 'px'. Otherwise, returns the value.
 * @param {string|number} val 
 * @returns {string}
 */
export function formatSize(val) {
  if (val === '' || val === null || val === undefined) return '';
  if (!isNaN(Number(val))) return `${val}px`;
  return String(val);
}
