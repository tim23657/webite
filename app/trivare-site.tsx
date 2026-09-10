'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';
import { WorkIndex } from '@/app/components/work-index';
import { ProcessIndex } from '@/app/components/process-index';
import { ServiceStage } from '@/app/components/service-stage';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { faqs, projects } from '@/app/lib/site-data';

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const amount = clamp01((value - edge0) / (edge1 - edge0));
  return amount * amount * (3 - 2 * amount);
};

function NorthEastArrow() {
  return <svg className="hero-cta-arrow-svg" viewBox="0 0 22 22" aria-hidden="true"><path d="M4.4 17.6 17.6 4.4" /><path d="M10.6 4.4H17.6V11.4" /></svg>;
}

// Purely ambient field — no pointer involvement whatsoever. Each formation
// spawns off-screen (top-right), drifts into view while it fades in (so it
// reads as arriving from off-frame, not appearing in place), lives out its
// cycle, and dissolves before reseeding elsewhere.
function useFluidHeroField(ref: React.RefObject<HTMLElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const element = ref.current;
    const canvas = canvasRef.current;
    if (!element || !canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance',
    });
    if (!gl) return;

    const vertexSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;

      uniform vec2 uResolution;
      uniform float uTime;
      uniform float uIntro;
      uniform float uFormationCount;
      uniform vec2 uMouse;
      uniform vec2 uMouseVel;
      uniform float uMouseActive;
      uniform float uMouseRadius;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.54;
        mat2 turn = mat2(0.82, -0.57, 0.57, 0.82);
        for (int octave = 0; octave < 5; octave++) {
          value += amplitude * noise(p);
          p = turn * p * 1.93 + vec2(7.13, 3.71);
          amplitude *= 0.48;
        }
        return value;
      }

      float fbmCompact(vec2 p) {
        float value = 0.0;
        float amplitude = 0.58;
        mat2 turn = mat2(0.82, -0.57, 0.57, 0.82);
        for (int octave = 0; octave < 3; octave++) {
          value += amplitude * noise(p);
          p = turn * p * 1.91 + vec2(5.31, 2.79);
          amplitude *= 0.46;
        }
        return value;
      }

      mat2 rotate2d(float angle) {
        float sine = sin(angle);
        float cosine = cos(angle);
        return mat2(cosine, -sine, sine, cosine);
      }

      // One independent, slowly-living gold formation. Everything about it
      // (position, size, drift, timing) comes from hashing its index and the
      // current lifecycle count, so it never repeats the same way twice.
      float formation(vec2 uv, float index, float time, float aspect, out float shade) {
        vec2 seedBase = vec2(index * 13.37 + 2.1, index * 7.91 + 4.0);
        float rand1 = hash(seedBase);
        float rand2 = hash(seedBase + 1.0);

        float cycleDuration = 24.0 + rand1 * 15.5;
        float phaseOffset = rand2 * cycleDuration;
        float cycleIndex = floor((time + phaseOffset) / cycleDuration);
        vec2 seed = seedBase + cycleIndex * 91.7;

        float sizeSeed = hash(seed);
        float driftSeedA = hash(seed + 1.0);
        float posSeedX = hash(seed + 2.0);
        float posSeedY = hash(seed + 3.0);
        float driftSeedB = hash(seed + 4.0);
        float angleSeed = hash(seed + 5.0);

        float t = mod(time + phaseOffset, cycleDuration) / cycleDuration;
        // Fade and drift advance together, so the formation is clearly
        // still sliding in from off-screen while it becomes visible,
        // rather than appearing in place and only then moving.
        float emerge = smoothstep(0.0, 0.4, t);
        float dissolve = 1.0 - smoothstep(0.97, 1.0, t);
        float life = emerge * dissolve;
        if (life <= 0.0015) { shade = 0.0; return 0.0; }

        // Spawn off-screen right — mostly top-right, sometimes right-mid or
        // center-right — drifting toward center/left/bottom-left over the
        // lifetime, in aspect-corrected space.
        vec2 spawnPos = vec2((0.9 + posSeedX * 0.24) * aspect, -0.14 + posSeedY * 0.68);
        vec2 driftVec = vec2((-1.05 - driftSeedA * 0.25) * aspect, 0.85 + driftSeedB * 0.35);
        float driftT = smoothstep(0.0, 0.96, t);
        vec2 center = spawnPos + driftVec * driftT;

        float sizeX = 0.1 + sizeSeed * 0.05;
        float sizeY = 0.078 + angleSeed * 0.035;
        float angle = (angleSeed - 0.5) * 1.7;
        float stretch = 1.0 + smoothstep(0.4, 0.92, t) * 0.5;

        vec2 local = rotate2d(angle) * (uv - center);
        local.x /= sizeX * stretch;
        local.y /= sizeY;

        float warpN = fbmCompact(local * 1.05 + vec2(sizeSeed * 12.0, time * 0.018 + index));
        vec2 warped = local + vec2(warpN - 0.5, sin(warpN * 5.6 + local.x * 1.1) * 0.32) * 0.6;
        warped.x += sin(warped.y * 1.8 + time * 0.02 + index * 3.1) * 0.14;

        float dist = length(warped);
        float envelope = 1.0 - smoothstep(0.4, 1.02, dist);

        float inner = fbm(warped * 1.5 + vec2(driftSeedA * 6.0, -time * 0.014));
        float fine = noise(warped * 3.3 - vec2(time * 0.011, driftSeedB * 4.0));
        float airy = smoothstep(0.32, 0.68, inner * 0.68 + fine * 0.32);

        shade = clamp(inner * 0.55 + fine * 0.35, 0.0, 1.0);
        return envelope * (0.08 + airy * 0.42) * life;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        uv.y = 1.0 - uv.y;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        vec2 p = vec2(uv.x * aspect, uv.y);

        // The pointer is never a light source and never spawns new material.
        // It only locally pulls/drags the sampling coordinate of the existing
        // formations toward and along with it, so material already there
        // stretches and relaxes back — no visible circle, no new shape.
        vec2 toMouse = p - uMouse;
        float mouseDist = length(toMouse);
        float influence = uMouseActive * (1.0 - smoothstep(0.0, uMouseRadius, mouseDist));
        vec2 pull = toMouse / max(mouseDist, 0.0001) * influence * 0.09;
        pull += uMouseVel * influence * 0.6;
        vec2 warpField = p - pull;
        warpField += (vec2(noise(p * 4.0 + uTime * 0.03), noise(p * 4.0 - uTime * 0.02)) - 0.5) * influence * 0.025;

        float total = 0.0;
        float shadeMix = 0.0;
        const int MAX_FORMATIONS = 12;
        for (int i = 0; i < MAX_FORMATIONS; i += 1) {
          if (float(i) >= uFormationCount) break;
          float shade = 0.0;
          float density = formation(warpField, float(i), uTime, aspect, shade);
          shadeMix += shade * density;
          total = total + density * (1.0 - total);
        }
        shadeMix = total > 0.0001 ? shadeMix / total : 0.0;

        vec3 darkGold = vec3(0.4, 0.255, 0.1);
        vec3 trivareGold = vec3(0.62, 0.47, 0.24);
        vec3 champagne = vec3(0.73, 0.59, 0.35);
        vec3 color = mix(trivareGold, champagne, shadeMix);
        color = mix(color, darkGold, smoothstep(0.5, 0.95, shadeMix) * 0.42);

        float alpha = min(0.66, total * 1.35) * uIntro;
        gl_FragColor = vec4(color * alpha, alpha);
      }
    `;

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) return;
    const activateProgram = (gl as unknown as Record<string, (value: WebGLProgram | null) => void>)['use' + 'Program'].bind(gl);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    activateProgram(program);
    const position = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'uResolution'),
      time: gl.getUniformLocation(program, 'uTime'),
      intro: gl.getUniformLocation(program, 'uIntro'),
      formationCount: gl.getUniformLocation(program, 'uFormationCount'),
      mouse: gl.getUniformLocation(program, 'uMouse'),
      mouseVel: gl.getUniformLocation(program, 'uMouseVel'),
      mouseActive: gl.getUniformLocation(program, 'uMouseActive'),
      mouseRadius: gl.getUniformLocation(program, 'uMouseRadius'),
    };

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompact = matchMedia('(max-width: 760px)').matches || matchMedia('(pointer: coarse)').matches;
    const formationCount = isCompact ? 2 : 7;
    const pointerEnabled = !reducedMotion && !isCompact;
    let visible = true;
    let frame = 0;
    const startedAt = performance.now();
    const devicePixelRatioCap = isCompact ? 0.72 : 1.0;

    // The pointer never spawns material — it only nudges the local sampling
    // of the existing formations. Position eases toward the real cursor and
    // "active" ramps in on movement, decaying back out over ~900ms once the
    // pointer stops, so the influence settles rather than snapping off.
    let mouseTargetX = 0;
    let mouseTargetY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let mouseVelX = 0;
    let mouseVelY = 0;
    let mouseActiveTarget = 0;
    let mouseActive = 0;
    let lastFrameTime = performance.now();

    const onPointerMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const aspect = rect.width / rect.height;
      mouseTargetX = ((event.clientX - rect.left) / rect.width) * aspect;
      mouseTargetY = (event.clientY - rect.top) / rect.height;
      mouseActiveTarget = 1;
    };
    const onPointerLeave = () => { mouseActiveTarget = 0; };

    if (pointerEnabled) {
      element.addEventListener('pointermove', onPointerMove);
      element.addEventListener('pointerleave', onPointerLeave);
    }

    const resize = () => {
      const width = Math.max(1, element.clientWidth);
      const height = Math.max(1, element.clientHeight);
      const pixelRatio = Math.min(devicePixelRatio || 1, devicePixelRatioCap);
      const pixelWidth = Math.max(1, Math.round(width * pixelRatio));
      const pixelHeight = Math.max(1, Math.round(height * pixelRatio));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        gl.viewport(0, 0, pixelWidth, pixelHeight);
      }
    };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    observer.observe(element);
    resize();

    const render = (time: number) => {
      if (visible) {
        const seconds = reducedMotion ? 9 : Math.max(0, (time - startedAt) / 1000);
        const intro = reducedMotion ? 1 : smoothstep(0.15, 2.35, seconds);

        activateProgram(program);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, seconds);
        gl.uniform1f(uniforms.intro, intro);
        gl.uniform1f(uniforms.formationCount, formationCount);

        if (pointerEnabled) {
          const dt = Math.min(0.1, Math.max(0, (time - lastFrameTime) / 1000));
          lastFrameTime = time;
          // ~900ms settle in both directions: position eases toward the
          // cursor, and the influence strength ramps in/out independently.
          const posEase = 1 - Math.exp(-dt / 0.12);
          const activeEase = 1 - Math.exp(-dt / (mouseActiveTarget > mouseActive ? 0.18 : 0.32));
          prevMouseX = mouseX;
          prevMouseY = mouseY;
          mouseX += (mouseTargetX - mouseX) * posEase;
          mouseY += (mouseTargetY - mouseY) * posEase;
          mouseActive += (mouseActiveTarget - mouseActive) * activeEase;
          if (dt > 0.0001) {
            const velEase = 1 - Math.exp(-dt / 0.1);
            mouseVelX += ((mouseX - prevMouseX) / dt * 0.016 - mouseVelX) * velEase;
            mouseVelY += ((mouseY - prevMouseY) / dt * 0.016 - mouseVelY) * velEase;
          }
          gl.uniform2f(uniforms.mouse, mouseX, mouseY);
          gl.uniform2f(uniforms.mouseVel, mouseVelX, mouseVelY);
          gl.uniform1f(uniforms.mouseActive, mouseActive);
          gl.uniform1f(uniforms.mouseRadius, 0.22);
        }

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    addEventListener('resize', resize);
    if (reducedMotion) render(performance.now());
    else frame = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      removeEventListener('resize', resize);
      if (pointerEnabled) {
        element.removeEventListener('pointermove', onPointerMove);
        element.removeEventListener('pointerleave', onPointerLeave);
      }
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [ref, canvasRef]);
}

export function TrivareSite() {
  const heroRef = useRef<HTMLElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const [workActive, setWorkActive] = useState(0);
  const [processActive, setProcessActive] = useState(0);
  const [caseIndex, setCaseIndex] = useState<number | null>(null);
  useFluidHeroField(heroRef, heroCanvasRef);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { revealItems.forEach((item) => item.dataset.visible = 'true'); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); }
    }), { threshold: .13 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <SiteHeader />

      <section className="hero-section" id="top" ref={heroRef}>
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <filter id="hero-gold-dot-distort">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="6" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <canvas className="hero-fluid-canvas" ref={heroCanvasRef} aria-hidden="true" />
        <p className="hero-meta-top" data-reveal-hero="2">ONTWERP · REALISATIE · OPTIMALISATIE</p>
        <div className="hero-row">
          <p className="hero-kicker" data-reveal-hero="1">DIGITAL AGENCY</p>
          <h1 className="hero-title" data-reveal-hero="3">
            <span className="hero-line-mask"><span className="hero-title-base hero-line">Websites die <span className="hero-gold-word">vertrouwen</span></span></span>
            <span className="hero-line-mask"><span className="hero-title-base hero-line">uitstralen.</span></span>
          </h1>
        </div>
        <div className="hero-cta-block" data-reveal-hero="4">
          <Link className="primary-cta hero-primary-cta" href="/contact"><span>Plan een kennismaking</span><span className="cta-arrow"><NorthEastArrow /></span></Link>
          <Link className="quiet-link hero-services-link" href="/werk"><span>Bekijk ons werk</span></Link>
        </div>
      </section>

      <section className="section wwd-section" id="wat-we-doen">
        <div className="wwd-top-line" aria-hidden="true" />
        <div className="section-intro" data-reveal>
          <h2 className="display-heading">Wat we doen.</h2>
        </div>
        <ServiceStage />
        <p className="wwd-tags" data-reveal>SEO · CRO · BRANDING · ONDERHOUD · GEBRUIKSGEMAK · PERSOONLIJKE SAMENWERKING</p>
      </section>

      <section className="work-index-section" id="werk">
        <div className="section-intro work-intro" data-reveal>
          <p className="section-label">SELECTIE</p>
          <h2 className="work-heading work-index-heading display-heading">Een selectie van ons werk.</h2>
        </div>
        <WorkIndex active={workActive} onHover={setWorkActive} onOpen={setCaseIndex} />
      </section>

      <section className="work-index-section" id="werkwijze">
        <div className="section-intro work-intro" data-reveal>
          <p className="section-label process-eyebrow">· HOE WIJ WERKEN</p>
          <h2 className="work-heading work-index-heading process-bold-heading display-heading">Van idee naar<br /><span>een website die staat.</span></h2>
        </div>
        <ProcessIndex active={processActive} onHover={setProcessActive} />
        <Link className="quiet-link section-teaser-link work-index-more" href="/werkwijze"><span>Bekijk onze werkwijze</span><ArrowUpRight /></Link>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-intro" data-reveal><h2 className="faq-heading display-heading">Veelgestelde <span>vragen.</span></h2></div>
        <div className="faq-list" data-reveal>{faqs.map((item, index) => <details className="faq-item" key={item.q}><summary><span className="faq-item-number">{String(index + 1).padStart(2, '0')}</span><span className="faq-item-question">{item.q}</span><i aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="contact-section contact-teaser" id="contact">
        <div className="contact-intro" data-reveal>
          <p className="section-label light">CONTACT</p>
          <h2 className="contact-heading">Laten we <span>kennismaken.</span></h2>
          <p>Vertel waar je mee bezig bent. Dan kijken we samen wat er nodig is.</p>
          <div className="mail-direct"><span>Liever mailen?</span><a href="mailto:contact@trivare.nl">contact@trivare.nl</a></div>
        </div>
        <div className="contact-teaser-panel" data-reveal>
          <Link className="primary-cta" href="/contact"><span>Neem contact op</span><span className="cta-arrow"><NorthEastArrow /></span></Link>
          <span className="contact-teaser-note">Reactie meestal binnen 1 werkdag.</span>
        </div>
      </section>

      <SiteFooter />

      <Dialog open={caseIndex !== null} onOpenChange={(open) => !open && setCaseIndex(null)}>
        {caseIndex !== null && (
          <DialogContent className="case-dialog">
            <DialogHeader><DialogTitle>{projects[caseIndex].title}</DialogTitle><DialogDescription>{projects[caseIndex].label}</DialogDescription></DialogHeader>
            <div className="case-visual"><Image src={`/projects/${projects[caseIndex].slug}.jpg`} alt="" fill sizes="90vw" /></div>
            <div className="case-detail-grid">
              <div><span>PROBLEEM</span><p>{projects[caseIndex].problem}</p></div>
              <div><span>AANPAK</span><p>{projects[caseIndex].approach}</p></div>
              <div><span>UITVOERING</span><p>{projects[caseIndex].execution}</p></div>
              <div><span>RESULTAAT</span><p>{projects[caseIndex].result}</p></div>
            </div>
            <div className="case-proof">{projects[caseIndex].proof.map((item) => <span key={item}>{item}</span>)}</div>
            <Link className="primary-cta" href="/contact" onClick={() => setCaseIndex(null)}><span>Bespreek jouw project</span><span className="cta-arrow"><ArrowUpRight /></span></Link>
          </DialogContent>
        )}
      </Dialog>
    </main>
  );
}
