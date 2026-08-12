import { ShadowUI } from './shadow-ui.js';
import { getUniqueSelector, camelToKebab } from './utils.js';
import { 
  applyModifications, 
  revertModifications, 
  getPageModifications, 
  savePageModifications, 
  clearPageModifications 
} from './persistence.js';

export class CanvasEditor {
  constructor() {
    this.active = false;
    this.selectedElement = null;
    this.selectedSelector = '';
    
    // Store draft changes in this session before Save/Cancel
    // Format: { [selector]: { styles: {}, text: '' } }
    this.draftChanges = {};
    
    // Bind event handlers
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleResizeStart = this.handleResizeStart.bind(this);
    this.handleResizeMove = this.handleResizeMove.bind(this);
    this.handleResizeEnd = this.handleResizeEnd.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    
    // Drag & Resize state tracking
    this.dragState = {
      isDragging: false,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0
    };
    
    this.resizeState = {
      isResizing: false,
      handle: '',
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      startLeft: 0,
      startTop: 0
    };

    // Initialize Shadow UI
    this.ui = new ShadowUI({
      onToggleActive: () => this.toggleActive(),
      onStyleChange: (prop, val) => this.handleStyleChange(prop, val),
      onSave: () => this.saveChanges(),
      onCancel: () => this.cancelChanges(),
      onReset: () => this.resetAllChanges()
    });

    this.setupGlobalEvents();
  }

  setupGlobalEvents() {
    // Esc key to deselect or cancel edit mode
    window.addEventListener('keydown', (e) => {
      if (!this.active) return;
      if (e.key === 'Escape') {
        if (this.selectedElement) {
          // If editing text, blur to finish editing
          if (this.selectedElement.contentEditable === 'true') {
            this.selectedElement.blur();
          }
          this.deselectElement();
        } else {
          this.toggleActive();
        }
      }
    });

    // Handle viewport resize: reposition overlays
    window.addEventListener('resize', () => {
      if (!this.active) return;
      this.repositionOverlays();
    });
  }

  toggleActive() {
    this.active = !this.active;
    this.ui.setBadgeState(this.active);
    
    if (this.active) {
      this.ui.showToast('Canvas activated. Click elements to edit!', 'info');
      document.body.style.cursor = 'crosshair';
      this.addPageListeners();
    } else {
      this.ui.showToast('Canvas deactivated.', 'info');
      document.body.style.cursor = '';
      this.deselectElement();
      this.removePageListeners();
    }
  }

