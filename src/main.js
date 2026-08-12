import { CanvasEditor } from './editor.js';
import { initSavedModifications } from './persistence.js';

// Apply saved overrides immediately on script load so there is minimal visual flash
try {
  initSavedModifications();
} catch (e) {
  console.error('Canvas: Failed to initialize saved modifications', e);
}

// Instantiate editor UI on DOM content ready
function initCanvas() {
  if (window.__CanvasEditor) return;
  
  // Make sure we have a body element
  if (!document.body) {
    window.addEventListener('DOMContentLoaded', initCanvas);
    return;
  }
  
  try {
    window.__CanvasEditor = new CanvasEditor();
    console.log('Canvas Visual Editor initialized successfully!');
  } catch (e) {
    console.error('Canvas: Failed to initialize editor', e);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCanvas);
} else {
  initCanvas();
}
