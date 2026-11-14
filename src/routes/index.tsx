import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, Cpu, Menu, ShieldCheck, Smartphone, Sparkles, Truck, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useProductMotion } from "@/hooks/use-product-motion";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import hero from "@/assets/aurora-studio.jpg";
import winter from "@/assets/hero-winter.jpg";
import phone from "@/assets/phone.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Galaxy Z Aurora | A new world unfolds" },
    { name: "description", content: "Explore Galaxy Z Aurora, a concept foldable with titanium design, a 200MP camera and Galaxy AI. Find your perfect color and storage." },
    { property: "og:title", content: "Galaxy Z Aurora | A new world unfolds" },
    { property: "og:description", content: "Extraordinary design. Endless possibilities. Discover the Galaxy Z Aurora concept." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const colors = [
  { name: "Titanium Silver", cls: "bg-silver" },
  { name: "Midnight Ink", cls: "bg-ink" },
  { name: "Aurora Blue", cls: "bg-aurora" },
];
const sizes = ["256GB", "512GB", "1TB"];
const prices = [1799, 1919, 2159];
const nav = [{ name: "Overview", id: "overview" }, { name: "Design", id: "design" }, { name: "Camera", id: "camera" }, { name: "Galaxy AI", id: "ai" }, { name: "Specs", id: "specs" }];
const questions = [
  { q: "What makes Galaxy Z Aurora different?", a: "This concept combines a pocket-friendly foldable design, a 7.8-inch display, a titanium frame and Galaxy AI in one device." },
  { q: "What is included with the device?", a: "The concept package includes Galaxy Z Aurora, a USB-C cable and a SIM ejector tool. A power adapter is not included." },
  { q: "Can I buy Galaxy Z Aurora?", a: "Galaxy Z Aurora is a fictional product created for the PJ4 marketing project. The configuration and pre-order review are demonstrations; no orders or payments are collected." },
];

function Index() {
  const [color, setColor] = useState(0);
  const [storage, setStorage] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [review, setReview] = useState(false);
  const [film, setFilm] = useState(false);
  const { pageRef, activeSection } = useProductMotion();
  useEffect(() => {
    if (!mobileMenu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenu(false);
      document.getElementById("product-menu-toggle")?.focus();
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setMobileMenu(false); };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenu]);
  const selectedColor = colors[color] ?? { name: "Titanium Silver", cls: "bg-silver" };
  const price = prices[storage] ?? 1919;
  return (
    <div ref={pageRef} className="product-page min-h-screen bg-background text-foreground">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-6 lg:px-12">
          <a href="#overview" aria-label="Samsung home" className="brand-wordmark">SAMSUNG</a>
          <span className="hidden text-xs font-medium text-muted-foreground sm:block">A new chapter in Galaxy.</span>
          <span className="flex items-center gap-2 text-xs font-medium"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Galaxy innovation</span>
        </div>
      </header>
      <div className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-6 lg:px-12">
          <a href="#overview" className="text-base font-bold">Galaxy Z Aurora</a>
          <nav aria-label="Product navigation" className="hidden items-center gap-7 text-xs font-medium md:flex">{nav.map(n => <a key={n.id} aria-current={activeSection === n.id ? "location" : undefined} className="product-nav-link transition-colors hover:text-accent" href={`#${n.id}`}>{n.name}</a>)}</nav>
          <div className="flex items-center gap-2">
            <Button asChild className="rounded-full px-5"><a href="#buy">Pre-order <ArrowUpRight /></a></Button>
            <Button id="product-menu-toggle" variant="ghost" size="icon" className="md:hidden" aria-label={mobileMenu ? "Close menu" : "Open menu"} aria-expanded={mobileMenu} aria-controls="product-mobile-menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</Button>
          </div>
        </div>
        {mobileMenu && <nav id="product-mobile-menu" aria-label="Mobile product navigation" className="mobile-menu flex flex-col border-t border-border px-6 py-4 md:hidden">{nav.map(n => <a key={n.id} aria-current={activeSection === n.id ? "location" : undefined} href={`#${n.id}`} onClick={() => setMobileMenu(false)} className="product-nav-link py-3 text-sm">{n.name}</a>)}</nav>}
      </div>

      <main id="main-content" tabIndex={-1}>
        <section id="overview" className="product-hero relative isolate overflow-hidden bg-studio">
          <img src={hero} alt="Titanium Galaxy Z Aurora open beside its silver triple-camera back" width={1920} height={1080} className="hero-product absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
          <div className="hero-copy relative mx-auto flex h-full max-w-[1440px] flex-col justify-center px-6 lg:px-12">
            <div className="fade-up max-w-[460px]">
              <p className="mb-5 flex items-center gap-2 text-xs font-semibold"><span className="rounded-full border border-foreground/25 px-2.5 py-1">NEW</span> The next generation of foldable</p>
              <h1 className="text-[44px] font-semibold leading-[1.12] lg:text-[60px]">Galaxy Z Aurora</h1>
              <p className="mt-4 text-2xl font-light leading-snug lg:text-[30px]">A new world unfolds.</p>
              <p className="mt-5 max-w-[310px] text-sm leading-6 text-muted-foreground">Extraordinary design. Endless possibilities.<br />Meet the foldable made for more.</p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild size="lg" className="h-12 rounded-full px-7"><a href="#buy">Make it yours <ArrowUpRight /></a></Button>
                <Button variant="link" className="px-0 text-xs" onClick={() => setFilm(true)}>Meet Galaxy Z Aurora <ArrowRight /></Button>
              </div>
              <p className="mt-5 text-xs text-muted-foreground">From $1,799 <span className="mx-2">·</span> Double the possibilities.</p>
            </div>
            <a href="#features" className="hero-discover absolute bottom-6 flex items-center gap-2 text-[10px] font-medium uppercase"><ArrowDown className="h-3 w-3" /> Discover the extraordinary</a>
          </div>
          <span className="absolute bottom-6 right-6 hidden text-[10px] text-muted-foreground md:block lg:right-12">Product concept. Images simulated.</span>
        </section>

        <section id="features" className="border-b border-border">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-y-8 px-6 py-9 md:grid-cols-4 md:py-10">
            {[{ icon: Smartphone, k: '7.8”', t: "More screen. More possibility." }, { icon: Cpu, k: "Galaxy AI", t: "Your everyday, elevated." }, { icon: Zap, k: "5,000mAh", t: "Big days. Lasting power." }, { icon: ShieldCheck, k: "Titanium", t: "Light in hand. Strong by design." }].map((f, i) => <div key={f.k} className={`flex flex-col items-center px-3 text-center ${i ? "md:border-l md:border-border" : ""}`}><f.icon className="mb-3 h-5 w-5 text-muted-foreground" strokeWidth={1.4} /><p className="text-xl font-semibold">{f.k}</p><p className="mt-2 text-[11px] text-muted-foreground">{f.t}</p></div>)}
          </div>
        </section>

        <section id="design" className="section-space mx-auto max-w-[1320px] px-6 lg:px-12">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4"><div><p className="section-eyebrow">ENGINEERED TO AMAZE</p><h2 className="section-title mt-4">Less weight.<br />More wonder.</h2></div><p className="max-w-sm text-sm leading-6 text-muted-foreground">Beautifully thin. Unbelievably capable. A precision-crafted titanium frame that feels as extraordinary as it looks.</p></div>
          <div className="grid gap-5 md:grid-cols-[1.25fr_1fr]">
            <div className="relative overflow-hidden rounded-lg bg-ink text-ink-foreground"><img src={phone} alt="Close-up of the thin titanium Galaxy foldable" width={1200} height={1200} loading="lazy" className="aspect-square w-full object-cover" /><div className="absolute bottom-7 left-7"><p className="text-xs opacity-70">CRAFTED WITHOUT COMPROMISE</p><p className="mt-2 text-2xl font-medium">Every detail. Refined.</p></div></div>
            <div className="flex flex-col justify-center bg-muted px-8 py-12 md:px-12"><span className="text-xs text-muted-foreground">01 / DESIGN</span><h3 className="mt-8 text-3xl font-semibold leading-tight">Feels like less.<br />Does so much more.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">A near-invisible crease. An expansive canvas. From your pocket to your next big idea, in one effortless unfold.</p><div className="mt-10 flex gap-10 border-t border-border pt-7"><div><p className="text-3xl font-medium">8.9<span className="text-base">mm</span></p><p className="mt-2 text-xs text-muted-foreground">Thin when folded</p></div><div><p className="text-3xl font-medium">12<span className="text-base">%</span></p><p className="mt-2 text-xs text-muted-foreground">Lighter by design</p></div></div><a href="#specs" className="mt-9 flex items-center gap-2 text-xs font-semibold">Explore the details <ArrowRight className="h-4 w-4" /></a></div>
          </div>
        </section>

        <section id="camera" className="camera-section relative isolate overflow-hidden bg-ink text-ink-foreground">
          <img src={winter} alt="Northern lights above a snow-covered forest" width={1920} height={1088} loading="lazy" className="absolute inset-0 h-full w-full object-cover" /><div className="camera-scrim absolute inset-0" />
          <div className="relative mx-auto flex min-h-[580px] max-w-[1320px] flex-col justify-center px-6 py-20 lg:px-12"><p className="section-eyebrow text-ink-foreground/70">SEE BEYOND THE ORDINARY</p><h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">Some nights<br />deserve to last.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-ink-foreground/80">A 200MP camera with AI-powered Nightography. Capture the magic, the detail, and everything the darkness used to hide.</p><div className="mt-9 flex gap-9"><div><p className="text-3xl font-semibold">200MP</p><p className="mt-2 text-xs text-ink-foreground/70">Pro-grade camera</p></div><div><Sparkles className="mb-2 h-8 w-8" /><p className="text-xs text-ink-foreground/70">AI Nightography</p></div></div></div>
        </section>

        <section id="ai" className="section-space bg-background"><div className="mx-auto max-w-[1320px] px-6 lg:px-12"><div className="text-center"><Sparkles className="mx-auto h-7 w-7 text-accent" /><p className="section-eyebrow mt-5">GALAXY AI</p><h2 className="section-title mt-4">A little AI. A lot of possibility.</h2><p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-muted-foreground">Less in your way. More in your day. Intelligence that makes the everyday feel effortless.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3">{[{ n: "01", t: "Circle it. Find it.", d: "That jacket. That landmark. That thing you love. Circle to Search puts the answer at your fingertips.", icon: Smartphone }, { n: "02", t: "Say hello, everywhere.", d: "Connect beyond language with Live Translate. Real-time conversations, without the language barrier.", icon: Sparkles }, { n: "03", t: "Make every shot yours.", d: "Move it. Remove it. Reimagine it. Photo Assist turns almost-perfect moments into your favorite memories.", icon: Cpu }].map(f => <article key={f.n} className="border-t border-border pt-7"><div className="flex items-center justify-between"><f.icon className="h-6 w-6 text-accent" strokeWidth={1.5} /><span className="text-xs text-muted-foreground">{f.n}</span></div><h3 className="mt-7 text-xl font-semibold">{f.t}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{f.d}</p></article>)}</div></div></section>

        <section id="buy" className="border-y border-border bg-muted"><div className="mx-auto grid max-w-[1320px] gap-12 px-6 py-20 md:grid-cols-2 lg:px-12"><div className="flex flex-col justify-center"><p className="section-eyebrow">YOUR NEXT CHAPTER</p><h2 className="section-title mt-4">Make it yours.</h2><img src={hero} alt="Galaxy Z Aurora product design; shown in Titanium Silver" width={1920} height={1080} loading="lazy" className="mt-7 aspect-[4/3] w-full rounded-lg object-cover object-right" /><p className="mt-3 text-center text-[10px] text-muted-foreground">Titanium Silver shown. Other finishes are concept selections.</p></div><div className="flex flex-col justify-center"><h3 className="text-2xl font-semibold">Galaxy Z Aurora</h3><p className="mt-3 text-sm text-muted-foreground">A world of possibility. In your pocket.</p><div className="mt-8 border-t border-border pt-7"><p className="text-xs font-semibold">Choose your finish <span className="ml-2 font-normal text-muted-foreground">{selectedColor.name}</span></p><div className="mt-4 flex gap-4">{colors.map((c,i) => <Button key={c.name} variant="ghost" size="icon" title={c.name} aria-label={c.name} aria-pressed={color === i} onClick={() => setColor(i)} className={`h-9 w-9 rounded-full border-4 border-background p-0 ring-offset-2 ring-offset-muted ${c.cls} ${color === i ? "ring-1 ring-foreground" : "ring-1 ring-border"}`} />)}</div></div><div className="mt-7"><p className="text-xs font-semibold">Choose your storage</p><div className="mt-4 grid grid-cols-3 gap-3">{sizes.map((s,i) => <Button key={s} variant="outline" aria-pressed={storage === i} onClick={() => setStorage(i)} className={`h-12 rounded-md shadow-none ${storage === i ? "border-foreground bg-foreground text-background hover:bg-foreground/90 hover:text-background" : "bg-transparent"}`}>{s}</Button>)}</div></div><div className="mt-8 flex flex-wrap items-end justify-between gap-3 border-t border-border pt-7"><p className="text-3xl font-semibold" aria-live="polite">${price.toLocaleString("en-US")}</p><span className="text-xs text-muted-foreground">Concept pricing · USD</span></div><Button className="mt-6 h-12 w-full rounded-full" onClick={() => setReview(true)}>Pre-order now <ArrowUpRight /></Button><p className="mt-4 text-center text-[11px] text-muted-foreground">PJ4 concept experience. No payment required.</p><div className="mt-7 flex justify-center gap-6 border-t border-border pt-5 text-[11px] text-muted-foreground"><span className="flex items-center gap-2"><Truck className="h-4 w-4" /> Delivery concept</span><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> No charges collected</span></div></div></div></section>

        <section id="specs" className="section-space mx-auto max-w-[1000px] px-6"><p className="section-eyebrow">THE DETAILS THAT MATTER</p><h2 className="section-title mt-4">Small fold. Big numbers.</h2><dl className="mt-10 grid sm:grid-cols-2">{[["Display", '7.8” Dynamic AMOLED 2X'],["Camera", "200MP · AI Nightography"],["Battery", "5,000mAh · Fast charging"],["Build", "Titanium frame · 8.9mm folded"],["Storage", "256GB / 512GB / 1TB"],["Intelligence", "Galaxy AI built in"]].map(([k,v]) => <div key={k} className="border-b border-border py-6 sm:odd:mr-10"><dt className="text-xs text-muted-foreground">{k}</dt><dd className="mt-2 text-sm font-semibold">{v}</dd></div>)}</dl></section>
        <section className="mx-auto max-w-[1000px] px-6 pb-20"><h2 className="text-2xl font-semibold">A few things you might be wondering.</h2><Accordion type="single" collapsible className="mt-7">{questions.map((f,i) => <AccordionItem key={f.q} value={`question-${i}`}><AccordionTrigger className="gap-4 py-5 focus-visible:outline-2 focus-visible:outline-ring">{f.q}</AccordionTrigger><AccordionContent className="max-w-2xl pb-6 leading-7 text-muted-foreground">{f.a}</AccordionContent></AccordionItem>)}</Accordion></section>
      </main>
      <footer className="border-t border-border bg-muted px-6 py-9 lg:px-12"><div className="mx-auto max-w-[1320px]"><div className="flex flex-wrap items-center justify-between gap-4"><a href="#overview" className="brand-wordmark">SAMSUNG</a><a href="#overview" className="flex items-center gap-2 text-xs">Back to top <ArrowUpRight className="h-4 w-4" /></a></div><p className="mt-7 max-w-3xl text-[10px] leading-5 text-muted-foreground">Independent PJ4 training project. Not affiliated with Samsung. Galaxy Z Aurora is a fictional product; all specifications, offers and prices are illustrative. Product images are AI-generated.</p><div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-border pt-5 text-[10px] text-muted-foreground"><span>© 2026 PJ4 · Product marketing concept</span><span>Imagined for a world of possibility.</span></div></div></footer>

      <Dialog open={review} onOpenChange={setReview}><DialogContent><DialogTitle>Your Galaxy, your way.</DialogTitle><DialogDescription>Review your concept configuration. This demonstration does not place an order or collect payment.</DialogDescription><div className="flex items-center gap-5 border-y border-border py-5"><img src={phone} alt="Galaxy Z Aurora" width={1200} height={1200} className="h-24 w-24 rounded-md object-cover" /><div><p className="font-semibold">Galaxy Z Aurora</p><p className="mt-2 text-sm text-muted-foreground">{selectedColor.name} · {sizes[storage]}</p><p className="mt-3 font-semibold">${price.toLocaleString("en-US")}</p></div></div><p className="flex items-center gap-2 text-sm text-muted-foreground"><Check className="h-4 w-4 text-accent" /> Your selection is ready to explore.</p><Button onClick={() => setReview(false)}>Continue exploring <ChevronRight /></Button></DialogContent></Dialog>
      <Dialog open={film} onOpenChange={setFilm}><DialogContent className="max-w-3xl"><DialogTitle>A new world unfolds.</DialogTitle><DialogDescription>Meet the Galaxy Z Aurora concept.</DialogDescription><img src={hero} alt="The open Galaxy Z Aurora and titanium camera design" width={1920} height={1080} className="w-full rounded-md" /><div className="grid grid-cols-3 gap-3 border-t border-border pt-4 text-center text-xs"><span>7.8” immersive display</span><span>200MP camera</span><span>Galaxy AI</span></div><Button asChild onClick={() => setFilm(false)}><a href="#buy">Make it yours <ArrowRight /></a></Button></DialogContent></Dialog>
    </div>
  );
}