  addPageListeners() {
    document.addEventListener('mousemove', this.handleMouseMove, true);
    document.addEventListener('click', this.handleMouseClick, true);
    document.addEventListener('dblclick', this.handleDoubleClick, true);
    
    // Bind Drag/Resize triggers inside the Shadow DOM overlay
    const dragHandle = this.ui.selectionOverlay.querySelector('[data-action="drag"]');
    dragHandle.addEventListener('mousedown', this.handleDragStart);

    this.ui.selectionOverlay.querySelectorAll('.resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', this.handleResizeStart);
    });
  }

  removePageListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('click', this.handleMouseClick, true);
    document.removeEventListener('dblclick', this.handleDoubleClick, true);
  }

  /**
   * Prevents selecting components inside our Shadow DOM editor.
   */
  isEditorElement(target) {
    return target === this.ui.root || this.ui.root.contains(target);
  }

  handleMouseMove(e) {
    if (!this.active || this.dragState.isDragging || this.resizeState.isResizing) return;
    if (this.isEditorElement(e.target)) return;
    
    const target = e.target;
    const rect = target.getBoundingClientRect();
    
    const name = `${target.tagName.toLowerCase()}${target.classList.length ? '.' + Array.from(target.classList).join('.') : ''}`;
    
    // Add scroll offsets to position overlay absolutely relative to viewport
    const viewportRect = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
    
    this.ui.showHover(viewportRect, name);
  }

  handleMouseClick(e) {
    if (!this.active) return;
    if (this.isEditorElement(e.target)) return;

    // Prevent navigation / default actions on clicked elements in edit mode
    e.preventDefault();
    e.stopPropagation();

    this.selectElement(e.target);
  }

  selectElement(el) {
    if (this.selectedElement === el) return;
    
    this.deselectElement();
    
    this.selectedElement = el;
    this.selectedSelector = getUniqueSelector(el);
    
    // Style current selected outline
    const rect = el.getBoundingClientRect();
    const name = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`;
    
    this.ui.showSelection(rect, name);
    
    // Get and parse computed style properties
    const computed = window.getComputedStyle(el);
    const styles = {
      marginTop: computed.marginTop,
      marginRight: computed.marginRight,
      marginBottom: computed.marginBottom,
      marginLeft: computed.marginLeft,
      paddingTop: computed.paddingTop,
      paddingRight: computed.paddingRight,
      paddingBottom: computed.paddingBottom,
      paddingLeft: computed.paddingLeft,
      width: el.style.width || computed.width,
      height: el.style.height || computed.height,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      color: computed.color,
      textAlign: computed.textAlign,
      backgroundColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
      opacity: computed.opacity,
      boxShadow: el.style.boxShadow || ''
    };
    
    // Open Inspector overlay
    this.ui.openInspector(name, styles);
  }

  deselectElement() {
    if (this.selectedElement) {
      if (this.selectedElement.contentEditable === 'true') {
        this.selectedElement.blur();
      }
      this.selectedElement = null;
      this.selectedSelector = '';
    }
    this.ui.hideSelection();
    this.ui.closeInspector();
  }

  repositionOverlays() {
    if (!this.selectedElement) return;
    const rect = this.selectedElement.getBoundingClientRect();
    this.ui.updateSelectionRect(rect);
  }

  /* --- Text Editing Engine --- */
  handleDoubleClick(e) {
    if (!this.active) return;
    if (this.isEditorElement(e.target)) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target;
    this.selectElement(target);
    
    // Enable inline text edit
    target.contentEditable = 'true';
    target.focus();
    
    // Place cursor at the end
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    // Select styling outline inside Shadow DOM
    target.style.outline = '2px dashed var(--accent-color)';
    
    const onBlur = () => {
      target.contentEditable = 'false';
      target.style.outline = '';
      
      const newText = target.innerHTML;
      this.recordTextChange(this.selectedSelector, newText);
      this.repositionOverlays();
      target.removeEventListener('blur', onBlur);
      target.removeEventListener('keydown', onKeyDown);
    };
    
    const onKeyDown = (event) => {
      // Escape to cancel or Enter (without shift) to confirm
      if (event.key === 'Escape') {
        // Revert to original
        const orig = this.draftChanges[this.selectedSelector]?.text;
        if (orig !== undefined) {
          target.innerHTML = orig;
        } else {
          // Revert using persistence cache
          const saved = getPageModifications()[this.selectedSelector]?.text;
          if (saved !== undefined) {
            target.innerHTML = saved;
          }
        }
        target.blur();
      } else if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        target.blur();
      }
    };
    
    target.addEventListener('blur', onBlur);
    target.addEventListener('keydown', onKeyDown);
  }

  recordTextChange(selector, newText) {
    if (!this.draftChanges[selector]) {
      this.draftChanges[selector] = { styles: {}, text: '' };
    }
    this.draftChanges[selector].text = newText;
    
    // Sync persistence live draft state
    applyModifications(this.draftChanges, true);
  }

  /* --- Drag Engine --- */
  handleDragStart(e) {
    if (!this.active || !this.selectedElement) return;
    e.preventDefault();
    
    const el = this.selectedElement;
    const computed = window.getComputedStyle(el);
    
    // Force relative positioning if element is static to make drag offsets work
    if (computed.position === 'static') {
      el.style.position = 'relative';
      this.recordStyleChange('position', 'relative');
    }
    
    this.dragState = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: parseFloat(computed.left) || 0,
      startTop: parseFloat(computed.top) || 0
    };
    
    document.addEventListener('mousemove', this.handleDragMove);
    document.addEventListener('mouseup', this.handleDragEnd);
  }

  handleDragMove(e) {
    if (!this.dragState.isDragging || !this.selectedElement) return;
    
    const dx = e.clientX - this.dragState.startX;
    const dy = e.clientY - this.dragState.startY;
    
    const newLeft = this.dragState.startLeft + dx;
    const newTop = this.dragState.startTop + dy;
    
    this.selectedElement.style.left = `${newLeft}px`;
    this.selectedElement.style.top = `${newTop}px`;
    
    // Record visual positions
    this.recordStyleChange('left', `${newLeft}px`);
    this.recordStyleChange('top', `${newTop}px`);
    
    this.repositionOverlays();
  }

  handleDragEnd() {
    this.dragState.isDragging = false;
    document.removeEventListener('mousemove', this.handleDragMove);
    document.removeEventListener('mouseup', this.handleDragEnd);
  }

  /* --- Resize Engine --- */
  handleResizeStart(e) {
    if (!this.active || !this.selectedElement) return;
    e.preventDefault();
    e.stopPropagation();
    
    const el = this.selectedElement;
    const computed = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    this.resizeState = {
      isResizing: true,
      handle: e.target.dataset.handle,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
      startLeft: parseFloat(computed.left) || 0,
      startTop: parseFloat(computed.top) || 0
    };
    
    document.addEventListener('mousemove', this.handleResizeMove);
    document.addEventListener('mouseup', this.handleResizeEnd);
  }

  handleResizeMove(e) {
    if (!this.resizeState.isResizing || !this.selectedElement) return;
    
    const el = this.selectedElement;
    const state = this.resizeState;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    
    let newWidth = state.startWidth;
    let newHeight = state.startHeight;
    let newLeft = state.startLeft;
    let newTop = state.startTop;
    
    const minSize = 10; // minimum dimension
    
    // Calculate new dimensions based on handles
    if (state.handle.includes('r')) {
      newWidth = Math.max(minSize, state.startWidth + dx);
    }
    if (state.handle.includes('b')) {
      newHeight = Math.max(minSize, state.startHeight + dy);
    }
    if (state.handle.includes('l')) {
      const computedWidth = state.startWidth - dx;
      if (computedWidth > minSize) {
        newWidth = computedWidth;
        newLeft = state.startLeft + dx;
      }
    }
    if (state.handle.includes('t')) {
      const computedHeight = state.startHeight - dy;
      if (computedHeight > minSize) {
        newHeight = computedHeight;
        newTop = state.startTop + dy;
      }
    }
    
    // Set style properties on target
    if (state.handle.includes('r') || state.handle.includes('l')) {
      el.style.width = `${newWidth}px`;
      this.recordStyleChange('width', `${newWidth}px`);
    }
    if (state.handle.includes('b') || state.handle.includes('t')) {
      el.style.height = `${newHeight}px`;
      this.recordStyleChange('height', `${newHeight}px`);
    }
    
    // Update top/left offset if resizing from left or top edges
    if (state.handle.includes('l')) {
      el.style.left = `${newLeft}px`;
      this.recordStyleChange('left', `${newLeft}px`);
    }
    if (state.handle.includes('t')) {
      el.style.top = `${newTop}px`;
      this.recordStyleChange('top', `${newTop}px`);
    }
    
    this.repositionOverlays();
  }

  handleResizeEnd() {
    this.resizeState.isResizing = false;
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
  }

  /* --- Properties Inspector Changes --- */
  handleStyleChange(prop, val) {
    if (!this.selectedElement) return;
    
    // Apply layout styles directly to selected element
    this.selectedElement.style[prop] = val;
    this.recordStyleChange(prop, val);
    
    // Reposition highlighters in real-time
    this.repositionOverlays();
  }

  recordStyleChange(prop, val) {
    const selector = this.selectedSelector;
    if (!selector) return;

    if (!this.draftChanges[selector]) {
      this.draftChanges[selector] = { styles: {}, text: undefined };
    }
    
    if (!this.draftChanges[selector].styles) {
      this.draftChanges[selector].styles = {};
    }
    
    this.draftChanges[selector].styles[prop] = val;
  }

  /* --- Save / Cancel Actions --- */
  
  saveChanges() {
    // 1. Get existing saved changes
    const pageMods = getPageModifications();
    
    // 2. Merge current draft edits into page modifications
    Object.entries(this.draftChanges).forEach(([selector, draft]) => {
      if (!pageMods[selector]) {
        pageMods[selector] = { styles: {}, text: undefined };
      }
      
      if (draft.styles) {
        pageMods[selector].styles = {
          ...pageMods[selector].styles,
          ...draft.styles
        };
      }
      
      if (draft.text !== undefined) {
        pageMods[selector].text = draft.text;
      }
    });
    
    // 3. Save to localStorage
    savePageModifications(pageMods);
    
    // 4. Reset our draft state since it is now permanently saved
    this.draftChanges = {};
    
    // 5. Generate CSS diff code for developer
    const cssCode = this.generateCSSExport(pageMods);
    
    // 6. Alert success and show modal
    this.ui.showToast('All modifications saved successfully!', 'success');
    this.ui.showCodeExport(cssCode);
  }

  cancelChanges() {
    // 1. Revert drafts in the DOM
    revertModifications(this.draftChanges);
    
    // 2. Empty the draft memory
    this.draftChanges = {};
    
    // 3. Clean selections and UI
    this.ui.showToast('Changes discarded.', 'info');
    this.deselectElement();
  }

  resetAllChanges() {
    // Clear localStorage and revert styles
    clearPageModifications();
    this.draftChanges = {};
    
    this.ui.showToast('All visual overrides reset.', 'danger');
    this.deselectElement();
  }

  generateCSSExport(pageMods) {
    let cssString = '';
    
    Object.entries(pageMods).forEach(([selector, mod]) => {
      const styles = mod.styles || {};
      const styleKeys = Object.keys(styles);
      
      if (styleKeys.length > 0) {
        cssString += `${selector} {\n`;
        styleKeys.forEach(prop => {
          const cssPropName = camelToKebab(prop);
          cssString += `  ${cssPropName}: ${styles[prop]};\n`;
        });
        cssString += `}\n\n`;
      }
    });
    
    return cssString || '/* No style edits generated */';
  }
}
