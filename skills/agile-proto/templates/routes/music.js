import { html } from "htm/preact";
import { useState } from "preact/hooks";
import { Button, TabsList, Tab, Icon } from "~/components/ui.js";

const PLAYLISTS = [
  { icon: "lucide:play-circle", label: "Listen Now", active: true },
  { icon: "lucide:layout-grid", label: "Browse" },
  { icon: "lucide:radio", label: "Radio" },
];

const LIBRARY = [
  { icon: "lucide:list-music", label: "Playlists" },
  { icon: "lucide:music-2", label: "Songs" },
  { icon: "lucide:user", label: "Made for You" },
  { icon: "lucide:mic-2", label: "Artists" },
  { icon: "lucide:disc-3", label: "Albums" },
];

const MY_PLAYLISTS = [
  "Recently Added", "Recently Played", "Top Songs", "Top Albums",
  "Top Artists", "Logic Discography", "Bedtime Beats", "Feeling Happy",
];

const ALBUMS = [
  { title: "React Rendezvous", artist: "Ethan Byte", img: "bg-gradient-to-br from-rose-400 to-orange-300" },
  { title: "Async Awakenings", artist: "Nina Netcode", img: "bg-gradient-to-br from-blue-400 to-cyan-300" },
  { title: "The Art of Reusability", artist: "Lena Logic", img: "bg-gradient-to-br from-green-400 to-emerald-300" },
  { title: "Stateful Symphony", artist: "Beth Binary", img: "bg-gradient-to-br from-purple-400 to-pink-300" },
];

const MADE_FOR_YOU = [
  { title: "Thinking Components", artist: "Lena Logic", img: "bg-gradient-to-br from-amber-400 to-yellow-300" },
  { title: "Functional Fury", artist: "Beth Binary", img: "bg-gradient-to-br from-red-400 to-rose-300" },
  { title: "React Rendezvous", artist: "Ethan Byte", img: "bg-gradient-to-br from-indigo-400 to-blue-300" },
  { title: "Stateful Symphony", artist: "Beth Binary", img: "bg-gradient-to-br from-teal-400 to-green-300" },
  { title: "Async Awakenings", artist: "Nina Netcode", img: "bg-gradient-to-br from-fuchsia-400 to-purple-300" },
  { title: "The Art of Reusability", artist: "Lena Logic", img: "bg-gradient-to-br from-sky-400 to-cyan-300" },
];

function NavItem({ icon, label, active }) {
  return html`
    <a class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${active ? 'bg-base-200 text-base-content' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}" href="#">
      <${Icon} icon=${icon} />
      ${label}
    </a>
  `;
}

function AlbumCard({ title, artist, img, wide }) {
  return html`
    <div class="space-y-3 ${wide ? 'w-[150px]' : 'w-[250px]'} shrink-0">
      <div class="${img} ${wide ? 'aspect-[16/9]' : 'aspect-square'} rounded-md w-full overflow-hidden"></div>
      <div>
        <h4 class="text-sm font-medium leading-none">${title}</h4>
        <p class="text-xs text-base-content/60 mt-1">${artist}</p>
      </div>
    </div>
  `;
}

export function MusicPage() {
  const [tab, setTab] = useState("music");

  return html`
    <div class="flex flex-1 w-full h-full overflow-hidden">
      <!-- Sidebar -->
      <div class="w-[220px] border-r border-base-300 flex flex-col bg-base-100 shrink-0">
        <div class="p-4 pb-2">
          <h2 class="text-lg font-semibold tracking-tight px-3">Discover</h2>
        </div>
        <div class="px-4 space-y-1">
          ${PLAYLISTS.map(p => html`<${NavItem} ...${p} />`)}
        </div>
        <div class="px-4 mt-6">
          <h2 class="text-lg font-semibold tracking-tight px-3 mb-2">Library</h2>
          <div class="space-y-1">
            ${LIBRARY.map(l => html`<${NavItem} ...${l} />`)}
          </div>
        </div>
        <div class="px-4 mt-6 flex-1 min-h-0 overflow-hidden">
          <h2 class="text-lg font-semibold tracking-tight px-3 mb-2">Playlists</h2>
          <div class="space-y-1 overflow-y-auto h-full pb-4 scrollbar-hidden">
            ${MY_PLAYLISTS.map(name => html`
              <a class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-base-content/60 hover:bg-base-200 hover:text-base-content" href="#">
                <${Icon} icon="lucide:list-music" size=${14} />
                ${name}
              </a>
            `)}
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="flex-1 flex flex-col overflow-y-auto min-w-0">
        <div class="p-6 pb-0">
          <div class="flex items-center justify-between">
            <${TabsList}>
              <${Tab} active=${tab === "music"} onClick=${() => setTab("music")}>Music<//>
              <${Tab} active=${tab === "podcasts"} onClick=${() => setTab("podcasts")}>Podcasts<//>
              <${Tab} active=${tab === "live"} onClick=${() => setTab("live")}>Live<//>
            <//>
            <${Button} size="sm">
              <${Icon} icon="lucide:plus-circle" size=${14} />
              Add music
            <//>
          </div>
        </div>

        <div class="p-6 space-y-8">
          <div>
            <h2 class="text-2xl font-semibold tracking-tight">Listen Now</h2>
            <p class="text-sm text-base-content/60 mt-1">Top picks for you. Updated daily.</p>
            <div class="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hidden">
              ${ALBUMS.map(a => html`<${AlbumCard} ...${a} />`)}
            </div>
          </div>

          <div>
            <h2 class="text-2xl font-semibold tracking-tight">Made for You</h2>
            <p class="text-sm text-base-content/60 mt-1">Your personal playlists. Updated daily.</p>
            <div class="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hidden">
              ${MADE_FOR_YOU.map(a => html`<${AlbumCard} ...${a} wide />`)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
