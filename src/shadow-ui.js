import styles from './styles.css?inline';

export class ShadowUI {
  constructor(callbacks = {}) {
    this.callbacks = callbacks; // { onStyleChange, onTextChange, onSave, onCancel, onReset }
    
    this.root = null;
    this.shadowRoot = null;
    
    // UI elements inside shadow DOM
    this.badge = null;
    this.hoverOverlay = null;
    this.selectionOverlay = null;
    this.inspector = null;
    this.modalOverlay = null;
    this.toastContainer = null;
    this.tooltip = null;
    
    // Form elements caching
    this.inputs = {};
    
    this.init();
  }

  init() {
    // 1. Create host element
    this.root = document.createElement('div');
    this.root.id = 'canvas-editor-root';
    document.body.appendChild(this.root);
    
    // 2. Attach Shadow DOM
    this.shadowRoot = this.root.attachShadow({ mode: 'open' });
    
    // 3. Inject CSS
    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    this.shadowRoot.appendChild(styleTag);
    
    // 4. Create HTML Structure
    const uiContainer = document.createElement('div');
    uiContainer.innerHTML = this.getHTMLTemplate();
    this.shadowRoot.appendChild(uiContainer);
    
    // 5. Query Shadow Elements
    this.badge = this.shadowRoot.querySelector('.canvas-badge');
    this.hoverOverlay = this.shadowRoot.querySelector('.canvas-hover-overlay');
    this.selectionOverlay = this.shadowRoot.querySelector('.canvas-selection-overlay');
    this.inspector = this.shadowRoot.querySelector('.canvas-inspector');
    this.modalOverlay = this.shadowRoot.querySelector('.canvas-modal-overlay');
    this.toastContainer = this.shadowRoot.querySelector('.canvas-toast-container');
    
    // Set initial dock position from localStorage
    const savedDock = localStorage.getItem('canvas_inspector_dock') || 'dock-right';
    this.inspector.classList.add(savedDock);

    // 6. Create Tooltip element
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'canvas-tooltip';
    this.shadowRoot.appendChild(this.tooltip);
    
    // 7. Cache inputs and bind events
    this.cacheInputs();
    this.bindEvents();
  }

