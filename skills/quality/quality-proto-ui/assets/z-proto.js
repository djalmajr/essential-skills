// z-proto — prototyping shell web component (Light DOM)

let sheet = null;
const sheetPromise = (async () => {
  try {
    // Try CSS module import (native browser support)
    const m = await import("./z-proto.css", { with: { type: "css" } });
    sheet = m.default;
  } catch {
    // Fallback: fetch CSS text and create CSSStyleSheet manually (Vite/bundler)
    const url = new URL("./z-proto.css", import.meta.url).href;
    const res = await fetch(url);
    const text = await res.text();
    sheet = new CSSStyleSheet();
    sheet.replaceSync(text);
  }
})();

const PRESETS = [
  { id: "desktop", label: "Desktop" },
  { id: "mobile-s", label: "Mobile S", width: 320, height: 568 },
  { id: "iphone-se", label: "iPhone SE", width: 375, height: 667 },
  { id: "iphone-xr", label: "iPhone XR", width: 414, height: 896 },
  { id: "iphone-12-pro", label: "iPhone 12 Pro", width: 390, height: 844 },
  { id: "iphone-14", label: "iPhone 14", width: 393, height: 852 },
  { id: "iphone-14-pro-max", label: "iPhone 14 Pro Max", width: 430, height: 932 },
  { id: "pixel-7", label: "Pixel 7", width: 412, height: 915 },
  { id: "galaxy-s8-plus", label: "Galaxy S8+", width: 360, height: 740 },
  { id: "galaxy-s20-ultra", label: "Galaxy S20 Ultra", width: 412, height: 915 },
  { id: "desktop-app", label: "Desktop App", width: 480, height: 640 },
  { id: "ipad-mini", label: "iPad Mini", width: 768, height: 1024 },
  { id: "ipad-air", label: "iPad Air", width: 820, height: 1180 },
  { id: "ipad-pro", label: "iPad Pro", width: 1024, height: 1366 },
  { id: "surface-pro-7", label: "Surface Pro 7", width: 912, height: 1368 },
];

const ZOOMS = [0.5, 0.75, 0.92, 1, 1.25];
const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;
const MIN_WIDTH = 320;
const MIN_HEIGHT = 400;

const EDGES = ["n", "s", "e", "w", "nw", "ne", "sw", "se"];

const SVG_NS = "http://www.w3.org/2000/svg";

// Figma logo SVG paths (lucide:figma)
const FIGMA_PATHS = [
  "M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z",
  "M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z",
  "M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z",
  "M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z",
  "M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z",
];

// --- Helpers ---

function $(tag, attrs, children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "hidden" && value) {
        node.hidden = true;
      } else if (key.startsWith("data-")) {
        node.setAttribute(key, value);
      } else if (key === "className") {
        node.className = value;
      } else if (key === "type" || key === "value" || key === "href" || key === "title") {
        node.setAttribute(key, value);
      }
    }
  }
  if (children) {
    if (typeof children === "string") {
      node.textContent = children;
    } else if (Array.isArray(children)) {
      for (const child of children) {
        if (child)
          node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
      }
    } else {
      node.appendChild(children);
    }
  }
  return node;
}

function createFigmaSvg() {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  for (const d of FIGMA_PATHS) {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    svg.appendChild(path);
  }
  return svg;
}

// --- ZProto ---

class ZProto extends HTMLElement {
  static observedAttributes = [
    "figma-key",
    "window-title",
    "window-width",
    "window-height",
    "zoom",
  ];

  /** @type {Record<string, HTMLElement>} */
  #refs = {};

