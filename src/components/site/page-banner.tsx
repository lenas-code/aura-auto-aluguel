import type { ReactNode } from "react";

export function PageBanner({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b">
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-violet/25 via-transparent to-primary/15" aria-hidden="true" />
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <p className="ornament">{kicker}</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight md:text-5xl">{title}</h1>
        {children ? <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div> : null}
      </div>
    </section>
  );
}
