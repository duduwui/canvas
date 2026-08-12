import { ShadowUI } from './shadow-ui.js';
import { getUniqueSelector, camelToKebab } from './utils.js';
import { 
  applyModifications, 
  revertModifications, 
  getPageModifications, 
  savePageModifications, 
  clearPageModifications,
  injectFontStylesheet,
  saveFontToDB
} from './persistence.js';

export class CanvasEditor {
  constructor() {
    this.active = false;
    this.selectedElement = null;
    this.selectedSelector = '';
    this._originalOverflow = '';
    
    // Store draft changes in this session before Save/Cancel
    this.draftChanges = {};
    this.copiedAppearance = null;
    window.canvasDraftChanges = this.draftChanges;
    window.canvasSavedModifications = getPageModifications();
    
    // Bind event handlers
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragMove = this.handleDragMove.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleResizeStart = this.handleResizeStart.bind(this);
    this.handleResizeMove = this.handleResizeMove.bind(this);
    this.handleResizeEnd = this.handleResizeEnd.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFontImport = this.handleFontImport.bind(this);
    
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
      onStyleChange: (prop, val, el) => this.handleStyleChange(prop, val, el),
      onTextChange: (text) => this.handleTextChange(text),
      onFontImport: (url) => this.handleFontImport(url),
      onLocalFontUpload: (files) => this.handleLocalFontUpload(files),
      onQuickAction: (action, el) => this.handleQuickAction(action, el),
      onLayerSelect: (el) => this.selectElement(el),
      onDeselect: () => this.deselectElement(),
      onSave: () => this.saveChanges(),
      onCancel: () => this.cancelChanges(),
      onReset: () => this.resetAllChanges(),
      onGlobalFontChange: (val) => this.handleGlobalFontChange(val)
    });

    this.setupGlobalEvents();
  }

  setupGlobalEvents() {
    // Esc key to deselect or cancel edit mode
    window.addEventListener('keydown', (e) => {
      if (!this.active) return;
      if (e.key === 'Escape') {
        if (this.selectedElement) {
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
    document.addEventListener('mousedown', this.handleMouseDown, true);
    document.addEventListener('click', this.handleMouseClick, true);
    document.addEventListener('dblclick', this.handleDoubleClick, true);
    
    const dragHandle = this.ui.selectionOverlay.querySelector('[data-action="drag"]');
    dragHandle.addEventListener('mousedown', this.handleDragStart);

    this.ui.selectionOverlay.querySelectorAll('.resize-handle').forEach(handle => {
      handle.addEventListener('mousedown', this.handleResizeStart);
    });
  }

  removePageListeners() {
    document.removeEventListener('mousemove', this.handleMouseMove, true);
    document.removeEventListener('mousedown', this.handleMouseDown, true);
    document.removeEventListener('click', this.handleMouseClick, true);
    document.removeEventListener('dblclick', this.handleDoubleClick, true);
  }

  isEditorElement(target) {
    return target === this.ui.root || this.ui.root.contains(target);
  }

  /**
   * Applies a concentric offset padding (6px) to overlays
   * so they wrap elements without covering original borders.
   */
  calculateOverlayRect(el) {
    const rect = el.getBoundingClientRect();
    const computed = window.getComputedStyle(el);
    const offset = 6;
    
    // Parse element border-radius
    let radius = parseFloat(computed.borderRadius) || 0;
    
    return {
      top: rect.top - offset,
      left: rect.left - offset,
      width: rect.width + (offset * 2),
      height: rect.height + (offset * 2),
      borderRadius: `${radius + offset}px`,
      originalWidth: rect.width,
      originalHeight: rect.height
    };
  }

  handleMouseMove(e) {
    if (!this.active || this.dragState.isDragging || this.resizeState.isResizing) return;
    if (this.isEditorElement(e.target)) return;
    
    const target = e.target;
    const name = `${target.tagName.toLowerCase()}${target.classList.length ? '.' + Array.from(target.classList).join('.') : ''}`;
    
    const overlayRect = this.calculateOverlayRect(target);
    this.ui.showHover(overlayRect, name);
  }

  handleMouseDown(e) {
    if (!this.active) return;
    if (this.isEditorElement(e.target)) return;

    if (this.selectedElement && this.selectedElement.contains(e.target)) {
      const startX = e.clientX;
      const startY = e.clientY;
      let hasDragged = false;
      
      const onMouseMove = (moveEvent) => {
        const dist = Math.hypot(moveEvent.clientX - startX, moveEvent.clientY - startY);
        if (dist > 4) {
          hasDragged = true;
          document.removeEventListener('mousemove', onMouseMove, true);
          document.removeEventListener('mouseup', onMouseUp, true);
          
          this.handleDragStart(e);
        }
      };
      
      const onMouseUp = (upEvent) => {
        document.removeEventListener('mousemove', onMouseMove, true);
        document.removeEventListener('mouseup', onMouseUp, true);
        
        if (!hasDragged) {
          if (e.target !== this.selectedElement) {
            this.selectElement(e.target);
          }
        }
      };
      
      document.addEventListener('mousemove', onMouseMove, true);
      document.addEventListener('mouseup', onMouseUp, true);
      
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      e.stopPropagation();
      this.selectElement(e.target);
    }
  }

  handleMouseClick(e) {
    if (!this.active) return;
    if (this.isEditorElement(e.target)) return;

    e.preventDefault();
    e.stopPropagation();
  }

  selectElement(el) {
    if (this.selectedElement === el) return;
    
    this.deselectElement();
    
    this.selectedElement = el;
    this.selectedSelector = getUniqueSelector(el);
    
    // Auto-dock sidebar based on element center
    const rect = el.getBoundingClientRect();
    const elementCenter = rect.left + rect.width / 2;
    const viewportCenter = window.innerWidth / 2;
    if (elementCenter > viewportCenter) {
      this.ui.inspector.classList.remove('dock-right');
      this.ui.inspector.classList.add('dock-left');
    } else {
      this.ui.inspector.classList.remove('dock-left');
      this.ui.inspector.classList.add('dock-right');
    }
    
    // Page Scroll Locking
    this._originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    
    // Style current selected outline
    const overlayRect = this.calculateOverlayRect(el);
    const name = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`;
    
    this.ui.showSelection(overlayRect, name, el);
    
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
      lineHeight: computed.lineHeight,
      letterSpacing: computed.letterSpacing,
      fontStyle: computed.fontStyle,
      color: computed.color,
      textAlign: computed.textAlign,
      display: computed.display,
      zIndex: computed.zIndex === 'auto' ? '' : computed.zIndex,
      flexDirection: computed.flexDirection,
      justifyContent: computed.justifyContent,
      alignItems: computed.alignItems,
      flexWrap: computed.flexWrap,
      borderWidth: computed.borderWidth,
      borderStyle: computed.borderStyle,
      borderColor: computed.borderColor,
      backgroundColor: computed.backgroundColor,
      borderRadius: computed.borderRadius,
      opacity: computed.opacity,
      boxShadow: el.style.boxShadow || ''
    };
    
    // Open Inspector panel
    const textContent = el.children.length === 0 ? el.textContent.trim() : el.innerHTML.trim();
    this.ui.openInspector(name, styles, textContent, el);
  }

  deselectElement() {
    if (this.selectedElement) {
      if (this.selectedElement.contentEditable === 'true') {
        this.selectedElement.blur();
      }
      
      // Page Scroll Unlocking
      if (this._originalOverflow !== undefined) {
        document.documentElement.style.overflow = this._originalOverflow;
      } else {
        document.documentElement.style.overflow = '';
      }
      
      this.selectedElement = null;
      this.selectedSelector = '';
      this.ui.selectedElement = null; // Sync UI
    }
    this.ui.hideSelection();
    this.ui.closeInspector();
  }

  repositionOverlays() {
    if (!this.selectedElement) return;
    const overlayRect = this.calculateOverlayRect(this.selectedElement);
    this.ui.updateSelectionRect(overlayRect, this.selectedElement);
  }

  /* --- Text Editing Engine --- */
  handleDoubleClick(e) {
    if (!this.active) return;
    if (this.isEditorElement(e.target)) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target;
    this.selectElement(target);
    
    target.contentEditable = 'true';
    target.focus();
    
    const range = document.createRange();
    range.selectNodeContents(target);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    
    target.style.outline = '2px dashed var(--accent-color)';
    
    const onBlur = () => {
      target.contentEditable = 'false';
      target.style.outline = '';
      
      const newText = target.innerHTML;
      this.recordTextChange(this.selectedSelector, newText);
      this.repositionOverlays();
      
      // Update text in inspector if it's open
      const textContentInput = this.ui.shadowRoot.getElementById('inspector-text-content');
      if (textContentInput) {
        textContentInput.value = target.children.length === 0 ? target.textContent.trim() : target.innerHTML.trim();
      }
      
      target.removeEventListener('blur', onBlur);
      target.removeEventListener('keydown', onKeyDown);
    };
    
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        const orig = this.draftChanges[this.selectedSelector]?.text;
        if (orig !== undefined) {
          target.innerHTML = orig;
        } else {
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
    
    applyModifications(this.draftChanges, true);
  }

  handleTextChange(text) {
    if (!this.selectedElement) return;
    
    if (this.selectedElement.children.length === 0) {
      this.selectedElement.textContent = text;
    } else {
      this.selectedElement.innerHTML = text;
    }
    
    this.recordTextChange(this.selectedSelector, text);
    this.repositionOverlays();
  }

  handleFontImport(url) {
    if (!url) return;
    
    try {
      // 1. Inject link stylesheet into light DOM head
      injectFontStylesheet(url);
      
      // Parse a clean font-family name from Google Fonts URL or use raw string
      let fontName = url.trim();
      if (url.includes('family=')) {
        const match = url.match(/family=([^&:]+)/);
        if (match) {
          // e.g. Montserrat or Playfair+Display
          fontName = decodeURIComponent(match[1].split(':')[0].replace(/\+/g, ' '));
        }
      }
      
      // 2. Register font family style change on target element
      this.handleStyleChange('fontFamily', fontName);
      
      // 3. Save this stylesheet to metadata modifications
      const pageMods = getPageModifications();
      if (!pageMods.__fontImports) {
        pageMods.__fontImports = [];
      }
      if (!pageMods.__fontImports.includes(url)) {
        pageMods.__fontImports.push(url);
        savePageModifications(pageMods);
      }
      
      // 4. Update the input field in UI
      const fontFamilyInput = this.ui.shadowRoot.querySelector('input[data-style="fontFamily"]');
      if (fontFamilyInput) {
        fontFamilyInput.value = fontName;
      }
      
      const fontImportUrl = this.ui.shadowRoot.getElementById('canvas-font-import-url');
      if (fontImportUrl) {
        fontImportUrl.value = '';
      }
      
      this.ui.showToast(`Font "${fontName}" loaded and applied successfully!`, 'success');
    } catch (e) {
      console.error('Canvas: Failed to import font', e);
      this.ui.showToast('Failed to load custom font.', 'danger');
    }
  }

  handleQuickAction(action, el) {
    if (!el) return;
    
    switch (action) {
      case 'parent': {
        const parent = el.parentElement;
        if (parent && parent !== document.body && parent !== document.documentElement) {
          this.selectElement(parent);
          this.ui.showToast(`Selected parent: <${parent.tagName.toLowerCase()}>`, 'info');
        } else {
          this.ui.showToast('No higher parent element select-eligible', 'info');
        }
        break;
      }
      case 'child': {
        const child = el.firstElementChild;
        if (child && child.id !== 'canvas-editor-root') {
          this.selectElement(child);
          this.ui.showToast(`Selected child: <${child.tagName.toLowerCase()}>`, 'info');
        } else {
          this.ui.showToast('No select-eligible child elements found', 'info');
        }
        break;
      }
      case 'edit-text': {
        this.handleDoubleClick({ target: el, preventDefault: () => {} });
        this.ui.showToast('Inline editing mode activated!', 'info');
        break;
      }
      case 'visibility': {
        const currentDisplay = el.style.display || window.getComputedStyle(el).display;
        const nextDisplay = currentDisplay === 'none' ? 'block' : 'none';
        el.style.display = nextDisplay;
        this.handleStyleChange('display', nextDisplay, el);
        
        this.ui.showToast(`Element visibility set to ${nextDisplay}`, 'info');
        
        if (nextDisplay === 'none') {
          this.deselectElement();
        } else {
          this.repositionOverlays();
        }
        break;
      }
      case 'duplicate': {
        const clone = el.cloneNode(true);
        if (clone.id) {
          clone.id = `${clone.id}-clone-${Date.now().toString().slice(-4)}`;
        }
        el.parentNode.insertBefore(clone, el.nextSibling);
        
        // Register style and text draft changes for the clone
        const cloneSelector = getUniqueSelector(clone);
        this.draftChanges[cloneSelector] = {
          styles: { display: clone.style.display || '' },
          text: clone.children.length === 0 ? clone.textContent : clone.innerHTML
        };
        
        this.ui.showToast(`Duplicated <${el.tagName.toLowerCase()}> element`, 'success');
        this.selectElement(clone);
        break;
      }
      case 'delete': {
        if (confirm(`Are you sure you want to delete this <${el.tagName.toLowerCase()}> element?`)) {
          el.style.display = 'none';
          this.handleStyleChange('display', 'none', el);
          this.deselectElement();
          this.ui.showToast(`Deleted element`, 'danger');
        }
        break;
      }
      case 'copy-style': {
        const computed = window.getComputedStyle(el);
        this.copiedAppearance = {
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          fontFamily: computed.fontFamily,
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          paddingTop: computed.paddingTop,
          paddingRight: computed.paddingRight,
          paddingBottom: computed.paddingBottom,
          paddingLeft: computed.paddingLeft,
          marginTop: computed.marginTop,
          marginRight: computed.marginRight,
          marginBottom: computed.marginBottom,
          marginLeft: computed.marginLeft,
          borderRadius: computed.borderRadius,
          borderWidth: computed.borderWidth,
          borderStyle: computed.borderStyle,
          borderColor: computed.borderColor,
          boxShadow: el.style.boxShadow || computed.boxShadow || ''
        };
        this.ui.showToast('Copied visual appearance styles!', 'success');
        break;
      }
      case 'paste-style': {
        if (!this.copiedAppearance) {
          this.ui.showToast('No style copied yet. Select an item and copy first!', 'danger');
          break;
        }
        Object.entries(this.copiedAppearance).forEach(([prop, val]) => {
          this.handleStyleChange(prop, val, el);
        });
        
        // Re-open inspector to sync new values
        const styles = {};
        Object.keys(this.copiedAppearance).forEach(k => {
          styles[k] = el.style[k] || window.getComputedStyle(el)[k];
        });
        const textContent = el.children.length === 0 ? el.textContent.trim() : el.innerHTML.trim();
        const name = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}`;
        this.ui.openInspector(name, styles, textContent, el);
        
        this.ui.showToast('Pasted styles onto selected item!', 'success');
        break;
      }
    }
  }

  handleLocalFontUpload(files) {
    if (!files || files.length === 0) return;
    
    files.forEach(file => {
      const fontName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '-');
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        try {
          // 1. Load FontFace via Font Loading API
          const fontFace = new FontFace(fontName, arrayBuffer);
          await fontFace.load();
          document.fonts.add(fontFace);
          
          // 2. Save binary to IndexedDB
          await saveFontToDB(fontName, arrayBuffer);
          
          // 3. Apply style family override to selected element
          this.handleStyleChange('fontFamily', fontName);
          
          // 4. Sync typography text field in inspector
          const fontFamilyInput = this.ui.shadowRoot.querySelector('input[data-style="fontFamily"]');
          if (fontFamilyInput) {
            fontFamilyInput.value = fontName;
          }
          
          this.ui.showToast(`Custom font "${fontName}" uploaded & applied!`, 'success');
          
          // Refresh layers tree if visible
          if (this.selectedElement) {
            this.ui.updateLayersTree();
          }
        } catch (err) {
          console.error(`Failed to register custom font file: ${file.name}`, err);
          this.ui.showToast(`Failed to parse font file: ${file.name}`, 'danger');
        }
      };
      
      reader.readAsArrayBuffer(file);
    });
  }

  /* --- Drag Engine --- */
  handleDragStart(e) {
    if (!this.active || !this.selectedElement) return;
    e.preventDefault();
    
    const el = this.selectedElement;
    const computed = window.getComputedStyle(el);
    
    if (computed.position === 'static') {
      el.style.position = 'relative';
      this.recordStyleChange('position', 'relative');
    }
    
    // Disable CSS transition temporarily during drag
    this._originalTransition = el.style.transition || '';
    el.style.setProperty('transition', 'none', 'important');
    
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
    
    this.recordStyleChange('left', `${newLeft}px`);
    this.recordStyleChange('top', `${newTop}px`);
    
    this.repositionOverlays();
  }

  handleDragEnd() {
    this.dragState.isDragging = false;
    if (this.selectedElement) {
      this.selectedElement.style.transition = this._originalTransition;
    }
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
    
    // Disable CSS transition temporarily during resize
    this._originalTransition = el.style.transition || '';
    el.style.setProperty('transition', 'none', 'important');
    
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
    
    const minSize = 10;
    
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
    
    if (state.handle.includes('r') || state.handle.includes('l')) {
      el.style.width = `${newWidth}px`;
      this.recordStyleChange('width', `${newWidth}px`);
    }
    if (state.handle.includes('b') || state.handle.includes('t')) {
      el.style.height = `${newHeight}px`;
      this.recordStyleChange('height', `${newHeight}px`);
    }
    
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
    if (this.selectedElement) {
      this.selectedElement.style.transition = this._originalTransition;
    }
    document.removeEventListener('mousemove', this.handleResizeMove);
    document.removeEventListener('mouseup', this.handleResizeEnd);
  }

  /* --- Properties Inspector Changes --- */
  handleStyleChange(prop, val, targetEl = this.selectedElement) {
    if (!targetEl) return;
    
    targetEl.style[prop] = val;
    this.recordStyleChange(prop, val, targetEl);
    
    if (targetEl === this.selectedElement) {
      this.repositionOverlays();
    }
  }

  recordStyleChange(prop, val, targetEl = this.selectedElement) {
    const selector = getUniqueSelector(targetEl);
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
    const pageMods = getPageModifications();
    
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
    
    savePageModifications(pageMods);
    this.draftChanges = {};
    
    const cssCode = this.generateCSSExport(pageMods);
    
    this.ui.showToast('All modifications saved successfully!', 'success');
    this.ui.showCodeExport(cssCode);
  }

  cancelChanges() {
    revertModifications(this.draftChanges);
    this.draftChanges = {};
    this.ui.showToast('Changes discarded.', 'info');
    this.deselectElement();
  }

  resetAllChanges() {
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

  handleGlobalFontChange(fontName) {
    if (!fontName) return;
    
    // Set style override on document.body
    document.body.style.fontFamily = fontName;
    
    // Record it in draft changes under 'body'
    if (!this.draftChanges['body']) {
      this.draftChanges['body'] = { styles: {}, text: undefined };
    }
    if (!this.draftChanges['body'].styles) {
      this.draftChanges['body'].styles = {};
    }
    this.draftChanges['body'].styles['fontFamily'] = fontName;
    
    // Apply changes in case they save
    applyModifications(this.draftChanges, true);
    
    this.ui.showToast(`Set global website font to "${fontName}"`, 'success');
  }
}
