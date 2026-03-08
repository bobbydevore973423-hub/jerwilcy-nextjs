"use client";

import Giscus from "@giscus/react";

export default function Comments() {
  return (
    <div className="mt-12 pt-8 border-t border-border/40">
      <Giscus
        id="comments"
        repo="jerwilcy/jerwilcy.github.io"
        repoId="R_kgDONLxxxx"
        category="Announcements"
        categoryId="DIC_kwDONLxxxx"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