  getHTMLTemplate() {
    return `
      <!-- Badge -->
      <div class="canvas-badge" id="canvas-badge">
        <div class="badge-icon"></div>
        <div class="badge-text">Canvas Mode</div>
      </div>

      <!-- Hover Overlay -->
      <div class="canvas-overlay canvas-hover-overlay">
        <div class="overlay-label">div</div>
      </div>

      <!-- Selection Overlay -->
      <div class="canvas-overlay canvas-selection-overlay">
        <div class="overlay-label">div.selected</div>
        <div class="dimension-label">0 × 0</div>
        <div class="drag-handle" data-action="drag"></div>
        
        <!-- Edge resize handles -->
        <div class="resize-handle t" data-handle="t"></div>
        <div class="resize-handle r" data-handle="r"></div>
        <div class="resize-handle b" data-handle="b"></div>
        <div class="resize-handle l" data-handle="l"></div>
        
        <!-- Corner resize handles -->
        <div class="resize-handle tl" data-handle="tl"></div>
        <div class="resize-handle tr" data-handle="tr"></div>
        <div class="resize-handle bl" data-handle="bl"></div>
        <div class="resize-handle br" data-handle="br"></div>
      </div>

      <!-- Properties Inspector -->
      <div class="canvas-inspector">
        <div class="inspector-header">
          <h3 class="inspector-title" id="inspector-element-title">Select Element</h3>
          <div style="display: flex; gap: 4px; align-items: center;">
            <button class="inspector-action-btn" id="inspector-dock-btn" title="Dock left/right">⇄</button>
            <button class="inspector-close" id="inspector-close-btn">×</button>
          </div>
        </div>
        
        <div class="inspector-content">
          <!-- Collapsible Content -->
          <div class="inspector-section">
            <div class="section-header">
              <h4 class="section-title">Content</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-row full-width">
                <label class="control-label">
                  Text Content
                  <span class="info-icon" data-tip="Directly edit the raw text or HTML content of the selected element." data-example="Change a button label or title.">ⓘ</span>
                </label>
                <textarea class="control-input" id="inspector-text-content" rows="2" placeholder="Click and type to change text..."></textarea>
              </div>
            </div>
          </div>
          
          <!-- Collapsible Dimensions -->
          <div class="inspector-section">
            <div class="section-header">
              <h4 class="section-title">Dimensions</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-grid">
                <div class="control-row">
                  <label class="control-label">
                    Width
                    <span class="info-icon" data-tip="Defines the horizontal size of the element (in px, % or auto)." data-example="350px or 100%">ⓘ</span>
                  </label>
                  <input type="text" class="control-input" data-style="width" placeholder="auto">
                </div>
                <div class="control-row">
                  <label class="control-label">
                    Height
                    <span class="info-icon" data-tip="Defines the vertical size of the element (in px, % or auto)." data-example="200px or auto">ⓘ</span>
                  </label>
                  <input type="text" class="control-input" data-style="height" placeholder="auto">
                </div>
              </div>
            </div>
          </div>

          <!-- Collapsible Spacing -->
          <div class="inspector-section">
            <div class="section-header">
              <h4 class="section-title">Spacing (px)</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-grid">
                <div class="control-row">
                  <label class="control-label">Margin Top</label>
                  <input type="number" class="control-input" data-style="marginTop" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Margin Bottom</label>
                  <input type="number" class="control-input" data-style="marginBottom" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Padding Top</label>
                  <input type="number" class="control-input" data-style="paddingTop" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Padding Bottom</label>
                  <input type="number" class="control-input" data-style="paddingBottom" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Margin Left</label>
                  <input type="number" class="control-input" data-style="marginLeft" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Margin Right</label>
                  <input type="number" class="control-input" data-style="marginRight" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Padding Left</label>
                  <input type="number" class="control-input" data-style="paddingLeft" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Padding Right</label>
                  <input type="number" class="control-input" data-style="paddingRight" placeholder="0">
                </div>
              </div>
            </div>
          </div>

          <!-- Collapsible Typography (Collapsed by default) -->
          <div class="inspector-section collapsed">
            <div class="section-header">
              <h4 class="section-title">Typography</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-grid">
                <div class="control-row">
                  <label class="control-label">Font Size (px)</label>
                  <input type="number" class="control-input" data-style="fontSize" placeholder="16">
                </div>
                <div class="control-row">
                  <label class="control-label">Font Weight</label>
                  <select class="control-select" data-style="fontWeight">
                    <option value="">Default</option>
                    <option value="100">Thin</option>
                    <option value="300">Light</option>
                    <option value="400">Regular</option>
                    <option value="500">Medium</option>
                    <option value="600">Semibold</option>
                    <option value="700">Bold</option>
                    <option value="900">Black</option>
                  </select>
                </div>
                
                <div class="control-row">
                  <label class="control-label">
                    Line Height
                    <span class="info-icon" data-tip="Defines vertical spacing between text lines. Can be unitless or px." data-example="1.5 or 24px">ⓘ</span>
                  </label>
                  <input type="text" class="control-input" data-style="lineHeight" placeholder="normal">
                </div>
                <div class="control-row">
                  <label class="control-label">
                    Letter Spacing
                    <span class="info-icon" data-tip="Controls character gap spacing." data-example="1px or 0.05em">ⓘ</span>
                  </label>
                  <input type="text" class="control-input" data-style="letterSpacing" placeholder="normal">
                </div>
                
                <div class="control-row">
                  <label class="control-label">Font Style</label>
                  <select class="control-select" data-style="fontStyle">
                    <option value="">Normal</option>
                    <option value="italic">Italic</option>
                    <option value="oblique">Oblique</option>
                  </select>
                </div>
                <div class="control-row">
                  <!-- Empty cell to balance grid -->
                </div>

                <div class="control-row full-width">
                  <label class="control-label">Text Color</label>
                  <div class="color-picker-row">
                    <div class="color-preview-box" id="color-text-preview">
                      <input type="color" class="color-native-input" data-style="color">
                    </div>
                    <input type="text" class="control-input color-text-input" data-style-sync="color" placeholder="#000000">
                  </div>
                </div>
                
                <div class="control-row full-width">
                  <label class="control-label">Text Align</label>
                  <div class="align-buttons">
                    <button class="align-btn" data-style="textAlign" data-val="left">Left</button>
                    <button class="align-btn" data-style="textAlign" data-val="center">Center</button>
                    <button class="align-btn" data-style="textAlign" data-val="right">Right</button>
                    <button class="align-btn" data-style="textAlign" data-val="justify">Justify</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Collapsible Layout & Alignments (Collapsed by default) -->
          <div class="inspector-section collapsed">
            <div class="section-header">
              <h4 class="section-title">Layout & Flex</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-grid">
                <div class="control-row">
                  <label class="control-label">Display</label>
                  <select class="control-select" data-style="display">
                    <option value="">Default</option>
                    <option value="block">block</option>
                    <option value="inline-block">inline-block</option>
                    <option value="flex">flex</option>
                    <option value="grid">grid</option>
                    <option value="inline">inline</option>
                    <option value="none">none</option>
                  </select>
                </div>
                <div class="control-row">
                  <label class="control-label">
                    Z-Index
                    <span class="info-icon" data-tip="Specifies stack overlap position." data-example="10 or 999">ⓘ</span>
                  </label>
                  <input type="number" class="control-input" data-style="zIndex" placeholder="auto">
                </div>

                <!-- Flex alignments (Only applies if display is flex) -->
                <div class="control-row full-width flex-control-row">
                  <label class="control-label" style="font-size: 10px; color: var(--text-muted);">
                    Flex Layout Controls (Requires Display: Flex)
                  </label>
                  <div class="control-grid">
                    <div class="control-row">
                      <label class="control-label">Direction</label>
                      <select class="control-select" data-style="flexDirection">
                        <option value="">Default</option>
                        <option value="row">row</option>
                        <option value="column">column</option>
                        <option value="row-reverse">row-reverse</option>
                        <option value="column-reverse">column-reverse</option>
                      </select>
                    </div>
                    <div class="control-row">
                      <label class="control-label">Justify Content</label>
                      <select class="control-select" data-style="justifyContent">
                        <option value="">Default</option>
                        <option value="flex-start">start</option>
                        <option value="center">center</option>
                        <option value="flex-end">end</option>
                        <option value="space-between">between</option>
                        <option value="space-around">around</option>
                      </select>
                    </div>
                    <div class="control-row">
                      <label class="control-label">Align Items</label>
                      <select class="control-select" data-style="alignItems">
                        <option value="">Default</option>
                        <option value="stretch">stretch</option>
                        <option value="center">center</option>
                        <option value="flex-start">start</option>
                        <option value="flex-end">end</option>
                      </select>
                    </div>
                    <div class="control-row">
                      <label class="control-label">Flex Wrap</label>
                      <select class="control-select" data-style="flexWrap">
                        <option value="">Default</option>
                        <option value="nowrap">no-wrap</option>
                        <option value="wrap">wrap</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Collapsible Borders & Spacers (Collapsed by default) -->
          <div class="inspector-section collapsed">
            <div class="section-header">
              <h4 class="section-title">Borders & Corners</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-grid">
                <div class="control-row">
                  <label class="control-label">Border Radius</label>
                  <input type="number" class="control-input" data-style="borderRadius" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Border Width</label>
                  <input type="number" class="control-input" data-style="borderWidth" placeholder="0">
                </div>
                <div class="control-row">
                  <label class="control-label">Border Style</label>
                  <select class="control-select" data-style="borderStyle">
                    <option value="">None</option>
                    <option value="solid">solid</option>
                    <option value="dashed">dashed</option>
                    <option value="dotted">dotted</option>
                    <option value="double">double</option>
                  </select>
                </div>
                <div class="control-row">
                  <!-- Empty cell to balance grid -->
                </div>
                <div class="control-row full-width">
                  <label class="control-label">Border Color</label>
                  <div class="color-picker-row">
                    <div class="color-preview-box" id="color-border-preview">
                      <input type="color" class="color-native-input" data-style="borderColor">
                    </div>
                    <input type="text" class="control-input color-text-input" data-style-sync="borderColor" placeholder="transparent">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Collapsible Appearance (Collapsed by default) -->
          <div class="inspector-section collapsed">
            <div class="section-header">
              <h4 class="section-title">Appearance</h4>
              <span class="section-chevron">▼</span>
            </div>
            <div class="section-body">
              <div class="control-grid">
                <div class="control-row full-width">
                  <label class="control-label">Background Color</label>
                  <div class="color-picker-row">
                    <div class="color-preview-box" id="color-bg-preview">
                      <input type="color" class="color-native-input" data-style="backgroundColor">
                    </div>
                    <input type="text" class="control-input color-text-input" data-style-sync="backgroundColor" placeholder="transparent">
                  </div>
                </div>
                
                <div class="control-row">
                  <label class="control-label">Opacity (0-1)</label>
                  <input type="number" class="control-input" data-style="opacity" step="0.1" min="0" max="1" placeholder="1">
                </div>
                <div class="control-row">
                  <!-- Empty spacer cell -->
                </div>

                <div class="control-row full-width">
                  <label class="control-label">Box Shadow</label>
                  <select class="control-select" data-style="boxShadow">
                    <option value="">None</option>
                    <option value="0 1px 3px rgba(0,0,0,0.1)">Light</option>
                    <option value="0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)">Medium</option>
                    <option value="0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)">Large</option>
                    <option value="0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)">Huge</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Inspector Actions -->
        <div class="inspector-footer">
          <div class="btn-row">
            <button class="btn btn-secondary" id="inspector-cancel-btn">Cancel</button>
            <button class="btn btn-primary" id="inspector-save-btn">Save Changes</button>
          </div>
          <button class="btn btn-danger" id="inspector-reset-btn">Reset All Page Edits</button>
        </div>
      </div>

      <!-- Export Modal -->
      <div class="canvas-modal-overlay">
        <div class="canvas-modal">
          <div class="modal-header">
            <h4 class="modal-title">Changes Saved Successfully</h4>
            <button class="inspector-close" id="modal-close-btn">×</button>
          </div>
          <div class="modal-body">
            <p class="modal-desc">
              Your edits have been persisted locally to this browser. To make these changes permanent in your code, copy the CSS below and add it to your project stylesheets:
            </p>
            <div class="code-container" id="modal-css-code"></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="modal-ok-btn">Done</button>
          </div>
        </div>
      </div>

      <!-- Toast Container -->
      <div class="canvas-toast-container"></div>
    `;
  }

