import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { urls } from "@/constants/urls";
import { MdOutlineCalendarMonth } from "react-icons/md";
function ChangelogHeader() {
  return (
    <header className="border-b border-dashed">
      <div className="mx-auto max-w-2xl px-6 md:px-12 py-6">
        <div className="space-y-3 mb-3">
          <h1 className="text-xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            Changelog
          </h1>
          <p className="text-muted-foreground max-w-2xl text-pretty leading-relaxed">
            Stay up to date with the latest features, improvements, and bug
            fixes.
          </p>
        </div>
      </div>
    </header>
  );
}
function ChangelogFooter() {
  return (
    <footer className="border-t border-dashed">
      <div className="mx-auto max-w-2xl px-6 md:px-12 py-10">
        <div className="flex gap-3 items-center justify-center">
          <Button variant="secondary" size="sm">
            <a href={`${urls.github}/discussions`}>Featuer Request</a>
          </Button>
          <Button variant="secondary" size="sm">
            <a href={`${urls.github}/issues/new`}>Bug Report</a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

interface ChangelogEntry {
  date: string;
  changes: string[];
}
const emojis = {
  feat: "🚀",
  fix: "🐞",
  perf: "⚡",
  breaking: "💥",
  style: "🎨",
  refactor: "💡",
  // docs: "📝",
  // test: "🧪",
  // chore: "👷",
};

const changelogData: ChangelogEntry[] = [
  {
    date: "Oct 23, 2025",
    changes: ["style: Tweak the editor UI panel"],
  },
  {
    date: "Oct 21, 2025",
    changes: [
      "feat: Introduce changelog page",
      "refactor: Refactor MultiSelect component",
    ],
  },
  {
    date: "Oct 20, 2025",
    changes: [
      "feat: Introduce social media buttons",
      "fix: Fixed errors with generated code",
    ],
  },
  {
    date: "Oct 19, 2025",
    changes: [
      "feat: Add file upload component with multiple file support",
      "fix: Fix form validation errors with Zod schema",
      "perf: Improve form rendering performance",
    ],
  },
  {
    date: "Oct 18, 2025",
    changes: [
      "feat: Add My Forms page with templates",
      "feat: Implement form step reordering",
      "fix: Fix TypeScript compilation errors",
    ],
  },
  {
    date: "Oct 16, 2025",
    changes: ["refactor: Reorganize form field attributes"],
  },
  {
    date: "Oct 15, 2025",
    changes: ["feat: Support label in separator"],
  },
  {
    date: "Oct 14, 2025",
    changes: ["feat: Support the new Field components"],
  },
  {
    date: "Oct 7, 2025",
    changes: ["fix: Handle issue with reordering steps"],
  },
  {
    date: "Oct 3, 2025",
    changes: [
      "feat: Replace headers elements with Text component",
      "feat: Introduce combobox",
    ],
  },
  {
    date: "Sep 26, 2025",
    changes: ["fix: Handle issue with file upload"],
  },
  {
    date: "Sep 25, 2025",
    changes: ["breaking: Drop browser validation for slider & rating"],
  },
];

function ChangelogTimeline() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16 border-x border-dashed">
      <div className="relative space-y-8">
        {/* <div className="absolute left-[15px] top-6 bottom-0 w-px bg-border/50 hidden md:block" /> */}

        {changelogData.map((entry) => (
          <div key={entry.date} className="relative">
            {/* <div className="absolute left-2.5 hidden md:block">
              <div className="size-3 rounded-full bg-primary ring-4 ring-background" />
            </div> */}

            <Card className="md:ml-12 overflow-hidden border-border/50 border-none py-0 shadow-none">
              <div className="px-6 md:px-8 space-y-4">
                {/* Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="text-xs text-muted-foreground flex gap-2 border py-1.5 px-2.5 rounded-lg border-dashed">
                      <MdOutlineCalendarMonth className="size-3.5" />
                      {entry.date}
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-2">
                  {entry.changes.map((item, itemIndex) => {
                    const [changeType, change] = item.split(":");
                    return (
                      <li
                        key={itemIndex}
                        className="flex items-start gap-3 leading-relaxed"
                      >
                        {/* <span className="text-primary flex-shrink-0">•</span> */}
                        <span className="text-foreground/80">
                          {emojis[changeType as keyof typeof emojis]}
                          {change}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export const metadata = {
  title: "Changelog | Formcn",
  description: "Learn about the latest changes in Formcn",
};
//======================================
export default function ChangelogPage() {
  return (
    <main className="">
      <ChangelogHeader />
      <ChangelogTimeline />
      <ChangelogFooter />
    </main>
  );
}
