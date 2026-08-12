import styles from './styles.css?inline';

export class ShadowUI {
  constructor(callbacks = {}) {
    this.callbacks = callbacks; 
    // callbacks: { onStyleChange, onTextChange, onSave, onCancel, onReset, onLocalFontUpload, onQuickAction, onLayerSelect, onDeselect, onGlobalFontChange }
    
    this.root = null;
    this.shadowRoot = null;
    this.uiContainer = null;
    
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
    this.selectedElement = null;
    
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
    this.uiContainer = document.createElement('div');
    this.uiContainer.innerHTML = this.getHTMLTemplate();
    this.shadowRoot.appendChild(this.uiContainer);
    
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
        <div class="badge-text">Visual Editor</div>
      </div>

      <!-- Hover Overlay -->
      <div class="canvas-overlay canvas-hover-overlay">
        <div class="overlay-label">div</div>
      </div>

      <!-- Selection Overlay -->
      <div class="canvas-overlay canvas-selection-overlay">
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

        <!-- Floating tag label (serves as drag handle) -->
        <div class="overlay-label" data-action="drag" title="Hold click here to drag & reposition this item">div.selected</div>
        
        <!-- Quick Actions Canvas Toolbar -->
        <div class="canvas-quick-toolbar">
          <button class="quick-btn" data-action="parent" title="Select Parent Container">↑ Parent</button>
          <button class="quick-btn" data-action="child" title="Select Child Item">↓ Child</button>
          <button class="quick-btn" data-action="edit-text" title="Edit Text Content">✎ Edit Text</button>
          <button class="quick-btn" data-action="copy-style" title="Copy visual appearance styles of this item">❐ Copy style</button>
          <button class="quick-btn" data-action="paste-style" title="Paste copied styles onto this item">📋 Paste style</button>
          <button class="quick-btn" data-action="visibility" title="Hide/show item">👁 Hide</button>
          <button class="quick-btn" data-action="duplicate" title="Clone Item">❐ Clone</button>
          <button class="quick-btn" data-action="delete" title="Delete Item" style="color: var(--danger-color);">🗑 Del</button>
        </div>

        <!-- Floating Contextual Quick Settings Popover -->
        <div class="canvas-quick-popover" id="canvas-quick-popover" style="display: none;">
          <!-- Content rendered dynamically via JS -->
        </div>
        
        <div class="dimension-label">0 × 0</div>
      </div>

      <!-- Properties Inspector -->
      <div class="canvas-inspector">
        <div class="inspector-header">
          <h3 class="inspector-title" id="inspector-element-title">Select an item</h3>
          <div style="display: flex; gap: 4px; align-items: center;">
            <button class="inspector-action-btn" id="inspector-dock-btn" title="Slide panel to left/right side">⇄</button>
            <button class="inspector-close" id="inspector-close-btn">×</button>
          </div>
        </div>

        <!-- Tab Selector -->
        <div class="inspector-tabs">
          <button class="tab-btn active" data-tab="styles">Customize</button>
          <button class="tab-btn" data-tab="layers">Hierarchy</button>
        </div>
        
        <!-- TAB 1: STYLES CONTROLS -->
        <div class="tab-content active" id="tab-styles">
          <div class="inspector-content">
            <!-- Collapsible Content -->
            <div class="inspector-section">
              <div class="section-header">
                <h4 class="section-title">Edit text content</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <div class="control-row full-width">
                  <label class="control-label">Text Inside Item</label>
                  <textarea class="control-input" id="inspector-text-content" placeholder="Type text content here..."></textarea>
                </div>
              </div>
            </div>

            <!-- Collapsible Dimensions -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Size & Dimensions</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <div class="control-grid">
                  <div class="control-row">
                    <label class="control-label">Width</label>
                    <input type="text" class="control-input" data-style="width" placeholder="auto">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Height</label>
                    <input type="text" class="control-input" data-style="height" placeholder="auto">
                  </div>
                </div>
              </div>
            </div>

            <!-- Collapsible Spacing -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Distance & Breathing Room</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <!-- Margin / Outer Spacing -->
                <div class="section-title" style="font-size: 10px; margin-bottom: 4px;">Outer Spacing (Margin)</div>
                <div class="control-grid" style="margin-bottom: 10px;">
                  <div class="control-row">
                    <label class="control-label">Top Space</label>
                    <input type="text" class="control-input" data-style="marginTop" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Bottom Space</label>
                    <input type="text" class="control-input" data-style="marginBottom" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Left Space</label>
                    <input type="text" class="control-input" data-style="marginLeft" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Right Space</label>
                    <input type="text" class="control-input" data-style="marginRight" placeholder="0px">
                  </div>
                </div>

                <!-- Padding / Inner Spacing -->
                <div class="section-title" style="font-size: 10px; margin-bottom: 4px;">Inner Breathing Room (Padding)</div>
                <div class="control-grid">
                  <div class="control-row">
                    <label class="control-label">Top Breathing</label>
                    <input type="text" class="control-input" data-style="paddingTop" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Bottom Breathing</label>
                    <input type="text" class="control-input" data-style="paddingBottom" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Left Breathing</label>
                    <input type="text" class="control-input" data-style="paddingLeft" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Right Breathing</label>
                    <input type="text" class="control-input" data-style="paddingRight" placeholder="0px">
                  </div>
                </div>
              </div>
            </div>

            <!-- Collapsible Typography -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Text Style & Shape</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <div class="control-grid">
                  <div class="control-row full-width">
                    <label class="control-label">
                      Select Font Family
                      <span class="info-icon" data-tip="Pick a font style. E.g. Montserrat, Georgia, sans-serif." data-example="Montserrat">ⓘ</span>
                    </label>
                    <input type="text" class="control-input" data-style="fontFamily" placeholder="Inherited / e.g. Inter">
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">
                      Global Font (Entire Website)
                      <span class="info-icon" data-tip="Change font lettering styles across the entire webpage." data-example="Montserrat">ⓘ</span>
                    </label>
                    <input type="text" class="control-input" id="canvas-global-font-input" placeholder="e.g. Montserrat or Inter">
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">
                      Add Google Font Style
                      <span class="info-icon" data-tip="Type a Google Font name to download it instantly from Google Web Fonts." data-example="Montserrat">ⓘ</span>
                    </label>
                    <div style="display: flex; gap: 8px; width: 100%; box-sizing: border-box;">
                      <input type="text" class="control-input" id="canvas-font-import-url" placeholder="e.g. Montserrat or Google CSS Link" style="flex: 1; min-width: 0;">
                      <button class="btn btn-secondary" id="canvas-font-import-btn" style="padding: 0 12px; font-size: 11px; flex-shrink: 0; width: auto; height: 34px; margin: 0; border-radius: 8px;">Add</button>
                    </div>
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">
                      Attach Font Files (.ttf, .woff, .woff2)
                      <span class="info-icon" data-tip="Upload binary font files from your device to load them locally." data-example="Select my-font.ttf">ⓘ</span>
                    </label>
                    <div class="font-upload-row">
                      <label class="custom-file-upload">
                        <input type="file" id="canvas-font-file-input" accept=".ttf,.woff,.woff2" multiple style="display:none;">
                        <span id="canvas-file-upload-btn-label">📁 Choose local font files...</span>
                      </label>
                      <div id="canvas-font-file-list" style="font-size: 10px; color: var(--text-muted); line-height: 1.3; margin-top: 4px;">No files chosen</div>
                    </div>
                  </div>

                  <div class="control-row">
                    <label class="control-label">Text Size (Pixels)</label>
                    <input type="number" class="control-input" data-style="fontSize" placeholder="16">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Text Boldness</label>
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
                      Row Line Spacing
                      <span class="info-icon" data-tip="Breathing space height between paragraphs. E.g. 1.5 or 24px." data-example="1.5">ⓘ</span>
                    </label>
                    <input type="text" class="control-input" data-style="lineHeight" placeholder="normal">
                  </div>
                  <div class="control-row">
                    <label class="control-label">
                      Letter Gap Spacing
                      <span class="info-icon" data-tip="Pushes text characters apart horizontally. E.g. 1px." data-example="1px">ⓘ</span>
                    </label>
                    <input type="text" class="control-input" data-style="letterSpacing" placeholder="normal">
                  </div>
                  
                  <div class="control-row">
                    <label class="control-label">Text Slant (Italic)</label>
                    <select class="control-select" data-style="fontStyle">
                      <option value="">Normal</option>
                      <option value="italic">Italic</option>
                      <option value="oblique">Oblique</option>
                    </select>
                  </div>
                  <div class="control-row">
                    <!-- empty -->
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">Text Color</label>
                    <div class="color-picker-row">
                      <div class="color-preview-box" id="color-text-preview">
                        <input type="color" class="color-native-input" data-style="color">
                      </div>
                      <input type="text" class="control-input color-text-input" data-style-sync="color" placeholder="#000000">
                    </div>
                    <div class="color-swatches">
                      <button class="swatch-btn swatch-transparent" data-color="transparent" title="Transparent"></button>
                      <button class="swatch-btn" data-color="#ffffff" style="background-color: #ffffff;" title="White"></button>
                      <button class="swatch-btn" data-color="#0f172a" style="background-color: #0f172a;" title="Slate"></button>
                      <button class="swatch-btn" data-color="#6366f1" style="background-color: #6366f1;" title="Indigo"></button>
                      <button class="swatch-btn" data-color="#06b6d4" style="background-color: #06b6d4;" title="Cyan"></button>
                      <button class="swatch-btn" data-color="#10b981" style="background-color: #10b981;" title="Green"></button>
                      <button class="swatch-btn" data-color="#ef4444" style="background-color: #ef4444;" title="Red"></button>
                      <button class="swatch-btn" data-color="#f59e0b" style="background-color: #f59e0b;" title="Yellow"></button>
                    </div>
                  </div>
                  
                  <div class="control-row full-width">
                    <label class="control-label">Text Horizontal Align</label>
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

            <!-- Collapsible Borders -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Border Outlines</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <div class="control-grid">
                  <div class="control-row">
                    <label class="control-label">Border Line Thickness</label>
                    <input type="text" class="control-input" data-style="borderWidth" placeholder="0px">
                  </div>
                  <div class="control-row">
                    <label class="control-label">Border Line Pattern</label>
                    <select class="control-select" data-style="borderStyle">
                      <option value="">None</option>
                      <option value="solid">Solid Line</option>
                      <option value="dashed">Dashed Line</option>
                      <option value="dotted">Dotted Line</option>
                      <option value="double">Double Line</option>
                    </select>
                  </div>
                  <div class="control-row">
                    <label class="control-label">Corner Smoothness</label>
                    <input type="text" class="control-input" data-style="borderRadius" placeholder="0px">
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

            <!-- Collapsible Appearance -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Background & Shadow Effects</h4>
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
                    <div class="color-swatches">
                      <button class="swatch-btn swatch-transparent" data-color="transparent" title="Transparent"></button>
                      <button class="swatch-btn" data-color="#ffffff" style="background-color: #ffffff;" title="White"></button>
                      <button class="swatch-btn" data-color="#0f172a" style="background-color: #0f172a;" title="Slate"></button>
                      <button class="swatch-btn" data-color="#6366f1" style="background-color: #6366f1;" title="Indigo"></button>
                      <button class="swatch-btn" data-color="#06b6d4" style="background-color: #06b6d4;" title="Cyan"></button>
                      <button class="swatch-btn" data-color="#10b981" style="background-color: #10b981;" title="Green"></button>
                      <button class="swatch-btn" data-color="#ef4444" style="background-color: #ef4444;" title="Red"></button>
                      <button class="swatch-btn" data-color="#f59e0b" style="background-color: #f59e0b;" title="Yellow"></button>
                    </div>
                  </div>
                  
                  <div class="control-row">
                    <label class="control-label">Transparency (See-Through)</label>
                    <input type="number" class="control-input" data-style="opacity" step="0.1" min="0" max="1" placeholder="1">
                  </div>
                  <div class="control-row">
                    <!-- empty -->
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">Depth Shadow & Glow</label>
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

            <!-- Collapsible Layout -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Items Positioning & Flow</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <div class="control-grid">
                  <div class="control-row full-width">
                    <label class="control-label">Display Layout Type</label>
                    <select class="control-select" data-style="display">
                      <option value="">Default</option>
                      <option value="block">Full Row (Block)</option>
                      <option value="inline-block">Shrink to Fit (Inline Block)</option>
                      <option value="flex">Flexible Box (Flexbox)</option>
                      <option value="grid">Grid Layout (Grid)</option>
                      <option value="none">Hidden (Display None)</option>
                    </select>
                  </div>
                  
                  <div class="control-row">
                    <label class="control-label">Arrange Direction</label>
                    <select class="control-select" data-style="flexDirection">
                      <option value="">Default</option>
                      <option value="row">Horizontal Row</option>
                      <option value="column">Vertical Column</option>
                    </select>
                  </div>
                  <div class="control-row">
                    <label class="control-label">Wrap Items</label>
                    <select class="control-select" data-style="flexWrap">
                      <option value="">Default</option>
                      <option value="nowrap">No Wrap (Stay on same row)</option>
                      <option value="wrap">Wrap Items to new rows</option>
                    </select>
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">Spacing Between Items (Horizontal)</label>
                    <select class="control-select" data-style="justifyContent">
                      <option value="">Default</option>
                      <option value="flex-start">Align to Start</option>
                      <option value="center">Align to Center</option>
                      <option value="flex-end">Align to End</option>
                      <option value="space-between">Space Evenly between items</option>
                      <option value="space-around">Space Evenly around items</option>
                    </select>
                  </div>

                  <div class="control-row full-width">
                    <label class="control-label">Align Items Centering (Vertical)</label>
                    <select class="control-select" data-style="alignItems">
                      <option value="">Default</option>
                      <option value="flex-start">Top Align</option>
                      <option value="center">Middle Align</option>
                      <option value="flex-end">Bottom Align</option>
                      <option value="stretch">Stretch to fill height</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <!-- Collapsible Layer Depth (z-index) (Collapsed by default) -->
            <div class="inspector-section collapsed">
              <div class="section-header">
                <h4 class="section-title">Layer Depth Placement</h4>
                <span class="section-chevron">▼</span>
              </div>
              <div class="section-body">
                <div class="layer-depth-grid">
                  <button class="depth-btn" id="depth-btn-front" title="Bring this item to the absolute front of the screen">Bring to Front</button>
                  <button class="depth-btn" id="depth-btn-forward" title="Move this item one layer forward">Bring Forward</button>
                  <button class="depth-btn" id="depth-btn-backward" title="Move this item one layer backward">Send Backward</button>
                  <button class="depth-btn" id="depth-btn-back" title="Send this item to the absolute back of the screen">Send to Back</button>
                </div>
              </div>
            </div>

          </div> <!-- End of inspector-content -->
        </div> <!-- End of tab-styles -->

        <!-- TAB 2: LAYERS TREE -->
        <div class="tab-content" id="tab-layers" style="padding: 16px 20px; overflow-y: auto;">
          <div id="layers-tree-container">
            <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px 0;">
              Select an item on the screen to view its hierarchy
            </div>
          </div>
        </div>

        <!-- Inspector Actions -->
        <div class="inspector-footer">
          <div class="btn-row">
            <button class="btn btn-secondary" id="inspector-cancel-btn">Discard</button>
            <button class="btn btn-primary" id="inspector-save-btn">Save Changes</button>
          </div>
          <button class="btn btn-danger" id="inspector-reset-btn">Reset All Edits</button>
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

    // Tab Switches
    this.shadowRoot.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.shadowRoot.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.shadowRoot.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const tabId = `tab-${btn.dataset.tab}`;
        const tabContent = this.shadowRoot.getElementById(tabId);
        if (tabContent) tabContent.classList.add('active');
        
        if (btn.dataset.tab === 'layers') {
          this.updateLayersTree();
        }
      });
    });

    // Preset Swatches Clicking
    this.shadowRoot.querySelectorAll('.swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const parentRow = btn.closest('.control-row');
        if (parentRow) {
          const colorVal = btn.dataset.color;
          const textInput = parentRow.querySelector('.color-text-input');
          const colorInput = parentRow.querySelector('.color-native-input');
          
          if (textInput) {
            textInput.value = colorVal;
            textInput.dispatchEvent(new Event('input', { bubbles: true }));
          }
          
          if (colorInput && colorVal !== 'transparent') {
            colorInput.value = colorVal;
          }
        }
      });
    });

    // Local Fonts Upload
    const fontFileInput = this.shadowRoot.getElementById('canvas-font-file-input');
    const fontFileList = this.shadowRoot.getElementById('canvas-font-file-list');
    if (fontFileInput) {
      fontFileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) {
          fontFileList.textContent = 'No files chosen';
          return;
        }
        
        fontFileList.textContent = files.map(f => f.name).join(', ');
        
        if (this.callbacks.onLocalFontUpload) {
          this.callbacks.onLocalFontUpload(files);
        }
      });
    }

    // Canvas Selection Quick Actions Toolbar click handling
    const quickToolbar = this.shadowRoot.querySelector('.canvas-quick-toolbar');
    if (quickToolbar) {
      quickToolbar.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-btn');
        if (!btn) return;
        
        const action = btn.dataset.action;
        if (this.callbacks.onQuickAction && this.selectedElement) {
          this.callbacks.onQuickAction(action, this.selectedElement);
        }
      });
    }

    // Global Font Input Trigger
    const globalFontInput = this.shadowRoot.getElementById('canvas-global-font-input');
    if (globalFontInput) {
      globalFontInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (this.callbacks.onGlobalFontChange) {
          this.callbacks.onGlobalFontChange(val);
        }
      });
    }

    // Layer Placement Depth Actions (z-index)
    const btnFront = this.shadowRoot.getElementById('depth-btn-front');
    const btnForward = this.shadowRoot.getElementById('depth-btn-forward');
    const btnBackward = this.shadowRoot.getElementById('depth-btn-backward');
    const btnBack = this.shadowRoot.getElementById('depth-btn-back');

    if (btnFront) {
      btnFront.addEventListener('click', () => {
        if (this.callbacks.onStyleChange && this.selectedElement) {
          this.callbacks.onStyleChange('position', 'relative', this.selectedElement);
          this.callbacks.onStyleChange('zIndex', '9999', this.selectedElement);
          this.showToast('Brought item to absolute front', 'success');
        }
      });
    }
    if (btnForward) {
      btnForward.addEventListener('click', () => {
        if (this.callbacks.onStyleChange && this.selectedElement) {
          const comp = window.getComputedStyle(this.selectedElement);
          const currentZ = parseInt(comp.zIndex) || 0;
          const nextZ = currentZ + 1;
          this.callbacks.onStyleChange('position', 'relative', this.selectedElement);
          this.callbacks.onStyleChange('zIndex', String(nextZ), this.selectedElement);
          this.showToast(`Brought item forward (layer depth: ${nextZ})`, 'info');
        }
      });
    }
    if (btnBackward) {
      btnBackward.addEventListener('click', () => {
        if (this.callbacks.onStyleChange && this.selectedElement) {
          const comp = window.getComputedStyle(this.selectedElement);
          const currentZ = parseInt(comp.zIndex) || 0;
          const nextZ = currentZ - 1;
          this.callbacks.onStyleChange('position', 'relative', this.selectedElement);
          this.callbacks.onStyleChange('zIndex', String(nextZ), this.selectedElement);
          this.showToast(`Sent item backward (layer depth: ${nextZ})`, 'info');
        }
      });
    }
    if (btnBack) {
      btnBack.addEventListener('click', () => {
        if (this.callbacks.onStyleChange && this.selectedElement) {
          this.callbacks.onStyleChange('position', 'relative', this.selectedElement);
          this.callbacks.onStyleChange('zIndex', '-1', this.selectedElement);
          this.showToast('Sent item to absolute back', 'danger');
        }
      });
    }

    // Code Modal OK / Close
    const closeModal = () => this.modalOverlay.classList.remove('open');
    this.shadowRoot.getElementById('modal-close-btn').addEventListener('click', closeModal);
    this.shadowRoot.getElementById('modal-ok-btn').addEventListener('click', closeModal);

    // Fade overlays on inspector hover
    this.inspector.addEventListener('mouseenter', () => {
      this.uiContainer.classList.add('canvas-inspector-hovered');
    });
    this.inspector.addEventListener('mouseleave', () => {
      this.uiContainer.classList.remove('canvas-inspector-hovered');
    });

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
        
        // Color input hex sync
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
      this.badge.querySelector('.badge-text').textContent = 'Visual Active';
    } else {
      this.badge.classList.remove('active');
      this.badge.querySelector('.badge-text').textContent = 'Visual Editor';
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

  showSelection(rect, name, el) {
    if (!rect) return;
    this.selectionOverlay.style.display = 'block';
    this.selectionOverlay.style.top = `${rect.top}px`;
    this.selectionOverlay.style.left = `${rect.left}px`;
    this.selectionOverlay.style.width = `${rect.width}px`;
    this.selectionOverlay.style.height = `${rect.height}px`;
    this.selectionOverlay.style.borderRadius = rect.borderRadius || '0px';
    
    this.selectionOverlay.querySelector('.overlay-label').textContent = name;
    this.selectionOverlay.querySelector('.dimension-label').textContent = `${Math.round(rect.originalWidth)}px × ${Math.round(rect.originalHeight)}px`;
    
    this.updateQuickPopover(el);
  }

  updateSelectionRect(rect, el) {
    if (!rect) return;
    this.selectionOverlay.style.top = `${rect.top}px`;
    this.selectionOverlay.style.left = `${rect.left}px`;
    this.selectionOverlay.style.width = `${rect.width}px`;
    this.selectionOverlay.style.height = `${rect.height}px`;
    this.selectionOverlay.style.borderRadius = rect.borderRadius || '0px';
    
    this.selectionOverlay.querySelector('.dimension-label').textContent = `${Math.round(rect.originalWidth)}px × ${Math.round(rect.originalHeight)}px`;
    
    this.updateQuickPopover(el);
  }

  hideSelection() {
    this.selectionOverlay.style.display = 'none';
    this.updateQuickPopover(null);
  }

  hideOverlays() {
    this.hideHover();
    this.hideSelection();
  }

  openInspector(elementName, currentStyles, textContent = '', elementRef = null) {
    this.selectedElement = elementRef;
    this.shadowRoot.getElementById('inspector-element-title').textContent = elementName;
    this.fillInspectorValues(currentStyles);
    
    const textContentInput = this.shadowRoot.getElementById('inspector-text-content');
    if (textContentInput) {
      textContentInput.value = textContent;
    }
    
    // Fill global font family field if body has one
    const bodySelector = 'body';
    const bodyStyles = window.canvasDraftChanges?.[bodySelector]?.styles || window.canvasSavedModifications?.[bodySelector]?.styles;
    const globalFontInput = this.shadowRoot.getElementById('canvas-global-font-input');
    if (globalFontInput) {
      globalFontInput.value = bodyStyles?.fontFamily || '';
    }
    
    this.inspector.classList.add('open');
    
    // Automatically rebuild layers tree if layers tab is active
    const activeTab = this.shadowRoot.querySelector('.tab-btn.active');
    if (activeTab && activeTab.dataset.tab === 'layers') {
      this.updateLayersTree();
    }
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
          const hex = rgbToHex(val) || '#000000';
          input.value = hex;
          input.parentElement.style.backgroundColor = val;
          
          const syncInput = this.shadowRoot.querySelector(`[data-style-sync="${prop}"]`);
          if (syncInput) syncInput.value = val;
        } else if (input.tagName === 'SELECT') {
          input.value = val;
        } else if (input.classList.contains('align-btn')) {
          if (input.dataset.val === val) {
            input.classList.add('active');
          }
        } else {
          input.value = val;
        }
      });
    });
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `canvas-toast toast-${type}`;
    
    let emoji = '⚡';
    if (type === 'success') emoji = '✅';
    if (type === 'danger') emoji = '🚨';
    if (type === 'info') emoji = 'ℹ️';
    
    toast.innerHTML = `<span>${emoji}</span> <span>${message}</span>`;
    this.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'none'; 
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        toast.style.transition = 'all 0.3s ease';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    }, 10);
  }

  updateLayersTree() {
    const container = this.shadowRoot.getElementById('layers-tree-container');
    if (!container) return;
    
    if (!this.selectedElement) {
      container.innerHTML = `<div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px 0;">
        Select an item on the screen to view its hierarchy
      </div>`;
      return;
    }
    
    container.innerHTML = '';
    
    const treeDiv = document.createElement('div');
    treeDiv.className = 'layers-tree';
    
    // 1. Parent Node
    const parent = this.selectedElement.parentElement;
    if (parent && parent !== document.body && parent !== document.documentElement) {
      treeDiv.appendChild(this.createLayerNodeElement(parent, 'parent'));
    }
    
    // 2. Sibling Nodes (including Self)
    if (parent) {
      Array.from(parent.children).forEach(sib => {
        if (sib.id === 'canvas-editor-root') return;
        
        if (sib === this.selectedElement) {
          treeDiv.appendChild(this.createLayerNodeElement(sib, 'selected'));
        } else {
          treeDiv.appendChild(this.createLayerNodeElement(sib, 'sibling'));
        }
      });
    } else {
      treeDiv.appendChild(this.createLayerNodeElement(this.selectedElement, 'selected'));
    }
    
    // 3. Children Nodes
    Array.from(this.selectedElement.children).forEach(child => {
      if (child.id === 'canvas-editor-root') return;
      treeDiv.appendChild(this.createLayerNodeElement(child, 'child'));
    });
    
    container.appendChild(treeDiv);
  }
  
  createLayerNodeElement(el, type) {
    const node = document.createElement('div');
    node.className = `layers-node ${type}-node ${type === 'selected' ? 'selected' : ''}`;
    
    const tag = el.tagName.toLowerCase();
    const className = el.className ? `.${Array.from(el.classList).join('.')}` : '';
    const cleanClassName = className.length > 18 ? className.substring(0, 18) + '...' : className;
    
    node.addEventListener('click', (e) => {
      if (e.target.closest('.node-action-btn')) return;
      if (this.callbacks.onLayerSelect) {
        this.callbacks.onLayerSelect(el);
      }
    });
    
    let roleLabel = type;
    if (type === 'selected') roleLabel = 'Active';
    
    node.innerHTML = `
      <div class="node-info">
        <span class="node-tag">${tag}</span>
        <span class="node-class" title="${className}">${cleanClassName}</span>
        <span class="node-type-label">${roleLabel}</span>
      </div>
      <div class="node-actions">
        <button class="node-action-btn toggle-visibility" title="Toggle Visibility">👁</button>
        <button class="node-action-btn delete" title="Delete Element" style="color: var(--danger-color);">🗑</button>
      </div>
    `;
    
    // Toggle Visibility
    node.querySelector('.toggle-visibility').addEventListener('click', (e) => {
      e.stopPropagation();
      const currentDisplay = el.style.display || window.getComputedStyle(el).display;
      const nextDisplay = currentDisplay === 'none' ? 'block' : 'none';
      el.style.display = nextDisplay;
      
      if (this.callbacks.onStyleChange) {
        this.callbacks.onStyleChange('display', nextDisplay, el);
      }
      
      this.showToast(`Element visibility set to ${nextDisplay}`, 'info');
      this.updateLayersTree();
    });
    
    // Delete
    node.querySelector('.delete').addEventListener('click', (e) => {
      e.stopPropagation();
      if (confirm(`Are you sure you want to delete this <${tag}> element?`)) {
        el.style.display = 'none';
        if (this.callbacks.onStyleChange) {
          this.callbacks.onStyleChange('display', 'none', el);
        }
        this.showToast(`Deleted <${tag}> element`, 'danger');
        
        if (type === 'selected' && this.callbacks.onDeselect) {
          this.callbacks.onDeselect();
        } else {
          this.updateLayersTree();
        }
      }
    });
    
    return node;
  }

  updateQuickPopover(el) {
    const popover = this.shadowRoot.getElementById('canvas-quick-popover');
    if (!popover) return;
    
    if (!el) {
      popover.style.display = 'none';
      return;
    }
    
    popover.style.display = 'flex';
    
    const tag = el.tagName.toLowerCase();
    const computed = window.getComputedStyle(el);
    
    // Determine context category
    let type = 'container';
    if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'strong', 'em', 'li'].includes(tag)) {
      type = 'text';
    } else if (tag === 'img') {
      type = 'image';
    } else if (tag === 'button' || (tag === 'a' && el.classList.contains('btn')) || el.classList.contains('button')) {
      type = 'button';
    } else if (tag === 'a') {
      type = 'link';
    }
    
    let html = '';
    
    if (type === 'text') {
      html = `
        <div class="popover-header">Quick Text Settings</div>
        <div class="popover-row">
          <label class="popover-label">Text Content</label>
          <input type="text" class="control-input popover-text-input" value="${el.textContent.trim()}" placeholder="Change text...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Text Size (Pixels)</label>
          <input type="number" class="control-input" data-style="fontSize" value="${parseInt(computed.fontSize) || 16}">
        </div>
        <div class="popover-row">
          <label class="popover-label">Text Color</label>
          <div class="color-picker-row">
            <div class="color-preview-box" style="background-color: ${computed.color};">
              <input type="color" class="color-native-input" data-style="color" value="${cssColorToHex(computed.color)}">
            </div>
            <input type="text" class="control-input color-text-input" data-style-sync="color" value="${computed.color}">
          </div>
        </div>
      `;
    } else if (type === 'image') {
      html = `
        <div class="popover-header">Quick Image Settings</div>
        <div class="popover-row">
          <label class="popover-label">Image Web URL (Src)</label>
          <input type="text" class="control-input popover-image-src" value="${el.src || ''}" placeholder="Paste URL here...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Corner Smoothness</label>
          <input type="text" class="control-input" data-style="borderRadius" value="${computed.borderRadius || '0px'}">
        </div>
      `;
    } else if (type === 'button') {
      html = `
        <div class="popover-header">Quick Button Settings</div>
        <div class="popover-row">
          <label class="popover-label">Button Label</label>
          <input type="text" class="control-input popover-text-input" value="${el.textContent.trim()}" placeholder="Change button text...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Link Destination (URL)</label>
          <input type="text" class="control-input popover-link-href" value="${el.getAttribute('href') || ''}" placeholder="e.g. /contact or https://...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Background Color</label>
          <div class="color-picker-row">
            <div class="color-preview-box" style="background-color: ${computed.backgroundColor};">
              <input type="color" class="color-native-input" data-style="backgroundColor" value="${cssColorToHex(computed.backgroundColor)}">
            </div>
            <input type="text" class="control-input color-text-input" data-style-sync="backgroundColor" value="${computed.backgroundColor}">
          </div>
        </div>
      `;
    } else if (type === 'link') {
      html = `
        <div class="popover-header">Quick Link Settings</div>
        <div class="popover-row">
          <label class="popover-label">Link Text</label>
          <input type="text" class="control-input popover-text-input" value="${el.textContent.trim()}" placeholder="Change link text...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Link Destination (URL)</label>
          <input type="text" class="control-input popover-link-href" value="${el.getAttribute('href') || ''}" placeholder="e.g. /about or https://...">
        </div>
      `;
    } else {
      // Container
      html = `
        <div class="popover-header">Quick Block Settings</div>
        <div class="popover-row">
          <label class="popover-label">Corner Smoothness</label>
          <input type="text" class="control-input" data-style="borderRadius" value="${computed.borderRadius || '0px'}">
        </div>
        <div class="popover-row">
          <label class="popover-label">Background Color</label>
          <div class="color-picker-row">
            <div class="color-preview-box" style="background-color: ${computed.backgroundColor};">
              <input type="color" class="color-native-input" data-style="backgroundColor" value="${cssColorToHex(computed.backgroundColor)}">
            </div>
            <input type="text" class="control-input color-text-input" data-style-sync="backgroundColor" value="${computed.backgroundColor}">
          </div>
        </div>
      `;
    }
    
    popover.innerHTML = html;
    
    // Bind specific popover event listeners
    const textInput = popover.querySelector('.popover-text-input');
    if (textInput) {
      textInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (el.children.length === 0) {
          el.textContent = val;
        } else {
          el.innerHTML = val;
        }
        
        const sidebarText = this.shadowRoot.getElementById('inspector-text-content');
        if (sidebarText) sidebarText.value = val;
        
        if (this.callbacks.onTextChange) {
          this.callbacks.onTextChange(val);
        }
      });
    }
    
    const hrefInput = popover.querySelector('.popover-link-href');
    if (hrefInput) {
      hrefInput.addEventListener('input', (e) => {
        const val = e.target.value;
        el.setAttribute('href', val);
        if (this.callbacks.onStyleChange) {
          this.callbacks.onStyleChange('href', val, el);
        }
      });
    }
    
    const srcInput = popover.querySelector('.popover-image-src');
    if (srcInput) {
      srcInput.addEventListener('input', (e) => {
        const val = e.target.value;
        el.src = val;
        if (this.callbacks.onStyleChange) {
          this.callbacks.onStyleChange('src', val, el);
        }
      });
    }
    
    this.cacheInputs();
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
  if (alpha === 0) return '#ffffff'; 
  
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
