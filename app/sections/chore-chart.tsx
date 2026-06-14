"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";

interface ChoreChartProps {
  onClose: () => void;
}

const weeklySchedule = [
  {
    week: "Week 1",
    r1: { bundle: "Bundle A", icon: "🚿", tasks: ["Bathroom deep clean", "+ Trash to curb for pickup"] },
    r2: { bundle: "Bundle B", icon: "🍳", tasks: ["Kitchen surfaces & sink", "+ Dust all common areas"] },
    r3: { bundle: "Bundle C", icon: "🫧", tasks: ["Appliances (washer, dryer, microwave, stovetop)", "+ Sweep & mop floors"] },
  },
  {
    week: "Week 2",
    r1: { bundle: "Bundle B", icon: "🍳", tasks: ["Kitchen surfaces & sink", "+ Dust all common areas"] },
    r2: { bundle: "Bundle C", icon: "🫧", tasks: ["Appliances (washer, dryer, microwave, stovetop)", "+ Sweep & mop floors"] },
    r3: { bundle: "Bundle A", icon: "🚿", tasks: ["Bathroom deep clean", "+ Trash to curb for pickup"] },
  },
  {
    week: "Week 3",
    r1: { bundle: "Bundle C", icon: "🫧", tasks: ["Appliances (washer, dryer, microwave, stovetop)", "+ Sweep & mop floors"] },
    r2: { bundle: "Bundle A", icon: "🚿", tasks: ["Bathroom deep clean", "+ Trash to curb for pickup"] },
    r3: { bundle: "Bundle B", icon: "🍳", tasks: ["Kitchen surfaces & sink", "+ Dust all common areas"] },
  },
];

const dailyTasks = [
  { task: "Wipe kitchen counter & stovetop after each use", owner: "Whoever cooked" },
  { task: "Wash / put away your own dishes immediately", owner: "Each roommate — their own" },
  { task: "Replace trash bag if you fill/take out the trash", owner: "Whoever empties it" },
  { task: "Quick bathroom sink wipe-down after use", owner: "Each roommate" },
  { task: "Sweep floor if you make a visible mess", owner: "Whoever made the mess" },
];

const monthlyDeepClean = [
  { month: "Month 1", task: "Washer: wipe drum, clean lint trap, run cleaning cycle", roommate: "Roommate 1", icon: "🧺" },
  { month: "Month 1", task: "Oven interior, burners, drip pans deep scrub", roommate: "Roommate 2", icon: "🍳" },
  { month: "Month 1", task: "Bathroom: scrub grout, descale showerhead, clean exhaust fan", roommate: "Roommate 3", icon: "🚿" },
  { month: "Month 2", task: "Dryer: clean lint trap & exhaust duct, wipe drum", roommate: "Roommate 2", icon: "🌬️" },
  { month: "Month 2", task: "Refrigerator: empty, wipe shelves, clean coils/seals", roommate: "Roommate 3", icon: "❄️" },
  { month: "Month 2", task: "Dust ceiling fans, blinds, baseboards, light fixtures", roommate: "Roommate 1", icon: "🌿" },
  { month: "Month 3", task: "Microwave interior/exterior, dishwasher filter & door seal", roommate: "Roommate 3", icon: "🫙" },
  { month: "Month 3", task: "Sanitize all trash cans inside & out; replace liners", roommate: "Roommate 1", icon: "🗑️" },
  { month: "Month 3", task: "Wipe down all common area windows, mirrors & surfaces", roommate: "Roommate 2", icon: "🪟" },
];

const frequencyStandards = [
  { area: "Toilet (shared)", standard: "2–3× per week", deep: "Weekly" },
  { area: "Shower / tub", standard: "Weekly", deep: "Monthly" },
  { area: "Bathroom sink & mirror", standard: "Every few days", deep: "Monthly" },
  { area: "Kitchen counters & stovetop", standard: "Daily after use", deep: "Monthly deep" },
  { area: "Refrigerator", standard: "Wipe spills ASAP", deep: "Monthly" },
  { area: "Microwave", standard: "After each messy use", deep: "Monthly" },
  { area: "Washer drum", standard: "Leave door open after use", deep: "Monthly" },
  { area: "Dryer lint trap", standard: "After EVERY load", deep: "Duct clean monthly" },
  { area: "Common area dusting", standard: "Weekly", deep: "Quarterly deep" },
  { area: "Trash to curb", standard: "Per pickup schedule", deep: "Sanitize can monthly" },
];

