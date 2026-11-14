import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero-winter.jpg";
import phone from "@/assets/phone.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Galaxy Z Aurora — The New Foldable | Samsung" },
      { name: "description", content: "Galaxy Z Aurora: an AI-powered foldable with a 200MP night camera, all-day battery and Galaxy AI. Pre-order now." },
      { property: "og:title", content: "Galaxy Z Aurora — The New Foldable" },
      { property: "og:description", content: "Design your perfect day with Galaxy AI. Pre-order Galaxy Z Aurora now." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { k: "200MP", t: "Nightography camera", d: "AI noise reduction captures the aurora as you saw it." },
  { k: "7.8\"", t: "Dynamic AMOLED 2X", d: "A tablet-size canvas that folds into your pocket." },
  { k: "5000mAh", t: "All-day battery", d: "Fast charging gets you to 50% in 30 minutes." },
  { k: "AI", t: "Galaxy AI built in", d: "Live Translate, Circle to Search and Photo Assist." },
];

const colors = [
  { name: "Titanium Silver", cls: "bg-secondary" },
  { name: "Midnight Ink", cls: "bg-ink" },
  { name: "Aurora Blue", cls: "bg-accent" },
];

function Index() {
  const [color, setColor] = useState(0);
  const [storage, setStorage] = useState(1);
  const prices = [1799, 1919, 2159];
  const sizes = ["256GB", "512GB", "1TB"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-xl font-extrabold tracking-[0.2em]">SAMSUNG</span>
          <ul className="hidden gap-8 text-sm font-semibold md:flex">
            <li><a href="#features">Features</a></li>
            <li><a href="#design">Design</a></li>
            <li><a href="#buy">Buy</a></li>
          </ul>
          <a href="#buy" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Pre-order</a>
        </nav>
      </header>

      <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-ink">
        <img src={hero} alt="Snowy forest under the aurora, shot on Galaxy Z Aurora" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 text-ink-foreground">
          <p className="fade-up text-sm font-semibold uppercase tracking-[0.3em]">New · Galaxy Z Aurora</p>
          <h1 className="fade-up mt-4 max-w-2xl text-5xl font-extrabold leading-[1.05] md:text-7xl">Design your perfect day with Galaxy AI</h1>
          <p className="fade-up mt-6 max-w-lg text-lg font-light">Unfold a brighter night. The foldable that sees in the dark.</p>
          <div className="fade-up mt-8 flex gap-3">
            <a href="#buy" className="rounded-full bg-ink-foreground px-7 py-3 font-semibold text-ink">Pre-order now</a>
            <a href="#features" className="rounded-full border border-ink-foreground px-7 py-3 font-semibold">Learn more</a>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold md:text-5xl">Built for every moment</h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="rounded-[var(--radius)] bg-card p-8">
              <p className="text-4xl font-extrabold text-accent">{f.k}</p>
              <h3 className="mt-4 text-lg font-semibold">{f.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="design" className="bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-24 md:grid-cols-2">
          <img src={phone} alt="Galaxy Z Aurora in Titanium Silver" width={1200} height={1200} loading="lazy" className="w-full rounded-[var(--radius)]" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] opacity-70">Design</p>
            <h2 className="mt-4 text-4xl font-bold md:text-5xl">Thinner. Lighter. Stronger.</h2>
            <p className="mt-6 text-lg font-light opacity-80">A titanium frame and a near-invisible crease, now 12% lighter. Folds flat to 8.9mm.</p>
          </div>
        </div>
      </section>

      <section id="buy" className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-4xl font-bold">Pre-order Galaxy Z Aurora</h2>
        <p className="mt-3 text-muted-foreground">Get double the storage free with pre-order.</p>
        <div className="mt-10">
          <p className="text-sm font-semibold">Color: {colors[color].name}</p>
          <div className="mt-3 flex justify-center gap-4">
            {colors.map((c, i) => (
              <button key={c.name} aria-label={c.name} onClick={() => setColor(i)}
                className={`h-10 w-10 rounded-full border-2 ${c.cls} ${i === color ? "border-accent ring-2 ring-accent ring-offset-2" : "border-border"}`} />
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          {sizes.map((s, i) => (
            <button key={s} onClick={() => setStorage(i)}
              className={`rounded-full border px-6 py-2 font-semibold ${i === storage ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{s}</button>
          ))}
        </div>
        <p className="mt-10 text-5xl font-extrabold">${prices[storage].toLocaleString()}</p>
        <button className="mt-6 rounded-full bg-accent px-10 py-4 font-semibold text-accent-foreground">Pre-order now</button>
      </section>

      <footer className="border-t border-border py-10 text-center text-sm text-muted-foreground">
        Training project · Fictional product for PJ4 marketing page exercise
      </footer>
    </div>
  );
}
