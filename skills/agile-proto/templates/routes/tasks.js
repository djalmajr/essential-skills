import { html } from "htm/preact";
import { useState } from "preact/hooks";
import { Badge, Button, Checkbox, Icon, Input } from "~/components/ui.js";

const TASKS = [
  { id: "TASK-8782", type: "Documentation", title: "You can't compress the program without quantifying the open-source SSD...", status: "In Progress", priority: "Medium" },
  { id: "TASK-7878", type: "Bug", title: "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!", status: "Backlog", priority: "Medium" },
  { id: "TASK-7839", type: "Bug", title: "We need to bypass the neural TCP card!", status: "Todo", priority: "High" },
  { id: "TASK-5562", type: "Feature", title: "The SAS interface is down, bypass the open-source sensor so we can...", status: "Backlog", priority: "Medium" },
  { id: "TASK-8686", type: "Feature", title: "I'll parse the wireless SSL protocol, that should driver the API panel!", status: "Canceled", priority: "Medium" },
  { id: "TASK-1280", type: "Bug", title: "Use the digital TLS panel, then you can transmit the haptic system!", status: "Done", priority: "High" },
  { id: "TASK-7262", type: "Feature", title: "The UTF8 application is down, parse the neural bandwidth so we can...", status: "Done", priority: "High" },
  { id: "TASK-1138", type: "Feature", title: "Generating the driver won't do anything, we need to quantify the...", status: "In Progress", priority: "Medium" },
  { id: "TASK-7184", type: "Bug", title: "We need to program the back-end THX pixel!", status: "Todo", priority: "Low" },
  { id: "TASK-5160", type: "Documentation", title: "Calculating the bus won't do anything, we need to navigate the...", status: "In Progress", priority: "High" },
];

const STATUS_ICONS = {
  "Backlog": "lucide:circle-help",
  "Todo": "lucide:circle",
  "In Progress": "lucide:timer",
  "Done": "lucide:circle-check",
  "Canceled": "lucide:circle-x",
};

const PRIORITY_ICONS = {
  "Low": "lucide:arrow-down",
  "Medium": "lucide:arrow-right",
  "High": "lucide:arrow-up",
};

export function TasksPage() {
  const [filter, setFilter] = useState("");

  const filtered = TASKS.filter(t =>
    !filter || t.title.toLowerCase().includes(filter.toLowerCase()) || t.id.toLowerCase().includes(filter.toLowerCase())
  );

  return html`
    <div class="flex flex-col flex-1 w-full h-full overflow-y-auto">
      <div class="p-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold tracking-tight">Tasks</h2>
            <p class="text-base-content/60 text-sm mt-1">Here's a list of your tasks for this month!</p>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="flex items-center gap-2 mt-6">
          <${Input}
            className="w-[250px]"
            placeholder="Filter tasks..."
            value=${filter}
            onInput=${(e) => setFilter(e.target.value)}
          />
          <${Button} variant="outline" size="sm">
            <${Icon} icon="lucide:plus-circle" size=${14} />
            Status
          </${Button}>
          <${Button} variant="outline" size="sm">
            <${Icon} icon="lucide:plus-circle" size=${14} />
            Priority
          </${Button}>
          <div class="flex-1"></div>
          <${Button} variant="outline" size="sm">
            <${Icon} icon="lucide:settings-2" size=${14} />
            View
          </${Button}>
        </div>

        <!-- Table -->
        <div class="mt-4 border border-base-300 rounded-lg overflow-x-auto">
          <table class="table table-auto w-full">
            <thead>
              <tr class="border-b border-base-300 bg-base-100">
                <th class="w-10"><${Checkbox} /></th>
                <th class="text-xs font-medium text-base-content/60">Task</th>
                <th class="text-xs font-medium text-base-content/60">Title</th>
                <th class="text-xs font-medium text-base-content/60">Status</th>
                <th class="text-xs font-medium text-base-content/60">Priority</th>
                <th class="w-10"></th>
              </tr>
            </thead>
            <tbody>
              ${filtered.map(task => html`
                <tr key=${task.id} class="border-b border-base-300 hover:bg-base-200/50">
                  <td><${Checkbox} /></td>
                  <td>
                    <span class="font-medium text-sm">${task.id}</span>
                  </td>
                  <td class="w-full">
                    <div class="flex items-center gap-2">
                      <${Badge} variant="outline" className="text-xs shrink-0">${task.type}</${Badge}>
                      <span class="text-sm truncate">${task.title}</span>
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2 text-sm">
                      <${Icon} icon=${STATUS_ICONS[task.status]} size=${14} className="text-base-content/60" />
                      ${task.status}
                    </div>
                  </td>
                  <td>
                    <div class="flex items-center gap-2 text-sm">
                      <${Icon} icon=${PRIORITY_ICONS[task.priority]} size=${14} className="text-base-content/60" />
                      ${task.priority}
                    </div>
                  </td>
                  <td>
                    <${Button} variant="ghost" size="xs">
                      <${Icon} icon="lucide:ellipsis" size=${14} />
                    </${Button}>
                  </td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between mt-4 text-sm">
          <span class="text-base-content/60">0 of ${filtered.length} row(s) selected.</span>
          <div class="flex items-center gap-2">
            <span class="text-base-content/60">Page 1 of 1</span>
            <${Button} variant="outline" size="sm" disabled>
              <${Icon} icon="lucide:chevron-left" size=${14} />
            </${Button}>
            <${Button} variant="outline" size="sm" disabled>
              <${Icon} icon="lucide:chevron-right" size=${14} />
            </${Button}>
          </div>
        </div>
      </div>
    </div>
  `;
}
