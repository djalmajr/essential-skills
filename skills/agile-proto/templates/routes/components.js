import { html } from "htm/preact";
import { useState } from "preact/hooks";

// ─────────────────────────────────────────────────────────────────────────────
// shadcn → daisyUI component mapping
// ─────────────────────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: "buttons",
    label: "Button",
    shadcn: "Button (variant, size)",
    render: () => html`
      <div class="space-y-6">
        <div>
          <h4 class="text-sm font-medium mb-3">Variants</h4>
          <div class="flex flex-wrap items-center gap-3">
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
            <button class="btn btn-outline">Outline</button>
            <button class="btn btn-ghost">Ghost</button>
            <button class="btn btn-link">Link</button>
            <button class="btn btn-error">Destructive</button>
          </div>
        </div>
        <div>
          <h4 class="text-sm font-medium mb-3">Sizes</h4>
          <div class="flex flex-wrap items-center gap-3">
            <button class="btn btn-primary btn-xs">Extra Small</button>
            <button class="btn btn-primary btn-sm">Small</button>
            <button class="btn btn-primary">Default</button>
            <button class="btn btn-primary btn-lg">Large</button>
          </div>
        </div>
        <div>
          <h4 class="text-sm font-medium mb-3">With Icon</h4>
          <div class="flex flex-wrap items-center gap-3">
            <button class="btn btn-primary btn-sm">
              <iconify-icon icon="lucide:mail" width="14"></iconify-icon>
              Login with Email
            </button>
            <button class="btn btn-outline btn-sm">
              <iconify-icon icon="lucide:loader-2" width="14" class="animate-spin"></iconify-icon>
              Please wait
            </button>
          </div>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Button variant="default|destructive|outline|secondary|ghost|link" size="default|sm|lg|icon"&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .btn .btn-primary|error|outline|secondary|ghost|link .btn-xs|sm|lg</p>
        </div>
      </div>
    `,
  },
  {
    id: "card",
    label: "Card",
    shadcn: "Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter",
    render: () => html`
      <div class="space-y-6">
        <div class="card bg-base-100 max-w-md">
          <div class="card-body">
            <h2 class="card-title">Card Title</h2>
            <p class="text-sm text-base-content/60">Card description goes here.</p>
            <p class="text-sm mt-2">Card content with some text and details.</p>
            <div class="card-actions justify-end mt-4">
              <button class="btn btn-outline btn-sm">Cancel</button>
              <button class="btn btn-primary btn-sm">Deploy</button>
            </div>
          </div>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Card&gt; &lt;CardHeader&gt; &lt;CardTitle&gt; &lt;CardContent&gt; &lt;CardFooter&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .card .card-body .card-title .card-actions</p>
        </div>
      </div>
    `,
  },
  {
    id: "input",
    label: "Input",
    shadcn: "Input, Label",
    render: () => html`
      <div class="space-y-4 max-w-sm">
        <fieldset class="fieldset">
          <label class="fieldset-label">Email</label>
          <input type="email" class="input input-bordered w-full" placeholder="m@example.com" />
        </fieldset>
        <fieldset class="fieldset">
          <label class="fieldset-label">Password</label>
          <input type="password" class="input input-bordered w-full" value="password123" />
        </fieldset>
        <fieldset class="fieldset">
          <label class="fieldset-label">Disabled</label>
          <input type="text" class="input input-bordered w-full" value="Can't edit" disabled />
        </fieldset>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Input type="" /&gt; + &lt;Label&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .input .input-bordered + .fieldset .fieldset-label</p>
        </div>
      </div>
    `,
  },
  {
    id: "textarea",
    label: "Textarea",
    shadcn: "Textarea",
    render: () => html`
      <div class="space-y-4 max-w-sm">
        <fieldset class="fieldset">
          <label class="fieldset-label">Message</label>
          <textarea class="textarea textarea-bordered w-full" rows="4" placeholder="Type your message here."></textarea>
          <p class="text-xs text-base-content/60 mt-1">Your message will be sent to support.</p>
        </fieldset>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Textarea /&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .textarea .textarea-bordered</p>
        </div>
      </div>
    `,
  },
  {
    id: "select",
    label: "Select",
    shadcn: "Select, SelectTrigger, SelectContent, SelectItem",
    render: () => html`
      <div class="space-y-4 max-w-sm">
        <fieldset class="fieldset">
          <label class="fieldset-label">Framework</label>
          <select class="select select-bordered w-full">
            <option disabled selected>Select a framework</option>
            <option>Next.js</option>
            <option>Remix</option>
            <option>Astro</option>
            <option>Nuxt</option>
          </select>
        </fieldset>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Select&gt; &lt;SelectTrigger&gt; &lt;SelectContent&gt; &lt;SelectItem&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .select .select-bordered + native &lt;option&gt;</p>
        </div>
      </div>
    `,
  },
  {
    id: "checkbox",
    label: "Checkbox",
    shadcn: "Checkbox",
    render: () => html`
      <div class="space-y-4">
        <label class="flex items-center gap-3">
          <input type="checkbox" class="checkbox checkbox-sm" checked />
          <span class="text-sm">Accept terms and conditions</span>
        </label>
        <label class="flex items-center gap-3">
          <input type="checkbox" class="checkbox checkbox-sm" />
          <div>
            <span class="text-sm font-medium">Marketing emails</span>
            <p class="text-xs text-base-content/60">Receive emails about new products.</p>
          </div>
        </label>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Checkbox /&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .checkbox .checkbox-sm</p>
        </div>
      </div>
    `,
  },
  {
    id: "toggle",
    label: "Switch / Toggle",
    shadcn: "Switch",
    render: () => html`
      <div class="space-y-4">
        <div class="flex items-center justify-between max-w-sm">
          <div>
            <p class="text-sm font-medium">Airplane Mode</p>
            <p class="text-xs text-base-content/60">Disable all wireless connections.</p>
          </div>
          <input type="checkbox" class="toggle toggle-sm" />
        </div>
        <div class="flex items-center justify-between max-w-sm">
          <div>
            <p class="text-sm font-medium">Notifications</p>
            <p class="text-xs text-base-content/60">Receive push notifications.</p>
          </div>
          <input type="checkbox" class="toggle toggle-sm" checked />
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Switch /&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .toggle .toggle-sm</p>
        </div>
      </div>
    `,
  },
  {
    id: "badge",
    label: "Badge",
    shadcn: "Badge (variant)",
    render: () => html`
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <div class="badge badge-primary">Primary</div>
          <div class="badge badge-secondary">Secondary</div>
          <div class="badge badge-outline">Outline</div>
          <div class="badge badge-ghost">Ghost</div>
          <div class="badge badge-error text-white">Destructive</div>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Badge variant="default|secondary|outline|destructive"&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .badge .badge-primary|secondary|outline|ghost|error</p>
        </div>
      </div>
    `,
  },
  {
    id: "alert",
    label: "Alert",
    shadcn: "Alert, AlertTitle, AlertDescription",
    render: () => html`
      <div class="space-y-4 max-w-lg">
        <div role="alert" class="alert">
          <iconify-icon icon="lucide:terminal" width="16"></iconify-icon>
          <div>
            <h3 class="font-bold text-sm">Heads up!</h3>
            <p class="text-xs">You can add components using the CLI.</p>
          </div>
        </div>
        <div role="alert" class="alert alert-error">
          <iconify-icon icon="lucide:alert-circle" width="16"></iconify-icon>
          <div>
            <h3 class="font-bold text-sm">Error</h3>
            <p class="text-xs">Your session has expired. Please log in again.</p>
          </div>
        </div>
        <div role="alert" class="alert alert-success">
          <iconify-icon icon="lucide:check-circle-2" width="16"></iconify-icon>
          <div>
            <h3 class="font-bold text-sm">Success</h3>
            <p class="text-xs">Your changes have been saved.</p>
          </div>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Alert&gt; &lt;AlertTitle&gt; &lt;AlertDescription&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .alert .alert-error|success|warning|info</p>
        </div>
      </div>
    `,
  },
  {
    id: "tabs",
    label: "Tabs",
    shadcn: "Tabs, TabsList, TabsTrigger, TabsContent",
    render: () => {
      const [tab, setTab] = useState("account");
      return html`
        <div class="space-y-4 max-w-lg">
          <div role="tablist" class="tabs tabs-box bg-base-200">
            <a role="tab" class="tab ${tab === 'account' ? 'tab-active' : ''}" onClick=${() => setTab("account")}>Account</a>
            <a role="tab" class="tab ${tab === 'password' ? 'tab-active' : ''}" onClick=${() => setTab("password")}>Password</a>
          </div>
          ${tab === "account" && html`
            <div class="card bg-base-100">
              <div class="card-body">
                <h3 class="font-semibold">Account</h3>
                <p class="text-sm text-base-content/60">Make changes to your account here.</p>
                <fieldset class="fieldset mt-2">
                  <label class="fieldset-label">Name</label>
                  <input type="text" class="input input-bordered w-full" value="Pedro Duarte" />
                </fieldset>
                <fieldset class="fieldset">
                  <label class="fieldset-label">Username</label>
                  <input type="text" class="input input-bordered w-full" value="@peduarte" />
                </fieldset>
                <button class="btn btn-primary btn-sm mt-2 w-fit">Save changes</button>
              </div>
            </div>
          `}
          ${tab === "password" && html`
            <div class="card bg-base-100">
              <div class="card-body">
                <h3 class="font-semibold">Password</h3>
                <p class="text-sm text-base-content/60">Change your password here.</p>
                <fieldset class="fieldset mt-2">
                  <label class="fieldset-label">Current password</label>
                  <input type="password" class="input input-bordered w-full" />
                </fieldset>
                <fieldset class="fieldset">
                  <label class="fieldset-label">New password</label>
                  <input type="password" class="input input-bordered w-full" />
                </fieldset>
                <button class="btn btn-primary btn-sm mt-2 w-fit">Save password</button>
              </div>
            </div>
          `}
          <div class="bg-base-200 rounded-md p-4">
            <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Tabs&gt; &lt;TabsList&gt; &lt;TabsTrigger&gt; &lt;TabsContent&gt;</p>
            <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .tabs .tabs-box .tab .tab-active + conditional render</p>
          </div>
        </div>
      `;
    },
  },
  {
    id: "avatar",
    label: "Avatar",
    shadcn: "Avatar, AvatarImage, AvatarFallback",
    render: () => html`
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img src="https://api.dicebear.com/9.x/initials/svg?seed=CN" alt="avatar" />
            </div>
          </div>
          <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-10 rounded-full">
              <span class="text-sm">CN</span>
            </div>
          </div>
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content w-10 rounded-full">
              <span class="text-sm">AB</span>
            </div>
          </div>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Avatar&gt; &lt;AvatarImage&gt; &lt;AvatarFallback&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .avatar .placeholder + .rounded-full</p>
        </div>
      </div>
    `,
  },
  {
    id: "separator",
    label: "Separator",
    shadcn: "Separator",
    render: () => html`
      <div class="space-y-4 max-w-sm">
        <div>
          <h4 class="text-sm font-medium">Radix Primitives</h4>
          <p class="text-sm text-base-content/60">An open-source UI component library.</p>
        </div>
        <div class="divider my-0"></div>
        <div class="flex items-center gap-4 text-sm">
          <span>Blog</span>
          <div class="divider divider-horizontal mx-0"></div>
          <span>Docs</span>
          <div class="divider divider-horizontal mx-0"></div>
          <span>Source</span>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Separator orientation="horizontal|vertical" /&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .divider .divider-horizontal</p>
        </div>
      </div>
    `,
  },
  {
    id: "table",
    label: "Table",
    shadcn: "Table, TableHeader, TableBody, TableRow, TableHead, TableCell",
    render: () => html`
      <div class="border border-base-300 rounded-lg overflow-hidden max-w-lg">
        <table class="table">
          <thead>
            <tr><th>Invoice</th><th>Status</th><th>Method</th><th class="text-right">Amount</th></tr>
          </thead>
          <tbody>
            <tr><td class="font-medium">INV001</td><td>Paid</td><td>Credit Card</td><td class="text-right">$250.00</td></tr>
            <tr><td class="font-medium">INV002</td><td>Pending</td><td>PayPal</td><td class="text-right">$150.00</td></tr>
            <tr><td class="font-medium">INV003</td><td>Unpaid</td><td>Bank Transfer</td><td class="text-right">$350.00</td></tr>
          </tbody>
          <tfoot>
            <tr><td colspan="3" class="font-medium">Total</td><td class="text-right font-medium">$750.00</td></tr>
          </tfoot>
        </table>
      </div>
      <div class="bg-base-200 rounded-md p-4 mt-4">
        <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Table&gt; &lt;TableHeader&gt; &lt;TableRow&gt; &lt;TableHead&gt; &lt;TableCell&gt;</p>
        <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .table + native &lt;table&gt; &lt;thead&gt; &lt;tbody&gt; &lt;tr&gt; &lt;th&gt; &lt;td&gt;</p>
      </div>
    `,
  },
  {
    id: "tooltip",
    label: "Tooltip",
    shadcn: "Tooltip, TooltipTrigger, TooltipContent",
    render: () => html`
      <div class="space-y-4">
        <div class="flex gap-4">
          <div class="tooltip" data-tip="Add to library">
            <button class="btn btn-outline btn-sm">
              <iconify-icon icon="lucide:plus" width="14"></iconify-icon>
              Hover me
            </button>
          </div>
        </div>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Tooltip&gt; &lt;TooltipTrigger&gt; &lt;TooltipContent&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .tooltip data-tip="text"</p>
        </div>
      </div>
    `,
  },
  {
    id: "modal",
    label: "Dialog / Modal",
    shadcn: "Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle",
    render: () => html`
      <div class="space-y-4">
        <button class="btn btn-outline btn-sm" onClick=${() => document.getElementById("demo_modal").showModal()}>
          Open Dialog
        </button>
        <dialog id="demo_modal" class="modal">
          <div class="modal-box">
            <h3 class="text-lg font-bold">Edit profile</h3>
            <p class="text-sm text-base-content/60 mt-1">Make changes to your profile here.</p>
            <fieldset class="fieldset mt-4">
              <label class="fieldset-label">Name</label>
              <input type="text" class="input input-bordered w-full" value="Pedro Duarte" />
            </fieldset>
            <fieldset class="fieldset">
              <label class="fieldset-label">Username</label>
              <input type="text" class="input input-bordered w-full" value="@peduarte" />
            </fieldset>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn btn-primary btn-sm">Save changes</button>
              </form>
            </div>
          </div>
          <form method="dialog" class="modal-backdrop"><button>close</button></form>
        </dialog>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Dialog&gt; &lt;DialogTrigger&gt; &lt;DialogContent&gt; &lt;DialogHeader&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .modal .modal-box .modal-action + &lt;dialog&gt; .showModal()</p>
        </div>
      </div>
    `,
  },
  {
    id: "progress",
    label: "Progress",
    shadcn: "Progress",
    render: () => html`
      <div class="space-y-4 max-w-sm">
        <progress class="progress progress-primary w-full" value="60" max="100"></progress>
        <progress class="progress progress-secondary w-full" value="30" max="100"></progress>
        <progress class="progress w-full" value="80" max="100"></progress>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Progress value={60} /&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .progress .progress-primary + native &lt;progress&gt;</p>
        </div>
      </div>
    `,
  },
  {
    id: "skeleton",
    label: "Skeleton",
    shadcn: "Skeleton",
    render: () => html`
      <div class="flex items-center gap-4 max-w-sm">
        <div class="skeleton w-12 h-12 rounded-full shrink-0"></div>
        <div class="flex flex-col gap-2 flex-1">
          <div class="skeleton h-4 w-3/4"></div>
          <div class="skeleton h-4 w-1/2"></div>
        </div>
      </div>
      <div class="bg-base-200 rounded-md p-4 mt-4">
        <p class="text-xs font-mono text-base-content/60">shadcn: &lt;Skeleton className="h-4 w-[200px]" /&gt;</p>
        <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .skeleton + size utilities</p>
      </div>
    `,
  },
  {
    id: "radio",
    label: "RadioGroup",
    shadcn: "RadioGroup, RadioGroupItem",
    render: () => html`
      <div class="space-y-3 max-w-sm">
        <label class="flex items-center gap-3">
          <input type="radio" name="plan" class="radio radio-sm" checked />
          <div>
            <span class="text-sm font-medium">Default</span>
            <p class="text-xs text-base-content/60">Standard plan.</p>
          </div>
        </label>
        <label class="flex items-center gap-3">
          <input type="radio" name="plan" class="radio radio-sm" />
          <div>
            <span class="text-sm font-medium">Comfortable</span>
            <p class="text-xs text-base-content/60">More spacing.</p>
          </div>
        </label>
        <label class="flex items-center gap-3">
          <input type="radio" name="plan" class="radio radio-sm" />
          <div>
            <span class="text-sm font-medium">Compact</span>
            <p class="text-xs text-base-content/60">Dense layout.</p>
          </div>
        </label>
        <div class="bg-base-200 rounded-md p-4">
          <p class="text-xs font-mono text-base-content/60">shadcn: &lt;RadioGroup&gt; &lt;RadioGroupItem&gt;</p>
          <p class="text-xs font-mono text-base-content/60 mt-1">daisyUI: .radio .radio-sm + native &lt;input type="radio"&gt;</p>
        </div>
      </div>
    `,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Components page with sidebar
// ─────────────────────────────────────────────────────────────────────────────
export function ComponentsPage() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const section = SECTIONS.find((s) => s.id === active) || SECTIONS[0];

  return html`
    <div class="flex flex-1 w-full h-full overflow-hidden">
      <!-- Sidebar -->
      <div class="w-[200px] border-r border-base-300 flex flex-col shrink-0 overflow-y-auto scrollbar-hidden">
        <div class="p-4">
          <h2 class="text-sm font-semibold text-base-content/40 uppercase tracking-wider px-2 mb-2">Components</h2>
          <nav class="space-y-0.5">
            ${SECTIONS.map((s) => html`
              <a
                key=${s.id}
                href="#"
                class="block px-2 py-1.5 rounded-md text-sm ${active === s.id ? 'bg-base-200 font-medium' : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'}"
                onClick=${(e) => { e.preventDefault(); setActive(s.id); }}
              >
                ${s.label}
              </a>
            `)}
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-8">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold tracking-tight">${section.label}</h2>
          <p class="text-sm text-base-content/60 mt-1">${section.shadcn}</p>
          <div class="border-t border-base-300 mt-4 pt-6">
            ${section.render()}
          </div>
        </div>
      </div>
    </div>
  `;
}
