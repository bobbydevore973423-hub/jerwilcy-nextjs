"use client";

import { Share2 } from "lucide-react";

export default function CopyLinkButton() {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(window.location.href)}
      className="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
      title="复制链接"
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}
