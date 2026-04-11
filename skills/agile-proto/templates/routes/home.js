import { html } from "htm/preact";
import { useState } from "preact/hooks";
import { Button, Card, CardBody, CardTitle, CardActions, Input, Select, Field, Badge, Alert, Toggle, Icon } from "~/components/ui.js";

export function HomePage() {
  const [count, setCount] = useState(0);

  return html`
    <div class="flex flex-col flex-1 w-full h-full overflow-y-auto">
      <!-- Hero -->
      <div class="hero bg-base-200 py-12">
        <div class="hero-content text-center">
          <div class="max-w-md">
            <h1 class="text-4xl font-bold">Hello Proto</h1>
            <p class="py-4 text-base-content/70">
              This is a prototype built with daisyUI + z-proto.
              Edit routes/ to add your screens.
            </p>
            <${Button} onClick=${() => setCount((c) => c + 1)}>
              <${Icon} icon="lucide:mouse-pointer-click" />
              Clicked ${count} times
            <//>
          </div>
        </div>
      </div>

      <!-- Component showcase -->
      <div class="p-6 space-y-6 max-w-2xl mx-auto w-full">
        <!-- Cards -->
        <${Card}>
          <${CardBody}>
            <${CardTitle}>
              <${Icon} icon="lucide:layout-dashboard" size=${20} />
              Example Card
            <//>
            <p>Cards, buttons, inputs, badges — all from daisyUI.</p>
            <${CardActions}>
              <${Button} variant="outline" size="sm">Cancel<//>
              <${Button} size="sm">Save<//>
            <//>
          <//>
        <//>

        <!-- Form example -->
        <${Card}>
          <${CardBody}>
            <${CardTitle}>
              <${Icon} icon="lucide:settings" size=${20} />
              Settings
            <//>
            <${Field} label="Name">
              <${Input} value="John Doe" />
            <//>
            <${Field} label="Email">
              <${Input} type="email" value="john@example.com" />
            <//>
            <${Field} label="Role">
              <${Select}>
                <option selected>Admin</option>
                <option>Editor</option>
                <option>Viewer</option>
              <//>
            <//>
            <div class="flex items-center gap-2 mt-2">
              <${Toggle} checked />
              <span class="text-sm">Receive notifications</span>
            </div>
          <//>
        <//>

        <!-- Badges -->
        <div class="flex flex-wrap gap-2">
          <${Badge}>Primary<//>
          <${Badge} variant="secondary">Secondary<//>
          <${Badge} variant="outline">Outline<//>
          <${Badge} variant="ghost">Ghost<//>
          <${Badge} variant="destructive">Destructive<//>
        </div>

        <!-- Alert -->
        <${Alert} variant="info" icon="lucide:info">
          Prototypes are throwaway — don't architect for reuse.
        <//>
      </div>
    </div>
  `;
}
