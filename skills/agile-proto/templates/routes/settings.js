import { html } from "htm/preact";
import { useState } from "preact/hooks";
import { Button, Input, Select, Textarea, Field, Toggle, Radio } from "~/components/ui.js";

function SettingsNav({ active, onSelect }) {
  const items = [
    { id: "profile", label: "Profile" },
    { id: "account", label: "Account" },
    { id: "appearance", label: "Appearance" },
    { id: "notifications", label: "Notifications" },
    { id: "display", label: "Display" },
  ];

  return html`
    <nav class="flex flex-col gap-1 w-[200px] shrink-0">
      ${items.map(item => html`
        <a
          key=${item.id}
          class="px-3 py-2 rounded-md text-sm font-medium ${active === item.id ? 'bg-base-200' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}"
          href="#"
          onClick=${(e) => { e.preventDefault(); onSelect(item.id); }}
        >
          ${item.label}
        </a>
      `)}
    </nav>
  `;
}

function ProfileForm() {
  return html`
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Profile</h3>
        <p class="text-sm text-base-content/60">This is how others will see you on the site.</p>
      </div>
      <div class="border-t border-base-300"></div>

      <div class="space-y-4 max-w-lg">
        <${Field} label="Username" hint="This is your public display name. It can be your real name or a pseudonym.">
          <${Input} value="shadcn" />
        <//>

        <${Field} label="Email" hint="You can manage verified email addresses in your email settings.">
          <${Select}>
            <option selected>m@example.com</option>
            <option>m@google.com</option>
            <option>m@support.com</option>
          <//>
        <//>

        <${Field} label="Bio" hint="You can @mention other users and organizations.">
          <${Textarea} rows="3">I own a computer.<//>
        <//>

        <fieldset class="fieldset">
          <label class="fieldset-label">URLs</label>
          <p class="text-xs text-base-content/60 mb-2">Add links to your website, blog, or social media profiles.</p>
          <div class="space-y-2">
            <${Input} value="https://shadcn.com" />
            <${Input} value="https://twitter.com/shadcn" />
          </div>
        </fieldset>

        <${Button} variant="primary" size="sm">Update profile<//>
      </div>
    </div>
  `;
}

function NotificationsForm() {
  return html`
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium">Notifications</h3>
        <p class="text-sm text-base-content/60">Configure how you receive notifications.</p>
      </div>
      <div class="border-t border-base-300"></div>

      <div class="space-y-4 max-w-lg">
        <div>
          <h4 class="text-sm font-medium mb-3">Notify me about...</h4>
          <div class="space-y-3">
            <label class="flex items-center gap-3">
              <${Radio} name="notify" checked />
              <span class="text-sm">All new messages</span>
            </label>
            <label class="flex items-center gap-3">
              <${Radio} name="notify" />
              <span class="text-sm">Direct messages and mentions</span>
            </label>
            <label class="flex items-center gap-3">
              <${Radio} name="notify" />
              <span class="text-sm">Nothing</span>
            </label>
          </div>
        </div>

        <div class="border-t border-base-300 pt-4">
          <h4 class="text-sm font-medium mb-3">Email Notifications</h4>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">Communication emails</p>
                <p class="text-xs text-base-content/60">Receive emails about your account activity.</p>
              </div>
              <${Toggle} checked />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">Marketing emails</p>
                <p class="text-xs text-base-content/60">Receive emails about new products and features.</p>
              </div>
              <${Toggle} />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium">Security emails</p>
                <p class="text-xs text-base-content/60">Receive emails about your account security.</p>
              </div>
              <${Toggle} checked />
            </div>
          </div>
        </div>

        <${Button} variant="primary" size="sm">Update notifications<//>
      </div>
    </div>
  `;
}

export function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return html`
    <div class="flex flex-col flex-1 w-full h-full overflow-y-auto">
      <div class="p-6">
        <div class="mb-6">
          <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
          <p class="text-base-content/60 text-sm mt-1">Manage your account settings and set e-mail preferences.</p>
        </div>
        <div class="border-t border-base-300"></div>
        <div class="flex gap-8 mt-6">
          <${SettingsNav} active=${tab} onSelect=${setTab} />
          <div class="flex-1 min-w-0">
            ${tab === "profile" && html`<${ProfileForm} />`}
            ${tab === "notifications" && html`<${NotificationsForm} />`}
            ${tab !== "profile" && tab !== "notifications" && html`
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium capitalize">${tab}</h3>
                  <p class="text-sm text-base-content/60">Configure your ${tab} preferences.</p>
                </div>
                <div class="border-t border-base-300"></div>
                <p class="text-sm text-base-content/60">This section is coming soon.</p>
              </div>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}
