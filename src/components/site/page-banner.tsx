import type { ReactNode } from "react";

export function PageBanner({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <section className="border-b border-dashed bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <p className="ornament">{kicker}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-6xl">{title}</h1>
        {children ? <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div> : null}
      </div>
    </section>
  );
}