  cacheInputs() {
    // Collect all inputs that map directly to styles
    this.shadowRoot.querySelectorAll('[data-style]').forEach(el => {
      const prop = el.dataset.style;
      if (!this.inputs[prop]) {
        this.inputs[prop] = [];
      }
      this.inputs[prop].push(el);
    });
  }

  bindEvents() {
    // Toggle Editor Active Mode via Badge
    this.badge.addEventListener('click', () => {
      if (this.callbacks.onToggleActive) {
        this.callbacks.onToggleActive();
      }
    });

    // Sidebar position toggling
    const dockBtn = this.shadowRoot.getElementById('inspector-dock-btn');
    dockBtn.addEventListener('click', () => {
      if (this.inspector.classList.contains('dock-right')) {
        this.inspector.classList.remove('dock-right');
        this.inspector.classList.add('dock-left');
        localStorage.setItem('canvas_inspector_dock', 'dock-left');
      } else {
        this.inspector.classList.remove('dock-left');
        this.inspector.classList.add('dock-right');
        localStorage.setItem('canvas_inspector_dock', 'dock-right');
      }
      this.showToast('Sidebar docked ' + (this.inspector.classList.contains('dock-right') ? 'right' : 'left'), 'info');
    });

    // Accordions collapsible click events
    this.shadowRoot.querySelectorAll('.section-header').forEach(header => {
      header.addEventListener('click', () => {
        const section = header.parentElement;
        section.classList.toggle('collapsed');
      });
    });

    // Close Inspector button
    this.shadowRoot.getElementById('inspector-close-btn').addEventListener('click', () => {
      this.closeInspector();
    });

    // Save changes button
    this.shadowRoot.getElementById('inspector-save-btn').addEventListener('click', () => {
      if (this.callbacks.onSave) this.callbacks.onSave();
    });

    // Cancel / discard changes button
    this.shadowRoot.getElementById('inspector-cancel-btn').addEventListener('click', () => {
      if (this.callbacks.onCancel) this.callbacks.onCancel();
    });

    // Reset all overrides button
    this.shadowRoot.getElementById('inspector-reset-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to clear ALL visual edits you made to this page?')) {
        if (this.callbacks.onReset) this.callbacks.onReset();
      }
    });

    // Code Modal OK / Close
    const closeModal = () => this.modalOverlay.classList.remove('open');
    this.shadowRoot.getElementById('modal-close-btn').addEventListener('click', closeModal);
    this.shadowRoot.getElementById('modal-ok-btn').addEventListener('click', closeModal);

    // Dynamic Style Changes (Input elements)
    this.shadowRoot.addEventListener('input', (e) => {
      const input = e.target;
      
      // Direct style binding
      if (input.dataset.style) {
        const prop = input.dataset.style;
        let val = input.value;
        
        // Auto px suffix for numeric inputs
        if (input.type === 'number' && val !== '') {
          if (prop !== 'opacity' && prop !== 'zIndex') {
            val = `${val}px`;
          }
        }
        
        // Sync color previews
        if (input.type === 'color') {
          const syncInput = this.shadowRoot.querySelector(`[data-style-sync="${prop}"]`);
          if (syncInput) syncInput.value = val;
          input.parentElement.style.backgroundColor = val;
        }

        this.triggerStyleChange(prop, val);
      }
      
      // Synced text input for colors
      if (input.dataset.styleSync) {
        const prop = input.dataset.styleSync;
        const val = input.value;
        const colorInput = this.shadowRoot.querySelector(`input[type="color"][data-style="${prop}"]`);
        
        if (colorInput) {
          const hex = cssColorToHex(val);
          colorInput.value = hex;
          colorInput.parentElement.style.backgroundColor = val;
        }
        
        this.triggerStyleChange(prop, val);
      }
    });

    // Text Content Input Event
    const textContentInput = this.shadowRoot.getElementById('inspector-text-content');
    textContentInput.addEventListener('input', (e) => {
      if (this.callbacks.onTextChange) {
        this.callbacks.onTextChange(e.target.value);
      }
    });

    // Align Button Clicking
    this.shadowRoot.querySelectorAll('.align-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const prop = target.dataset.style;
        const val = target.dataset.val;

        // Toggle active styling
        target.parentElement.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');

        this.triggerStyleChange(prop, val);
      });
    });

    // Info Icon Tooltip hover triggers
    this.shadowRoot.querySelectorAll('.info-icon').forEach(icon => {
      const showTooltip = () => {
        const text = icon.dataset.tip;
        const example = icon.dataset.example;
        
        let html = text;
        if (example) {
          html += `<span class="tooltip-example">Example: ${example}</span>`;
        }
        this.tooltip.innerHTML = html;
        this.tooltip.classList.add('show');
        
        // Position it absolute relative to viewport
        const iconRect = icon.getBoundingClientRect();
        
        // Center tooltip horizontally above icon
        const tooltipRect = this.tooltip.getBoundingClientRect();
        const top = iconRect.top - tooltipRect.height - 8;
        const left = iconRect.left + (iconRect.width / 2) - (tooltipRect.width / 2);
        
        // Boundary check (stay inside viewport)
        const finalLeft = Math.max(10, Math.min(window.innerWidth - tooltipRect.width - 10, left));
        const finalTop = top < 10 ? iconRect.bottom + 8 : top;
        
        this.tooltip.style.top = `${finalTop}px`;
        this.tooltip.style.left = `${finalLeft}px`;
      };
      
      const hideTooltip = () => {
        this.tooltip.classList.remove('show');
      };
      
      icon.addEventListener('mouseenter', showTooltip);
      icon.addEventListener('mouseleave', hideTooltip);
      icon.addEventListener('focus', showTooltip);
      icon.addEventListener('blur', hideTooltip);
    });
  }

  triggerStyleChange(prop, val) {
    if (this.callbacks.onStyleChange) {
      this.callbacks.onStyleChange(prop, val);
    }
  }

  /* --- External Controller APIs --- */

  setBadgeState(isActive) {
    if (isActive) {
      this.badge.classList.add('active');
      this.badge.querySelector('.badge-text').textContent = 'Canvas Active';
    } else {
      this.badge.classList.remove('active');
      this.badge.querySelector('.badge-text').textContent = 'Canvas Mode';
      this.closeInspector();
      this.hideOverlays();
    }
  }

  showHover(rect, name) {
    if (!rect) return;
    this.hoverOverlay.style.display = 'block';
    this.hoverOverlay.style.top = `${rect.top}px`;
    this.hoverOverlay.style.left = `${rect.left}px`;
    this.hoverOverlay.style.width = `${rect.width}px`;
    this.hoverOverlay.style.height = `${rect.height}px`;
    this.hoverOverlay.style.borderRadius = rect.borderRadius || '0px';
    
    this.hoverOverlay.querySelector('.overlay-label').textContent = name;
  }

  hideHover() {
    this.hoverOverlay.style.display = 'none';
  }

  showSelection(rect, name) {
    if (!rect) return;
    this.selectionOverlay.style.display = 'block';
    this.selectionOverlay.style.top = `${rect.top}px`;
    this.selectionOverlay.style.left = `${rect.left}px`;
    this.selectionOverlay.style.width = `${rect.width}px`;
    this.selectionOverlay.style.height = `${rect.height}px`;
    this.selectionOverlay.style.borderRadius = rect.borderRadius || '0px';
    
    this.selectionOverlay.querySelector('.overlay-label').textContent = name;
    this.selectionOverlay.querySelector('.dimension-label').textContent = `${Math.round(rect.originalWidth)}px × ${Math.round(rect.originalHeight)}px`;
  }

  updateSelectionRect(rect) {
    if (!rect) return;
    this.selectionOverlay.style.top = `${rect.top}px`;
    this.selectionOverlay.style.left = `${rect.left}px`;
    this.selectionOverlay.style.width = `${rect.width}px`;
    this.selectionOverlay.style.height = `${rect.height}px`;
    this.selectionOverlay.style.borderRadius = rect.borderRadius || '0px';
    
    this.selectionOverlay.querySelector('.dimension-label').textContent = `${Math.round(rect.originalWidth)}px × ${Math.round(rect.originalHeight)}px`;
  }

  hideSelection() {
    this.selectionOverlay.style.display = 'none';
  }

  hideOverlays() {
    this.hideHover();
    this.hideSelection();
  }

  openInspector(elementName, currentStyles, textContent = '') {
    this.shadowRoot.getElementById('inspector-element-title').textContent = elementName;
    this.fillInspectorValues(currentStyles);
    
    const textContentInput = this.shadowRoot.getElementById('inspector-text-content');
    if (textContentInput) {
      textContentInput.value = textContent;
    }
    
    this.inspector.classList.add('open');
  }

  closeInspector() {
    this.inspector.classList.remove('open');
  }

  fillInspectorValues(styles) {
    // Clear all inputs first
    Object.values(this.inputs).flat().forEach(input => {
      if (input.type === 'color') {
        input.value = '#000000';
        input.parentElement.style.backgroundColor = 'transparent';
      } else if (input.tagName === 'SELECT') {
        input.value = '';
      } else {
        input.value = '';
      }
    });
    
    this.shadowRoot.querySelectorAll('[data-style-sync]').forEach(input => input.value = '');
    this.shadowRoot.querySelectorAll('.align-btn').forEach(btn => btn.classList.remove('active'));

    // Populate inputs with current computed styles
    Object.entries(styles).forEach(([prop, val]) => {
      const inputs = this.inputs[prop];
      if (!inputs) return;
      
      inputs.forEach(input => {
        if (input.type === 'number') {
          input.value = parseFloat(val) || '';
        } else if (input.type === 'color') {
          // Parse rgb/rgba/hex to hex for native input
          const hex = rgbToHex(val) || '#000000';
          input.value = hex;
          input.parentElement.style.backgroundColor = val;
          
          // Sync text input
          const syncInput = this.shadowRoot.querySelector(`[data-style-sync="${prop}"]`);
          if (syncInput) syncInput.value = val;
        } else if (input.tagName === 'SELECT') {
          input.value = val;
        } else if (input.classList.contains('align-btn')) {
          // Align buttons are handled differently
          if (input.dataset.val === val) {
            input.classList.add('active');
          }
        } else {
          input.value = val;
        }
      });

      // Special handling for text align button state
      if (prop === 'textAlign') {
        const alignBtn = this.shadowRoot.querySelector(`.align-btn[data-val="${val}"]`);
        if (alignBtn) alignBtn.classList.add('active');
      }
    });
  }

  showCodeExport(cssCode) {
    const codeBox = this.shadowRoot.getElementById('modal-css-code');
    codeBox.textContent = cssCode;
    this.modalOverlay.classList.add('open');
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `canvas-toast toast-${type}`;
    toast.textContent = message;
    
    this.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'none'; // reset animation
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      
      // Animate out
      setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }, 10);
  }
}

// Helper to convert RGB styles to Hex
function rgbToHex(rgbStr) {
  if (!rgbStr) return null;
  if (rgbStr.startsWith('#')) return rgbStr;
  if (rgbStr === 'transparent') return '#ffffff';
  
  const match = rgbStr.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
  if (!match) return null;
  
  const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
  if (alpha === 0) return '#ffffff'; // Fallback for native picker
  
  const r = parseInt(match[1]).toString(16).padStart(2, '0');
  const g = parseInt(match[2]).toString(16).padStart(2, '0');
  const b = parseInt(match[3]).toString(16).padStart(2, '0');
  
  return `#${r}${g}${b}`;
}

// Helper to resolve any CSS color format to standard Hex for native input
function cssColorToHex(colorStr) {
  if (!colorStr || colorStr === 'transparent') return '#ffffff';
  
  const temp = document.createElement('div');
  temp.style.color = colorStr;
  document.body.appendChild(temp);
  const comp = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  
  return rgbToHex(comp) || '#ffffff';
}
