// Live reference — sidebar on the left lists every available component.
// Each entry renders a short demo using the original shadcn class strings.

import { html } from "htm/preact";
import { useState } from "preact/hooks";

import { Accordion, AccordionItem } from "~/components/ui/accordion.js";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert.js";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  closeAlertDialog,
  openAlertDialog,
} from "~/components/ui/alert-dialog.js";
import { AspectRatio } from "~/components/ui/aspect-ratio.js";
import { Avatar, AvatarFallback } from "~/components/ui/avatar.js";
import { Badge } from "~/components/ui/badge.js";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb.js";
import { Button } from "~/components/ui/button.js";
import { ButtonGroup, ButtonGroupSeparator } from "~/components/ui/button-group.js";
import { Calendar } from "~/components/ui/calendar.js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card.js";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel.js";
import { BarChartPlaceholder, ChartContainer, LineChartPlaceholder } from "~/components/ui/chart.js";
import { Checkbox } from "~/components/ui/checkbox.js";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible.js";
import { Combobox } from "~/components/ui/combobox.js";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "~/components/ui/command.js";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
  useContextMenu,
} from "~/components/ui/context-menu.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  closeDialog,
  openDialog,
} from "~/components/ui/dialog.js";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  closeDrawer,
  openDrawer,
} from "~/components/ui/drawer.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu.js";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "~/components/ui/empty.js";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "~/components/ui/field.js";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card.js";
import { Icon } from "~/components/ui/icon.js";
import { Input } from "~/components/ui/input.js";
import { InputGroup, InputGroupAddon, InputGroupInput } from "~/components/ui/input-group.js";
import { InputOTP, InputOTPSeparator } from "~/components/ui/input-otp.js";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "~/components/ui/item.js";
import { Kbd } from "~/components/ui/kbd.js";
import { Label } from "~/components/ui/label.js";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar.js";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu.js";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination.js";
import { PopoverContent, PopoverTrigger } from "~/components/ui/popover.js";
import { Progress } from "~/components/ui/progress.js";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group.js";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/components/ui/resizable.js";
import { ScrollArea } from "~/components/ui/scroll-area.js";
import { Select, SelectGroup, SelectItem } from "~/components/ui/select.js";
import { Separator } from "~/components/ui/separator.js";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  closeSheet,
  openSheet,
} from "~/components/ui/sheet.js";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar.js";
import { Skeleton } from "~/components/ui/skeleton.js";
import { Slider } from "~/components/ui/slider.js";
import { Toast, Toaster } from "~/components/ui/sonner.js";
import { Spinner } from "~/components/ui/spinner.js";
import { Switch } from "~/components/ui/switch.js";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table.js";
import { TabsList, TabsTrigger } from "~/components/ui/tabs.js";
import { Textarea } from "~/components/ui/textarea.js";
import { Toggle } from "~/components/ui/toggle.js";
import { ToggleGroup } from "~/components/ui/toggle-group.js";
import { Tooltip } from "~/components/ui/tooltip.js";

// ─────────────────────────────────────────────────────────────────────────────
// Demos — one function per component. Keep them short (5-30 lines).
// ─────────────────────────────────────────────────────────────────────────────

