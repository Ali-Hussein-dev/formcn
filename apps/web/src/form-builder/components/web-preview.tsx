import type React from "react";
import { Lock } from "lucide-react";

interface WebPreviewProps {
  children: React.ReactNode;
  url?: string;
}

export function WebPreview({
  children,
  url = "/form-preview",
}: WebPreviewProps) {
  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden">
      {/* Browser Header */}
      <div className="bg-muted border-border border-b px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Traffic Light Buttons */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* URL Bar */}
          <div className="flex-1 mx-4">
            <div className="flex items-center bg-input border border-border rounded-md px-3 py-1.5">
              <Lock className="h-4 w-4 text-muted-foreground mr-2" />
              <span className="text-sm text-muted-foreground">{url}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Browser Content */}
      <div className="dark:bg-secondary/30 bg-secondary/30 overflow-hidden ">
        <div className="p-2">
          <div className="relative">
            <div
              className="absolute inset-0 -z-10"
              style={{
                background: "var(--secondary)/30",
                backgroundSize: "18px 18px",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
              }}
            />
            <div className="z-20 p-5 pt-7">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
