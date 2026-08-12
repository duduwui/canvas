(function(){"use strict";const m='::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:#ffffff0d}::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#fff6}:host{--primary-color: #6366f1;--primary-glow: rgba(99, 102, 241, .5);--accent-color: #06b6d4;--accent-glow: rgba(6, 182, 212, .5);--danger-color: #ef4444;--success-color: #10b981;--font-family: "Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;--bg-glass: rgba(15, 23, 42, .75);--bg-glass-hover: rgba(15, 23, 42, .85);--border-glass: rgba(255, 255, 255, .08);--text-primary: #f8fafc;--text-secondary: #94a3b8;--text-muted: #64748b;--shadow-premium: 0 8px 32px 0 rgba(0, 0, 0, .5);font-family:var(--font-family);color:var(--text-primary)}.canvas-badge{position:fixed;bottom:24px;right:24px;z-index:999999;display:flex;align-items:center;gap:10px;background:var(--bg-glass);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid var(--border-glass);padding:12px 18px;border-radius:9999px;cursor:pointer;box-shadow:var(--shadow-premium),0 0 0 1px #6366f11a;transition:all .3s cubic-bezier(.16,1,.3,1);-webkit-user-select:none;user-select:none}.canvas-badge:hover{transform:translateY(-2px);background:var(--bg-glass-hover);border-color:#6366f14d;box-shadow:var(--shadow-premium),0 0 15px 3px #6366f133}.canvas-badge:active{transform:translateY(0)}.canvas-badge .badge-icon{width:18px;height:18px;border-radius:50%;background:conic-gradient(from 0deg,var(--primary-color),var(--accent-color),var(--primary-color));animation:rotate-gradient 3s linear infinite;position:relative;display:flex;align-items:center;justify-content:center}.canvas-badge .badge-icon:after{content:"";position:absolute;width:8px;height:8px;background:#0f172a;border-radius:50%}.canvas-badge .badge-text{font-size:14px;font-weight:600;letter-spacing:.5px}.canvas-badge.active{border-color:var(--accent-color);box-shadow:var(--shadow-premium),0 0 20px 5px var(--accent-glow)}.canvas-badge.active .badge-icon{box-shadow:0 0 8px var(--accent-color)}.canvas-overlay{position:fixed;pointer-events:none;z-index:999990;display:none;box-sizing:border-box;transition:top .1s ease,left .1s ease,width .1s ease,height .1s ease}.canvas-hover-overlay{border:1.5px dashed var(--primary-color);background:#6366f10d;box-shadow:0 0 8px #6366f133}.canvas-selection-overlay{border:2px solid var(--accent-color);background:#06b6d405;box-shadow:0 0 15px #06b6d440;pointer-events:auto}.overlay-label{position:absolute;top:-24px;left:0;background:var(--primary-color);color:#fff;font-size:11px;font-weight:600;padding:3px 8px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 8px #0000004d;pointer-events:none;font-family:var(--font-family)}.canvas-selection-overlay .overlay-label{background:var(--accent-color)}.dimension-label{position:absolute;bottom:-24px;right:0;background:#0f172ae6;color:var(--text-secondary);border:1px solid var(--border-glass);font-size:10px;font-weight:500;padding:2px 6px;border-radius:4px;white-space:nowrap;pointer-events:none}.resize-handle{position:absolute;width:10px;height:10px;background:var(--text-primary);border:2px solid var(--accent-color);border-radius:50%;z-index:100}.resize-handle.tl{top:-6px;left:-6px;cursor:nwse-resize}.resize-handle.tr{top:-6px;right:-6px;cursor:nesw-resize}.resize-handle.bl{bottom:-6px;left:-6px;cursor:nesw-resize}.resize-handle.br{bottom:-6px;right:-6px;cursor:nwse-resize}.resize-handle.t{top:-6px;left:calc(50% - 5px);cursor:ns-resize;width:12px;height:6px;border-radius:3px}.resize-handle.b{bottom:-6px;left:calc(50% - 5px);cursor:ns-resize;width:12px;height:6px;border-radius:3px}.resize-handle.l{left:-6px;top:calc(50% - 5px);cursor:ew-resize;height:12px;width:6px;border-radius:3px}.resize-handle.r{right:-6px;top:calc(50% - 5px);cursor:ew-resize;height:12px;width:6px;border-radius:3px}.drag-handle{position:absolute;top:0;left:0;width:100%;height:100%;cursor:move;z-index:99}.canvas-inspector{position:fixed;top:20px;right:-360px;width:320px;height:calc(100vh - 40px);background:var(--bg-glass);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid var(--border-glass);border-radius:16px;box-shadow:var(--shadow-premium);z-index:999998;display:flex;flex-direction:column;overflow:hidden;transition:right .4s cubic-bezier(.16,1,.3,1)}.canvas-inspector.open{right:20px}.inspector-header{padding:20px;border-bottom:1px solid var(--border-glass);display:flex;justify-content:space-between;align-items:center}.inspector-title{margin:0;font-size:18px;font-weight:700;letter-spacing:-.5px;background:linear-gradient(to right,var(--text-primary),var(--text-secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent}.inspector-close{background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:all .2s}.inspector-close:hover{background:#ffffff0d;color:var(--text-primary)}.inspector-content{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:20px}.inspector-section{display:flex;flex-direction:column;gap:12px}.section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:4px}.control-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.control-row{display:flex;flex-direction:column;gap:6px}.control-row.full-width{grid-column:span 2}.control-label{font-size:11px;font-weight:500;color:var(--text-secondary)}.control-input,.control-select{background:#ffffff0a;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:8px 12px;font-family:var(--font-family);font-size:13px;color:var(--text-primary);outline:none;transition:all .2s}.control-input:focus,.control-select:focus{border-color:var(--primary-color);box-shadow:0 0 0 2px var(--primary-glow);background:#ffffff12}.color-picker-row{display:flex;align-items:center;gap:10px}.color-preview-box{width:32px;height:32px;border-radius:6px;border:1.5px solid rgba(255,255,255,.1);cursor:pointer;position:relative;overflow:hidden}.color-native-input{position:absolute;top:-10px;left:-10px;width:60px;height:60px;cursor:pointer;opacity:0}.color-text-input{flex:1}.align-buttons{display:flex;gap:5px}.align-btn{flex:1;background:#ffffff0a;border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:6px;color:var(--text-secondary);font-size:12px;cursor:pointer;transition:all .2s}.align-btn:hover{background:#ffffff14;color:var(--text-primary)}.align-btn.active{background:var(--primary-color);border-color:var(--primary-color);color:#fff}.inspector-footer{padding:20px;border-top:1px solid var(--border-glass);display:flex;flex-direction:column;gap:10px}.btn-row{display:flex;gap:10px}.btn{flex:1;padding:10px 16px;font-family:var(--font-family);font-size:13px;font-weight:600;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;border:none}.btn-primary{background:var(--primary-color);color:#fff}.btn-primary:hover{background:#4f46e5;box-shadow:0 0 10px #6366f166}.btn-secondary{background:#ffffff0f;color:var(--text-primary);border:1px solid var(--border-glass)}.btn-secondary:hover{background:#ffffff1a}.btn-danger{background:transparent;color:var(--danger-color);border:1px solid rgba(239,68,68,.2)}.btn-danger:hover{background:#ef44441a}.canvas-modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0f172a99;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:1000000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}.canvas-modal-overlay.open{opacity:1;pointer-events:auto}.canvas-modal{background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:16px;box-shadow:var(--shadow-premium);width:90%;max-width:500px;overflow:hidden;transform:scale(.95);transition:transform .3s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column}.canvas-modal-overlay.open .canvas-modal{transform:scale(1)}.modal-header{padding:18px 24px;border-bottom:1px solid var(--border-glass);display:flex;justify-content:space-between;align-items:center}.modal-title{margin:0;font-size:16px;font-weight:700}.modal-body{padding:24px;display:flex;flex-direction:column;gap:16px}.modal-desc{font-size:13px;color:var(--text-secondary);line-height:1.5}.code-container{background:#0000004d;border:1px solid var(--border-glass);border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:var(--accent-color);max-height:200px;overflow-y:auto;white-space:pre-wrap;-webkit-user-select:all;user-select:all}.modal-footer{padding:18px 24px;border-top:1px solid var(--border-glass);display:flex;justify-content:flex-end;gap:10px}.canvas-toast-container{position:fixed;bottom:24px;left:24px;z-index:1000001;display:flex;flex-direction:column;gap:10px}.canvas-toast{background:var(--bg-glass);border:1px solid var(--border-glass);border-radius:8px;padding:12px 20px;font-size:13px;font-weight:600;box-shadow:var(--shadow-premium);display:flex;align-items:center;gap:10px;transform:translateY(20px);opacity:0;animation:slide-in .3s forwards cubic-bezier(.16,1,.3,1)}.canvas-toast.toast-success{border-left:3px solid var(--success-color)}.canvas-toast.toast-danger{border-left:3px solid var(--danger-color)}.canvas-toast.toast-info{border-left:3px solid var(--primary-color)}@keyframes rotate-gradient{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes slide-in{to{transform:translateY(0);opacity:1}}';class w{constructor(e={}){this.callbacks=e,this.root=null,this.shadowRoot=null,this.badge=null,this.hoverOverlay=null,this.selectionOverlay=null,this.inspector=null,this.modalOverlay=null,this.toastContainer=null,this.inputs={},this.init()}init(){this.root=document.createElement("div"),this.root.id="canvas-editor-root",document.body.appendChild(this.root),this.shadowRoot=this.root.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=m,this.shadowRoot.appendChild(e);const t=document.createElement("div");t.innerHTML=this.getHTMLTemplate(),this.shadowRoot.appendChild(t),this.badge=this.shadowRoot.querySelector(".canvas-badge"),this.hoverOverlay=this.shadowRoot.querySelector(".canvas-hover-overlay"),this.selectionOverlay=this.shadowRoot.querySelector(".canvas-selection-overlay"),this.inspector=this.shadowRoot.querySelector(".canvas-inspector"),this.modalOverlay=this.shadowRoot.querySelector(".canvas-modal-overlay"),this.toastContainer=this.shadowRoot.querySelector(".canvas-toast-container"),this.bindEvents(),this.cacheInputs()}getHTMLTemplate(){return`
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
          <button class="inspector-close" id="inspector-close-btn">×</button>
        </div>
        
        <div class="inspector-content">
          <!-- Spacing -->
          <div class="inspector-section">
            <div class="section-title">Spacing (px)</div>
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
          
          <!-- Dimensions -->
          <div class="inspector-section">
            <div class="section-title">Dimensions</div>
            <div class="control-grid">
              <div class="control-row">
                <label class="control-label">Width (px/%)</label>
                <input type="text" class="control-input" data-style="width" placeholder="auto">
              </div>
              <div class="control-row">
                <label class="control-label">Height (px/%)</label>
                <input type="text" class="control-input" data-style="height" placeholder="auto">
              </div>
            </div>
          </div>

          <!-- Typography -->
          <div class="inspector-section">
            <div class="section-title">Typography</div>
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

          <!-- Appearance -->
          <div class="inspector-section">
            <div class="section-title">Appearance</div>
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
                <label class="control-label">Border Radius (px)</label>
                <input type="number" class="control-input" data-style="borderRadius" placeholder="0">
              </div>
              <div class="control-row">
                <label class="control-label">Opacity (0-1)</label>
                <input type="number" class="control-input" data-style="opacity" step="0.1" min="0" max="1" placeholder="1">
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
    `}cacheInputs(){this.shadowRoot.querySelectorAll("[data-style]").forEach(e=>{const t=e.dataset.style;this.inputs[t]||(this.inputs[t]=[]),this.inputs[t].push(e)})}bindEvents(){this.badge.addEventListener("click",()=>{this.callbacks.onToggleActive&&this.callbacks.onToggleActive()}),this.shadowRoot.getElementById("inspector-close-btn").addEventListener("click",()=>{this.closeInspector()}),this.shadowRoot.getElementById("inspector-save-btn").addEventListener("click",()=>{this.callbacks.onSave&&this.callbacks.onSave()}),this.shadowRoot.getElementById("inspector-cancel-btn").addEventListener("click",()=>{this.callbacks.onCancel&&this.callbacks.onCancel()}),this.shadowRoot.getElementById("inspector-reset-btn").addEventListener("click",()=>{confirm("Are you sure you want to clear ALL visual edits you made to this page?")&&this.callbacks.onReset&&this.callbacks.onReset()});const e=()=>this.modalOverlay.classList.remove("open");this.shadowRoot.getElementById("modal-close-btn").addEventListener("click",e),this.shadowRoot.getElementById("modal-ok-btn").addEventListener("click",e),this.shadowRoot.addEventListener("input",t=>{const s=t.target;if(s.dataset.style){const a=s.dataset.style;let o=s.value;if(s.type==="number"&&o!==""&&a!=="opacity"&&(o=`${o}px`),s.type==="color"){const n=this.shadowRoot.querySelector(`[data-style-sync="${a}"]`);n&&(n.value=o),s.parentElement.style.backgroundColor=o}this.triggerStyleChange(a,o)}if(s.dataset.styleSync){const a=s.dataset.styleSync,o=s.value,n=this.shadowRoot.querySelector(`input[type="color"][data-style="${a}"]`);n&&/^#[0-9A-F]{6}$/i.test(o)&&(n.value=o,n.parentElement.style.backgroundColor=o),this.triggerStyleChange(a,o)}}),this.shadowRoot.querySelectorAll(".align-btn").forEach(t=>{t.addEventListener("click",s=>{const a=s.currentTarget,o=a.dataset.style,n=a.dataset.val;a.parentElement.querySelectorAll(".align-btn").forEach(l=>l.classList.remove("active")),a.classList.add("active"),this.triggerStyleChange(o,n)})})}triggerStyleChange(e,t){this.callbacks.onStyleChange&&this.callbacks.onStyleChange(e,t)}setBadgeState(e){e?(this.badge.classList.add("active"),this.badge.querySelector(".badge-text").textContent="Canvas Active"):(this.badge.classList.remove("active"),this.badge.querySelector(".badge-text").textContent="Canvas Mode",this.closeInspector(),this.hideOverlays())}showHover(e,t){e&&(this.hoverOverlay.style.display="block",this.hoverOverlay.style.top=`${e.top}px`,this.hoverOverlay.style.left=`${e.left}px`,this.hoverOverlay.style.width=`${e.width}px`,this.hoverOverlay.style.height=`${e.height}px`,this.hoverOverlay.querySelector(".overlay-label").textContent=t)}hideHover(){this.hoverOverlay.style.display="none"}showSelection(e,t){e&&(this.selectionOverlay.style.display="block",this.selectionOverlay.style.top=`${e.top}px`,this.selectionOverlay.style.left=`${e.left}px`,this.selectionOverlay.style.width=`${e.width}px`,this.selectionOverlay.style.height=`${e.height}px`,this.selectionOverlay.querySelector(".overlay-label").textContent=t,this.selectionOverlay.querySelector(".dimension-label").textContent=`${Math.round(e.width)}px × ${Math.round(e.height)}px`)}updateSelectionRect(e){e&&(this.selectionOverlay.style.top=`${e.top}px`,this.selectionOverlay.style.left=`${e.left}px`,this.selectionOverlay.style.width=`${e.width}px`,this.selectionOverlay.style.height=`${e.height}px`,this.selectionOverlay.querySelector(".dimension-label").textContent=`${Math.round(e.width)}px × ${Math.round(e.height)}px`)}hideSelection(){this.selectionOverlay.style.display="none"}hideOverlays(){this.hideHover(),this.hideSelection()}openInspector(e,t){this.shadowRoot.getElementById("inspector-element-title").textContent=e,this.fillInspectorValues(t),this.inspector.classList.add("open")}closeInspector(){this.inspector.classList.remove("open")}fillInspectorValues(e){Object.values(this.inputs).flat().forEach(t=>{t.type==="color"?(t.value="#000000",t.parentElement.style.backgroundColor="transparent"):(t.tagName,t.value="")}),this.shadowRoot.querySelectorAll("[data-style-sync]").forEach(t=>t.value=""),this.shadowRoot.querySelectorAll(".align-btn").forEach(t=>t.classList.remove("active")),Object.entries(e).forEach(([t,s])=>{const a=this.inputs[t];if(a&&(a.forEach(o=>{if(o.type==="number")o.value=parseFloat(s)||"";else if(o.type==="color"){const n=E(s)||"#000000";o.value=n,o.parentElement.style.backgroundColor=n;const l=this.shadowRoot.querySelector(`[data-style-sync="${t}"]`);l&&(l.value=s)}else o.tagName==="SELECT"?o.value=s:o.classList.contains("align-btn")?o.dataset.val===s&&o.classList.add("active"):o.value=s}),t==="textAlign")){const o=this.shadowRoot.querySelector(`.align-btn[data-val="${s}"]`);o&&o.classList.add("active")}})}showCodeExport(e){const t=this.shadowRoot.getElementById("modal-css-code");t.textContent=e,this.modalOverlay.classList.add("open")}showToast(e,t="info"){const s=document.createElement("div");s.className=`canvas-toast toast-${t}`,s.textContent=e,this.toastContainer.appendChild(s),setTimeout(()=>{s.style.animation="none",s.style.opacity="1",s.style.transform="translateY(0)",setTimeout(()=>{s.style.transition="all 0.3s ease",s.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>s.remove(),300)},2500)},10)}}function E(i){if(!i)return null;if(i.startsWith("#"))return i;const e=i.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);if(!e)return null;const t=parseInt(e[1]).toString(16).padStart(2,"0"),s=parseInt(e[2]).toString(16).padStart(2,"0"),a=parseInt(e[3]).toString(16).padStart(2,"0");return`#${t}${s}${a}`}function S(i){if(!(i instanceof Element))return"";if(i.id)return`#${CSS.escape(i.id)}`;const e=[];let t=i;for(;t&&t.nodeType===Node.ELEMENT_NODE;){let s=t.nodeName.toLowerCase();if(s==="html"||s==="body"){e.unshift(s);break}if(t.classList&&t.classList.length>0){const l=Array.from(t.classList).map(r=>CSS.escape(r)).join(".");l&&(s+="."+l)}let a=t,o=1;for(;a=a.previousElementSibling;)a.nodeName===t.nodeName&&o++;let n=!1;for(a=t;a=a.nextElementSibling;)if(a.nodeName===t.nodeName){n=!0;break}(o>1||n)&&(s+=`:nth-of-type(${o})`),e.unshift(s),t=t.parentNode}return e.join(" > ")}function C(i){return i.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}const g="canvas_saved_modifications",p=new Map;function u(){return window.location.origin+window.location.pathname}function f(){try{const i=localStorage.getItem(g);return i?JSON.parse(i):{}}catch(i){return console.error("Canvas: Failed to parse saved modifications",i),{}}}function v(){return f()[u()]||{}}function k(i){const e=f();e[u()]=i,localStorage.setItem(g,JSON.stringify(e))}function y(i,e=!1){Object.entries(i).forEach(([t,s])=>{const a=document.querySelector(t);if(a){if(!p.has(t)){const o={};s.styles&&Object.keys(s.styles).forEach(n=>{o[n]=a.style[n]||""}),p.set(t,{styles:o,text:a.innerHTML,display:a.style.display||""})}s.styles&&Object.entries(s.styles).forEach(([o,n])=>{a.style[o]=n}),s.text!==void 0&&s.text!==null&&(a.children.length===0?a.textContent=s.text:a.innerHTML=s.text)}})}function x(i){Object.keys(i).forEach(e=>{const t=document.querySelector(e),s=p.get(e);t&&s&&(s.styles&&Object.entries(s.styles).forEach(([a,o])=>{t.style[a]=o}),s.text!==void 0&&(t.innerHTML=s.text)),p.delete(e)})}function L(){const i=v();y(i,!1)}function z(){const i=v();x(i);const e=f();delete e[u()],localStorage.setItem(g,JSON.stringify(e))}class R{constructor(){this.active=!1,this.selectedElement=null,this.selectedSelector="",this.draftChanges={},this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseClick=this.handleMouseClick.bind(this),this.handleDragStart=this.handleDragStart.bind(this),this.handleDragMove=this.handleDragMove.bind(this),this.handleDragEnd=this.handleDragEnd.bind(this),this.handleResizeStart=this.handleResizeStart.bind(this),this.handleResizeMove=this.handleResizeMove.bind(this),this.handleResizeEnd=this.handleResizeEnd.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this),this.dragState={isDragging:!1,startX:0,startY:0,startLeft:0,startTop:0},this.resizeState={isResizing:!1,handle:"",startX:0,startY:0,startWidth:0,startHeight:0,startLeft:0,startTop:0},this.ui=new w({onToggleActive:()=>this.toggleActive(),onStyleChange:(e,t)=>this.handleStyleChange(e,t),onSave:()=>this.saveChanges(),onCancel:()=>this.cancelChanges(),onReset:()=>this.resetAllChanges()}),this.setupGlobalEvents()}setupGlobalEvents(){window.addEventListener("keydown",e=>{this.active&&e.key==="Escape"&&(this.selectedElement?(this.selectedElement.contentEditable==="true"&&this.selectedElement.blur(),this.deselectElement()):this.toggleActive())}),window.addEventListener("resize",()=>{this.active&&this.repositionOverlays()})}toggleActive(){this.active=!this.active,this.ui.setBadgeState(this.active),this.active?(this.ui.showToast("Canvas activated. Click elements to edit!","info"),document.body.style.cursor="crosshair",this.addPageListeners()):(this.ui.showToast("Canvas deactivated.","info"),document.body.style.cursor="",this.deselectElement(),this.removePageListeners())}addPageListeners(){document.addEventListener("mousemove",this.handleMouseMove,!0),document.addEventListener("click",this.handleMouseClick,!0),document.addEventListener("dblclick",this.handleDoubleClick,!0),this.ui.selectionOverlay.querySelector('[data-action="drag"]').addEventListener("mousedown",this.handleDragStart),this.ui.selectionOverlay.querySelectorAll(".resize-handle").forEach(t=>{t.addEventListener("mousedown",this.handleResizeStart)})}removePageListeners(){document.removeEventListener("mousemove",this.handleMouseMove,!0),document.removeEventListener("click",this.handleMouseClick,!0),document.removeEventListener("dblclick",this.handleDoubleClick,!0)}isEditorElement(e){return e===this.ui.root||this.ui.root.contains(e)}handleMouseMove(e){if(!this.active||this.dragState.isDragging||this.resizeState.isResizing||this.isEditorElement(e.target))return;const t=e.target,s=t.getBoundingClientRect(),a=`${t.tagName.toLowerCase()}${t.classList.length?"."+Array.from(t.classList).join("."):""}`,o={top:s.top,left:s.left,width:s.width,height:s.height};this.ui.showHover(o,a)}handleMouseClick(e){this.active&&(this.isEditorElement(e.target)||(e.preventDefault(),e.stopPropagation(),this.selectElement(e.target)))}selectElement(e){if(this.selectedElement===e)return;this.deselectElement(),this.selectedElement=e,this.selectedSelector=S(e);const t=e.getBoundingClientRect(),s=`${e.tagName.toLowerCase()}${e.id?"#"+e.id:""}`;this.ui.showSelection(t,s);const a=window.getComputedStyle(e),o={marginTop:a.marginTop,marginRight:a.marginRight,marginBottom:a.marginBottom,marginLeft:a.marginLeft,paddingTop:a.paddingTop,paddingRight:a.paddingRight,paddingBottom:a.paddingBottom,paddingLeft:a.paddingLeft,width:e.style.width||a.width,height:e.style.height||a.height,fontSize:a.fontSize,fontWeight:a.fontWeight,color:a.color,textAlign:a.textAlign,backgroundColor:a.backgroundColor,borderRadius:a.borderRadius,opacity:a.opacity,boxShadow:e.style.boxShadow||""};this.ui.openInspector(s,o)}deselectElement(){this.selectedElement&&(this.selectedElement.contentEditable==="true"&&this.selectedElement.blur(),this.selectedElement=null,this.selectedSelector=""),this.ui.hideSelection(),this.ui.closeInspector()}repositionOverlays(){if(!this.selectedElement)return;const e=this.selectedElement.getBoundingClientRect();this.ui.updateSelectionRect(e)}handleDoubleClick(e){if(!this.active||this.isEditorElement(e.target))return;e.preventDefault(),e.stopPropagation();const t=e.target;this.selectElement(t),t.contentEditable="true",t.focus();const s=document.createRange();s.selectNodeContents(t),s.collapse(!1);const a=window.getSelection();a.removeAllRanges(),a.addRange(s),t.style.outline="2px dashed var(--accent-color)";const o=()=>{t.contentEditable="false",t.style.outline="";const l=t.innerHTML;this.recordTextChange(this.selectedSelector,l),this.repositionOverlays(),t.removeEventListener("blur",o),t.removeEventListener("keydown",n)},n=l=>{var r,h;if(l.key==="Escape"){const c=(r=this.draftChanges[this.selectedSelector])==null?void 0:r.text;if(c!==void 0)t.innerHTML=c;else{const d=(h=v()[this.selectedSelector])==null?void 0:h.text;d!==void 0&&(t.innerHTML=d)}t.blur()}else l.key==="Enter"&&!l.shiftKey&&(l.preventDefault(),t.blur())};t.addEventListener("blur",o),t.addEventListener("keydown",n)}recordTextChange(e,t){this.draftChanges[e]||(this.draftChanges[e]={styles:{},text:""}),this.draftChanges[e].text=t,y(this.draftChanges,!0)}handleDragStart(e){if(!this.active||!this.selectedElement)return;e.preventDefault();const t=this.selectedElement,s=window.getComputedStyle(t);s.position==="static"&&(t.style.position="relative",this.recordStyleChange("position","relative")),this.dragState={isDragging:!0,startX:e.clientX,startY:e.clientY,startLeft:parseFloat(s.left)||0,startTop:parseFloat(s.top)||0},document.addEventListener("mousemove",this.handleDragMove),document.addEventListener("mouseup",this.handleDragEnd)}handleDragMove(e){if(!this.dragState.isDragging||!this.selectedElement)return;const t=e.clientX-this.dragState.startX,s=e.clientY-this.dragState.startY,a=this.dragState.startLeft+t,o=this.dragState.startTop+s;this.selectedElement.style.left=`${a}px`,this.selectedElement.style.top=`${o}px`,this.recordStyleChange("left",`${a}px`),this.recordStyleChange("top",`${o}px`),this.repositionOverlays()}handleDragEnd(){this.dragState.isDragging=!1,document.removeEventListener("mousemove",this.handleDragMove),document.removeEventListener("mouseup",this.handleDragEnd)}handleResizeStart(e){if(!this.active||!this.selectedElement)return;e.preventDefault(),e.stopPropagation();const t=this.selectedElement,s=window.getComputedStyle(t),a=t.getBoundingClientRect();this.resizeState={isResizing:!0,handle:e.target.dataset.handle,startX:e.clientX,startY:e.clientY,startWidth:a.width,startHeight:a.height,startLeft:parseFloat(s.left)||0,startTop:parseFloat(s.top)||0},document.addEventListener("mousemove",this.handleResizeMove),document.addEventListener("mouseup",this.handleResizeEnd)}handleResizeMove(e){if(!this.resizeState.isResizing||!this.selectedElement)return;const t=this.selectedElement,s=this.resizeState,a=e.clientX-s.startX,o=e.clientY-s.startY;let n=s.startWidth,l=s.startHeight,r=s.startLeft,h=s.startTop;const c=10;if(s.handle.includes("r")&&(n=Math.max(c,s.startWidth+a)),s.handle.includes("b")&&(l=Math.max(c,s.startHeight+o)),s.handle.includes("l")){const d=s.startWidth-a;d>c&&(n=d,r=s.startLeft+a)}if(s.handle.includes("t")){const d=s.startHeight-o;d>c&&(l=d,h=s.startTop+o)}(s.handle.includes("r")||s.handle.includes("l"))&&(t.style.width=`${n}px`,this.recordStyleChange("width",`${n}px`)),(s.handle.includes("b")||s.handle.includes("t"))&&(t.style.height=`${l}px`,this.recordStyleChange("height",`${l}px`)),s.handle.includes("l")&&(t.style.left=`${r}px`,this.recordStyleChange("left",`${r}px`)),s.handle.includes("t")&&(t.style.top=`${h}px`,this.recordStyleChange("top",`${h}px`)),this.repositionOverlays()}handleResizeEnd(){this.resizeState.isResizing=!1,document.removeEventListener("mousemove",this.handleResizeMove),document.removeEventListener("mouseup",this.handleResizeEnd)}handleStyleChange(e,t){this.selectedElement&&(this.selectedElement.style[e]=t,this.recordStyleChange(e,t),this.repositionOverlays())}recordStyleChange(e,t){const s=this.selectedSelector;s&&(this.draftChanges[s]||(this.draftChanges[s]={styles:{},text:void 0}),this.draftChanges[s].styles||(this.draftChanges[s].styles={}),this.draftChanges[s].styles[e]=t)}saveChanges(){const e=v();Object.entries(this.draftChanges).forEach(([s,a])=>{e[s]||(e[s]={styles:{},text:void 0}),a.styles&&(e[s].styles={...e[s].styles,...a.styles}),a.text!==void 0&&(e[s].text=a.text)}),k(e),this.draftChanges={};const t=this.generateCSSExport(e);this.ui.showToast("All modifications saved successfully!","success"),this.ui.showCodeExport(t)}cancelChanges(){x(this.draftChanges),this.draftChanges={},this.ui.showToast("Changes discarded.","info"),this.deselectElement()}resetAllChanges(){z(),this.draftChanges={},this.ui.showToast("All visual overrides reset.","danger"),this.deselectElement()}generateCSSExport(e){let t="";return Object.entries(e).forEach(([s,a])=>{const o=a.styles||{},n=Object.keys(o);n.length>0&&(t+=`${s} {
`,n.forEach(l=>{const r=C(l);t+=`  ${r}: ${o[l]};
`}),t+=`}

`)}),t||"/* No style edits generated */"}}try{L()}catch(i){console.error("Canvas: Failed to initialize saved modifications",i)}function b(){if(!window.__CanvasEditor){if(!document.body){window.addEventListener("DOMContentLoaded",b);return}try{window.__CanvasEditor=new R,console.log("Canvas Visual Editor initialized successfully!")}catch(i){console.error("Canvas: Failed to initialize editor",i)}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",b):b()})();