const DEMOS = {
  Accordion: () => html`
    <${Accordion}>
      <${AccordionItem} title="Is it accessible?" open>Yes. Uses HTML5 <code>&lt;details&gt;</code>.<//>
      <${AccordionItem} title="Is it styled?">Yes. shadcn class strings.<//>
      <${AccordionItem} title="Is it animated?">CSS-only via group-open:rotate-180.<//>
    <//>
  `,
  Alert: () => html`
    <div class="space-y-3 max-w-lg">
      <${Alert}>
        <iconify-icon icon="lucide:info"></iconify-icon>
        <${AlertTitle}>Heads up<//>
        <${AlertDescription}>You can add components to your app.<//>
      <//>
      <${Alert} variant="destructive">
        <iconify-icon icon="lucide:triangle-alert"></iconify-icon>
        <${AlertTitle}>Error<//>
        <${AlertDescription}>Your session has expired.<//>
      <//>
    </div>
  `,
  AlertDialog: () => html`
    <${Button} variant="outline" onClick=${openAlertDialog("demo-alert-dialog")}>Show alert<//>
    <${AlertDialog} id="demo-alert-dialog">
      <${AlertDialogContent}>
        <${AlertDialogHeader}>
          <${AlertDialogTitle}>Are you absolutely sure?<//>
          <${AlertDialogDescription}>This action cannot be undone.<//>
        <//>
        <${AlertDialogFooter}>
          <${Button} variant="outline" onClick=${closeAlertDialog("demo-alert-dialog")}>Cancel<//>
          <${Button} variant="destructive" onClick=${closeAlertDialog("demo-alert-dialog")}>Continue<//>
        <//>
      <//>
    <//>
  `,
  AspectRatio: () => html`
    <${AspectRatio} ratio=${16 / 9} className="bg-muted rounded-md max-w-md flex items-center justify-center text-muted-foreground">
      16:9
    <//>
  `,
  Avatar: () => html`
    <div class="flex items-center gap-3">
      <${Avatar}><${AvatarFallback}>CN<//><//>
      <${Avatar}><${AvatarFallback}>AB<//><//>
      <${Avatar} className="size-12"><${AvatarFallback}>+5<//><//>
    </div>
  `,
  Badge: () => html`
    <div class="flex flex-wrap gap-2">
      <${Badge}>Default<//>
      <${Badge} variant="secondary">Secondary<//>
      <${Badge} variant="outline">Outline<//>
      <${Badge} variant="destructive">Destructive<//>
    </div>
  `,
  Breadcrumb: () => html`
    <${Breadcrumb}>
      <${BreadcrumbList}>
        <${BreadcrumbItem}><${BreadcrumbPage}>Home<//><//>
        <${BreadcrumbSeparator} />
        <${BreadcrumbItem}><${BreadcrumbPage}>Settings<//><//>
        <${BreadcrumbSeparator} />
        <${BreadcrumbItem}><${BreadcrumbPage}>Profile<//><//>
      <//>
    <//>
  `,
  Button: () => html`
    <div class="space-y-3">
      <div class="flex flex-wrap gap-2">
        <${Button}>Default<//>
        <${Button} variant="secondary">Secondary<//>
        <${Button} variant="outline">Outline<//>
        <${Button} variant="ghost">Ghost<//>
        <${Button} variant="link">Link<//>
        <${Button} variant="destructive">Destructive<//>
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <${Button} size="sm">sm<//>
        <${Button}>default<//>
        <${Button} size="lg">lg<//>
        <${Button} size="icon"><${Icon} icon="lucide:plus" /><//>
      </div>
    </div>
  `,
  ButtonGroup: () => html`
    <${ButtonGroup}>
      <${Button} variant="outline">Year<//>
      <${Button} variant="outline">Month<//>
      <${Button} variant="outline">Day<//>
    <//>
  `,
  Calendar: () => html`<${Calendar} selected=${new Date()} />`,
  Card: () => html`
    <${Card} className="max-w-sm">
      <${CardHeader}>
        <${CardTitle}>Card title<//>
        <${CardDescription}>Card description goes here.<//>
      <//>
      <${CardContent}>
        <p class="text-sm text-muted-foreground">Card content with mock data.</p>
      <//>
    <//>
  `,
  Carousel: () => html`
    <${Carousel} className="max-w-md">
      <${CarouselContent}>
        ${[1, 2, 3, 4, 5].map(
          (i) => html`
            <${CarouselItem} key=${i}>
              <${Card} className="h-32 flex items-center justify-center">
                <span class="text-3xl font-semibold">${i}</span>
              <//>
            <//>
          `,
        )}
      <//>
      <${CarouselPrevious} />
      <${CarouselNext} />
    <//>
  `,
  Chart: () => html`
    <${ChartContainer} className="max-w-md text-primary">
      <${BarChartPlaceholder} data=${[40, 25, 55, 45, 65, 35, 75, 50, 60, 30, 70, 45]} />
    <//>
    <div class="text-primary mt-3 max-w-md">
      <${LineChartPlaceholder} data=${[10, 30, 20, 50, 40, 70, 60, 90]} />
    </div>
  `,
  Checkbox: () => html`
    <div class="space-y-2">
      <label class="flex items-center gap-2 text-sm"><${Checkbox} checked /> Accept terms<//>
      <label class="flex items-center gap-2 text-sm"><${Checkbox} /> Send me emails<//>
      <label class="flex items-center gap-2 text-sm opacity-50"><${Checkbox} disabled /> Disabled<//>
    </div>
  `,
  Collapsible: () => html`
    <${Collapsible} className="max-w-md space-y-2">
      <${CollapsibleTrigger} className="flex items-center justify-between w-full p-2 rounded-md border">
        Toggle content
        <iconify-icon icon="lucide:chevron-down" width="14" class="group-open:rotate-180 transition-transform"></iconify-icon>
      <//>
      <${CollapsibleContent} className="rounded-md border p-3 text-sm text-muted-foreground">
        Hidden content revealed via &lt;details&gt;.
      <//>
    <//>
  `,
  Combobox: () => html`
    <${Combobox} id="demo-cb" placeholder="Search framework..." options=${[
      "Next.js", "Remix", "Astro", "Nuxt", "SvelteKit", "Solid Start"
    ]} />
  `,
  Command: () => html`
    <${Command} className="max-w-sm border shadow-md">
      <${CommandInput} placeholder="Type a command..." />
      <${CommandList}>
        <${CommandGroup} heading="Suggestions">
          <${CommandItem}><${Icon} icon="lucide:calendar" /> Calendar<//>
          <${CommandItem}><${Icon} icon="lucide:smile" /> Search Emoji<//>
          <${CommandItem}><${Icon} icon="lucide:calculator" /> Calculator<//>
        <//>
        <${CommandSeparator} />
        <${CommandGroup} heading="Settings">
          <${CommandItem}><${Icon} icon="lucide:user" /> Profile<${CommandShortcut}>⌘P<//><//>
          <${CommandItem}><${Icon} icon="lucide:settings" /> Settings<${CommandShortcut}>⌘S<//><//>
        <//>
      <//>
    <//>
  `,
  ContextMenu: () => {
    const ctx = useContextMenu();
    return html`
      <${ContextMenuTrigger} onContextMenu=${ctx.onContextMenu}>
        <div class="flex h-32 w-64 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
          Right-click here
        </div>
      <//>
      <${ContextMenuContent} pos=${ctx.pos} onClose=${ctx.close}>
        <${ContextMenuLabel}>Actions<//>
        <${ContextMenuItem}>Edit<//>
        <${ContextMenuItem}>Duplicate<//>
        <${ContextMenuSeparator} />
        <${ContextMenuItem}>Delete<//>
      <//>
    `;
  },
  Dialog: () => html`
    <${Button} onClick=${openDialog("demo-dialog")}>Open Dialog<//>
    <${Dialog} id="demo-dialog">
      <${DialogContent}>
        <${DialogHeader}>
          <${DialogTitle}>Edit profile<//>
          <${DialogDescription}>Make changes to your profile here.<//>
        <//>
        <div class="space-y-2">
          <${Label}>Name<//>
          <${Input} value="Pedro Duarte" />
        </div>
        <${DialogFooter}>
          <${Button} variant="outline" onClick=${closeDialog("demo-dialog")}>Cancel<//>
          <${Button} onClick=${closeDialog("demo-dialog")}>Save<//>
        <//>
      <//>
    <//>
  `,
  Drawer: () => html`
    <${Button} variant="outline" onClick=${openDrawer("demo-drawer")}>Open Drawer<//>
    <${Drawer} id="demo-drawer" side="right">
      <${DrawerContent}>
        <${DrawerHeader}>
          <${DrawerTitle}>Drawer title<//>
          <${DrawerDescription}>A side panel using native &lt;dialog&gt;.<//>
        <//>
        <${DrawerFooter}>
          <${Button} onClick=${closeDrawer("demo-drawer")}>Close<//>
        <//>
      <//>
    <//>
  `,
  DropdownMenu: () => html`
    <${DropdownMenu}>
      <${DropdownMenuTrigger} variant="outline">
        Open menu<${Icon} icon="lucide:chevron-down" size=${14} />
      <//>
      <${DropdownMenuContent}>
        <${DropdownMenuLabel}>My Account<//>
        <${DropdownMenuItem}>Profile<//>
        <${DropdownMenuItem}>Billing<//>
        <${DropdownMenuSeparator} />
        <${DropdownMenuItem}>Logout<//>
      <//>
    <//>
  `,
  Empty: () => html`
    <${Empty} className="max-w-md">
      <${EmptyHeader}>
        <${EmptyMedia} variant="icon"><${Icon} icon="lucide:inbox" size=${24} /><//>
        <${EmptyTitle}>No messages<//>
        <${EmptyDescription}>You have no messages in your inbox yet.<//>
      <//>
      <${EmptyContent}>
        <${Button}>Start writing<//>
      <//>
    <//>
  `,
  Field: () => html`
    <${FieldSet} className="max-w-md">
      <${FieldLegend}>Account<//>
      <${FieldGroup}>
        <${Field}>
          <${FieldLabel}>Username<//>
          <${Input} value="shadcn" />
          <${FieldDescription}>Public display name.<//>
        <//>
        <${FieldSeparator}>or<//>
        <${Field}>
          <${FieldLabel}>Email<//>
          <${Input} type="email" value="m@example.com" />
        <//>
      <//>
    <//>
  `,
  HoverCard: () => html`
    <${HoverCard}>
      <${HoverCardTrigger}><${Button} variant="link">@shadcn<//><//>
      <${HoverCardContent}>
        <div class="flex gap-3">
          <${Avatar}><${AvatarFallback}>SC<//><//>
          <div>
            <p class="text-sm font-semibold">@shadcn</p>
            <p class="text-xs text-muted-foreground">Joined December 2021</p>
          </div>
        </div>
      <//>
    <//>
  `,
  Icon: () => html`
    <div class="flex items-center gap-3">
      <${Icon} icon="lucide:home" />
      <${Icon} icon="lucide:settings" size=${24} />
      <${Icon} icon="lucide:heart" size=${32} className="text-destructive" />
    </div>
  `,
  Input: () => html`
    <div class="space-y-2 max-w-sm">
      <${Input} placeholder="Email" />
      <${Input} type="password" value="password123" />
      <${Input} value="Disabled" disabled />
    </div>
  `,
  InputGroup: () => html`
    <${InputGroup} className="max-w-sm">
      <${InputGroupAddon}><${Icon} icon="lucide:search" /><//>
      <${InputGroupInput} placeholder="Search..." />
      <${InputGroupAddon} align="inline-end"><${Kbd}>⌘K<//><//>
    <//>
  `,
  InputOTP: () => {
    const [v, setV] = useState("");
    return html`<${InputOTP} length=${6} value=${v} onChange=${setV} />`;
  },
  Item: () => html`
    <${ItemGroup} className="max-w-md">
      <${Item} variant="outline">
        <${ItemMedia} variant="icon"><${Icon} icon="lucide:file-text" size=${20} /><//>
        <${ItemContent}>
          <${ItemTitle}>document.pdf<//>
          <${ItemDescription}>2.4 MB · uploaded 2 days ago<//>
        <//>
        <${ItemActions}>
          <${Button} variant="ghost" size="icon-sm"><${Icon} icon="lucide:download" /><//>
        <//>
      <//>
      <${Item} variant="outline" size="sm">
        <${ItemMedia} variant="icon"><${Icon} icon="lucide:image" size=${18} /><//>
        <${ItemContent}>
          <${ItemTitle}>cover.png<//>
          <${ItemDescription}>1.1 MB<//>
        <//>
      <//>
    <//>
  `,
  Kbd: () => html`<p class="text-sm">Press <${Kbd}>⌘<//> + <${Kbd}>K<//> to open.</p>`,
  Label: () => html`
    <div class="space-y-2 max-w-sm">
      <${Label} for="demo-label-input">Email<//>
      <${Input} id="demo-label-input" type="email" placeholder="m@example.com" />
    </div>
  `,
  Menubar: () => html`
    <${Menubar}>
      <${MenubarMenu}>
        <${MenubarTrigger}>File<//>
        <${MenubarContent}>
          <${MenubarItem}>New Tab <${MenubarShortcut}>⌘T<//><//>
          <${MenubarItem}>New Window<//>
          <${MenubarSeparator} />
          <${MenubarItem}>Print<//>
        <//>
      <//>
      <${MenubarMenu}>
        <${MenubarTrigger}>Edit<//>
        <${MenubarContent}>
          <${MenubarItem}>Undo<//>
          <${MenubarItem}>Redo<//>
        <//>
      <//>
    <//>
  `,
  NavigationMenu: () => html`
    <${NavigationMenu}>
      <${NavigationMenuList}>
        <${NavigationMenuItem}>
          <${NavigationMenuTrigger}>Getting started<//>
          <${NavigationMenuContent} className="w-72">
            <${NavigationMenuLink}><strong>Introduction</strong><br/><span class="text-muted-foreground text-xs">Overview</span><//>
            <${NavigationMenuLink}>Installation<//>
          <//>
        <//>
        <${NavigationMenuItem}>
          <${NavigationMenuTrigger}>Components<//>
          <${NavigationMenuContent} className="w-72">
            <${NavigationMenuLink}>Buttons<//>
            <${NavigationMenuLink}>Cards<//>
          <//>
        <//>
      <//>
    <//>
  `,
  Pagination: () => html`
    <${Pagination}>
      <${PaginationContent}>
        <${PaginationItem}><${PaginationPrevious} /><//>
        <${PaginationItem}><${PaginationLink}>1<//><//>
        <${PaginationItem}><${PaginationLink} active>2<//><//>
        <${PaginationItem}><${PaginationLink}>3<//><//>
        <${PaginationItem}><${PaginationEllipsis} /><//>
        <${PaginationItem}><${PaginationNext} /><//>
      <//>
    <//>
  `,
  Popover: () => html`
    <${PopoverTrigger} targetId="demo-popover" variant="outline">Open popover<//>
    <${PopoverContent} id="demo-popover">
      <h4 class="text-sm font-medium mb-2">Dimensions</h4>
      <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
    <//>
  `,
  Progress: () => html`
    <div class="space-y-3 max-w-sm">
      <${Progress} value=${30} />
      <${Progress} value=${60} />
      <${Progress} value=${90} />
    </div>
  `,
  RadioGroup: () => html`
    <${RadioGroup}>
      <label class="flex items-center gap-2 text-sm"><${RadioGroupItem} name="r" checked /> Default<//>
      <label class="flex items-center gap-2 text-sm"><${RadioGroupItem} name="r" /> Comfortable<//>
      <label class="flex items-center gap-2 text-sm"><${RadioGroupItem} name="r" /> Compact<//>
    <//>
  `,
  Resizable: () => html`
    <${ResizablePanelGroup} direction="horizontal" className="max-w-md h-32 rounded-md border">
      <${ResizablePanel} className="bg-muted/50 flex items-center justify-center text-sm">One<//>
      <${ResizableHandle} withHandle direction="horizontal" />
      <${ResizablePanel} className="flex items-center justify-center text-sm">Two<//>
    <//>
  `,
  ScrollArea: () => html`
    <${ScrollArea} className="h-32 w-64 rounded-md border p-3">
      <p class="text-sm leading-relaxed">
        ${"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(20)}
      </p>
    <//>
  `,
  Select: () => html`
    <${Select} className="max-w-sm">
      <${SelectGroup} label="Frameworks">
        <${SelectItem} value="next">Next.js<//>
        <${SelectItem} value="remix">Remix<//>
        <${SelectItem} value="astro">Astro<//>
      <//>
    <//>
  `,
  Separator: () => html`
    <div class="space-y-2 max-w-sm">
      <p class="text-sm">Above</p>
      <${Separator} />
      <p class="text-sm">Below</p>
    </div>
  `,
  Sheet: () => html`
    <${Button} variant="outline" onClick=${openSheet("demo-sheet")}>Open Sheet<//>
    <${Sheet} id="demo-sheet" side="right">
      <${SheetContent}>
        <${SheetHeader}>
          <${SheetTitle}>Edit profile<//>
          <${SheetDescription}>Side panel via native &lt;dialog&gt;.<//>
        <//>
        <${SheetFooter}>
          <${Button} onClick=${closeSheet("demo-sheet")}>Close<//>
        <//>
      <//>
    <//>
  `,
  Sidebar: () => html`
    <div class="h-64 rounded-md border overflow-hidden flex">
      <${Sidebar} className="w-[180px]!">
        <${SidebarHeader}>
          <p class="text-sm font-medium px-2">My App</p>
        <//>
        <${SidebarContent}>
          <${SidebarGroup}>
            <${SidebarGroupLabel}>Workspace<//>
            <${SidebarGroupContent}>
              <${SidebarMenu}>
                <${SidebarMenuItem}>
                  <${SidebarMenuButton} isActive=${true}>
                    <${Icon} icon="lucide:home" /><span>Dashboard</span>
                  <//>
                <//>
                <${SidebarMenuItem}>
                  <${SidebarMenuButton}>
                    <${Icon} icon="lucide:inbox" /><span>Inbox</span>
                  <//>
                <//>
                <${SidebarMenuItem}>
                  <${SidebarMenuButton}>
                    <${Icon} icon="lucide:settings" /><span>Settings</span>
                  <//>
                <//>
              <//>
            <//>
          <//>
        <//>
      <//>
      <div class="flex-1 p-4 text-sm text-muted-foreground">
        Page content. The live AppShell in this prototype wraps every scene with a full
        Sidebar + topbar — see <code>components/app-shell.js</code>.
      </div>
    </div>
  `,
  Skeleton: () => html`
    <div class="flex items-center gap-3 max-w-sm">
      <${Skeleton} className="size-12 rounded-full" />
      <div class="flex-1 space-y-2">
        <${Skeleton} className="h-4 w-3/4" />
        <${Skeleton} className="h-4 w-1/2" />
      </div>
    </div>
  `,
  Slider: () => html`<${Slider} defaultValue=${50} className="max-w-sm" />`,
  Sonner: () => html`
    <div class="relative h-32 max-w-md rounded-md border bg-muted/30 overflow-hidden">
      <${Toaster} position="top-right" className="!absolute">
        <${Toast} variant="default" title="Event created" description="Your event is scheduled." />
      <//>
    </div>
  `,
  Spinner: () => html`
    <div class="flex items-center gap-3">
      <${Spinner} />
      <${Spinner} size=${24} />
      <${Spinner} size=${32} className="text-primary" />
    </div>
  `,
  Switch: () => html`
    <div class="space-y-3">
      <label class="flex items-center justify-between max-w-sm gap-3">
        <span class="text-sm">Airplane mode</span>
        <${Switch} />
      </label>
      <label class="flex items-center justify-between max-w-sm gap-3">
        <span class="text-sm">Notifications</span>
        <${Switch} checked />
      </label>
    </div>
  `,
  Table: () => html`
    <${Table} className="max-w-lg">
      <${TableHeader}>
        <${TableRow}>
          <${TableHead}>Invoice<//>
          <${TableHead}>Status<//>
          <${TableHead} className="text-right">Amount<//>
        <//>
      <//>
      <${TableBody}>
        ${[
          { id: "INV001", status: "Paid", amount: "$250.00" },
          { id: "INV002", status: "Pending", amount: "$150.00" },
          { id: "INV003", status: "Unpaid", amount: "$350.00" },
        ].map(
          (row) => html`
            <${TableRow} key=${row.id}>
              <${TableCell} className="font-medium">${row.id}<//>
              <${TableCell}>${row.status}<//>
              <${TableCell} className="text-right">${row.amount}<//>
            <//>
          `,
        )}
      <//>
      <${TableFooter}>
        <${TableRow}>
          <${TableCell} colspan="2">Total<//>
          <${TableCell} className="text-right">$750.00<//>
        <//>
      <//>
    <//>
  `,
  Tabs: () => html`
    <${TabsList}>
      <${TabsTrigger} active=${true}>Account<//>
      <${TabsTrigger}>Password<//>
      <${TabsTrigger}>Notifications<//>
    <//>
  `,
  Textarea: () => html`<${Textarea} placeholder="Type a message..." className="max-w-sm" />`,
  Toggle: () => html`
    <div class="flex gap-2">
      <${Toggle} pressed=${true}><${Icon} icon="lucide:bold" /><//>
      <${Toggle}><${Icon} icon="lucide:italic" /><//>
      <${Toggle}><${Icon} icon="lucide:underline" /><//>
    </div>
  `,
  ToggleGroup: () => html`
    <${ToggleGroup} type="single">
      <${Toggle} pressed=${true} variant="outline"><${Icon} icon="lucide:align-left" /><//>
      <${Toggle} variant="outline"><${Icon} icon="lucide:align-center" /><//>
      <${Toggle} variant="outline"><${Icon} icon="lucide:align-right" /><//>
    <//>
  `,
  Tooltip: () => html`
    <${Tooltip} content="Add to library">
      <${Button} variant="outline" size="icon"><${Icon} icon="lucide:plus" /><//>
    <//>
  `,
};