  #state = {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    zoom: 1,
    activePresetId: null,
    mode: "manual",
  };

  /** @type {{ edge: string, pointerId: number, startX: number, startY: number, startWidth: number, startHeight: number } | null} */
  #dragSession = null;

  #boundPointerMove = this.#handlePointerMove.bind(this);
  #boundPointerEnd = this.#handlePointerEnd.bind(this);
  #boundWindowResize = this.#handleWindowResize.bind(this);

  async connectedCallback() {
    // Wait for stylesheet to load, then adopt
    await sheetPromise;
    if (sheet && !document.adoptedStyleSheets.includes(sheet)) {
      document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
    }

    // Save child slot elements before rendering
    const headerEl = this.querySelector("z-proto-header");
    const extrasEl = this.querySelector("z-proto-extras");
    const contentEl = this.querySelector("z-proto-body");

    // Read initial attributes from z-proto-body
    const hasWidth = contentEl?.getAttribute("width") || this.getAttribute("window-width");
    const hasHeight = contentEl?.getAttribute("height") || this.getAttribute("window-height");
    this.#state.width = Number(hasWidth) || DEFAULT_WIDTH;
    this.#state.height = Number(hasHeight) || DEFAULT_HEIGHT;
    this.#state.zoom = Number(this.getAttribute("zoom")) || 1;

    // Default to desktop mode if no dimensions specified
    if (!hasWidth && !hasHeight) {
      this.#state.activePresetId = "desktop";
    }

    // Title from z-proto-body or z-proto
    if (contentEl?.getAttribute("title")) {
      this.setAttribute("window-title", contentEl.getAttribute("title"));
    }

    // Build DOM
    this.#render();

    // Redistribute children
    if (headerEl) {
      this.#refs.header.hidden = false;
      this.#refs.header.appendChild(headerEl);
    }
    if (extrasEl) {
      this.#refs.extras.appendChild(extrasEl);
    }
    if (contentEl) {
      this.#refs.content.appendChild(contentEl);
    }

    // Apply initial attribute state
    this.#updateTitle();
    this.#updateFigmaLink();
    this.#updateViewport();

    // Attach listeners
    this.#refs.preset.addEventListener("change", (e) => this.#handlePresetSelect(e.target.value));
    this.#refs.width.addEventListener("change", (e) => this.#handleWidthInput(e.target.value));
    this.#refs.height.addEventListener("change", (e) => this.#handleHeightInput(e.target.value));
    this.#refs.zoom.addEventListener("change", (e) => this.#setZoom(Number(e.target.value)));

    // Delegated handle listeners
    for (const handle of this.#refs.frame.querySelectorAll(".zp-handle")) {
      handle.addEventListener("pointerdown", (e) => this.#startResize(handle.dataset.edge, e));
    }

    // Window resize for full mode
    window.addEventListener("resize", this.#boundWindowResize);
  }

  disconnectedCallback() {
    window.removeEventListener("pointermove", this.#boundPointerMove);
    window.removeEventListener("pointerup", this.#boundPointerEnd);
    window.removeEventListener("pointercancel", this.#boundPointerEnd);
    window.removeEventListener("resize", this.#boundWindowResize);
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (!this.#refs.title) return; // not yet rendered

    switch (name) {
      case "window-title":
        this.#updateTitle();
        break;
      case "window-width": {
        const w = Number(newValue) || DEFAULT_WIDTH;
        this.#applyDimensions(w, this.#state.height, "manual");
        break;
      }
      case "window-height": {
        const h = Number(newValue) || DEFAULT_HEIGHT;
        this.#applyDimensions(this.#state.width, h, "manual");
        break;
      }
      case "zoom":
        this.#setZoom(Number(newValue) || 1);
        break;
      case "figma-key":
        this.#updateFigmaLink();
        break;
    }
  }

  // --- Render ---

  #render() {
    const presetOptions = [
      $("option", { value: "desktop" }, "Desktop"),
      $("option", { value: "responsive" }, "Responsive"),
      ...PRESETS.filter((p) => p.id !== "desktop").map((p) =>
        $("option", { value: p.id }, p.label),
      ),
    ];

    const zoomOptions = ZOOMS.map((z) =>
      $("option", { value: String(z) }, `${Math.round(z * 100)}%`),
    );

    const presetSelect = $(
      "select",
      { className: "zp-select", "data-ref": "preset" },
      presetOptions,
    );
    const widthInput = $("input", { className: "zp-input", "data-ref": "width", type: "number" });
    const heightInput = $("input", { className: "zp-input", "data-ref": "height", type: "number" });
    const zoomSelect = $("select", { className: "zp-select", "data-ref": "zoom" }, zoomOptions);

    const figmaLink = $(
      "a",
      {
        className: "zp-figma-link",
        "data-ref": "figma",
        hidden: true,
        title: "Send to Figma",
      },
      [createFigmaSvg(), "Figma"],
    );

    const dimGroup = $("div", { className: "zp-dim-group" }, [
      widthInput,
      $("span", { className: "zp-dim-sep" }, "\u00D7"),
      heightInput,
    ]);

    const toolbar = $("div", { className: "zp-toolbar" }, [
      presetSelect,
      dimGroup,
      zoomSelect,
      figmaLink,
    ]);

    const header = $("div", { className: "zp-header", "data-ref": "header", hidden: true });

    // Traffic lights
    const trafficLights = $("div", { className: "zp-traffic-lights" }, [
      $("span", { className: "zp-tl zp-tl-red" }),
      $("span", { className: "zp-tl zp-tl-yellow" }),
      $("span", { className: "zp-tl zp-tl-green" }),
    ]);

    const titleCenter = $("div", { className: "zp-titlebar-center", "data-ref": "title" });
    const titleExtras = $("div", { className: "zp-titlebar-extras", "data-ref": "extras" });

    const titlebar = $("div", { className: "zp-titlebar" }, [
      trafficLights,
      titleCenter,
      titleExtras,
    ]);

    const contentInner = $("div", { className: "zp-content-inner", "data-ref": "content" });
    const contentScroll = $("div", { className: "zp-content-scroll" }, contentInner);
    const contentArea = $("div", { className: "zp-content" }, contentScroll);

    const windowEl = $("div", { className: "zp-window", "data-ref": "window" }, [
      titlebar,
      contentArea,
    ]);

    const scaleWrapper = $("div", { className: "zp-scale-wrapper", "data-ref": "scale" }, windowEl);

    // Resize handles
    const handles = EDGES.map((edge) =>
      $("div", { className: `zp-handle zp-handle-${edge}`, "data-edge": edge }),
    );

    const frameWrapper = $("div", { className: "zp-frame-wrapper", "data-ref": "frame" }, [
      scaleWrapper,
      ...handles,
    ]);

    const viewportCenter = $("div", { className: "zp-viewport-center" }, frameWrapper);

    const stage = $("div", { className: "zp-stage" }, [toolbar, header, viewportCenter]);

    this.appendChild(stage);

    // Cache refs
    this.#refs = {};
    for (const refEl of this.querySelectorAll("[data-ref]")) {
      this.#refs[refEl.dataset.ref] = refEl;
    }
  }

  // --- Title ---

  #updateTitle() {
    const title = this.getAttribute("window-title") || "";
    this.#refs.title.textContent = title;
  }

  // --- Figma ---

  #updateFigmaLink() {
    const key = this.getAttribute("figma-key") || "";
    const link = this.#refs.figma;
    if (key) {
      link.hidden = false;
      link.href = `#figmacapture=${key}&figmaendpoint=https://mcp.figma.com&figmaselector=*`;
      this.#ensureFigmaCaptureScript();
    } else {
      link.hidden = true;
      link.removeAttribute("href");
    }
  }

  #ensureFigmaCaptureScript() {
    if (document.getElementById("zp-figma-capture")) return;
    const script = document.createElement("script");
    script.id = "zp-figma-capture";
    script.async = true;
    script.src = "https://mcp.figma.com/mcp/html-to-design/capture.js";
    document.body.appendChild(script);
  }

  // --- Viewport ---

  #findMatchingPreset(width, height) {
    return PRESETS.find((p) => p.width === width && p.height === height) ?? null;
  }

  #getMaxDimensions() {
    const padding = 64;
    return {
      width: Math.max(MIN_WIDTH, window.innerWidth - padding * 2),
      height: Math.max(MIN_HEIGHT, window.innerHeight - 120),
    };
  }

  #clampDimensions(width, height) {
    const max = this.#getMaxDimensions();
    return {
      width: Math.min(Math.max(Math.round(width), MIN_WIDTH), max.width),
      height: Math.min(Math.max(Math.round(height), MIN_HEIGHT), max.height),
    };
  }

  #applyDimensions(width, height, mode) {
    const next = this.#clampDimensions(width, height);
    const preset = this.#findMatchingPreset(next.width, next.height);
    this.#state.width = next.width;
    this.#state.height = next.height;
    this.#state.activePresetId = preset?.id ?? null;
    this.#state.mode = mode;
    this.#updateViewport();
    this.#emitViewportChange();
  }

  #setZoom(value) {
    this.#state.zoom = value;
    this.#updateViewport();
    this.#emitViewportChange();
  }

  #updateViewport() {
    const { width, height, zoom, activePresetId } = this.#state;
    const isFull = activePresetId === "desktop";
    const scaledWidth = Math.round(width * zoom);
    const scaledHeight = Math.round(height * zoom);
    const isDragging = this.#dragSession !== null;

    // Update controls
    this.#refs.preset.value = activePresetId ?? "responsive";
    this.#refs.width.value = width;
    this.#refs.height.value = height;
    this.#refs.zoom.value = String(zoom);
    this.#refs.width.disabled = isFull;
    this.#refs.height.disabled = isFull;

    // Full mode: hide window chrome, handles, fill viewport
    const titlebar = this.#refs.window.querySelector(".zp-titlebar");
    const viewportCenter = this.#refs.frame.closest(".zp-viewport-center");
    if (titlebar) titlebar.style.display = isFull ? "none" : "";
    this.#refs.window.style.borderRadius = isFull ? "0" : "";
    this.#refs.window.style.boxShadow = isFull ? "none" : "";
    this.#refs.window.style.border = isFull ? "none" : "";
    if (viewportCenter) {
      viewportCenter.style.padding = isFull ? "0" : "";
      viewportCenter.style.width = isFull ? "100%" : "";
      viewportCenter.style.alignItems = isFull ? "stretch" : "";
      viewportCenter.style.justifyContent = isFull ? "stretch" : "";
    }
    for (const handle of this.#refs.frame.querySelectorAll(".zp-handle")) {
      handle.style.display = isFull ? "none" : "";
    }

    if (isFull) {
      // Fill viewport center — use explicit pixel dimensions from viewport
      const vcRect = this.#refs.frame.closest(".zp-viewport-center")?.getBoundingClientRect();
      const fullW = Math.round(vcRect?.width ?? window.innerWidth);
      const fullH = Math.round(vcRect?.height ?? window.innerHeight - 40);
      this.#refs.frame.style.width = `${fullW}px`;
      this.#refs.frame.style.height = `${fullH}px`;
      this.#refs.frame.style.alignItems = "stretch";
      this.#refs.scale.style.transform = "";
      this.#refs.scale.style.position = "static";
      this.#refs.scale.style.width = "100%";
      this.#refs.scale.style.height = "100%";
      this.#refs.window.style.width = "100%";
      this.#refs.window.style.height = "100%";
      this.#refs.window.style.transitionProperty = "none";
    } else {
      // Update frame dimensions
      this.#refs.frame.style.width = `${scaledWidth}px`;
      this.#refs.frame.style.height = `${scaledHeight}px`;
      this.#refs.frame.style.alignItems = "";

      // Update scale
      this.#refs.scale.style.transform = `scale(${zoom})`;
      this.#refs.scale.style.position = "absolute";
      this.#refs.scale.style.inset = "0";
      this.#refs.scale.style.width = "";
      this.#refs.scale.style.height = "";

      // Update window size
      this.#refs.window.style.width = `${width}px`;
      this.#refs.window.style.height = `${height}px`;
      this.#refs.window.style.transitionProperty = "width, height";
      this.#refs.window.style.transitionDuration = isDragging ? "0ms" : "200ms";
    }
  }

  #emitViewportChange() {
    this.dispatchEvent(
      new CustomEvent("viewport-change", {
        bubbles: true,
        detail: {
          width: this.#state.width,
          height: this.#state.height,
          zoom: this.#state.zoom,
          preset: this.#state.activePresetId,
        },
      }),
    );
  }

  // --- Preset/input handlers ---

  #handlePresetSelect(value) {
    if (value === "responsive") {
      this.#state.activePresetId = null;
      this.#state.mode = "manual";
      this.#updateViewport();
      return;
    }
    if (value === "desktop") {
      const max = this.#getMaxDimensions();
      this.#state.width = max.width;
      this.#state.height = max.height;
      this.#state.activePresetId = "desktop";
      this.#state.mode = "preset";
      this.#updateViewport();
      this.#emitViewportChange();
      return;
    }
    const preset = PRESETS.find((p) => p.id === value);
    if (preset) {
      this.#state.width = preset.width;
      this.#state.height = preset.height;
      this.#state.activePresetId = preset.id;
      this.#state.mode = "preset";
      this.#updateViewport();
      this.#emitViewportChange();
    }
  }

  #handleWidthInput(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      this.#applyDimensions(parsed, this.#state.height, "manual");
    }
  }

  #handleHeightInput(value) {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed) && parsed > 0) {
      this.#applyDimensions(this.#state.width, parsed, "manual");
    }
  }

  #handleWindowResize() {
    if (this.#state.activePresetId === "desktop") {
      const max = this.#getMaxDimensions();
      this.#state.width = max.width;
      this.#state.height = max.height;
      this.#updateViewport();
    }
  }

  // --- Drag-to-resize ---

  #startResize(edge, event) {
    if (this.#state.activePresetId === "desktop") return;
    event.preventDefault();
    event.target.setPointerCapture(event.pointerId);
    this.#dragSession = {
      edge,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: this.#state.width,
      startHeight: this.#state.height,
    };
    this.#state.mode = "drag";
    this.#state.activePresetId = null;
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", this.#boundPointerMove);
    window.addEventListener("pointerup", this.#boundPointerEnd);
    window.addEventListener("pointercancel", this.#boundPointerEnd);
  }

  #handlePointerMove(event) {
    const session = this.#dragSession;
    if (!session || event.pointerId !== session.pointerId) return;

    const zoom = this.#state.zoom || 1;
    const deltaX = (event.clientX - session.startX) / zoom;
    const deltaY = (event.clientY - session.startY) / zoom;

    let nextWidth = session.startWidth;
    let nextHeight = session.startHeight;

    if (session.edge.includes("e")) nextWidth = session.startWidth + deltaX;
    if (session.edge.includes("w")) nextWidth = session.startWidth - deltaX;
    if (session.edge.includes("s")) nextHeight = session.startHeight + deltaY;
    if (session.edge.includes("n")) nextHeight = session.startHeight - deltaY;

    this.#applyDimensions(nextWidth, nextHeight, "drag");
  }

  #handlePointerEnd(event) {
    if (this.#dragSession?.pointerId !== event.pointerId) return;
    this.#finishDrag();
  }

  #finishDrag() {
    this.#dragSession = null;
    this.#state.mode = this.#state.activePresetId ? "preset" : "manual";
    window.removeEventListener("pointermove", this.#boundPointerMove);
    window.removeEventListener("pointerup", this.#boundPointerEnd);
    window.removeEventListener("pointercancel", this.#boundPointerEnd);
    document.body.style.userSelect = "";
  }
}

// --- Register child slot elements (empty markers) ---

class ZProtoHeader extends HTMLElement {}
class ZProtoWindowExtras extends HTMLElement {}
class ZProtoBody extends HTMLElement {}

if (!customElements.get("z-proto")) {
  customElements.define("z-proto", ZProto);
}
if (!customElements.get("z-proto-header")) {
  customElements.define("z-proto-header", ZProtoHeader);
}
if (!customElements.get("z-proto-extras")) {
  customElements.define("z-proto-extras", ZProtoWindowExtras);
}
if (!customElements.get("z-proto-body")) {
  customElements.define("z-proto-body", ZProtoBody);
}
