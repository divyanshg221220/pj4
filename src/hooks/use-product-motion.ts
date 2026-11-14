import { useEffect, useRef, useState } from "react";

export function useProductMotion() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = page.querySelectorAll("main > section:not(#overview) > div, #specs > *, #ai article");
    const reveal = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        reveal.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    const setup = () => {
      for (const target of targets) {
        if (media.matches) {
          target.classList.remove("reveal-pending");
          target.classList.add("is-revealed");
          reveal.unobserve(target);
        } else if (!target.classList.contains("is-revealed")) {
          // Never hide something already in view during hydration.
          if (target.getBoundingClientRect().top >= window.innerHeight) target.classList.add("reveal-pending");
          reveal.observe(target);
        }
      }
    };
    setup();
    media.addEventListener("change", setup);
    const sections = page.querySelectorAll<HTMLElement>("main > section[id]");
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = "overview";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= 150) current = section.id;
      }
      setActiveSection(current);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      reveal.disconnect();
      media.removeEventListener("change", setup);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      for (const target of targets) target.classList.remove("reveal-pending");
    };
  }, []);
  return { pageRef, activeSection };
}