const COMPONENT_NAMES = Object.keys(DEMOS).sort();

export function ComponentsPage() {
  const [active, setActive] = useState(COMPONENT_NAMES[0]);
  const Demo = DEMOS[active];

  return html`
    <div class="flex flex-1 w-full h-full overflow-hidden">
      <aside class="w-[200px] shrink-0 border-r overflow-y-auto scrollbar-hidden">
        <div class="p-3">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground px-2 mb-2">
            Components (${COMPONENT_NAMES.length})
          </h3>
          <nav class="space-y-0.5">
            ${COMPONENT_NAMES.map(
              (name) => html`
                <button
                  key=${name}
                  type="button"
                  onClick=${() => setActive(name)}
                  class=${`block w-full text-left px-2 py-1.5 rounded-md text-sm ${
                    active === name
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  ${name}
                </button>
              `,
            )}
          </nav>
        </div>
      </aside>

      <div class="flex-1 overflow-y-auto p-8">
        <div class="max-w-3xl">
          <h2 class="text-2xl font-bold tracking-tight">${active}</h2>
          <p class="text-sm text-muted-foreground mt-1">
            shadcn/<code>${active.toLowerCase()}.tsx</code> port to htm/preact with native HTML5/CSS.
          </p>
          <div class="border-t mt-4 pt-6">
            <${Demo} />
          </div>
        </div>
      </div>
    </div>
  `;
}
