import { html } from "htm/preact";
import { Button, Card, CardBody, Icon } from "~/components/ui.js";

function StatCard({ title, value, change, icon }) {
  return html`
    <${Card}>
      <${CardBody} className="p-6">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-base-content/60">${title}</span>
          <${Icon} icon=${icon} size={16} className="text-base-content/40" />
        </div>
        <div class="text-2xl font-bold">${value}</div>
        <p class="text-xs text-base-content/60">${change}</p>
      <//>
    <//>
  `;
}

function RecentSale({ name, email, amount }) {
  return html`
    <div class="flex items-center gap-4">
      <div class="w-9 h-9 rounded-full bg-base-200 flex items-center justify-center text-sm font-medium">
        ${name.split(" ").map(n => n[0]).join("")}
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium leading-none">${name}</p>
        <p class="text-sm text-base-content/60">${email}</p>
      </div>
      <div class="font-medium">+$${amount}</div>
    </div>
  `;
}

export function DashboardPage() {
  return html`
    <div class="flex flex-col flex-1 w-full h-full overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 pb-2">
        <div>
          <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p class="text-base-content/60 text-sm mt-1">Welcome back, here's your overview.</p>
        </div>
        <div class="flex items-center gap-2">
          <${Button} variant="outline" size="sm">
            <${Icon} icon="lucide:calendar" size={14} />
            Jan 20 – Feb 09
          <//>
          <${Button} variant="primary" size="sm">
            <${Icon} icon="lucide:download" size={14} />
            Download
          <//>
        </div>
      </div>

      <div class="p-6 pt-4 space-y-6">
        <!-- Stats -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <${StatCard} title="Total Revenue" value="$45,231.89" change="+20.1% from last month" icon="lucide:dollar-sign" />
          <${StatCard} title="Subscriptions" value="+2,350" change="+180.1% from last month" icon="lucide:users" />
          <${StatCard} title="Sales" value="+12,234" change="+19% from last month" icon="lucide:credit-card" />
          <${StatCard} title="Active Now" value="+573" change="+201 since last hour" icon="lucide:activity" />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-7 gap-4">
          <!-- Chart placeholder -->
          <${Card} className="lg:col-span-4">
            <${CardBody} className="p-6">
              <h3 class="font-semibold">Overview</h3>
              <div class="mt-4 flex items-end gap-2 h-[200px]">
                ${[40, 25, 55, 45, 65, 35, 75, 50, 60, 30, 70, 45].map((h, i) => html`
                  <div key=${i} class="flex-1 rounded-t bg-primary/80" style="height: ${h}%"></div>
                `)}
              </div>
              <div class="flex justify-between text-xs text-base-content/40 mt-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                <span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
                <span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            <//>
          <//>

          <!-- Recent Sales -->
          <${Card} className="lg:col-span-3">
            <${CardBody} className="p-6">
              <h3 class="font-semibold">Recent Sales</h3>
              <p class="text-sm text-base-content/60">You made 265 sales this month.</p>
              <div class="mt-4 space-y-6">
                <${RecentSale} name="Olivia Martin" email="olivia@email.com" amount="1,999.00" />
                <${RecentSale} name="Jackson Lee" email="jackson@email.com" amount="39.00" />
                <${RecentSale} name="Isabella Nguyen" email="isabella@email.com" amount="299.00" />
                <${RecentSale} name="William Kim" email="will@email.com" amount="99.00" />
                <${RecentSale} name="Sofia Davis" email="sofia@email.com" amount="39.00" />
              </div>
            <//>
          <//>
        </div>
      </div>
    </div>
  `;
}
