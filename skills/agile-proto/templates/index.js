import { html, render } from "htm/preact";
import { Fragment } from "preact";
import { createPortal } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { AppShell } from "./components/app-shell.js";
import { Button } from "./components/ui/button.js";
import { Icon } from "./components/ui/icon.js";
import { ComponentsPage } from "./routes/components.js";
import { DashboardPage } from "./routes/dashboard.js";
import { HomePage } from "./routes/home.js";
import { MusicPage } from "./routes/music.js";
import { SettingsPage } from "./routes/settings.js";
import { TasksPage } from "./routes/tasks.js";

// ─────────────────────────────────────────────────────────────────────────────
// Scenes — one per file in routes/. Each scene defines which sidebar item is
// active (activeUrl), and optionally pageLabel/breadcrumbs/actions.
// ─────────────────────────────────────────────────────────────────────────────

function DashboardActions() {
  return html`
    <${Button} size="sm">
      <${Icon} icon="lucide:plus" size=${14} />
      New item
    <//>
  `;
}

const SCENES = [
  {
    id: "dashboard",
    label: "Dashboard",
    Component: DashboardPage,
    activeUrl: "#dashboard",
    pageLabel: "Dashboard",
    actions: DashboardActions(),
  },
  {
    id: "home",
    label: "Home",
    Component: HomePage,
    activeUrl: "#home",
    pageLabel: "Home",
  },
  {
    id: "tasks",
    label: "Tasks (data table demo)",
    Component: TasksPage,
    activeUrl: "#tasks",
    pageLabel: "Tasks",
  },
  {
    id: "music",
    label: "Music (rich layout demo)",
    Component: MusicPage,
    activeUrl: "#music",
    pageLabel: "Music",
  },
  {
    id: "settings",
    label: "Settings",
    Component: SettingsPage,
    activeUrl: "#settings",
    pageLabel: "Settings",
  },
  {
    id: "components",
    label: "Components reference",
    Component: ComponentsPage,
    activeUrl: "#components",
    pageLabel: "Components",
  },
];

const headerEl = document.querySelector("z-proto-header");

function getSceneFromHash() {
  const hash = window.location.hash.replace(/^#/, "");
  return SCENES.find((s) => s.id === hash) || SCENES[0];
}

function useHashScene() {
  const [scene, setScene] = useState(getSceneFromHash);

  useEffect(() => {
    function onHashChange() {
      setScene(getSceneFromHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function go(id) {
    window.location.hash = id;
  }

  return [scene, go];
}

function SceneNav({ scene, go }) {
  const idx = SCENES.findIndex((s) => s.id === scene.id);
  const prev = () => go(SCENES[(idx - 1 + SCENES.length) % SCENES.length].id);
  const next = () => go(SCENES[(idx + 1) % SCENES.length].id);

  return html`
    <div class="flex items-center gap-1">
      <button
        type="button"
        onClick=${prev}
        class="px-1.5 py-0.5 rounded text-xs text-muted-foreground hover:text-foreground"
        title="Previous scene"
      >←</button>
      <select
        value=${scene.id}
        onChange=${(e) => go(e.target.value)}
        class="zp-select"
      >
        ${SCENES.map((s) => html`<option value=${s.id}>${s.label}</option>`)}
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

function App() {
  const [scene, go] = useHashScene();
  const Scene = scene.Component;

  const body = scene.noShell
    ? html`<${Scene} />`
    : html`
        <${AppShell}
          activeUrl=${scene.activeUrl}
          pageLabel=${scene.pageLabel}
          title=${scene.title}
          description=${scene.description}
          breadcrumbs=${scene.breadcrumbs}
          actions=${scene.actions}
        >
          <${Scene} />
        <//>
      `;

  return html`
    <${Fragment}>
      ${headerEl && createPortal(html`<${SceneNav} scene=${scene} go=${go} />`, headerEl)}
      ${body}
    <//>
  `;
}

render(html`<${App} />`, document.getElementById("app"));

// Force z-proto to recompute window dimensions after first render.
// Without this, on first render in desktop preset the vcRect is measured
// before flex layout settles (Preact hasn't mounted yet) and content gets
// clipped at the bottom until the user manually switches preset.
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    const presetSelect = document.querySelector("z-proto [data-ref='preset']");
    if (presetSelect && presetSelect.value === "desktop") {
      presetSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  });
});
