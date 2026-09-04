import { html, render } from "htm/preact";
import { createPortal } from "preact/compat";
import { useEffect } from "preact/hooks";
import { LocationProvider, Route, Router, useLocation } from "preact-iso";
import { HomePage } from "./routes/home.js";

const BASE = new URL(document.baseURI).pathname.replace(/\/$/, "");
const ROOT_PATH = `${BASE}/` || "/";

function withBase(path) {
  const localPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${localPath}` || "/";
}

function normalizePath(path = "/") {
  const normalized = path.replace(/\/$/, "");
  return normalized || "/";
}

// Product scenes — one per file in routes/. Official UI examples
// (dashboard, tasks, music, …) live in the HTM UI repository, not in this skeleton.

const SCENES = [
  {
    id: "home",
    path: withBase("/home"),
    label: "Home",
    Component: HomePage,
    pageLabel: "Home",
  },
];

const headerEl = document.querySelector("z-proto-header");

function getSceneFromPath(path) {
  const normalized = normalizePath(path);
  if (normalized === normalizePath(ROOT_PATH)) return SCENES[0];
  return SCENES.find((scene) => normalizePath(scene.path) === normalized) || SCENES[0];
}

function getSceneFromUrlHints() {
  const routeParam = new URLSearchParams(window.location.search).get("route");
  if (routeParam) {
    const scene = SCENES.find((item) => item.id === routeParam);
    if (scene) return scene;
  }

  const legacyHashRoute = window.location.hash
    .replace(/^#/, "")
    .split("&")[0]
    .split("?")[0];

  if (legacyHashRoute && legacyHashRoute !== "figmacapture" && !legacyHashRoute.startsWith("figmacapture=")) {
    return SCENES.find((item) => item.id === legacyHashRoute);
  }

  return null;
}

function CaptureRouteBridge() {
  const { path, route } = useLocation();

  useEffect(() => {
    const hintedScene = getSceneFromUrlHints();
    if (!hintedScene) return;
    if (normalizePath(path) === normalizePath(hintedScene.path)) return;

    const captureHash = window.location.hash.startsWith("#figmacapture") ? window.location.hash : "";
    route(`${hintedScene.path}${captureHash}`);
  }, [path, route]);

  return null;
}

function SceneNav() {
  const { path, route } = useLocation();
  const current = getSceneFromUrlHints() || getSceneFromPath(path);
  const idx = SCENES.indexOf(current);

  const prev = () => route(SCENES[(idx - 1 + SCENES.length) % SCENES.length].path);
  const next = () => route(SCENES[(idx + 1) % SCENES.length].path);

  return html`
    <div class="flex items-center gap-1">
      <button
        type="button"
        onClick=${prev}
        class="px-1.5 py-0.5 rounded text-xs text-muted-foreground hover:text-foreground"
        title="Previous scene"
      >←</button>
      <select
        value=${current.path}
        onChange=${(event) => route(event.target.value)}
        class="zp-select"
      >
        ${SCENES.map((scene) => html`<option value=${scene.path}>${scene.label}</option>`)}
      </select>
      <button
        type="button"
        onClick=${next}
        class="px-1.5 py-0.5 rounded text-xs text-muted-foreground hover:text-foreground"
        title="Next scene"
      >→</button>
    </div>
  `;
}

function SceneFrame({ scene }) {
  const Scene = scene.Component;
  return html`<${Scene} />`;
}

function AppRoutes() {
  return html`
    <${Router}>
      <${Route} path=${ROOT_PATH} component=${() => html`<${SceneFrame} scene=${SCENES[0]} />`} />
      ${SCENES.map(
        (scene) => html`
          <${Route}
            key=${scene.id}
            path=${scene.path}
            component=${() => html`<${SceneFrame} scene=${scene} />`}
          />
        `,
      )}
    <//>
  `;
}

function App() {
  return html`
    <${LocationProvider}>
      <${CaptureRouteBridge} />
      ${headerEl && createPortal(html`<${SceneNav} />`, headerEl)}
      <${AppRoutes} />
    <//>
  `;
}

render(html`<${App} />`, document.getElementById("app"));

// Recompute the z-proto viewport after the first render (flex has not
// settled yet and content may clip in the desktop preset until the preset changes).
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const presetSelect = document.querySelector("z-proto [data-ref='preset']");
    if (presetSelect && presetSelect.value === "desktop") {
      presetSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
});