export default function ChoreChart({ onClose }: ChoreChartProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl border-2 border-navy-200 shadow-2xl my-8 animate-hero-fade-up">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b-2 border-navy-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-navy">THE HUDSON HAVEN — CHORE CHART</h2>
            <p className="text-slate-500 text-sm mt-1">3-Roommate Rotating System</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/hudson-haven-chore-chart.docx"
              download="Hudson_Haven_Chore_Chart.docx"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-bold text-navy bg-white border-2 border-navy-200
                         hover:bg-navy-50 active:bg-navy-100 transition-colors
                         focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2"
            >
              <Icon name="Download" className="w-4 h-4" />
              Download PDF
            </a>
            <button
              onClick={onClose}
              aria-label="Close chore chart"
              className="p-2 rounded-lg border-2 border-navy-200 text-navy hover:bg-navy-50 active:bg-navy-100 transition-colors"
            >
              <Icon name="X" className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-10">
          {/* Weekly Rotating Schedule */}
          <section>
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Icon name="Calendar" className="w-5 h-5" />
              Weekly Rotating Chore Schedule
            </h3>
            <p className="text-sm text-slate-500 mb-4">Each week, bundles shift one position clockwise. After Week 3, the cycle repeats.</p>
            <div className="overflow-x-auto rounded-xl border-2 border-navy-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left p-3 font-bold">Week</th>
                    <th className="text-left p-3 font-bold">Roommate 1</th>
                    <th className="text-left p-3 font-bold">Roommate 2</th>
                    <th className="text-left p-3 font-bold">Roommate 3</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-3 font-bold text-navy whitespace-nowrap">{row.week}</td>
                      <td className="p-3">
                        <span className="font-bold text-navy">{row.r1.bundle}</span>
                        <ul className="mt-1 space-y-0.5">
                          {row.r1.tasks.map((t, i) => (
                            <li key={i} className="text-slate-600">{t}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-navy">{row.r2.bundle}</span>
                        <ul className="mt-1 space-y-0.5">
                          {row.r2.tasks.map((t, i) => (
                            <li key={i} className="text-slate-600">{t}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-3">
                        <span className="font-bold text-navy">{row.r3.bundle}</span>
                        <ul className="mt-1 space-y-0.5">
                          {row.r3.tasks.map((t, i) => (
                            <li key={i} className="text-slate-600">{t}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-3">💡 Tip: Write roommate names in the header cells and write the current week number on the posted copy. Reset each Sunday.</p>
          </section>

          {/* Daily Shared Responsibilities */}
          <section>
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Icon name="ClipboardCheck" className="w-5 h-5" />
              Daily Shared Responsibilities <span className="text-sm font-normal text-slate-500">(All Roommates)</span>
            </h3>
            <div className="overflow-x-auto rounded-xl border-2 border-navy-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left p-3 font-bold">Task</th>
                    <th className="text-left p-3 font-bold">Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyTasks.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-3 text-slate-700">{row.task}</td>
                      <td className="p-3 text-slate-600 font-medium">{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Monthly Deep-Clean Rotation */}
          <section>
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Icon name="Sparkles" className="w-5 h-5" />
              Monthly Deep-Clean Rotation
            </h3>
            <p className="text-sm text-slate-500 mb-4">After Month 3, the cycle repeats — assignments rotate one position so no roommate repeats the same deep-clean zone.</p>
            <div className="overflow-x-auto rounded-xl border-2 border-navy-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left p-3 font-bold">Month</th>
                    <th className="text-left p-3 font-bold">Task</th>
                    <th className="text-left p-3 font-bold">Assigned To</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyDeepClean.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-3 font-bold text-navy whitespace-nowrap">{row.month}</td>
                      <td className="p-3 text-slate-700">{row.task}</td>
                      <td className="p-3 text-slate-600 font-medium">{row.roommate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
              <Icon name="BookOpen" className="w-5 h-5" />
              Quick Reference: Cleaning Frequency Standards
            </h3>
            <div className="overflow-x-auto rounded-xl border-2 border-navy-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left p-3 font-bold">Area / Item</th>
                    <th className="text-left p-3 font-bold">Standard Clean</th>
                    <th className="text-left p-3 font-bold">Deep Clean</th>
                  </tr>
                </thead>
                <tbody>
                  {frequencyStandards.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                      <td className="p-3 text-slate-700 font-medium">{row.area}</td>
                      <td className="p-3 text-slate-600">{row.standard}</td>
                      <td className="p-3 text-slate-600">{row.deep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Footer */}
          <div className="rounded-xl border-2 border-green bg-green-50 p-4 text-center">
            <p className="text-green-800 text-sm font-medium">
              Full household policies, contacts & updates available at <strong>60walkerst.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
