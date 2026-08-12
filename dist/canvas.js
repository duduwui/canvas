(function(){"use strict";const F='::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:#ffffff0d}::-webkit-scrollbar-thumb{background:#fff3;border-radius:4px}::-webkit-scrollbar-thumb:hover{background:#fff6}:host{--primary-color: #6366f1;--primary-glow: rgba(99, 102, 241, .4);--accent-color: #06b6d4;--accent-glow: rgba(6, 182, 212, .4);--danger-color: #ef4444;--success-color: #10b981;--font-family: "Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;--bg-glass: rgba(255, 255, 255, .08);--bg-glass-hover: rgba(255, 255, 255, .12);--border-glass: rgba(255, 255, 255, .15);--text-primary: #ffffff;--text-secondary: #f1f5f9;--text-muted: #cbd5e1;--shadow-premium: 0 8px 32px 0 rgba(0, 0, 0, .25), inset 0 0 0 1px rgba(255, 255, 255, .05);font-family:var(--font-family);color:var(--text-primary)}.canvas-badge{position:fixed;bottom:24px;right:24px;z-index:999999;display:flex;align-items:center;gap:10px;background:#0f172acc;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid var(--border-glass);padding:12px 18px;border-radius:9999px;cursor:pointer;box-shadow:var(--shadow-premium),0 0 0 1px #6366f11a;transition:all .3s cubic-bezier(.16,1,.3,1);-webkit-user-select:none;user-select:none}.canvas-badge:hover{transform:translateY(-2px);background:#0f172ae6;border-color:#6366f14d;box-shadow:var(--shadow-premium),0 0 15px 3px #6366f133}.canvas-badge:active{transform:translateY(0)}.canvas-badge .badge-icon{width:18px;height:18px;border-radius:50%;background:conic-gradient(from 0deg,var(--primary-color),var(--accent-color),var(--primary-color));animation:rotate-gradient 3s linear infinite;position:relative;display:flex;align-items:center;justify-content:center}.canvas-badge .badge-icon:after{content:"";position:absolute;width:8px;height:8px;background:#0f172a;border-radius:50%}.canvas-badge .badge-text{font-size:14px;font-weight:600;letter-spacing:.5px;color:#fff}.canvas-badge.active{border-color:var(--accent-color);box-shadow:var(--shadow-premium),0 0 20px 5px var(--accent-glow)}.canvas-badge.active .badge-icon{box-shadow:0 0 8px var(--accent-color)}.canvas-overlay{position:fixed;pointer-events:none;z-index:999990;display:none;box-sizing:border-box;transition:top .08s ease,left .08s ease,width .08s ease,height .08s ease,border-radius .08s ease,opacity .2s ease}.canvas-hover-overlay{border:1.5px dashed var(--primary-color);background:#6366f108;box-shadow:0 0 8px #6366f126}.canvas-selection-overlay{border:2px solid var(--accent-color);background:#06b6d403;box-shadow:0 0 15px #06b6d440;pointer-events:none}.overlay-label{position:absolute;top:-24px;left:0;background:var(--primary-color);color:#fff;font-size:11px;font-weight:600;padding:3px 8px;border-radius:4px;white-space:nowrap;box-shadow:0 2px 8px #0000004d;pointer-events:auto;cursor:move;font-family:var(--font-family);-webkit-user-select:none;user-select:none}.canvas-selection-overlay .overlay-label{background:var(--accent-color)}.dimension-label{position:absolute;bottom:-24px;right:0;background:#0f172ae6;color:var(--text-secondary);border:1px solid var(--border-glass);font-size:10px;font-weight:500;padding:2px 6px;border-radius:4px;white-space:nowrap;pointer-events:none}.canvas-inspector-hovered .canvas-selection-overlay{opacity:.15}.canvas-inspector-hovered .canvas-hover-overlay{opacity:0}.resize-handle{position:absolute;width:10px;height:10px;background:var(--text-primary);border:2px solid var(--accent-color);border-radius:50%;z-index:100;pointer-events:auto}.resize-handle.tl{top:-6px;left:-6px;cursor:nwse-resize}.resize-handle.tr{top:-6px;right:-6px;cursor:nesw-resize}.resize-handle.bl{bottom:-6px;left:-6px;cursor:nesw-resize}.resize-handle.br{bottom:-6px;right:-6px;cursor:nwse-resize}.resize-handle.t{top:-6px;left:calc(50% - 5px);cursor:ns-resize;width:12px;height:6px;border-radius:3px}.resize-handle.b{bottom:-6px;left:calc(50% - 5px);cursor:ns-resize;width:12px;height:6px;border-radius:3px}.resize-handle.l{left:-6px;top:calc(50% - 5px);cursor:ew-resize;height:12px;width:6px;border-radius:3px}.resize-handle.r{right:-6px;top:calc(50% - 5px);cursor:ew-resize;height:12px;width:6px;border-radius:3px}.drag-handle{display:none}.canvas-quick-toolbar{position:absolute;top:-38px;right:0;display:flex;gap:4px;background:#0f172ad9;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.12);border-radius:6px;padding:4px;box-shadow:var(--shadow-premium);pointer-events:auto;z-index:100000}.canvas-quick-toolbar .quick-btn{background:transparent;border:none;color:var(--text-secondary);font-size:11px;font-weight:600;padding:4px 8px;border-radius:4px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:all .2s;font-family:var(--font-family)}.canvas-quick-toolbar .quick-btn:hover{background:#ffffff1a;color:var(--accent-color)}.canvas-quick-toolbar .quick-btn:active{transform:translateY(1px)}.canvas-inspector{position:fixed;top:20px;width:360px;height:calc(100vh - 40px);background:var(--bg-glass);backdrop-filter:blur(35px) saturate(180%);-webkit-backdrop-filter:blur(35px) saturate(180%);border:1px solid var(--border-glass);border-radius:16px;box-shadow:var(--shadow-premium);z-index:999998;display:flex;flex-direction:column;overflow:hidden;box-sizing:border-box;transition:transform .4s cubic-bezier(.16,1,.3,1),opacity .3s}.canvas-inspector.dock-right{right:20px;left:auto;transform:translate(420px)}.canvas-inspector.dock-right.open{transform:translate(0)}.canvas-inspector.dock-left{left:20px;right:auto;transform:translate(-420px)}.canvas-inspector.dock-left.open{transform:translate(0)}.inspector-header{padding:18px 20px;border-bottom:1px solid var(--border-glass);display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;flex-shrink:0}.inspector-title{margin:0;font-size:16px;font-weight:700;letter-spacing:-.5px;color:var(--text-primary);max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.inspector-action-btn{background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:all .2s}.inspector-action-btn:hover{background:#ffffff14;color:var(--text-primary)}.inspector-close{background:transparent;border:none;color:var(--text-secondary);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:50%;transition:all .2s}.inspector-close:hover{background:#ffffff14;color:var(--text-primary)}.inspector-tabs{display:flex;background:#0003;border-bottom:1px solid var(--border-glass);flex-shrink:0}.inspector-tabs .tab-btn{flex:1;background:transparent;border:none;color:var(--text-secondary);font-family:var(--font-family);font-size:13px;font-weight:600;padding:12px;cursor:pointer;transition:all .25s;border-bottom:2px solid transparent}.inspector-tabs .tab-btn:hover{color:var(--text-primary);background:#ffffff05}.inspector-tabs .tab-btn.active{color:var(--accent-color);border-bottom-color:var(--accent-color);background:#ffffff0a}.tab-content{display:none;flex:1;flex-direction:column;overflow-y:auto;overflow-x:hidden;box-sizing:border-box}.tab-content.active{display:flex}.inspector-content{flex:1;overflow-y:auto;overflow-x:hidden;padding:16px 20px;display:flex;flex-direction:column;gap:16px;box-sizing:border-box}.inspector-section{display:flex;flex-direction:column;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:14px}.inspector-section:last-child{border-bottom:none;padding-bottom:0}.section-header{display:flex;justify-content:space-between;align-items:center;cursor:pointer;-webkit-user-select:none;user-select:none;padding:6px 0}.section-header:hover .section-title{color:var(--text-primary)}.section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--text-muted);transition:color .2s;margin:0}.section-chevron{font-size:10px;color:var(--text-muted);transition:transform .3s cubic-bezier(.16,1,.3,1)}.inspector-section.collapsed .section-chevron{transform:rotate(-90deg)}.section-body{display:flex;flex-direction:column;gap:12px;margin-top:10px;max-height:1500px;opacity:1;overflow:hidden;box-sizing:border-box;transition:max-height .4s cubic-bezier(.16,1,.3,1),opacity .25s,margin-top .3s}.inspector-section.collapsed .section-body{max-height:0;opacity:0;margin-top:0;pointer-events:none}.control-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;width:100%;box-sizing:border-box}.control-row{display:flex;flex-direction:column;gap:6px;box-sizing:border-box}.control-row.full-width{grid-column:span 2}.control-label{font-size:11px;font-weight:600;color:var(--text-secondary);display:flex;align-items:center}.info-icon{font-size:9px;color:var(--text-muted);cursor:help;margin-left:6px;display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;border:1px solid rgba(255,255,255,.15);font-style:normal;line-height:1;transition:all .2s;-webkit-user-select:none;user-select:none}.info-icon:hover{color:var(--accent-color);border-color:var(--accent-color);background:#06b6d40f;box-shadow:0 0 4px var(--accent-glow)}.canvas-tooltip{position:fixed;background:#0f172af2;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:10px 14px;font-size:11.5px;line-height:1.45;color:#e2e8f0;box-shadow:var(--shadow-premium),0 0 0 1px #ffffff0d;z-index:1000002;pointer-events:none;max-width:250px;opacity:0;transform:translateY(5px);transition:opacity .2s ease,transform .2s ease;font-family:var(--font-family);box-sizing:border-box}.canvas-tooltip.show{opacity:1;transform:translateY(0)}.tooltip-example{display:block;margin-top:6px;padding:4px 6px;background:#00000059;border-radius:4px;font-family:monospace;font-size:10px;color:var(--accent-color);border-left:2px solid var(--accent-color)}.control-input,.control-select{background:#ffffff0d;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:8px 10px;font-family:var(--font-family);font-size:12.5px;color:var(--text-primary);outline:none;transition:all .2s;box-sizing:border-box;width:100%}.control-input:focus,.control-select:focus{border-color:var(--accent-color);box-shadow:0 0 0 2px var(--accent-glow);background:#ffffff14}.control-select option{background-color:#0f172a;color:var(--text-primary)}textarea.control-input{resize:vertical;min-height:50px;width:100%;box-sizing:border-box}.color-swatches{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.swatch-btn{width:18px;height:18px;border-radius:50%;border:1px solid rgba(255,255,255,.2);cursor:pointer;transition:transform .2s,box-shadow .2s;padding:0;box-shadow:0 1px 3px #0000004d}.swatch-btn:hover{transform:scale(1.25);box-shadow:0 0 6px #fff6}.swatch-btn.swatch-transparent{background:linear-gradient(45deg,#bbb 25%,transparent 25%),linear-gradient(-45deg,#bbb 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#bbb 75%),linear-gradient(-45deg,transparent 75%,#bbb 75%);background-size:6px 6px;background-position:0 0,0 3px,3px -3px,-3px 0px;background-color:#fff}.color-picker-row{display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box}.color-preview-box{width:32px;height:32px;border-radius:6px;border:1.5px solid rgba(255,255,255,.15);cursor:pointer;position:relative;overflow:hidden;flex-shrink:0}.color-native-input{position:absolute;top:-10px;left:-10px;width:60px;height:60px;cursor:pointer;opacity:0}.color-text-input{flex:1;min-width:0}.align-buttons{display:flex;gap:5px;width:100%}.align-btn{flex:1;background:#ffffff0d;border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:8px 4px;color:var(--text-secondary);font-size:12px;cursor:pointer;transition:all .2s}.align-btn:hover{background:#ffffff14;color:var(--text-primary)}.align-btn.active{background:var(--primary-color);border-color:var(--primary-color);color:#fff}.flex-control-row{display:flex;flex-direction:column;gap:8px;box-sizing:border-box;width:100%}.font-upload-row{display:flex;flex-direction:column;gap:8px;background:#ffffff08;border:1px solid rgba(255,255,255,.06);border-radius:8px;padding:10px;box-sizing:border-box}.custom-file-upload{display:block;padding:10px 12px;cursor:pointer;background:#ffffff0a;border:1px dashed rgba(255,255,255,.2);border-radius:6px;text-align:center;font-size:12px;font-weight:500;color:var(--text-secondary);transition:all .2s}.custom-file-upload:hover{border-color:var(--accent-color);background:#06b6d40d;color:var(--text-primary)}#canvas-font-file-input{display:none}.layers-tree{display:flex;flex-direction:column;gap:8px;padding:10px 0;box-sizing:border-box;width:100%}.layers-node{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:#ffffff08;border:1px solid rgba(255,255,255,.05);border-radius:8px;font-size:12px;transition:all .2s ease;cursor:pointer;box-sizing:border-box;width:100%}.layers-node:hover{background:#ffffff14;border-color:#ffffff1f;transform:translate(2px)}.layers-node.selected{background:#06b6d426;border-color:var(--accent-color);box-shadow:0 0 10px #06b6d426}.layers-node.parent-node{border-left:3px solid var(--primary-color)}.layers-node.child-node{border-left:3px solid var(--success-color)}.layers-node.sibling-node{border-left:3px solid rgba(255,255,255,.25)}.node-info{display:flex;align-items:center;gap:8px;min-width:0;flex:1}.node-tag{font-weight:700;font-family:monospace;color:var(--accent-color)}.node-class{color:var(--text-secondary);font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.node-type-label{font-size:9px;padding:2px 4px;border-radius:4px;background:#ffffff14;color:var(--text-muted);text-transform:uppercase;font-weight:600}.layers-node.selected .node-type-label{background:var(--accent-color);color:#000}.node-actions{display:flex;gap:4px;flex-shrink:0}.node-action-btn{background:transparent;border:none;color:var(--text-secondary);cursor:pointer;width:22px;height:22px;border-radius:4px;display:flex;align-items:center;justify-content:center;transition:all .2s;font-size:11px}.node-action-btn:hover{background:#ffffff1a;color:#fff}.node-action-btn.delete:hover{background:#ef444433;color:var(--danger-color)}.inspector-footer{padding:16px 20px;border-top:1px solid var(--border-glass);display:flex;flex-direction:column;gap:10px;box-sizing:border-box;width:100%;flex-shrink:0}.btn-row{display:flex;gap:10px;width:100%;box-sizing:border-box}.btn{flex:1;padding:10px 14px;font-family:var(--font-family);font-size:13px;font-weight:600;border-radius:8px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;border:none;box-sizing:border-box}.btn-primary{background:var(--primary-color);color:#fff}.btn-primary:hover{background:#4f46e5;box-shadow:0 0 10px #6366f166}.btn-secondary{background:#ffffff0f;color:var(--text-primary);border:1px solid var(--border-glass)}.btn-secondary:hover{background:#ffffff1f}.btn-danger{background:transparent;color:var(--danger-color);border:1px solid rgba(239,68,68,.2);width:100%;margin-top:2px}.btn-danger:hover{background:#ef44441a}.canvas-modal-overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:#0f172a99;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);z-index:1000000;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity .3s ease}.canvas-modal-overlay.open{opacity:1;pointer-events:auto}.canvas-modal{background:var(--bg-glass);backdrop-filter:blur(25px);-webkit-backdrop-filter:blur(25px);border:1px solid var(--border-glass);border-radius:16px;box-shadow:var(--shadow-premium);width:90%;max-width:500px;overflow:hidden;transform:scale(.95);transition:transform .3s cubic-bezier(.16,1,.3,1);display:flex;flex-direction:column}.canvas-modal-overlay.open .canvas-modal{transform:scale(1)}.modal-header{padding:18px 24px;border-bottom:1px solid var(--border-glass);display:flex;justify-content:space-between;align-items:center}.modal-title{margin:0;font-size:16px;font-weight:700}.modal-body{padding:24px;display:flex;flex-direction:column;gap:16px}.modal-desc{font-size:13px;color:var(--text-secondary);line-height:1.5}.code-container{background:#00000059;border:1px solid var(--border-glass);border-radius:8px;padding:12px;font-family:monospace;font-size:12px;color:var(--accent-color);max-height:200px;overflow-y:auto;white-space:pre-wrap;-webkit-user-select:all;user-select:all}.modal-footer{padding:18px 24px;border-top:1px solid var(--border-glass);display:flex;justify-content:flex-end;gap:10px}.canvas-toast-container{position:fixed;bottom:24px;left:24px;z-index:1000001;display:flex;flex-direction:column;gap:10px}.canvas-toast{background:#0f172ad9;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid var(--border-glass);border-radius:8px;padding:12px 20px;font-size:13px;font-weight:600;box-shadow:var(--shadow-premium);display:flex;align-items:center;gap:10px;transform:translateY(20px);opacity:0;animation:slide-in .3s forwards cubic-bezier(.16,1,.3,1);color:#fff}.canvas-toast.toast-success{border-left:3px solid var(--success-color)}.canvas-toast.toast-danger{border-left:3px solid var(--danger-color)}.canvas-toast.toast-info{border-left:3px solid var(--primary-color)}@keyframes rotate-gradient{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes slide-in{to{transform:translateY(0);opacity:1}}.canvas-quick-popover{position:absolute;top:calc(100% + 8px);left:50%;transform:translate(-50%);width:280px;background:#0f172aeb;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:12px;box-shadow:0 10px 25px #00000059,inset 0 0 0 1px #ffffff0d;z-index:100000;display:flex;flex-direction:column;gap:10px;pointer-events:auto;font-family:var(--font-family);box-sizing:border-box}.canvas-quick-popover .popover-header{font-size:11px;font-weight:700;text-transform:uppercase;color:var(--accent-color);letter-spacing:.5px;border-bottom:1px solid rgba(255,255,255,.08);padding-bottom:6px;margin-bottom:2px}.canvas-quick-popover .popover-row{display:flex;flex-direction:column;gap:4px}.canvas-quick-popover .popover-label{font-size:10.5px;font-weight:600;color:var(--text-secondary)}.layer-depth-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}.depth-btn{background:#ffffff0d;border:1px solid rgba(255,255,255,.1);border-radius:6px;padding:8px;color:var(--text-secondary);font-size:11.5px;font-weight:600;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:6px;font-family:var(--font-family)}.depth-btn:hover{background:#ffffff1f;color:var(--text-primary);border-color:var(--accent-color)}.depth-btn:active{transform:translateY(1px)}';class O{constructor(t={}){this.callbacks=t,this.root=null,this.shadowRoot=null,this.uiContainer=null,this.badge=null,this.hoverOverlay=null,this.selectionOverlay=null,this.inspector=null,this.modalOverlay=null,this.toastContainer=null,this.tooltip=null,this.inputs={},this.selectedElement=null,this.init()}init(){this.root=document.createElement("div"),this.root.id="canvas-editor-root",document.body.appendChild(this.root),this.shadowRoot=this.root.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=F,this.shadowRoot.appendChild(t),this.uiContainer=document.createElement("div"),this.uiContainer.innerHTML=this.getHTMLTemplate(),this.shadowRoot.appendChild(this.uiContainer),this.badge=this.shadowRoot.querySelector(".canvas-badge"),this.hoverOverlay=this.shadowRoot.querySelector(".canvas-hover-overlay"),this.selectionOverlay=this.shadowRoot.querySelector(".canvas-selection-overlay"),this.inspector=this.shadowRoot.querySelector(".canvas-inspector"),this.modalOverlay=this.shadowRoot.querySelector(".canvas-modal-overlay"),this.toastContainer=this.shadowRoot.querySelector(".canvas-toast-container");const e=localStorage.getItem("canvas_inspector_dock")||"dock-right";this.inspector.classList.add(e),this.tooltip=document.createElement("div"),this.tooltip.className="canvas-tooltip",this.shadowRoot.appendChild(this.tooltip),this.cacheInputs(),this.bindEvents()}getHTMLTemplate(){return`
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
    `}cacheInputs(){this.shadowRoot.querySelectorAll("[data-style]").forEach(t=>{const e=t.dataset.style;this.inputs[e]||(this.inputs[e]=[]),this.inputs[e].push(t)})}bindEvents(){this.badge.addEventListener("click",()=>{this.callbacks.onToggleActive&&this.callbacks.onToggleActive()}),this.shadowRoot.getElementById("inspector-dock-btn").addEventListener("click",()=>{this.inspector.classList.contains("dock-right")?(this.inspector.classList.remove("dock-right"),this.inspector.classList.add("dock-left"),localStorage.setItem("canvas_inspector_dock","dock-left")):(this.inspector.classList.remove("dock-left"),this.inspector.classList.add("dock-right"),localStorage.setItem("canvas_inspector_dock","dock-right")),this.showToast("Sidebar docked "+(this.inspector.classList.contains("dock-right")?"right":"left"),"info")}),this.shadowRoot.querySelectorAll(".section-header").forEach(r=>{r.addEventListener("click",()=>{r.parentElement.classList.toggle("collapsed")})}),this.shadowRoot.getElementById("inspector-close-btn").addEventListener("click",()=>{this.closeInspector()}),this.shadowRoot.getElementById("inspector-save-btn").addEventListener("click",()=>{this.callbacks.onSave&&this.callbacks.onSave()}),this.shadowRoot.getElementById("inspector-cancel-btn").addEventListener("click",()=>{this.callbacks.onCancel&&this.callbacks.onCancel()}),this.shadowRoot.getElementById("inspector-reset-btn").addEventListener("click",()=>{confirm("Are you sure you want to clear ALL visual edits you made to this page?")&&this.callbacks.onReset&&this.callbacks.onReset()}),this.shadowRoot.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{this.shadowRoot.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active")),this.shadowRoot.querySelectorAll(".tab-content").forEach(b=>b.classList.remove("active")),r.classList.add("active");const c=`tab-${r.dataset.tab}`,p=this.shadowRoot.getElementById(c);p&&p.classList.add("active"),r.dataset.tab==="layers"&&this.updateLayersTree()})}),this.shadowRoot.querySelectorAll(".swatch-btn").forEach(r=>{r.addEventListener("click",()=>{const c=r.closest(".control-row");if(c){const p=r.dataset.color,b=c.querySelector(".color-text-input"),v=c.querySelector(".color-native-input");b&&(b.value=p,b.dispatchEvent(new Event("input",{bubbles:!0}))),v&&p!=="transparent"&&(v.value=p)}})});const e=this.shadowRoot.getElementById("canvas-font-file-input"),o=this.shadowRoot.getElementById("canvas-font-file-list");e&&e.addEventListener("change",r=>{const c=Array.from(r.target.files);if(c.length===0){o.textContent="No files chosen";return}o.textContent=c.map(p=>p.name).join(", "),this.callbacks.onLocalFontUpload&&this.callbacks.onLocalFontUpload(c)});const a=this.shadowRoot.querySelector(".canvas-quick-toolbar");a&&a.addEventListener("click",r=>{const c=r.target.closest(".quick-btn");if(!c)return;const p=c.dataset.action;this.callbacks.onQuickAction&&this.selectedElement&&this.callbacks.onQuickAction(p,this.selectedElement)});const s=this.shadowRoot.getElementById("canvas-global-font-input");s&&s.addEventListener("input",r=>{const c=r.target.value.trim();this.callbacks.onGlobalFontChange&&this.callbacks.onGlobalFontChange(c)});const l=this.shadowRoot.getElementById("depth-btn-front"),n=this.shadowRoot.getElementById("depth-btn-forward"),d=this.shadowRoot.getElementById("depth-btn-backward"),f=this.shadowRoot.getElementById("depth-btn-back");l&&l.addEventListener("click",()=>{this.callbacks.onStyleChange&&this.selectedElement&&(this.callbacks.onStyleChange("position","relative",this.selectedElement),this.callbacks.onStyleChange("zIndex","9999",this.selectedElement),this.showToast("Brought item to absolute front","success"))}),n&&n.addEventListener("click",()=>{if(this.callbacks.onStyleChange&&this.selectedElement){const r=window.getComputedStyle(this.selectedElement),p=(parseInt(r.zIndex)||0)+1;this.callbacks.onStyleChange("position","relative",this.selectedElement),this.callbacks.onStyleChange("zIndex",String(p),this.selectedElement),this.showToast(`Brought item forward (layer depth: ${p})`,"info")}}),d&&d.addEventListener("click",()=>{if(this.callbacks.onStyleChange&&this.selectedElement){const r=window.getComputedStyle(this.selectedElement),p=(parseInt(r.zIndex)||0)-1;this.callbacks.onStyleChange("position","relative",this.selectedElement),this.callbacks.onStyleChange("zIndex",String(p),this.selectedElement),this.showToast(`Sent item backward (layer depth: ${p})`,"info")}}),f&&f.addEventListener("click",()=>{this.callbacks.onStyleChange&&this.selectedElement&&(this.callbacks.onStyleChange("position","relative",this.selectedElement),this.callbacks.onStyleChange("zIndex","-1",this.selectedElement),this.showToast("Sent item to absolute back","danger"))});const h=()=>this.modalOverlay.classList.remove("open");this.shadowRoot.getElementById("modal-close-btn").addEventListener("click",h),this.shadowRoot.getElementById("modal-ok-btn").addEventListener("click",h),this.inspector.addEventListener("mouseenter",()=>{this.uiContainer.classList.add("canvas-inspector-hovered")}),this.inspector.addEventListener("mouseleave",()=>{this.uiContainer.classList.remove("canvas-inspector-hovered")}),this.shadowRoot.addEventListener("input",r=>{const c=r.target;if(c.dataset.style){const p=c.dataset.style;let b=c.value;if(c.type==="number"&&b!==""&&p!=="opacity"&&p!=="zIndex"&&(b=`${b}px`),c.type==="color"){const v=this.shadowRoot.querySelector(`[data-style-sync="${p}"]`);v&&(v.value=b),c.parentElement.style.backgroundColor=b}this.triggerStyleChange(p,b)}if(c.dataset.styleSync){const p=c.dataset.styleSync,b=c.value,v=this.shadowRoot.querySelector(`input[type="color"][data-style="${p}"]`);if(v){const x=m(b);v.value=x,v.parentElement.style.backgroundColor=b}this.triggerStyleChange(p,b)}}),this.shadowRoot.getElementById("inspector-text-content").addEventListener("input",r=>{this.callbacks.onTextChange&&this.callbacks.onTextChange(r.target.value)}),this.shadowRoot.querySelectorAll(".align-btn").forEach(r=>{r.addEventListener("click",c=>{const p=c.currentTarget,b=p.dataset.style,v=p.dataset.val;p.parentElement.querySelectorAll(".align-btn").forEach(x=>x.classList.remove("active")),p.classList.add("active"),this.triggerStyleChange(b,v)})}),this.shadowRoot.querySelectorAll(".info-icon").forEach(r=>{const c=()=>{const b=r.dataset.tip,v=r.dataset.example;let x=b;v&&(x+=`<span class="tooltip-example">Example: ${v}</span>`),this.tooltip.innerHTML=x,this.tooltip.classList.add("show");const k=r.getBoundingClientRect(),R=this.tooltip.getBoundingClientRect(),A=k.top-R.height-8,U=k.left+k.width/2-R.width/2,Q=Math.max(10,Math.min(window.innerWidth-R.width-10,U)),X=A<10?k.bottom+8:A;this.tooltip.style.top=`${X}px`,this.tooltip.style.left=`${Q}px`},p=()=>{this.tooltip.classList.remove("show")};r.addEventListener("mouseenter",c),r.addEventListener("mouseleave",p),r.addEventListener("focus",c),r.addEventListener("blur",p)})}triggerStyleChange(t,e){this.callbacks.onStyleChange&&this.callbacks.onStyleChange(t,e)}setBadgeState(t){t?(this.badge.classList.add("active"),this.badge.querySelector(".badge-text").textContent="Visual Active"):(this.badge.classList.remove("active"),this.badge.querySelector(".badge-text").textContent="Visual Editor",this.closeInspector(),this.hideOverlays())}showHover(t,e){t&&(this.hoverOverlay.style.display="block",this.hoverOverlay.style.top=`${t.top}px`,this.hoverOverlay.style.left=`${t.left}px`,this.hoverOverlay.style.width=`${t.width}px`,this.hoverOverlay.style.height=`${t.height}px`,this.hoverOverlay.style.borderRadius=t.borderRadius||"0px",this.hoverOverlay.querySelector(".overlay-label").textContent=e)}hideHover(){this.hoverOverlay.style.display="none"}showSelection(t,e,o){t&&(this.selectionOverlay.style.display="block",this.selectionOverlay.style.top=`${t.top}px`,this.selectionOverlay.style.left=`${t.left}px`,this.selectionOverlay.style.width=`${t.width}px`,this.selectionOverlay.style.height=`${t.height}px`,this.selectionOverlay.style.borderRadius=t.borderRadius||"0px",this.selectionOverlay.querySelector(".overlay-label").textContent=e,this.selectionOverlay.querySelector(".dimension-label").textContent=`${Math.round(t.originalWidth)}px × ${Math.round(t.originalHeight)}px`,this.updateQuickPopover(o))}updateSelectionRect(t,e){t&&(this.selectionOverlay.style.top=`${t.top}px`,this.selectionOverlay.style.left=`${t.left}px`,this.selectionOverlay.style.width=`${t.width}px`,this.selectionOverlay.style.height=`${t.height}px`,this.selectionOverlay.style.borderRadius=t.borderRadius||"0px",this.selectionOverlay.querySelector(".dimension-label").textContent=`${Math.round(t.originalWidth)}px × ${Math.round(t.originalHeight)}px`,this.updateQuickPopover(e))}hideSelection(){this.selectionOverlay.style.display="none",this.updateQuickPopover(null)}hideOverlays(){this.hideHover(),this.hideSelection()}openInspector(t,e,o="",a=null){var h,u,r,c;this.selectedElement=a,this.shadowRoot.getElementById("inspector-element-title").textContent=t,this.fillInspectorValues(e);const s=this.shadowRoot.getElementById("inspector-text-content");s&&(s.value=o);const l="body",n=((u=(h=window.canvasDraftChanges)==null?void 0:h[l])==null?void 0:u.styles)||((c=(r=window.canvasSavedModifications)==null?void 0:r[l])==null?void 0:c.styles),d=this.shadowRoot.getElementById("canvas-global-font-input");d&&(d.value=(n==null?void 0:n.fontFamily)||""),this.inspector.classList.add("open");const f=this.shadowRoot.querySelector(".tab-btn.active");f&&f.dataset.tab==="layers"&&this.updateLayersTree()}closeInspector(){this.inspector.classList.remove("open")}fillInspectorValues(t){Object.values(this.inputs).flat().forEach(e=>{e.type==="color"?(e.value="#000000",e.parentElement.style.backgroundColor="transparent"):(e.tagName,e.value="")}),this.shadowRoot.querySelectorAll("[data-style-sync]").forEach(e=>e.value=""),this.shadowRoot.querySelectorAll(".align-btn").forEach(e=>e.classList.remove("active")),Object.entries(t).forEach(([e,o])=>{const a=this.inputs[e];a&&a.forEach(s=>{if(s.type==="number")s.value=parseFloat(o)||"";else if(s.type==="color"){const l=I(o)||"#000000";s.value=l,s.parentElement.style.backgroundColor=o;const n=this.shadowRoot.querySelector(`[data-style-sync="${e}"]`);n&&(n.value=o)}else s.tagName==="SELECT"?s.value=o:s.classList.contains("align-btn")?s.dataset.val===o&&s.classList.add("active"):s.value=o})})}showToast(t,e="success"){const o=document.createElement("div");o.className=`canvas-toast toast-${e}`;let a="⚡";e==="success"&&(a="✅"),e==="danger"&&(a="🚨"),e==="info"&&(a="ℹ️"),o.innerHTML=`<span>${a}</span> <span>${t}</span>`,this.toastContainer.appendChild(o),setTimeout(()=>{o.style.animation="none",o.style.opacity="1",o.style.transform="translateY(0)",setTimeout(()=>{o.style.transition="all 0.3s ease",o.style.opacity="0",o.style.transform="translateY(20px)",setTimeout(()=>o.remove(),300)},2500)},10)}updateLayersTree(){const t=this.shadowRoot.getElementById("layers-tree-container");if(!t)return;if(!this.selectedElement){t.innerHTML=`<div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px 0;">
        Select an item on the screen to view its hierarchy
      </div>`;return}t.innerHTML="";const e=document.createElement("div");e.className="layers-tree";const o=this.selectedElement.parentElement;o&&o!==document.body&&o!==document.documentElement&&e.appendChild(this.createLayerNodeElement(o,"parent")),o?Array.from(o.children).forEach(a=>{a.id!=="canvas-editor-root"&&(a===this.selectedElement?e.appendChild(this.createLayerNodeElement(a,"selected")):e.appendChild(this.createLayerNodeElement(a,"sibling")))}):e.appendChild(this.createLayerNodeElement(this.selectedElement,"selected")),Array.from(this.selectedElement.children).forEach(a=>{a.id!=="canvas-editor-root"&&e.appendChild(this.createLayerNodeElement(a,"child"))}),t.appendChild(e)}createLayerNodeElement(t,e){const o=document.createElement("div");o.className=`layers-node ${e}-node ${e==="selected"?"selected":""}`;const a=t.tagName.toLowerCase(),s=t.className?`.${Array.from(t.classList).join(".")}`:"",l=s.length>18?s.substring(0,18)+"...":s;o.addEventListener("click",d=>{d.target.closest(".node-action-btn")||this.callbacks.onLayerSelect&&this.callbacks.onLayerSelect(t)});let n=e;return e==="selected"&&(n="Active"),o.innerHTML=`
      <div class="node-info">
        <span class="node-tag">${a}</span>
        <span class="node-class" title="${s}">${l}</span>
        <span class="node-type-label">${n}</span>
      </div>
      <div class="node-actions">
        <button class="node-action-btn toggle-visibility" title="Toggle Visibility">👁</button>
        <button class="node-action-btn delete" title="Delete Element" style="color: var(--danger-color);">🗑</button>
      </div>
    `,o.querySelector(".toggle-visibility").addEventListener("click",d=>{d.stopPropagation();const h=(t.style.display||window.getComputedStyle(t).display)==="none"?"block":"none";t.style.display=h,this.callbacks.onStyleChange&&this.callbacks.onStyleChange("display",h,t),this.showToast(`Element visibility set to ${h}`,"info"),this.updateLayersTree()}),o.querySelector(".delete").addEventListener("click",d=>{d.stopPropagation(),confirm(`Are you sure you want to delete this <${a}> element?`)&&(t.style.display="none",this.callbacks.onStyleChange&&this.callbacks.onStyleChange("display","none",t),this.showToast(`Deleted <${a}> element`,"danger"),e==="selected"&&this.callbacks.onDeselect?this.callbacks.onDeselect():this.updateLayersTree())}),o}updateQuickPopover(t){const e=this.shadowRoot.getElementById("canvas-quick-popover");if(!e)return;if(!t){e.style.display="none";return}e.style.display="flex";const o=t.tagName.toLowerCase(),a=window.getComputedStyle(t);let s="container";["h1","h2","h3","h4","h5","h6","p","span","strong","em","li"].includes(o)?s="text":o==="img"?s="image":o==="button"||o==="a"&&t.classList.contains("btn")||t.classList.contains("button")?s="button":o==="a"&&(s="link");let l="";s==="text"?l=`
        <div class="popover-header">Quick Text Settings</div>
        <div class="popover-row">
          <label class="popover-label">Text Content</label>
          <input type="text" class="control-input popover-text-input" value="${t.textContent.trim()}" placeholder="Change text...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Text Size (Pixels)</label>
          <input type="number" class="control-input" data-style="fontSize" value="${parseInt(a.fontSize)||16}">
        </div>
        <div class="popover-row">
          <label class="popover-label">Text Color</label>
          <div class="color-picker-row">
            <div class="color-preview-box" style="background-color: ${a.color};">
              <input type="color" class="color-native-input" data-style="color" value="${m(a.color)}">
            </div>
            <input type="text" class="control-input color-text-input" data-style-sync="color" value="${a.color}">
          </div>
        </div>
      `:s==="image"?l=`
        <div class="popover-header">Quick Image Settings</div>
        <div class="popover-row">
          <label class="popover-label">Image Web URL (Src)</label>
          <input type="text" class="control-input popover-image-src" value="${t.src||""}" placeholder="Paste URL here...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Corner Smoothness</label>
          <input type="text" class="control-input" data-style="borderRadius" value="${a.borderRadius||"0px"}">
        </div>
      `:s==="button"?l=`
        <div class="popover-header">Quick Button Settings</div>
        <div class="popover-row">
          <label class="popover-label">Button Label</label>
          <input type="text" class="control-input popover-text-input" value="${t.textContent.trim()}" placeholder="Change button text...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Link Destination (URL)</label>
          <input type="text" class="control-input popover-link-href" value="${t.getAttribute("href")||""}" placeholder="e.g. /contact or https://...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Background Color</label>
          <div class="color-picker-row">
            <div class="color-preview-box" style="background-color: ${a.backgroundColor};">
              <input type="color" class="color-native-input" data-style="backgroundColor" value="${m(a.backgroundColor)}">
            </div>
            <input type="text" class="control-input color-text-input" data-style-sync="backgroundColor" value="${a.backgroundColor}">
          </div>
        </div>
      `:s==="link"?l=`
        <div class="popover-header">Quick Link Settings</div>
        <div class="popover-row">
          <label class="popover-label">Link Text</label>
          <input type="text" class="control-input popover-text-input" value="${t.textContent.trim()}" placeholder="Change link text...">
        </div>
        <div class="popover-row">
          <label class="popover-label">Link Destination (URL)</label>
          <input type="text" class="control-input popover-link-href" value="${t.getAttribute("href")||""}" placeholder="e.g. /about or https://...">
        </div>
      `:l=`
        <div class="popover-header">Quick Block Settings</div>
        <div class="popover-row">
          <label class="popover-label">Corner Smoothness</label>
          <input type="text" class="control-input" data-style="borderRadius" value="${a.borderRadius||"0px"}">
        </div>
        <div class="popover-row">
          <label class="popover-label">Background Color</label>
          <div class="color-picker-row">
            <div class="color-preview-box" style="background-color: ${a.backgroundColor};">
              <input type="color" class="color-native-input" data-style="backgroundColor" value="${m(a.backgroundColor)}">
            </div>
            <input type="text" class="control-input color-text-input" data-style-sync="backgroundColor" value="${a.backgroundColor}">
          </div>
        </div>
      `,e.innerHTML=l;const n=e.querySelector(".popover-text-input");n&&n.addEventListener("input",h=>{const u=h.target.value;t.children.length===0?t.textContent=u:t.innerHTML=u;const r=this.shadowRoot.getElementById("inspector-text-content");r&&(r.value=u),this.callbacks.onTextChange&&this.callbacks.onTextChange(u)});const d=e.querySelector(".popover-link-href");d&&d.addEventListener("input",h=>{const u=h.target.value;t.setAttribute("href",u),this.callbacks.onStyleChange&&this.callbacks.onStyleChange("href",u,t)});const f=e.querySelector(".popover-image-src");f&&f.addEventListener("input",h=>{const u=h.target.value;t.src=u,this.callbacks.onStyleChange&&this.callbacks.onStyleChange("src",u,t)}),this.cacheInputs()}}function I(i){if(!i)return null;if(i.startsWith("#"))return i;if(i==="transparent")return"#ffffff";const t=i.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);if(!t)return null;if((t[4]!==void 0?parseFloat(t[4]):1)===0)return"#ffffff";const o=parseInt(t[1]).toString(16).padStart(2,"0"),a=parseInt(t[2]).toString(16).padStart(2,"0"),s=parseInt(t[3]).toString(16).padStart(2,"0");return`#${o}${a}${s}`}function m(i){if(!i||i==="transparent")return"#ffffff";const t=document.createElement("div");t.style.color=i,document.body.appendChild(t);const e=window.getComputedStyle(t).color;return document.body.removeChild(t),I(e)||"#ffffff"}function E(i){if(!(i instanceof Element))return"";if(i.id)return`#${CSS.escape(i.id)}`;const t=[];let e=i;for(;e&&e.nodeType===Node.ELEMENT_NODE;){let o=e.nodeName.toLowerCase();if(o==="html"||o==="body"){t.unshift(o);break}if(e.classList&&e.classList.length>0){const n=Array.from(e.classList).map(d=>CSS.escape(d)).join(".");n&&(o+="."+n)}let a=e,s=1;for(;a=a.previousElementSibling;)a.nodeName===e.nodeName&&s++;let l=!1;for(a=e;a=a.nextElementSibling;)if(a.nodeName===e.nodeName){l=!0;break}(s>1||l)&&(o+=`:nth-of-type(${s})`),t.unshift(o),e=e.parentNode}return t.join(" > ")}function q(i){return i.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}const C="canvas_saved_modifications",w=new Map;function S(){return window.location.origin+window.location.pathname}function L(){try{const i=localStorage.getItem(C);return i?JSON.parse(i):{}}catch(i){return console.error("Canvas: Failed to parse saved modifications",i),{}}}function g(){return L()[S()]||{}}function D(i){const t=L();t[S()]=i,localStorage.setItem(C,JSON.stringify(t))}function $(i){if(!i||(!i.startsWith("http")&&!i.startsWith("//")&&(i=`https://fonts.googleapis.com/css2?family=${encodeURIComponent(i.trim())}:wght@300;400;500;600;700;900&display=swap`),document.querySelector(`link[href="${i}"]`)))return;const t=document.createElement("link");t.rel="stylesheet",t.href=i,document.head.appendChild(t)}function z(i,t=!1){Object.entries(i).forEach(([e,o])=>{if(e==="__fontImports")return;const a=document.querySelector(e);if(a){if(!w.has(e)){const s={};o.styles&&Object.keys(o.styles).forEach(l=>{s[l]=a.style[l]||""}),w.set(e,{styles:s,text:a.innerHTML,display:a.style.display||""})}o.styles&&Object.entries(o.styles).forEach(([s,l])=>{a.style[s]=l}),o.text!==void 0&&o.text!==null&&(a.children.length===0?a.textContent=o.text:a.innerHTML=o.text)}})}function B(i){Object.keys(i).forEach(t=>{if(t==="__fontImports")return;const e=document.querySelector(t),o=w.get(t);e&&o&&(o.styles&&Object.entries(o.styles).forEach(([a,s])=>{e.style[a]=s}),o.text!==void 0&&(e.innerHTML=o.text)),w.delete(t)})}function N(){const i=g();i.__fontImports&&Array.isArray(i.__fontImports)&&i.__fontImports.forEach(t=>{try{$(t)}catch(e){console.error("Canvas: Failed to inject font URL",t,e)}}),Y(),z(i,!1)}function H(){const i=g();B(i);const t=L();delete t[S()],localStorage.setItem(C,JSON.stringify(t))}const P="CanvasFontDB",_=1,y="fonts";function M(){return new Promise((i,t)=>{const e=indexedDB.open(P,_);e.onupgradeneeded=()=>{const o=e.result;o.objectStoreNames.contains(y)||o.createObjectStore(y,{keyPath:"name"})},e.onsuccess=()=>i(e.result),e.onerror=()=>t(e.error)})}async function j(i,t){const e=await M();return new Promise((o,a)=>{const s=e.transaction(y,"readwrite");s.objectStore(y).put({name:i,data:t}),s.oncomplete=()=>o(),s.onerror=()=>a(s.error)})}async function W(){const i=await M();return new Promise((t,e)=>{const s=i.transaction(y,"readonly").objectStore(y).getAll();s.onsuccess=()=>t(s.result),s.onerror=()=>e(s.error)})}async function Y(){try{const i=await W();for(const t of i)try{const e=new FontFace(t.name,t.data);await e.load(),document.fonts.add(e),console.log(`Canvas: Local font "${t.name}" successfully registered from DB!`)}catch(e){console.error(`Canvas: Failed to register font "${t.name}" from DB`,e)}}catch(i){console.warn("Canvas: Could not access local Font DB (IndexedDB)",i)}}class G{constructor(){this.active=!1,this.selectedElement=null,this.selectedSelector="",this._originalOverflow="",this.draftChanges={},this.copiedAppearance=null,window.canvasDraftChanges=this.draftChanges,window.canvasSavedModifications=g(),this.handleMouseMove=this.handleMouseMove.bind(this),this.handleMouseDown=this.handleMouseDown.bind(this),this.handleMouseClick=this.handleMouseClick.bind(this),this.handleDragStart=this.handleDragStart.bind(this),this.handleDragMove=this.handleDragMove.bind(this),this.handleDragEnd=this.handleDragEnd.bind(this),this.handleResizeStart=this.handleResizeStart.bind(this),this.handleResizeMove=this.handleResizeMove.bind(this),this.handleResizeEnd=this.handleResizeEnd.bind(this),this.handleDoubleClick=this.handleDoubleClick.bind(this),this.handleTextChange=this.handleTextChange.bind(this),this.handleFontImport=this.handleFontImport.bind(this),this.dragState={isDragging:!1,startX:0,startY:0,startLeft:0,startTop:0},this.resizeState={isResizing:!1,handle:"",startX:0,startY:0,startWidth:0,startHeight:0,startLeft:0,startTop:0},this.ui=new O({onToggleActive:()=>this.toggleActive(),onStyleChange:(t,e,o)=>this.handleStyleChange(t,e,o),onTextChange:t=>this.handleTextChange(t),onFontImport:t=>this.handleFontImport(t),onLocalFontUpload:t=>this.handleLocalFontUpload(t),onQuickAction:(t,e)=>this.handleQuickAction(t,e),onLayerSelect:t=>this.selectElement(t),onDeselect:()=>this.deselectElement(),onSave:()=>this.saveChanges(),onCancel:()=>this.cancelChanges(),onReset:()=>this.resetAllChanges(),onGlobalFontChange:t=>this.handleGlobalFontChange(t)}),this.setupGlobalEvents()}setupGlobalEvents(){window.addEventListener("keydown",t=>{this.active&&t.key==="Escape"&&(this.selectedElement?(this.selectedElement.contentEditable==="true"&&this.selectedElement.blur(),this.deselectElement()):this.toggleActive())}),window.addEventListener("resize",()=>{this.active&&this.repositionOverlays()})}toggleActive(){this.active=!this.active,this.ui.setBadgeState(this.active),this.active?(this.ui.showToast("Canvas activated. Click elements to edit!","info"),document.body.style.cursor="crosshair",this.addPageListeners()):(this.ui.showToast("Canvas deactivated.","info"),document.body.style.cursor="",this.deselectElement(),this.removePageListeners())}addPageListeners(){document.addEventListener("mousemove",this.handleMouseMove,!0),document.addEventListener("mousedown",this.handleMouseDown,!0),document.addEventListener("click",this.handleMouseClick,!0),document.addEventListener("dblclick",this.handleDoubleClick,!0),this.ui.selectionOverlay.querySelector('[data-action="drag"]').addEventListener("mousedown",this.handleDragStart),this.ui.selectionOverlay.querySelectorAll(".resize-handle").forEach(e=>{e.addEventListener("mousedown",this.handleResizeStart)})}removePageListeners(){document.removeEventListener("mousemove",this.handleMouseMove,!0),document.removeEventListener("mousedown",this.handleMouseDown,!0),document.removeEventListener("click",this.handleMouseClick,!0),document.removeEventListener("dblclick",this.handleDoubleClick,!0)}isEditorElement(t){return t===this.ui.root||this.ui.root.contains(t)}calculateOverlayRect(t){const e=t.getBoundingClientRect(),o=window.getComputedStyle(t),a=6;let s=parseFloat(o.borderRadius)||0;return{top:e.top-a,left:e.left-a,width:e.width+a*2,height:e.height+a*2,borderRadius:`${s+a}px`,originalWidth:e.width,originalHeight:e.height}}handleMouseMove(t){if(!this.active||this.dragState.isDragging||this.resizeState.isResizing||this.isEditorElement(t.target))return;const e=t.target,o=`${e.tagName.toLowerCase()}${e.classList.length?"."+Array.from(e.classList).join("."):""}`,a=this.calculateOverlayRect(e);this.ui.showHover(a,o)}handleMouseDown(t){if(this.active&&!this.isEditorElement(t.target))if(this.selectedElement&&this.selectedElement.contains(t.target)){const e=t.clientX,o=t.clientY;let a=!1;const s=n=>{Math.hypot(n.clientX-e,n.clientY-o)>4&&(a=!0,document.removeEventListener("mousemove",s,!0),document.removeEventListener("mouseup",l,!0),this.handleDragStart(t))},l=n=>{document.removeEventListener("mousemove",s,!0),document.removeEventListener("mouseup",l,!0),a||t.target!==this.selectedElement&&this.selectElement(t.target)};document.addEventListener("mousemove",s,!0),document.addEventListener("mouseup",l,!0),t.preventDefault(),t.stopPropagation()}else t.preventDefault(),t.stopPropagation(),this.selectElement(t.target)}handleMouseClick(t){this.active&&(this.isEditorElement(t.target)||(t.preventDefault(),t.stopPropagation()))}selectElement(t){if(this.selectedElement===t)return;this.deselectElement(),this.selectedElement=t,this.selectedSelector=E(t);const e=t.getBoundingClientRect(),o=e.left+e.width/2,a=window.innerWidth/2;o>a?(this.ui.inspector.classList.remove("dock-right"),this.ui.inspector.classList.add("dock-left")):(this.ui.inspector.classList.remove("dock-left"),this.ui.inspector.classList.add("dock-right")),this._originalOverflow=document.documentElement.style.overflow,document.documentElement.style.overflow="hidden";const s=this.calculateOverlayRect(t),l=`${t.tagName.toLowerCase()}${t.id?"#"+t.id:""}`;this.ui.showSelection(s,l,t);const n=window.getComputedStyle(t),d={marginTop:n.marginTop,marginRight:n.marginRight,marginBottom:n.marginBottom,marginLeft:n.marginLeft,paddingTop:n.paddingTop,paddingRight:n.paddingRight,paddingBottom:n.paddingBottom,paddingLeft:n.paddingLeft,width:t.style.width||n.width,height:t.style.height||n.height,fontSize:n.fontSize,fontWeight:n.fontWeight,lineHeight:n.lineHeight,letterSpacing:n.letterSpacing,fontStyle:n.fontStyle,color:n.color,textAlign:n.textAlign,display:n.display,zIndex:n.zIndex==="auto"?"":n.zIndex,flexDirection:n.flexDirection,justifyContent:n.justifyContent,alignItems:n.alignItems,flexWrap:n.flexWrap,borderWidth:n.borderWidth,borderStyle:n.borderStyle,borderColor:n.borderColor,backgroundColor:n.backgroundColor,borderRadius:n.borderRadius,opacity:n.opacity,boxShadow:t.style.boxShadow||""},f=t.children.length===0?t.textContent.trim():t.innerHTML.trim();this.ui.openInspector(l,d,f,t)}deselectElement(){this.selectedElement&&(this.selectedElement.contentEditable==="true"&&this.selectedElement.blur(),this._originalOverflow!==void 0?document.documentElement.style.overflow=this._originalOverflow:document.documentElement.style.overflow="",this.selectedElement=null,this.selectedSelector="",this.ui.selectedElement=null),this.ui.hideSelection(),this.ui.closeInspector()}repositionOverlays(){if(!this.selectedElement)return;const t=this.calculateOverlayRect(this.selectedElement);this.ui.updateSelectionRect(t,this.selectedElement)}handleDoubleClick(t){if(!this.active||this.isEditorElement(t.target))return;t.preventDefault(),t.stopPropagation();const e=t.target;this.selectElement(e),e.contentEditable="true",e.focus();const o=document.createRange();o.selectNodeContents(e),o.collapse(!1);const a=window.getSelection();a.removeAllRanges(),a.addRange(o),e.style.outline="2px dashed var(--accent-color)";const s=()=>{e.contentEditable="false",e.style.outline="";const n=e.innerHTML;this.recordTextChange(this.selectedSelector,n),this.repositionOverlays();const d=this.ui.shadowRoot.getElementById("inspector-text-content");d&&(d.value=e.children.length===0?e.textContent.trim():e.innerHTML.trim()),e.removeEventListener("blur",s),e.removeEventListener("keydown",l)},l=n=>{var d,f;if(n.key==="Escape"){const h=(d=this.draftChanges[this.selectedSelector])==null?void 0:d.text;if(h!==void 0)e.innerHTML=h;else{const u=(f=g()[this.selectedSelector])==null?void 0:f.text;u!==void 0&&(e.innerHTML=u)}e.blur()}else n.key==="Enter"&&!n.shiftKey&&(n.preventDefault(),e.blur())};e.addEventListener("blur",s),e.addEventListener("keydown",l)}recordTextChange(t,e){this.draftChanges[t]||(this.draftChanges[t]={styles:{},text:""}),this.draftChanges[t].text=e,z(this.draftChanges,!0)}handleTextChange(t){this.selectedElement&&(this.selectedElement.children.length===0?this.selectedElement.textContent=t:this.selectedElement.innerHTML=t,this.recordTextChange(this.selectedSelector,t),this.repositionOverlays())}handleFontImport(t){if(t)try{$(t);let e=t.trim();if(t.includes("family=")){const l=t.match(/family=([^&:]+)/);l&&(e=decodeURIComponent(l[1].split(":")[0].replace(/\+/g," ")))}this.handleStyleChange("fontFamily",e);const o=g();o.__fontImports||(o.__fontImports=[]),o.__fontImports.includes(t)||(o.__fontImports.push(t),D(o));const a=this.ui.shadowRoot.querySelector('input[data-style="fontFamily"]');a&&(a.value=e);const s=this.ui.shadowRoot.getElementById("canvas-font-import-url");s&&(s.value=""),this.ui.showToast(`Font "${e}" loaded and applied successfully!`,"success")}catch(e){console.error("Canvas: Failed to import font",e),this.ui.showToast("Failed to load custom font.","danger")}}handleQuickAction(t,e){if(e)switch(t){case"parent":{const o=e.parentElement;o&&o!==document.body&&o!==document.documentElement?(this.selectElement(o),this.ui.showToast(`Selected parent: <${o.tagName.toLowerCase()}>`,"info")):this.ui.showToast("No higher parent element select-eligible","info");break}case"child":{const o=e.firstElementChild;o&&o.id!=="canvas-editor-root"?(this.selectElement(o),this.ui.showToast(`Selected child: <${o.tagName.toLowerCase()}>`,"info")):this.ui.showToast("No select-eligible child elements found","info");break}case"edit-text":{this.handleDoubleClick({target:e,preventDefault:()=>{}}),this.ui.showToast("Inline editing mode activated!","info");break}case"visibility":{const a=(e.style.display||window.getComputedStyle(e).display)==="none"?"block":"none";e.style.display=a,this.handleStyleChange("display",a,e),this.ui.showToast(`Element visibility set to ${a}`,"info"),a==="none"?this.deselectElement():this.repositionOverlays();break}case"duplicate":{const o=e.cloneNode(!0);o.id&&(o.id=`${o.id}-clone-${Date.now().toString().slice(-4)}`),e.parentNode.insertBefore(o,e.nextSibling);const a=E(o);this.draftChanges[a]={styles:{display:o.style.display||""},text:o.children.length===0?o.textContent:o.innerHTML},this.ui.showToast(`Duplicated <${e.tagName.toLowerCase()}> element`,"success"),this.selectElement(o);break}case"delete":{confirm(`Are you sure you want to delete this <${e.tagName.toLowerCase()}> element?`)&&(e.style.display="none",this.handleStyleChange("display","none",e),this.deselectElement(),this.ui.showToast("Deleted element","danger"));break}case"copy-style":{const o=window.getComputedStyle(e);this.copiedAppearance={fontSize:o.fontSize,fontWeight:o.fontWeight,fontFamily:o.fontFamily,color:o.color,backgroundColor:o.backgroundColor,paddingTop:o.paddingTop,paddingRight:o.paddingRight,paddingBottom:o.paddingBottom,paddingLeft:o.paddingLeft,marginTop:o.marginTop,marginRight:o.marginRight,marginBottom:o.marginBottom,marginLeft:o.marginLeft,borderRadius:o.borderRadius,borderWidth:o.borderWidth,borderStyle:o.borderStyle,borderColor:o.borderColor,boxShadow:e.style.boxShadow||o.boxShadow||""},this.ui.showToast("Copied visual appearance styles!","success");break}case"paste-style":{if(!this.copiedAppearance){this.ui.showToast("No style copied yet. Select an item and copy first!","danger");break}Object.entries(this.copiedAppearance).forEach(([l,n])=>{this.handleStyleChange(l,n,e)});const o={};Object.keys(this.copiedAppearance).forEach(l=>{o[l]=e.style[l]||window.getComputedStyle(e)[l]});const a=e.children.length===0?e.textContent.trim():e.innerHTML.trim(),s=`${e.tagName.toLowerCase()}${e.id?"#"+e.id:""}`;this.ui.openInspector(s,o,a,e),this.ui.showToast("Pasted styles onto selected item!","success");break}}}handleLocalFontUpload(t){!t||t.length===0||t.forEach(e=>{const o=e.name.split(".")[0].replace(/[^a-zA-Z0-9]/g,"-"),a=new FileReader;a.onload=async s=>{const l=s.target.result;try{const n=new FontFace(o,l);await n.load(),document.fonts.add(n),await j(o,l),this.handleStyleChange("fontFamily",o);const d=this.ui.shadowRoot.querySelector('input[data-style="fontFamily"]');d&&(d.value=o),this.ui.showToast(`Custom font "${o}" uploaded & applied!`,"success"),this.selectedElement&&this.ui.updateLayersTree()}catch(n){console.error(`Failed to register custom font file: ${e.name}`,n),this.ui.showToast(`Failed to parse font file: ${e.name}`,"danger")}},a.readAsArrayBuffer(e)})}handleDragStart(t){if(!this.active||!this.selectedElement)return;t.preventDefault();const e=this.selectedElement,o=window.getComputedStyle(e);o.position==="static"&&(e.style.position="relative",this.recordStyleChange("position","relative")),this._originalTransition=e.style.transition||"",e.style.setProperty("transition","none","important"),this.dragState={isDragging:!0,startX:t.clientX,startY:t.clientY,startLeft:parseFloat(o.left)||0,startTop:parseFloat(o.top)||0},document.addEventListener("mousemove",this.handleDragMove),document.addEventListener("mouseup",this.handleDragEnd)}handleDragMove(t){if(!this.dragState.isDragging||!this.selectedElement)return;const e=t.clientX-this.dragState.startX,o=t.clientY-this.dragState.startY,a=this.dragState.startLeft+e,s=this.dragState.startTop+o;this.selectedElement.style.left=`${a}px`,this.selectedElement.style.top=`${s}px`,this.recordStyleChange("left",`${a}px`),this.recordStyleChange("top",`${s}px`),this.repositionOverlays()}handleDragEnd(){this.dragState.isDragging=!1,this.selectedElement&&(this.selectedElement.style.transition=this._originalTransition),document.removeEventListener("mousemove",this.handleDragMove),document.removeEventListener("mouseup",this.handleDragEnd)}handleResizeStart(t){if(!this.active||!this.selectedElement)return;t.preventDefault(),t.stopPropagation();const e=this.selectedElement,o=window.getComputedStyle(e),a=e.getBoundingClientRect();this._originalTransition=e.style.transition||"",e.style.setProperty("transition","none","important"),this.resizeState={isResizing:!0,handle:t.target.dataset.handle,startX:t.clientX,startY:t.clientY,startWidth:a.width,startHeight:a.height,startLeft:parseFloat(o.left)||0,startTop:parseFloat(o.top)||0},document.addEventListener("mousemove",this.handleResizeMove),document.addEventListener("mouseup",this.handleResizeEnd)}handleResizeMove(t){if(!this.resizeState.isResizing||!this.selectedElement)return;const e=this.selectedElement,o=this.resizeState,a=t.clientX-o.startX,s=t.clientY-o.startY;let l=o.startWidth,n=o.startHeight,d=o.startLeft,f=o.startTop;const h=10;if(o.handle.includes("r")&&(l=Math.max(h,o.startWidth+a)),o.handle.includes("b")&&(n=Math.max(h,o.startHeight+s)),o.handle.includes("l")){const u=o.startWidth-a;u>h&&(l=u,d=o.startLeft+a)}if(o.handle.includes("t")){const u=o.startHeight-s;u>h&&(n=u,f=o.startTop+s)}(o.handle.includes("r")||o.handle.includes("l"))&&(e.style.width=`${l}px`,this.recordStyleChange("width",`${l}px`)),(o.handle.includes("b")||o.handle.includes("t"))&&(e.style.height=`${n}px`,this.recordStyleChange("height",`${n}px`)),o.handle.includes("l")&&(e.style.left=`${d}px`,this.recordStyleChange("left",`${d}px`)),o.handle.includes("t")&&(e.style.top=`${f}px`,this.recordStyleChange("top",`${f}px`)),this.repositionOverlays()}handleResizeEnd(){this.resizeState.isResizing=!1,this.selectedElement&&(this.selectedElement.style.transition=this._originalTransition),document.removeEventListener("mousemove",this.handleResizeMove),document.removeEventListener("mouseup",this.handleResizeEnd)}handleStyleChange(t,e,o=this.selectedElement){o&&(o.style[t]=e,this.recordStyleChange(t,e,o),o===this.selectedElement&&this.repositionOverlays())}recordStyleChange(t,e,o=this.selectedElement){const a=E(o);a&&(this.draftChanges[a]||(this.draftChanges[a]={styles:{},text:void 0}),this.draftChanges[a].styles||(this.draftChanges[a].styles={}),this.draftChanges[a].styles[t]=e)}saveChanges(){const t=g();Object.entries(this.draftChanges).forEach(([o,a])=>{t[o]||(t[o]={styles:{},text:void 0}),a.styles&&(t[o].styles={...t[o].styles,...a.styles}),a.text!==void 0&&(t[o].text=a.text)}),D(t),this.draftChanges={};const e=this.generateCSSExport(t);this.ui.showToast("All modifications saved successfully!","success"),this.ui.showCodeExport(e)}cancelChanges(){B(this.draftChanges),this.draftChanges={},this.ui.showToast("Changes discarded.","info"),this.deselectElement()}resetAllChanges(){H(),this.draftChanges={},this.ui.showToast("All visual overrides reset.","danger"),this.deselectElement()}generateCSSExport(t){let e="";return Object.entries(t).forEach(([o,a])=>{const s=a.styles||{},l=Object.keys(s);l.length>0&&(e+=`${o} {
`,l.forEach(n=>{const d=q(n);e+=`  ${d}: ${s[n]};
`}),e+=`}

`)}),e||"/* No style edits generated */"}handleGlobalFontChange(t){t&&(document.body.style.fontFamily=t,this.draftChanges.body||(this.draftChanges.body={styles:{},text:void 0}),this.draftChanges.body.styles||(this.draftChanges.body.styles={}),this.draftChanges.body.styles.fontFamily=t,z(this.draftChanges,!0),this.ui.showToast(`Set global website font to "${t}"`,"success"))}}try{N()}catch(i){console.error("Canvas: Failed to initialize saved modifications",i)}function T(){if(!window.__CanvasEditor){if(!document.body){window.addEventListener("DOMContentLoaded",T);return}try{window.__CanvasEditor=new G,console.log("Canvas Visual Editor initialized successfully!")}catch(i){console.error("Canvas: Failed to initialize editor",i)}}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",T):T()})();
