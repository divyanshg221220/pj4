import { useEffect, useRef, useState } from "react";
import phone from "@/assets/phone.jpg";

export function UnfoldPhone() {
  const sectionRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const mount = mountRef.current;
    if (!section || !mount) return;
    let disposed = false;
    let cleanup = () => {};
    async function start() {
      const THREE = await import("three");
      const { RoundedBoxGeometry } = await import("three/examples/jsm/geometries/RoundedBoxGeometry.js");
      if (disposed || !section || !mount) return;
      const styles = getComputedStyle(section);
      // Resolve semantic CSS tokens to sRGB for WebGL materials.
      const swatch = document.createElement("canvas");
      swatch.width = swatch.height = 1;
      const ctx = swatch.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      const color = (token: string) => {
        ctx.clearRect(0, 0, 1, 1);
        ctx.fillStyle = styles.getPropertyValue(token).trim();
        ctx.fillRect(0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        return new THREE.Color(`rgb(${data[0]},${data[1]},${data[2]})`);
      };
      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); }
      catch { return; }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      mount.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-hidden", "true");
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      const root = new THREE.Group();
      scene.add(root);
      scene.add(new THREE.HemisphereLight(color("--background"), color("--silver"), 3));
      const key = new THREE.DirectionalLight(color("--background"), 5);
      key.position.set(-4, 5, 6);
      scene.add(key);
      const rim = new THREE.DirectionalLight(color("--aurora"), 3);
      rim.position.set(4, 2, -3);
      scene.add(rim);
      const metal = new THREE.MeshStandardMaterial({ color: color("--silver"), metalness: 0.75, roughness: 0.27 });
      const glass = new THREE.MeshStandardMaterial({ color: color("--ink"), metalness: 0.3, roughness: 0.2 });
      const wallpaper = document.createElement("canvas");
      wallpaper.width = 1024;
      wallpaper.height = 1024;
      const paint = wallpaper.getContext("2d");
      if (!paint) { renderer.dispose(); renderer.domElement.remove(); return; }
      const gradient = paint.createLinearGradient(0, 0, 1024, 1024);
      gradient.addColorStop(0, styles.getPropertyValue("--ink").trim());
      gradient.addColorStop(0.5, styles.getPropertyValue("--aurora").trim());
      gradient.addColorStop(1, styles.getPropertyValue("--accent").trim());
      paint.fillStyle = gradient;
      paint.fillRect(0, 0, 1024, 1024);
      for (let i = 0; i < 45; i++) {
        paint.beginPath();
        paint.moveTo(-100, 500 + i * 12);
        paint.bezierCurveTo(250, -200 + i * 14, 700, 1250 - i * 8, 1150, 130 + i * 10);
        paint.strokeStyle = styles.getPropertyValue("--studio").trim();
        paint.globalAlpha = 0.12 + (i / 45) * 0.2;
        paint.lineWidth = 5;
        paint.stroke();
      }
      const baseTexture = new THREE.CanvasTexture(wallpaper);
      baseTexture.colorSpace = THREE.SRGBColorSpace;
      const hinges: InstanceType<typeof THREE.Group>[] = [];
      const resources: Array<{ dispose: () => void }> = [metal, glass, baseTexture];
      for (const side of [-1, 1]) {
        const hinge = new THREE.Group();
        root.add(hinge);
        hinges.push(hinge);
        const bodyGeometry = new RoundedBoxGeometry(1.92, 4.25, 0.16, 5, 0.105);
        const body = new THREE.Mesh(bodyGeometry, metal);
        body.position.x = side * 0.98;
        hinge.add(body);
        const bezelGeometry = new RoundedBoxGeometry(1.82, 4.12, 0.024, 5, 0.08);
        const bezel = new THREE.Mesh(bezelGeometry, glass);
        bezel.position.set(side * 0.98, 0, 0.089);
        hinge.add(bezel);
        const texture = baseTexture.clone();
        texture.repeat.set(0.5, 1);
        texture.offset.set(side === -1 ? 0 : 0.5, 0);
        const screenMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const screenGeometry = new RoundedBoxGeometry(1.75, 4.03, 0.008, 5, 0.075);
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(side * 0.98, 0, 0.107);
        hinge.add(screen);
        resources.push(bodyGeometry, bezelGeometry, screenGeometry, texture, screenMaterial);
        // Raised camera rings on the titanium back.
        for (let i = 0; i < 3; i++) {
          const ringGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.075, 32);
          const ring = new THREE.Mesh(ringGeometry, metal);
          ring.rotation.x = Math.PI / 2;
          ring.position.set(side * 1.52, 1.52 - i * 0.49, -0.12);
          hinge.add(ring);
          const lensGeometry = new THREE.CylinderGeometry(0.135, 0.135, 0.08, 32);
          const lens = new THREE.Mesh(lensGeometry, glass);
          lens.rotation.x = Math.PI / 2;
          lens.position.copy(ring.position);
          lens.position.z -= 0.025;
          hinge.add(lens);
          resources.push(ringGeometry, lensGeometry);
        }
      }
      const spineGeometry = new THREE.CylinderGeometry(0.065, 0.065, 4.08, 32);
      root.add(new THREE.Mesh(spineGeometry, metal));
      resources.push(spineGeometry);
      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      let frame = 0;
      const render = () => {
        frame = 0;
        const rect = section.getBoundingClientRect();
        const distance = Math.max(1, section.offsetHeight - (window.innerHeight - 64));
        const progress = media.matches ? 1 : THREE.MathUtils.clamp((64 - rect.top) / distance, 0, 1);
        const angle = (1 - progress) * Math.PI * 0.47;
        if (hinges[0]) hinges[0].rotation.y = angle;
        if (hinges[1]) hinges[1].rotation.y = -angle;
        root.rotation.set(-0.12 + progress * 0.06, -0.48 + progress * 0.3, -0.08 + progress * 0.04);
        renderer.render(scene, camera);
        mount.dataset['unfoldProgress'] = progress.toFixed(3);
      };
      const requestRender = () => { if (!frame) frame = window.requestAnimationFrame(render); };
      const resize = () => {
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / Math.max(height, 1);
        camera.position.set(0, 0, camera.aspect < 0.8 ? 13.5 : 10.5);
        camera.lookAt(0, 0, 0);
        camera.updateProjectionMatrix();
        requestRender();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(mount);
      window.addEventListener("scroll", requestRender, { passive: true });
      media.addEventListener("change", requestRender);
      resize();
      setReady(true);
      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("scroll", requestRender);
        media.removeEventListener("change", requestRender);
        window.cancelAnimationFrame(frame);
        for (const resource of resources) resource.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    }
    void start().catch(() => { /* Keep the static product fallback if WebGL is unavailable. */ });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <section ref={sectionRef} className="unfold-section bg-studio text-studio-foreground" aria-label="Galaxy Z Aurora unfolding design">
      <div className="unfold-stage">
        <div className="unfold-heading">
          <p className="section-eyebrow">ONE FOLD. ENDLESS POSSIBILITIES.</p>
          <h2 className="section-title mt-4">Your world. Wide open.</h2>
        </div>
        <div ref={mountRef} className="unfold-canvas" role="img" aria-label="3D titanium phone opening from folded to a full-width display as the page scrolls">
          {!ready && <img src={phone} alt="Galaxy Z Aurora foldable titanium design" width={1200} height={1200} loading="lazy" className="h-full w-full object-contain" />}
        </div>
        <p className="unfold-caption text-xs">7.8” Dynamic AMOLED 2X <span className="mx-2">·</span> A bigger canvas for your day.</p>
      </div>
    </section>
  );
}