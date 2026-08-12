(function(){"use strict";const L='::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:#ffffff0d}::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#fff6}:host{--primary-color: #6366f1;--primary-glow: rgba(99, 102, 241, .5);--accent-color: #06b6d4;--accent-glow: rgba(6, 182, 212, .5);--danger-color: #ef4444;--success-color: #10b981;--font-family: "Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;--bg-glass: rgba(15, 23, 42, .85);--bg-glass-hover: rgba(15, 23, 42, .92);--border-glass: rgba(255, 255, 255, .08);--text-primary: #f8fafc;--text-secondary: #94a3b8;--text-muted: #64748b;--shadow-premium: 0 8px 32px 0 rgba(0, 0, 0, .5);font-family:var(--font-family);color:var(--text-primary)}.canvas-badge{position:fixed;bottom:24px;right:24px;z-index:999999;display:flex;align-items:center;gap:10px;background:var(--bg-glass);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid var(--border-glass);padding:12px 18px;border-radius:9999px;cursor:pointer;box-shadow:var(--shadow-premium),0 0 0 1px #6366f11a;transition:all .3s cubic-bezier(.16,1,.3,1);-webkit-user-select:none;user-select:none}.canvas-badge:hover{transform:translateY(-2px);background:var(--bg-glass-hover);border-color:#6366f14d;box-shadow:var(--shadow-premium),0 0 15px 3px #6366f133}.canvas-badge:active{transform:translateY(0)}.canvas-badge .badge-icon{width:18px;height:18px;border-radius:50%;background:conic-gradient(from 0deg,var(--primary-color),var(--accent-color),var(--primary-color));animation:rotate-gradient 3s linear infinite;position:relative;display:flex;align-items:center;justify-content:center}.canvas-badge .badge-icon:after{content:"";position:absolute;width:8px;height:8px;background:#0f172a;border-radius:50%}.canvas-badge .badge-text{font-size:14px;font-weight:600;letter-spacing:.5px}.canvas-badge.active{border-color:var(--accent-color);box-shadow:var(--shadow-premium),0 0 20px 5px var(--accent-glow)}.canvas-badge.active .badge-icon{box-shadow:0 0 8px var(--accent-color)}.canvas-overlay{position:fixed;pointer-events:none;z-index:999990;display:none;box-sizing:border-box;transition:top .08s ease,left .08s ease,width .08s ease,height .08s ease,border-radius .08s ease,opacity .2s ease}.canvas-hover-overlay{border:1.5px dashed var(--primary-color);background:#6366f108;box-shadow:0 0 8px #6366f126}.canvas-selection-overlay{border:2px solid var(--accent-color);background:#06b6d403;box-shadow:0 0 15px #06b6d440;pointer-events:auto}.canvas-inspector-hovered .canvas-selection-overlay{opacity:.15}.canvas-inspector-hovered .canvas-hover-overlay{opacity:0}.overlay-label{position:absolute;top:-24px;left:0;background:var(--primary-color);color:#fff;font-size:11px;font-weight:600;padding:3px 8px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 8px #0000004d;pointer-events:none;font-family:var(--font-family)}.canvas-selection-overlay .overlay-label{background:var(--accent-color)}.dimension-label{position:absolute;bottom:-24px;right:0;background:#0f172ae6;color:var(--text-secondary);border:1px solid var(--border-glass);font-size:10px;font-weight:500;padding:2px 6px;border-radius:4px;white-space:nowrap;pointer-events:none}.resize-handle{position:absolute;width:10px;height:10px;background:var(--text-primary);border:2px solid var(--accent-color);border-radius:50%;z-index:100}.resize-handle.tl{top:-6px;left:-6px;cursor:nwse-resize}.resize-handle.tr{top:-6px;right:-6px;cursor:nesw-resize}.resize-handle.bl{bottom:-6px;left:-6px;cursor:nesw-resize}.resize-handle.br{bottom:-6px;right:-6px;cursor:nwse-resize}.resize-handle.t{top:-6px;left:calc(50% - 5px);cursor:ns-resize;width:12px;height:6px;border-radius:3px}.resize-handle.b{bottom:-6px;left:calc(50% - 5px);cursor:ns-resize;width:12px;height:6px;border-radius:3px}.resize-handle.l{left:-6px;top:calc(50% - 5px);cursor:ew-resize;height:12px;width:6px;border-radius:3px}.resize-handle.r{right:-6px;top:calc(50% - 5px);cursor:ew-resize;height:12px;width:6px;border-radius:3px}.drag-handle{position:absolute;top:0;left:0;width:100%;height:100%;cursor:move;z-index:99}.canvas-inspector{position:fixed;top:20px;width:360px;height:calc(100vh - 40px);background:var(--bg-glass);backdrop-filter:blur(25px);-webkit-backdrop-filter:blur(25px);border:1px solid var(--border-glass);border-radius:16px;box-shadow:var(--shadow-premium);z-index:999998;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;transition:transform .4s cubic-bezier(.16,1,.3,1),opacity .3s}.canvas-inspector.dock-right{right:20px;left:auto;transform:translate(420px)}.canvas-inspector.dock-right.open{transform:translate(0)}.canvas-inspector.dock-left{left:20px;right:auto;transform:translate(-420px)}.canvas-inspector.dock-left.open{transform:translate(0)}.inspector-header{padding:18px 20px;border-bottom:1px solid var(--border-glass);display:flex;justify-content:space-between;align-items:center;box-sizing:border-box}.inspector-title{margin:0;font-size:16px;font-weight:700;letter-spacing:-.5px;background:linear-gradient(to right,var(--text-primary),var(--text-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inspector-action-btn{background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:all .2s}.inspector-action-btn:hover{background:#ffffff0d;color:var(--text-primary)}.inspector-close{background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:all .2s}.inspector-close:hover{background:#ffffff0d;color:var(--text-primary)}.inspector-content{flex:1;overflow-y:auto;overflow-x:hidden;padding:16px 20px;display:flex;flex-direction:column;gap:16px;box-sizing:border-box}.inspector-section{display:flex;flex-direction:column;border-bottom:1px solid rgba(255,255,255,.05);padding-bottom:14px}.inspector-section:last-child{border-bottom:none;padding-bottom:0}.section-header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;padding:6px 0}.section-header:hover .section-title{color:var(--text-primary)}.section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--text-muted);transition:color .2s;margin:0}.section-chevron{font-size:10px;color:var(--text-muted);transition:transform .3s cubic-bezier(.16,1,.3,1)}.inspector-section.collapsed .section-chevron{transform:rotate(-90deg)}.section-body{display:flex;flex-direction:column;gap:12px;margin-top:10px;max-height:1200px;opacity:1;overflow:hidden;box-sizing:border-box;transition:max-height .4s cubic-bezier(.16,1,.3,1),opacity .25s,margin-top .3s}.inspector-section.collapsed .section-body{max-height:0;opacity:0;margin-top:0;pointer-events:none}.control-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;width:100%;box-sizing:border-box}.control-row{display:flex;flex-direction:column;gap:6px;box-sizing:border-box}.control-row.full-width{grid-column:span 2}.control-label{font-size:11px;font-weight:600;color:var(--text-secondary);display:flex;align-items:center}.info-icon{font-size:9px;color:var(--text-muted);cursor:help;margin-left:6px;display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;border:1px solid rgba(255,255,255,.15);font-style:normal;line-height:1;transition:all .2s;-webkit-user-select:none;user-select:none}.info-icon:hover{color:var(--accent-color);border-color:var(--accent-color);background:#06b6d40f;box-shadow:0 0 4px var(--accent-glow)}.canvas-tooltip{position:fixed;background:#0f172af2;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;font-size:11.5px;line-height:1.45;color:#e2e8f0;box-shadow:var(--shadow-premium),0 0 0 1px #ffffff0d;z-index:1000002;pointer-events:none;max-width:250px;opacity:0;transform:translateY(5px);transition:opacity .2s ease,transform .2s ease;font-family:var(--font-family);box-sizing:border-box}.canvas-tooltip.show{opacity:1;transform:translateY(0)}.tooltip-example{display:block;margin-top:6px;padding:4px 6px;background:#00000059;border-radius:4px;font-family:monospace;font-size:10px;color:var(--accent-color);border-left:2px solid var(--accent-color)}.control-input,.control-select{background:#ffffff0a;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 10px;font-family:var(--font-family);font-size:12.5px;color:var(--text-primary);outline:none;transition:all .2s;box-sizing:border-box;width:100%}.control-select option{background-color:#0f172a;color:var(--text-primary)}.control-input:focus,.control-select:focus{border-color:var(--primary-color);box-shadow:0 0 0 2px var(--primary-glow);background:#ffffff12}textarea.control-input{resize:vertical;min-height:50px;width:100%;box-sizing:border-box}.color-picker-row{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box}.color-preview-box{width:32px;height:32px;border-radius:6px;border:1.5px solid rgba(255,255,255,.1);cursor:pointer;position:relative;overflow:hidden;flex-shrink:0}.color-native-input{position:absolute;top:-10px;left:-10px;width:60px;height:60px;cursor:pointer;opacity:0}.color-text-input{flex:1;min-width:0}.align-buttons{display:flex;gap:5px;width:100%}.align-btn{flex:1;background:#ffffff0a;border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:8px 4px;color:var(--text-secondary);font-size:12px;cursor:pointer;transition:all .2s}.align-btn:hover{background:#ffffff14;color:var(--text-primary)}.align-btn.active{background:var(--primary-color);border-color:var(--primary-color);color:#fff}.flex-control-row{display:flex;flex-direction:column;gap:8px;box-sizing:border-box;width:100%}.inspector-footer{padding:16px 20px;border-top:1px solid var(--border-glass);display:flex;flex-direction:column;gap:10px;box-sizing:border-box;width:100%;flex-shrink:0}.btn-row{display:flex;gap:10px;width:100%;box-sizing:border-box}.btn{flex:1;padding:10px 14px;font-family:var(--font-family);font-size:13px;font-weight:600;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;border:none;box-sizing:border-box}.btn-primary{background:var(--primary-color);color:#fff}.btn-primary:hover{background:#4f46e5;box-shadow:0 0 10px #6366f166}.btn-secondary{background:#ffffff0f;color:var(--text-primary);border:1px solid var(--border-glass)}.btn-secondary:hover{background:#ffffff1a}.btn-danger{background:transparent;color:var(--danger-color);border:1px solid rgba(239,68,68,.2);width:100%;margin-top:2px}.btn-danger:hover{background:#ef44441a}.canvas-modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0f172a99;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:1000000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}.canvas-modal-overlay.open{opacity:1;pointer-events:auto}.canvas-modal{background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:16px;box-shadow:var(--shadow-premium);width:90%;max-width:500px;overflow:hidden;transform:scale(.95);transition:transform .3s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column}.canvas-modal-overlay.open .canvas-modal{transform:scale(1)}.modal-header{padding:18px 24px;border-bottom:1px solid var(--border-glass);display:flex;justify-content:space-between;align-items:center}.modal-title{margin:0;font-size:16px;font-weight:700}.modal-body{padding:24px;display:flex;flex-direction:column;gap:16px}.modal-desc{font-size:13px;color:var(--text-secondary);line-height:1.5}.code-container{background:#0000004d;border:1px solid var(--border-glass);border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:var(--accent-color);max-height:200px;overflow-y:auto;white-space:pre-wrap;-webkit-user-select:all;user-select:all}.modal-footer{padding:18px 24px;border-top:1px solid var(--border-glass);display:flex;justify-content:flex-end;gap:10px}.canvas-toast-container{position:fixed;bottom:24px;left:24px;z-index:1000001;display:flex;flex-direction:column;gap:10px}.canvas-toast{background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:8px;padding:12px 20px;font-size:13px;font-weight:600;box-shadow:var(--shadow-premium);display:flex;align-items:center;gap:10px;transform:translateY(20px);opacity:0;animation:slide-in .3s forwards cubic-bezier(.16,1,.3,1)}.canvas-toast.toast-success{border-left:3px solid var(--success-color)}.canvas-toast.toast-danger{border-left:3px solid var(--danger-color)}.canvas-toast.toast-info{border-left:3px solid var(--primary-color)}@keyframes rotate-gradient{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes slide-in{to{transform:translateY(0);opacity:1}}';class z{constructor(e={}){this.callbacks=e,this.root=null,this.shadowRoot=null,this.badge=null,this.hoverOverlay=null,this.selectionOverlay=null,this.inspector=null,this.modalOverlay=null,this.toastContainer=null,this.tooltip=null,this.inputs={},this.init()}init(){this.root=document.createElement("div"),this.root.id="canvas-editor-root",document.body.appendChild(this.root),this.shadowRoot=this.root.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=L,this.shadowRoot.appendChild(e),this.uiContainer=document.createElement("div"),this.uiContainer.innerHTML=this.getHTMLTemplate(),this.shadowRoot.appendChild(this.uiContainer),this.badge=this.shadowRoot.querySelector(".canvas-badge"),this.hoverOverlay=this.shadowRoot.querySelector(".canvas-hover-overlay"),this.selectionOverlay=this.shadowRoot.querySelector(".canvas-selection-overlay"),this.inspector=this.shadowRoot.querySelector(".canvas-inspector"),this.modalOverlay=this.shadowRoot.querySelector(".canvas-modal-overlay"),this.toastContainer=this.shadowRoot.querySelector(".canvas-toast-container");const t=localStorage.getItem("canvas_inspector_dock")||"dock-right";this.inspector.classList.add(t),this.tooltip=document.createElement("div"),this.tooltip.className="canvas-tooltip",this.shadowRoot.appendChild(this.tooltip),this.cacheInputs(),this.bindEvents()}getHTMLTemplate(){return`
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
                  <label class="control-label">
                    Font Family
                    <span class="info-icon" data-tip="Sets font type. Example: Inter, Georgia, sans-serif." data-example="Montserrat">ⓘ</span>
                  </label>
                  <input type="text" class="control-input" data-style="fontFamily" placeholder="Inherited / e.g. Inter">
                </div>

                <div class="control-row full-width">
                  <label class="control-label">
                    Load Custom Font
                    <span class="info-icon" data-tip="Type a Google Font name or paste stylesheet URL to load it dynamically." data-example="Montserrat">ⓘ</span>
                  </label>
                  <div style="display: flex; gap: 8px; width: 100%; box-sizing: border-box;">
                    <input type="text" class="control-input" id="canvas-font-import-url" placeholder="e.g. Montserrat or Google CSS Link" style="flex: 1; min-width: 0;">
                    <button class="btn btn-secondary" id="canvas-font-import-btn" style="padding: 0 12px; font-size: 11px; flex-shrink: 0; width: auto; height: 34px; margin: 0; border-radius: 8px;">Load</button>
                  </div>
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
    `}cacheInputs(){this.shadowRoot.querySelectorAll("[data-style]").forEach(e=>{const t=e.dataset.style;this.inputs[t]||(this.inputs[t]=[]),this.inputs[t].push(e)})}bindEvents(){this.badge.addEventListener("click",()=>{this.callbacks.onToggleActive&&this.callbacks.onToggleActive()}),this.shadowRoot.getElementById("inspector-dock-btn").addEventListener("click",()=>{this.inspector.classList.contains("dock-right")?(this.inspector.classList.remove("dock-right"),this.inspector.classList.add("dock-left"),localStorage.setItem("canvas_inspector_dock","dock-left")):(this.inspector.classList.remove("dock-left"),this.inspector.classList.add("dock-right"),localStorage.setItem("canvas_inspector_dock","dock-right")),this.showToast("Sidebar docked "+(this.inspector.classList.contains("dock-right")?"right":"left"),"info")}),this.shadowRoot.querySelectorAll(".section-header").forEach(n=>{n.addEventListener("click",()=>{n.parentElement.classList.toggle("collapsed")})}),this.shadowRoot.getElementById("inspector-close-btn").addEventListener("click",()=>{this.closeInspector()}),this.shadowRoot.getElementById("inspector-save-btn").addEventListener("click",()=>{this.callbacks.onSave&&this.callbacks.onSave()}),this.shadowRoot.getElementById("inspector-cancel-btn").addEventListener("click",()=>{this.callbacks.onCancel&&this.callbacks.onCancel()}),this.shadowRoot.getElementById("inspector-reset-btn").addEventListener("click",()=>{confirm("Are you sure you want to clear ALL visual edits you made to this page?")&&this.callbacks.onReset&&this.callbacks.onReset()}),this.inspector.addEventListener("mouseenter",()=>{this.uiContainer.classList.add("canvas-inspector-hovered")}),this.inspector.addEventListener("mouseleave",()=>{this.uiContainer.classList.remove("canvas-inspector-hovered")});const t=this.shadowRoot.getElementById("canvas-font-import-btn"),o=this.shadowRoot.getElementById("canvas-font-import-url");t.addEventListener("click",()=>{const n=o.value.trim();n&&this.callbacks.onFontImport&&this.callbacks.onFontImport(n)}),o.addEventListener("keydown",n=>{n.key==="Enter"&&(n.preventDefault(),t.click())});const s=()=>this.modalOverlay.classList.remove("open");this.shadowRoot.getElementById("modal-close-btn").addEventListener("click",s),this.shadowRoot.getElementById("modal-ok-btn").addEventListener("click",s),this.shadowRoot.addEventListener("input",n=>{const l=n.target;if(l.dataset.style){const r=l.dataset.style;let c=l.value;if(l.type==="number"&&c!==""&&r!=="opacity"&&r!=="zIndex"&&(c=`${c}px`),l.type==="color"){const d=this.shadowRoot.querySelector(`[data-style-sync="${r}"]`);d&&(d.value=c),l.parentElement.style.backgroundColor=c}this.triggerStyleChange(r,c)}if(l.dataset.styleSync){const r=l.dataset.styleSync,c=l.value,d=this.shadowRoot.querySelector(`input[type="color"][data-style="${r}"]`);if(d){const p=R(c);d.value=p,d.parentElement.style.backgroundColor=c}this.triggerStyleChange(r,c)}}),this.shadowRoot.getElementById("inspector-text-content").addEventListener("input",n=>{this.callbacks.onTextChange&&this.callbacks.onTextChange(n.target.value)}),this.shadowRoot.querySelectorAll(".align-btn").forEach(n=>{n.addEventListener("click",l=>{const r=l.currentTarget,c=r.dataset.style,d=r.dataset.val;r.parentElement.querySelectorAll(".align-btn").forEach(p=>p.classList.remove("active")),r.classList.add("active"),this.triggerStyleChange(c,d)})}),this.shadowRoot.querySelectorAll(".info-icon").forEach(n=>{const l=()=>{const c=n.dataset.tip,d=n.dataset.example;let p=c;d&&(p+=`<span class="tooltip-example">Example: ${d}</span>`),this.tooltip.innerHTML=p,this.tooltip.classList.add("show");const u=n.getBoundingClientRect(),y=this.tooltip.getBoundingClientRect(),S=u.top-y.height-8,$=u.left+u.width/2-y.width/2,B=Math.max(10,Math.min(window.innerWidth-y.width-10,$)),A=S<10?u.bottom+8:S;this.tooltip.style.top=`${A}px`,this.tooltip.style.left=`${B}px`},r=()=>{this.tooltip.classList.remove("show")};n.addEventListener("mouseenter",l),n.addEventListener("mouseleave",r),n.addEventListener("focus",l),n.addEventListener("blur",r)})}triggerStyleChange(e,t){this.callbacks.onStyleChange&&this.callbacks.onStyleChange(e,t)}setBadgeState(e){e?(this.badge.classList.add("active"),this.badge.querySelector(".badge-text").textContent="Canvas Active"):(this.badge.classList.remove("active"),this.badge.querySelector(".badge-text").textContent="Canvas Mode",this.closeInspector(),this.hideOverlays())}showHover(e,t){e&&(this.hoverOverlay.style.display="block",this.hoverOverlay.style.top=`${e.top}px`,this.hoverOverlay.style.left=`${e.left}px`,this.hoverOverlay.style.width=`${e.width}px`,this.hoverOverlay.style.height=`${e.height}px`,this.hoverOverlay.style.borderRadius=e.borderRadius||"0px",this.hoverOverlay.querySelector(".overlay-label").textContent=t)}hideHover(){this.hoverOverlay.style.display="none"}showSelection(e,t){e&&(this.selectionOverlay.style.display="block",this.selectionOverlay.style.top=`${e.top}px`,this.selectionOverlay.style.left=`${e.left}px`,this.selectionOverlay.style.width=`${e.width}px`,this.selectionOverlay.style.height=`${e.height}px`,this.selectionOverlay.style.borderRadius=e.borderRadius||"0px",this.selectionOverlay.querySelector(".overlay-label").textContent=t,this.selectionOverlay.querySelector(".dimension-label").textContent=`${Math.round(e.originalWidth)}px × ${Math.round(e.originalHeight)}px`)}updateSelectionRect(e){e&&(this.selectionOverlay.style.top=`${e.top}px`,this.selectionOverlay.style.left=`${e.left}px`,this.selectionOverlay.style.width=`${e.width}px`,this.selectionOverlay.style.height=`${e.height}px`,this.selectionOverlay.style.borderRadius=e.borderRadius||"0px",this.selectionOverlay.querySelector(".dimension-label").textContent=`${Math.round(e.originalWidth)}px × ${Math.round(e.originalHeight)}px`)}hideSelection(){this.selectionOverlay.style.display="none"}hideOverlays(){this.hideHover(),this.hideSelection()}openInspector(e,t,o=""){this.shadowRoot.getElementById("inspector-element-title").textContent=e,this.fillInspectorValues(t);const s=this.shadowRoot.getElementById("inspector-text-content");s&&(s.value=o),this.inspector.classList.add("open")}closeInspector(){this.inspector.classList.remove("open")}fillInspectorValues(e){Object.values(this.inputs).flat().forEach(t=>{t.type==="color"?(t.value="#000000",t.parentElement.style.backgroundColor="transparent"):(t.tagName,t.value="")}),this.shadowRoot.querySelectorAll("[data-style-sync]").forEach(t=>t.value=""),this.shadowRoot.querySelectorAll(".align-btn").forEach(t=>t.classList.remove("active")),Object.entries(e).forEach(([t,o])=>{const s=this.inputs[t];if(s&&(s.forEach(i=>{if(i.type==="number")i.value=parseFloat(o)||"";else if(i.type==="color"){const n=m(o)||"#000000";i.value=n,i.parentElement.style.backgroundColor=o;const l=this.shadowRoot.querySelector(`[data-style-sync="${t}"]`);l&&(l.value=o)}else i.tagName==="SELECT"?i.value=o:i.classList.contains("align-btn")?i.dataset.val===o&&i.classList.add("active"):i.value=o}),t==="textAlign")){const i=this.shadowRoot.querySelector(`.align-btn[data-val="${o}"]`);i&&i.classList.add("active")}})}showCodeExport(e){const t=this.shadowRoot.getElementById("modal-css-code");t.textContent=e,this.modalOverlay.classList.add("open")}showToast(e,t="info"){const o=document.createElement("div");o.className=`canvas-toast toast-${t}`,o.textContent=e,this.toastContainer.appendChild(o),setTimeout(()=>{o.style.animation="none",o.style.opacity="1",o.style.transform="translateY(0)",setTimeout(()=>{o.style.transition="all 0.3s ease",o.style.opacity="0",o.style.transform="translateY(20px)",setTimeout(()=>o.remove(),300)},2500)},10)}}function m(a){if(!a)return null;if(a.startsWith("#"))return a;if(a==="transparent")return"#ffffff";const e=a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);if(!e)return null;if((e[4]!==void 0?parseFloat(e[4]):1)===0)return"#ffffff";const o=parseInt(e[1]).toString(16).padStart(2,"0"),s=parseInt(e[2]).toString(16).padStart(2,"0"),i=parseInt(e[3]).toString(16).padStart(2,"0");return`#${o}${s}${i}`}function R(a){if(!a||a==="transparent")return"#ffffff";const e=document.createElement("div");e.style.color=a,document.body.appendChild(e);const t=window.getComputedStyle(e).color;return document.body.removeChild(e),m(t)||"#ffffff"}function T(a){if(!(a instanceof Element))return"";if(a.id)return`#${CSS.escape(a.id)}`;const e=[];let t=a;for(;t&&t.nodeType===Node.ELEMENT_NODE;){let o=t.nodeName.toLowerCase();if(o==="html"||o==="body"){e.unshift(o);break}if(t.classList&&t.classList.length>0){const l=Array.from(t.classList).map(r=>CSS.escape(r)).join(".");l&&(o+="."+l)}let s=t,i=1;for(;s=s.previousElementSibling;)s.nodeName===t.nodeName&&i++;let n=!1;for(s=t;s=s.nextElementSibling;)if(s.nodeName===t.nodeName){n=!0;break}(i>1||n)&&(o+=`:nth-of-type(${i})`),e.unshift(o),t=t.parentNode}return e.join(" > ")}function I(a){return a.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}const f="canvas_saved_modifications",v=new Map;function b(){return window.location.origin+window.location.pathname}function g(){try{const a=localStorage.getItem(f);return a?JSON.parse(a):{}}catch(a){return console.error("Canvas: Failed to parse saved modifications",a),{}}}function h(){return g()[b()]||{}}function w(a){const e=g();e[b()]=a,localStorage.setItem(f,JSON.stringify(e))}function E(a){if(!a||(!a.startsWith("http")&&!a.startsWith("//")&&(a=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(a.trim())}:wght@300;400;500;600;700;900&display=swap`),document.querySelector(`link[href="${a}"]`)))return;const e=document.createElement("link");e.rel="stylesheet",e.href=a,document.head.appendChild(e)}function C(a,e=!1){Object.entries(a).forEach(([t,o])=>{if(t==="__fontImports")return;const s=document.querySelector(t);if(s){if(!v.has(t)){const i={};o.styles&&Object.keys(o.styles).forEach(n=>{i[n]=s.style[n]||""}),v.set(t,{styles:i,text:s.innerHTML,display:s.style.display||""})}o.styles&&Object.entries(o.styles).forEach(([i,n])=>{s.style[i]=n}),o.text!==void 0&&o.text!==null&&(s.children.length===0?s.textContent=o.text:s.innerHTML=o.text)}})}function k(a){Object.keys(a).forEach(e=>{if(e==="__fontImports")return;const t=document.querySelector(e),o=v.get(e);t&&o&&(o.styles&&Object.entries(o.styles).forEach(([s,i])=>{t.style[s]=i}),o.text!==void 0&&(t.innerHTML=o.text)),v.delete(e)})}function M(){const a=h();a.__fontImports&&Array.isArray(a.__fontImports)&&a.__fontImports.forEach(e=>{try{E(e)}catch(t){console.error("Canvas: Failed to inject font URL",e,t)}}),C(a,!1)}function O(){const a=h();k(a);const e=g();delete e[b()],localStorage.setItem(f,JSON.stringify(e))}class D{constructor(){this.active=!1,this.selectedElement=null,this.selectedSelector="",this._originalOverflow="",this.draftChanges={},this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseClick=this.handleMouseClick.bind(this),this.handleDragStart=this.handleDragStart.bind(this),this.handleDragMove=this.handleDragMove.bind(this),this.handleDragEnd=this.handleDragEnd.bind(this),this.handleResizeStart=this.handleResizeStart.bind(this),this.handleResizeMove=this.handleResizeMove.bind(this),this.handleResizeEnd=this.handleResizeEnd.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this),this.handleTextChange=this.handleTextChange.bind(this),this.handleFontImport=this.handleFontImport.bind(this),this.dragState={isDragging:!1,startX:0,startY:0,startLeft:0,startTop:0},this.resizeState={isResizing:!1,handle:"",startX:0,startY:0,startWidth:0,startHeight:0,startLeft:0,startTop:0},this.ui=new z({onToggleActive:()=>this.toggleActive(),onStyleChange:(e,t)=>this.handleStyleChange(e,t),onTextChange:e=>this.handleTextChange(e),onFontImport:e=>this.handleFontImport(e),onSave:()=>this.saveChanges(),onCancel:()=>this.cancelChanges(),onReset:()=>this.resetAllChanges()}),this.setupGlobalEvents()}setupGlobalEvents(){window.addEventListener("keydown",e=>{this.active&&e.key==="Escape"&&(this.selectedElement?(this.selectedElement.contentEditable==="true"&&this.selectedElement.blur(),this.deselectElement()):this.toggleActive())}),window.addEventListener("resize",()=>{this.active&&this.repositionOverlays()})}toggleActive(){this.active=!this.active,this.ui.setBadgeState(this.active),this.active?(this.ui.showToast("Canvas activated. Click elements to edit!","info"),document.body.style.cursor="crosshair",this.addPageListeners()):(this.ui.showToast("Canvas deactivated.","info"),document.body.style.cursor="",this.deselectElement(),this.removePageListeners())}addPageListeners(){document.addEventListener("mousemove",this.handleMouseMove,!0),document.addEventListener("click",this.handleMouseClick,!0),document.addEventListener("dblclick",this.handleDoubleClick,!0),this.ui.selectionOverlay.querySelector('[data-action="drag"]').addEventListener("mousedown",this.handleDragStart),this.ui.selectionOverlay.querySelectorAll(".resize-handle").forEach(t=>{t.addEventListener("mousedown",this.handleResizeStart)})}removePageListeners(){document.removeEventListener("mousemove",this.handleMouseMove,!0),document.removeEventListener("click",this.handleMouseClick,!0),document.removeEventListener("dblclick",this.handleDoubleClick,!0)}isEditorElement(e){return e===this.ui.root||this.ui.root.contains(e)}calculateOverlayRect(e){const t=e.getBoundingClientRect(),o=window.getComputedStyle(e),s=6;let i=parseFloat(o.borderRadius)||0;return{top:t.top-s,left:t.left-s,width:t.width+s*2,height:t.height+s*2,borderRadius:`${i+s}px`,originalWidth:t.width,originalHeight:t.height}}handleMouseMove(e){if(!this.active||this.dragState.isDragging||this.resizeState.isResizing||this.isEditorElement(e.target))return;const t=e.target,o=`${t.tagName.toLowerCase()}${t.classList.length?"."+Array.from(t.classList).join("."):""}`,s=this.calculateOverlayRect(t);this.ui.showHover(s,o)}handleMouseClick(e){this.active&&(this.isEditorElement(e.target)||(e.preventDefault(),e.stopPropagation(),this.selectElement(e.target)))}selectElement(e){if(this.selectedElement===e)return;this.deselectElement(),this.selectedElement=e,this.selectedSelector=T(e),this._originalOverflow=document.documentElement.style.overflow,document.documentElement.style.overflow="hidden";const t=this.calculateOverlayRect(e),o=`${e.tagName.toLowerCase()}${e.id?"#"+e.id:""}`;this.ui.showSelection(t,o);const s=window.getComputedStyle(e),i={marginTop:s.marginTop,marginRight:s.marginRight,marginBottom:s.marginBottom,marginLeft:s.marginLeft,paddingTop:s.paddingTop,paddingRight:s.paddingRight,paddingBottom:s.paddingBottom,paddingLeft:s.paddingLeft,width:e.style.width||s.width,height:e.style.height||s.height,fontSize:s.fontSize,fontWeight:s.fontWeight,lineHeight:s.lineHeight,letterSpacing:s.letterSpacing,fontStyle:s.fontStyle,color:s.color,textAlign:s.textAlign,display:s.display,zIndex:s.zIndex==="auto"?"":s.zIndex,flexDirection:s.flexDirection,justifyContent:s.justifyContent,alignItems:s.alignItems,flexWrap:s.flexWrap,borderWidth:s.borderWidth,borderStyle:s.borderStyle,borderColor:s.borderColor,backgroundColor:s.backgroundColor,borderRadius:s.borderRadius,opacity:s.opacity,boxShadow:e.style.boxShadow||""},n=e.children.length===0?e.textContent.trim():e.innerHTML.trim();this.ui.openInspector(o,i,n)}deselectElement(){this.selectedElement&&(this.selectedElement.contentEditable==="true"&&this.selectedElement.blur(),this._originalOverflow!==void 0?document.documentElement.style.overflow=this._originalOverflow:document.documentElement.style.overflow="",this.selectedElement=null,this.selectedSelector=""),this.ui.hideSelection(),this.ui.closeInspector()}repositionOverlays(){if(!this.selectedElement)return;const e=this.calculateOverlayRect(this.selectedElement);this.ui.updateSelectionRect(e)}handleDoubleClick(e){if(!this.active||this.isEditorElement(e.target))return;e.preventDefault(),e.stopPropagation();const t=e.target;this.selectElement(t),t.contentEditable="true",t.focus();const o=document.createRange();o.selectNodeContents(t),o.collapse(!1);const s=window.getSelection();s.removeAllRanges(),s.addRange(o),t.style.outline="2px dashed var(--accent-color)";const i=()=>{t.contentEditable="false",t.style.outline="";const l=t.innerHTML;this.recordTextChange(this.selectedSelector,l),this.repositionOverlays();const r=this.ui.shadowRoot.getElementById("inspector-text-content");r&&(r.value=t.children.length===0?t.textContent.trim():t.innerHTML.trim()),t.removeEventListener("blur",i),t.removeEventListener("keydown",n)},n=l=>{var r,c;if(l.key==="Escape"){const d=(r=this.draftChanges[this.selectedSelector])==null?void 0:r.text;if(d!==void 0)t.innerHTML=d;else{const p=(c=h()[this.selectedSelector])==null?void 0:c.text;p!==void 0&&(t.innerHTML=p)}t.blur()}else l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),t.blur())};t.addEventListener("blur",i),t.addEventListener("keydown",n)}recordTextChange(e,t){this.draftChanges[e]||(this.draftChanges[e]={styles:{},text:""}),this.draftChanges[e].text=t,C(this.draftChanges,!0)}handleTextChange(e){this.selectedElement&&(this.selectedElement.children.length===0?this.selectedElement.textContent=e:this.selectedElement.innerHTML=e,this.recordTextChange(this.selectedSelector,e),this.repositionOverlays())}handleFontImport(e){if(e)try{E(e);let t=e.trim();if(e.includes("family=")){const n=e.match(/family=([^&:]+)/);n&&(t=decodeURIComponent(n[1].split(":")[0].replace(/\+/g," ")))}this.handleStyleChange("fontFamily",t);const o=h();o.__fontImports||(o.__fontImports=[]),o.__fontImports.includes(e)||(o.__fontImports.push(e),w(o));const s=this.ui.shadowRoot.querySelector('input[data-style="fontFamily"]');s&&(s.value=t);const i=this.ui.shadowRoot.getElementById("canvas-font-import-url");i&&(i.value=""),this.ui.showToast(`Font "${t}" loaded and applied successfully!`,"success")}catch(t){console.error("Canvas: Failed to import font",t),this.ui.showToast("Failed to load custom font.","danger")}}handleDragStart(e){if(!this.active||!this.selectedElement)return;e.preventDefault();const t=this.selectedElement,o=window.getComputedStyle(t);o.position==="static"&&(t.style.position="relative",this.recordStyleChange("position","relative")),this._originalTransition=t.style.transition||"",t.style.setProperty("transition","none","important"),this.dragState={isDragging:!0,startX:e.clientX,startY:e.clientY,startLeft:parseFloat(o.left)||0,startTop:parseFloat(o.top)||0},document.addEventListener("mousemove",this.handleDragMove),document.addEventListener("mouseup",this.handleDragEnd)}handleDragMove(e){if(!this.dragState.isDragging||!this.selectedElement)return;const t=e.clientX-this.dragState.startX,o=e.clientY-this.dragState.startY,s=this.dragState.startLeft+t,i=this.dragState.startTop+o;this.selectedElement.style.left=`${s}px`,this.selectedElement.style.top=`${i}px`,this.recordStyleChange("left",`${s}px`),this.recordStyleChange("top",`${i}px`),this.repositionOverlays()}handleDragEnd(){this.dragState.isDragging=!1,this.selectedElement&&(this.selectedElement.style.transition=this._originalTransition),document.removeEventListener("mousemove",this.handleDragMove),document.removeEventListener("mouseup",this.handleDragEnd)}handleResizeStart(e){if(!this.active||!this.selectedElement)return;e.preventDefault(),e.stopPropagation();const t=this.selectedElement,o=window.getComputedStyle(t),s=t.getBoundingClientRect();this._originalTransition=t.style.transition||"",t.style.setProperty("transition","none","important"),this.resizeState={isResizing:!0,handle:e.target.dataset.handle,startX:e.clientX,startY:e.clientY,startWidth:s.width,startHeight:s.height,startLeft:parseFloat(o.left)||0,startTop:parseFloat(o.top)||0},document.addEventListener("mousemove",this.handleResizeMove),document.addEventListener("mouseup",this.handleResizeEnd)}handleResizeMove(e){if(!this.resizeState.isResizing||!this.selectedElement)return;const t=this.selectedElement,o=this.resizeState,s=e.clientX-o.startX,i=e.clientY-o.startY;let n=o.startWidth,l=o.startHeight,r=o.startLeft,c=o.startTop;const d=10;if(o.handle.includes("r")&&(n=Math.max(d,o.startWidth+s)),o.handle.includes("b")&&(l=Math.max(d,o.startHeight+i)),o.handle.includes("l")){const p=o.startWidth-s;p>d&&(n=p,r=o.startLeft+s)}if(o.handle.includes("t")){const p=o.startHeight-i;p>d&&(l=p,c=o.startTop+i)}(o.handle.includes("r")||o.handle.includes("l"))&&(t.style.width=`${n}px`,this.recordStyleChange("width",`${n}px`)),(o.handle.includes("b")||o.handle.includes("t"))&&(t.style.height=`${l}px`,this.recordStyleChange("height",`${l}px`)),o.handle.includes("l")&&(t.style.left=`${r}px`,this.recordStyleChange("left",`${r}px`)),o.handle.includes("t")&&(t.style.top=`${c}px`,this.recordStyleChange("top",`${c}px`)),this.repositionOverlays()}handleResizeEnd(){this.resizeState.isResizing=!1,this.selectedElement&&(this.selectedElement.style.transition=this._originalTransition),document.removeEventListener("mousemove",this.handleResizeMove),document.removeEventListener("mouseup",this.handleResizeEnd)}handleStyleChange(e,t){this.selectedElement&&(this.selectedElement.style[e]=t,this.recordStyleChange(e,t),this.repositionOverlays())}recordStyleChange(e,t){const o=this.selectedSelector;o&&(this.draftChanges[o]||(this.draftChanges[o]={styles:{},text:void 0}),this.draftChanges[o].styles||(this.draftChanges[o].styles={}),this.draftChanges[o].styles[e]=t)}saveChanges(){const e=h();Object.entries(this.draftChanges).forEach(([o,s])=>{e[o]||(e[o]={styles:{},text:void 0}),s.styles&&(e[o].styles={...e[o].styles,...s.styles}),s.text!==void 0&&(e[o].text=s.text)}),w(e),this.draftChanges={};const t=this.generateCSSExport(e);this.ui.showToast("All modifications saved successfully!","success"),this.ui.showCodeExport(t)}cancelChanges(){k(this.draftChanges),this.draftChanges={},this.ui.showToast("Changes discarded.","info"),this.deselectElement()}resetAllChanges(){O(),this.draftChanges={},this.ui.showToast("All visual overrides reset.","danger"),this.deselectElement()}generateCSSExport(e){let t="";return Object.entries(e).forEach(([o,s])=>{const i=s.styles||{},n=Object.keys(i);n.length>0&&(t+=`${o} {
`,n.forEach(l=>{const r=I(l);t+=`  ${r}: ${i[l]};
`}),t+=`}

`)}),t||"/* No style edits generated */"}}try{M()}catch(a){console.error("Canvas: Failed to initialize saved modifications",a)}function x(){if(!window.__CanvasEditor){if(!document.body){window.addEventListener("DOMContentLoaded",x);return}try{window.__CanvasEditor=new D,console.log("Canvas Visual Editor initialized successfully!")}catch(a){console.error("Canvas: Failed to initialize editor",a)}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",x):x()})();
