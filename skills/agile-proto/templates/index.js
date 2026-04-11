import { html, render } from "htm/preact";
import { Fragment } from "preact";
import { createPortal } from "preact/compat";
import { Route, Switch, useLocation, Link } from "wouter-preact";

// Import scenes
import { HomePage } from "./routes/home.js";
import { DashboardPage } from "./routes/dashboard.js";
import { MusicPage } from "./routes/music.js";
import { TasksPage } from "./routes/tasks.js";
import { SettingsPage } from "./routes/settings.js";
import { ComponentsPage } from "./routes/components.js";

// ─────────────────────────────────────────────────────────────────────────────
// Scene definitions
// ─────────────────────────────────────────────────────────────────────────────
const SCENES = [
  { path: "/", label: "Dashboard", Component: DashboardPage },
  { path: "/music", label: "Music App", Component: MusicPage },
  { path: "/tasks", label: "Tasks", Component: TasksPage },
  { path: "/settings", label: "Settings", Component: SettingsPage },
  { path: "/components", label: "Components", Component: ComponentsPage },
  { path: "/home", label: "Home Example", Component: HomePage },
];

// ─────────────────────────────────────────────────────────────────────────────
// Scene navigator (renders inside z-proto-header)
// ─────────────────────────────────────────────────────────────────────────────
const headerEl = document.querySelector("z-proto-header");

function SceneNav() {
  const [location, setLocation] = useLocation();
  const idx = SCENES.findIndex((s) => s.path === location);
  const currentIdx = idx >= 0 ? idx : 0;
  const prev = () => setLocation(SCENES[(currentIdx - 1 + SCENES.length) % SCENES.length].path);
  const next = () => setLocation(SCENES[(currentIdx + 1) % SCENES.length].path);
  const current = SCENES[currentIdx];

  return html`
    <div class="flex items-center gap-1">
      <button
        type="button"
        onClick=${prev}
        class="px-1.5 py-0.5 rounded text-xs opacity-50 hover:opacity-100"
      >←</button>
      <select
        value=${current.path}
        onChange=${(e) => setLocation(e.target.value)}
        class="zp-select"
      >
        ${SCENES.map((s) => html`<option value=${s.path}>${s.label}</option>`)}
      </select>
      <button
        type="button"
        onClick=${next}
        class="px-1.5 py-0.5 rounded text-xs opacity-50 hover:opacity-100"
      >→</button>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
// App
// ─────────────────────────────────────────────────────────────────────────────
function App() {
  return html`
    <${Fragment}>
      ${headerEl && createPortal(html`<${SceneNav} />`, headerEl)}
      <div class="flex flex-1 w-full min-h-0 min-w-0 overflow-hidden">
        <${Switch}>
          ${SCENES.map((s) => html`
            <${Route} key=${s.path} path=${s.path} component=${s.Component} />
          `)}
        <//>
      </div>
    <//>
  `;
}

render(html`<${App} />`, document.getElementById("app"));

// Force z-proto to recalculate window dimensions after first render.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const presetSelect = document.querySelector("z-proto [data-ref='preset']");
    if (presetSelect && presetSelect.value === "desktop") {
      presetSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
});
