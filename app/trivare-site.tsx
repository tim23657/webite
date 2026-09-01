'use client';

import Image from 'next/image';
import { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// TODO: vervang de placeholder zodra de definitieve Calendly-link beschikbaar is.
const CALENDLY_URL = 'PLAATS_HIER_DE_CALENDLY_LINK';

const services = [
  { number: '01', title: 'Website ontwerp', text: 'Een professionele website die aansluit bij je bedrijf, duidelijk werkt en zorgvuldig wordt ontworpen en gebouwd.' },
  { number: '02', title: 'Website redesign', text: 'Is je huidige website toe aan vernieuwing? We helpen je graag met een nieuw ontwerp, een duidelijkere structuur en een uitstraling die beter past bij je bedrijf.' },
  { number: '03', title: 'Website optimalisatie', text: 'Ook een bestaande website kan vaak beter. We helpen met gerichte verbeteringen in snelheid, gebruiksgemak, vindbaarheid en conversie.' },
];

const capabilities = [
  { number: '01', title: 'SEO', text: 'We zorgen voor een heldere structuur en een goede technische basis, zodat zoekmachines én bezoekers de website goed kunnen begrijpen.' },
  { number: '02', title: 'CRO', text: 'We kijken waar bezoekers afhaken of twijfelen en verbeteren onderdelen die contact opnemen, aanvragen of aankopen makkelijker maken.' },
  { number: '03', title: 'Branding', text: 'We vertalen de uitstraling van je bedrijf naar een visuele richting die herkenbaar en passend voelt.' },
  { number: '04', title: 'Onderhoud', text: 'Na de livegang kunnen we betrokken blijven voor updates, technische aandacht en verdere verbeteringen.' },
  { number: '05', title: 'Persoonlijke samenwerking', text: 'Je hebt direct contact en blijft betrokken bij het proces. We bespreken belangrijke keuzes, verwerken feedback en bouwen de website stap voor stap samen verder.' },
  { number: '06', title: 'Gebruiksgemak', text: 'Een duidelijke structuur en prettige ervaring, zodat bezoekers makkelijk vinden wat ze zoeken.' },
];

const projects = [
  {
    slug: 'north', number: '01', label: 'WEBDESIGN', title: 'North',
    description: 'Een minimalistische website waarin rust, helderheid en vakmanschap centraal staan.',
    proof: ['Heldere structuur', 'Rustige merkbeleving', 'Sterke mobiele ervaring'],
    problem: 'De uitstraling miste rust en een duidelijke inhoudelijke hiërarchie.',
    approach: 'Een compacte structuur waarin boodschap, ritme en beeld elkaar versterken.',
    execution: 'Een helder designsysteem met veel ruimte, scherpe typografie en gerichte interactie.',
    result: 'Een rustige website die het karakter van North professioneel en herkenbaar overbrengt.',
  },
  {
    slug: 'abc-construction', number: '02', label: 'REDESIGN', title: 'ABC Construction',
    description: 'Een verouderde uitstraling vertaald naar een modernere en betrouwbaardere website die beter aansluit bij het bedrijf.',
    proof: ['Professionelere uitstraling', 'Duidelijkere navigatie', 'Snellere oriëntatie'],
    problem: 'De bestaande website sloot niet meer aan bij de kwaliteit en betrouwbaarheid van het bedrijf.',
    approach: 'De belangrijkste diensten en bewijspunten kregen een logische, direct leesbare volgorde.',
    execution: 'Een stevig visueel grid, duidelijke navigatie en een zorgvuldige mobiele uitwerking.',
    result: 'Een geloofwaardige presentatie die bezoekers sneller laat begrijpen wat ABC Construction doet.',
  },
  {
    slug: 'bloom-weddings', number: '03', label: 'WEBDESIGN & BRANDING', title: 'Bloom Weddings',
    description: 'Een warme en verfijnde website waarin rust, sfeer en gebruiksgemak samenkomen.',
    proof: ['Consistente uitstraling', 'Prettige gebruikersroute', 'Verfijnde mobiele ervaring'],
    problem: 'De sfeer en persoonlijke aanpak kwamen online onvoldoende tot hun recht.',
    approach: 'Beeld, typografie en informatie zijn opgebouwd als één rustige, uitnodigende ervaring.',
    execution: 'Een verfijnd ontwerp met duidelijke contactmomenten en aandacht voor elk schermformaat.',
    result: 'Een warme website die vertrouwen geeft en tegelijk praktisch en overzichtelijk blijft.',
  },
];

const process = [
  { number: '01', label: 'KENNISMAKING & DISCOVERY', title: 'We beginnen bij het verhaal achter je bedrijf.', text: 'We bespreken je ambities, doelgroep en aanbod. Zo begrijpen we wat de website moet bereiken en welk gevoel bezoekers moeten meenemen.', image: '/process/discovery.png' },
  { number: '02', label: 'STRATEGIE & RICHTING', title: 'Een heldere basis vóór we gaan ontwerpen.', text: 'We brengen structuur, inhoud en prioriteiten samen in een duidelijke richting. Elke keuze krijgt een reden en draagt bij aan het grotere geheel.', image: '/process/strategy.png' },
  { number: '03', label: 'ONTWERP & REALISATIE', title: 'Elk onderdeel krijgt aandacht en een duidelijke functie.', text: 'We vertalen de richting naar een onderscheidend ontwerp en bouwen dit zorgvuldig uit voor ieder schermformaat.', image: '/process/design-build.png' },
  { number: '04', label: 'CONTROLE & LIVEGANG', title: 'Tot in detail voorbereid om sterk naar buiten te treden.', text: 'Voor de livegang controleren we inhoud, interactie, snelheid en mobiel gebruik. Zo voelt de eerste indruk meteen professioneel.', image: '/process/launch.png' },
  { number: '05', label: 'OPTIMALISATIE & ONDERHOUD', title: 'Na de livegang blijven we gericht verbeteren.', text: 'We kijken naar gebruik, prestaties en groeikansen. Met onderhoud, SEO en CRO blijft de website actueel en effectief.', image: '/process/optimization.png' },
];

const values = [
  { number: '01', title: 'Aandacht', text: 'We nemen de tijd om je bedrijf en wensen goed te begrijpen voordat we keuzes maken.' },
  { number: '02', title: 'Vakmanschap', text: 'We besteden aandacht aan ontwerp, techniek en gebruiksgemak, zodat de website ook in de details goed in elkaar zit.' },
  { number: '03', title: 'Samenwerking', text: 'We leggen keuzes uit, luisteren naar feedback en stemmen belangrijke beslissingen samen af.' },
];

const investmentSteps = [
  { number: '01', title: 'Bespreken', text: 'We bespreken je wensen, huidige situatie en wat de website moet gaan doen.' },
  { number: '02', title: 'Voorstel', text: 'Je ontvangt een duidelijk voorstel met de werkzaamheden, planning en investering.' },
  { number: '03', title: 'Start', text: 'Zijn we allebei tevreden met het plan? Dan gaan we aan de slag.' },
];

function setPointerPosition(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smoothstep = (edge0: number, edge1: number, value: number) => {
  const amount = clamp01((value - edge0) / (edge1 - edge0));
  return amount * amount * (3 - 2 * amount);
};

/* Previous canvas field retained here for reference while the WebGL smoke layer is evaluated.
function noiseHash(x: number, y: number, seed: number) {
  let value = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  value = Math.imul(value ^ (value >>> 13), 1274126177);
  return ((value ^ (value >>> 16)) >>> 0) / 4294967295;
}

function valueNoise(x: number, y: number, seed: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const tx = x - x0;
  const ty = y - y0;
  const sx = tx * tx * (3 - 2 * tx);
  const sy = ty * ty * (3 - 2 * ty);
  const top = noiseHash(x0, y0, seed) * (1 - sx) + noiseHash(x0 + 1, y0, seed) * sx;
  const bottom = noiseHash(x0, y0 + 1, seed) * (1 - sx) + noiseHash(x0 + 1, y0 + 1, seed) * sx;
  return top * (1 - sy) + bottom * sy;
}

function fractalNoise(x: number, y: number, seed: number, octaves: number) {
  let sum = 0;
  let amplitude = .56;
  let frequency = 1;
  let total = 0;
  for (let octave = 0; octave < octaves; octave += 1) {
    sum += valueNoise(x * frequency, y * frequency, seed + octave * 17) * amplitude;
    total += amplitude;
    frequency *= 1.93;
    amplitude *= .48;
  }
  return sum / total;
}

function organicCloudLobe(x: number, y: number, centerX: number, centerY: number, radiusX: number, radiusY: number, angle: number) {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const offsetX = x - centerX;
  const offsetY = y - centerY;
  const rotatedX = (offsetX * cosine + offsetY * sine) / radiusX;
  const rotatedY = (-offsetX * sine + offsetY * cosine) / radiusY;
  const distance = Math.sqrt(rotatedX * rotatedX + rotatedY * rotatedY);
  return Math.exp(-Math.pow(distance, 2.35) * 1.12);
}

function useHeroField(ref: React.RefObject<HTMLElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const element = ref.current;
    const canvas = canvasRef.current;
    if (!element || !canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const baseCanvas = document.createElement('canvas');
    const detailCanvas = document.createElement('canvas');
    const maskCanvas = document.createElement('canvas');
    const fieldCanvas = document.createElement('canvas');
    const baseContext = baseCanvas.getContext('2d');
    const detailContext = detailCanvas.getContext('2d');
    const maskContext = maskCanvas.getContext('2d');
    const fieldContext = fieldCanvas.getContext('2d');
    if (!baseContext || !detailContext || !maskContext || !fieldContext) return;

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canTrackPointer = !matchMedia('(pointer: coarse)').matches && !reducedMotion;
    const title = element.querySelector<HTMLElement>('.hero-title');
    let visible = true;
    let frame = 0;
    let width = element.clientWidth;
    let height = element.clientHeight;
    let renderScale = 1;
    let targetX = element.clientWidth * .72;
    let targetY = element.clientHeight * .47;
    let x = targetX;
    let y = targetY;
    let slowX = targetX;
    let slowY = targetY;
    let targetVelocityX = 0;
    let targetVelocityY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let reveal = 0;
    let pointerInside = false;
    let titleOffsetX = 0;
    let titleOffsetY = 0;
    let titleWidth = 1;
    let titleHeight = 1;
    let lastDraw = 0;
    const startedAt = performance.now();
    let fieldWidth = 184;
    let fieldHeight = 110;
    let fieldPixels = fieldContext.createImageData(fieldWidth, fieldHeight);

    const resize = () => {
      width = Math.max(1, element.clientWidth);
      height = Math.max(1, element.clientHeight);
      renderScale = Math.min(devicePixelRatio || 1, 1.25) * .76;
      const pixelWidth = Math.max(1, Math.round(width * renderScale));
      const pixelHeight = Math.max(1, Math.round(height * renderScale));
      for (const surface of [canvas, baseCanvas, detailCanvas, maskCanvas]) {
        surface.width = pixelWidth;
        surface.height = pixelHeight;
      }
      fieldWidth = Math.max(150, Math.min(214, Math.round(width / 6.4)));
      fieldHeight = Math.max(92, Math.round(fieldWidth * height / width));
      fieldCanvas.width = fieldWidth;
      fieldCanvas.height = fieldHeight;
      fieldPixels = fieldContext.createImageData(fieldWidth, fieldHeight);
    };

    const measureTitle = () => {
      if (!title) return;
      const heroRect = element.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      titleOffsetX = titleRect.left - heroRect.left;
      titleOffsetY = titleRect.top - heroRect.top;
      titleWidth = titleRect.width;
      titleHeight = titleRect.height;
    };

    const drawField = (time: number) => {
      const seconds = reducedMotion ? 12 : Math.max(0, (time - startedAt) / 1000);
      const entrance = reducedMotion ? 1 : smoothstep(.7, 5.2, seconds);
      const introDrift = smoothstep(.15, 12, seconds) * .5;
      const mainDrift = seconds < 12 ? introDrift : .5 + Math.sin((seconds - 12) * .024) * .36;
      const companionDrift = .5 + Math.sin(seconds * .019 + 1.7) * .44;
      const returningDrift = .5 + Math.sin(seconds * .015 - 1.08) * .43;
      const companionPresence = reducedMotion ? .72 : smoothstep(4.5, 13, seconds);
      const returningPresence = reducedMotion ? .38 : smoothstep(8, 18, seconds);
      const pointerU = x / width;
      const pointerV = y / height;
      const slowPointerU = slowX / width;
      const slowPointerV = slowY / height;
      const speed = Math.min(1, Math.hypot(velocityX, velocityY) / 38);
      const pullX = velocityX / Math.max(1, width);
      const pullY = velocityY / Math.max(1, height);
      const titleCenterX = (titleOffsetX + titleWidth * .5) / width;
      const titleCenterY = (titleOffsetY + titleHeight * .5) / height;
      const data = fieldPixels.data;

      for (let py = 0; py < fieldHeight; py += 1) {
        const v = py / Math.max(1, fieldHeight - 1);
        for (let px = 0; px < fieldWidth; px += 1) {
          const u = px / Math.max(1, fieldWidth - 1);
          const diagonalX = (u + v * .44) * 1.08 + seconds * .011;
          const diagonalY = (v - u * .31) * 1.4 - seconds * .008;
          const coarseWarpX = fractalNoise(diagonalX * .76 + seconds * .0028, diagonalY * .76, 19, 3);
          const coarseWarpY = fractalNoise(diagonalX * .76 + 5.7, diagonalY * .76 - seconds * .0022, 43, 3);
          let warpedX = diagonalX + (coarseWarpX - .5) * 1.32 + Math.sin(diagonalY * 1.72 + seconds * .018) * .09;
          let warpedY = diagonalY + (coarseWarpY - .5) * 1.19 + Math.cos(diagonalX * 1.55 - seconds * .014) * .08;

          const localShape = .72 + valueNoise(warpedX * 1.45, warpedY * 1.45, 91) * .48;
          const dx = (u - pointerU) / (.18 * localShape + speed * .024);
          const dy = (v - pointerV) / (.22 / localShape);
          const localDistance = Math.sqrt(dx * dx + dy * dy);
          const localNoise = valueNoise(warpedX * 2.05 + seconds * .01, warpedY * 2.05, 127);
          const echoDx = (u - slowPointerU) / (.23 * localShape);
          const echoDy = (v - slowPointerV) / (.27 / localShape);
          const echoDistance = Math.sqrt(echoDx * echoDx + echoDy * echoDy);
          const echoInfluence = reveal * smoothstep(1.04 + localNoise * .1, .1, echoDistance) * (.13 + localNoise * .13);
          const cursorInfluence = reveal * smoothstep(1.06 + localNoise * .12, .06, localDistance) * (.5 + localNoise * .38) + echoInfluence;
          warpedX += dx * cursorInfluence * .058 - pullX * cursorInfluence * (1.45 + speed * 1.9);
          warpedY += dy * cursorInfluence * .052 - pullY * cursorInfluence * (1.3 + speed * 1.65);

          let cloudU = u + (coarseWarpX - .5) * .24 + Math.sin(warpedY * 1.17 + seconds * .012) * .028;
          let cloudV = v + (coarseWarpY - .5) * .2 + Math.cos(warpedX * 1.08 - seconds * .01) * .025;
          cloudU += dx * cursorInfluence * .018 - pullX * cursorInfluence * (1.05 + speed * 1.3);
          cloudV += dy * cursorInfluence * .016 - pullY * cursorInfluence * (.92 + speed * 1.16);

          const mainX = 1.2 - mainDrift * .98;
          const mainY = -.14 + mainDrift * 1.02;
          const mainA = organicCloudLobe(cloudU, cloudV, mainX, mainY, .31, .17, -.68);
          const mainB = organicCloudLobe(cloudU, cloudV, mainX + .2, mainY - .015, .25, .19, -.37);
          const mainC = organicCloudLobe(cloudU, cloudV, mainX - .18, mainY + .13, .29, .18, -.86);
          const mainD = organicCloudLobe(cloudU, cloudV, mainX + .045, mainY + .22, .22, .17, -.18);
          const mainE = organicCloudLobe(cloudU, cloudV, mainX - .29, mainY + .025, .21, .15, -.44);
          const mainEnvelope = 1 - (1 - mainA) * (1 - mainB * .92) * (1 - mainC * .92) * (1 - mainD * .82) * (1 - mainE * .78);

          const companionX = 1.32 - companionDrift * .94;
          const companionY = -.2 + companionDrift * .94;
          const companionA = organicCloudLobe(cloudU, cloudV, companionX, companionY, .3, .16, -.7);
          const companionB = organicCloudLobe(cloudU, cloudV, companionX - .19, companionY + .14, .24, .18, -.48);
          const companionEnvelope = (1 - (1 - companionA) * (1 - companionB * .82)) * companionPresence;

          const returningX = 1.3 - returningDrift * .9;
          const returningY = -.21 + returningDrift * .9;
          const returningEnvelope = organicCloudLobe(cloudU, cloudV, returningX, returningY, .3, .17, -.61) * returningPresence;
          const envelope = clamp01(1 - (1 - mainEnvelope) * (1 - companionEnvelope * .52) * (1 - returningEnvelope * .31));
          const volume = fractalNoise(cloudU * .92 + seconds * .003, cloudV * .92 - seconds * .002, 71, 4);
          const innerDepth = fractalNoise(cloudU * 1.72 + 3.1, cloudV * 1.72 - 1.7, 113, 3);
          const fine = valueNoise(cloudU * 3.6 - seconds * .004, cloudV * 3.6 + seconds * .003, 157);
          const airyBreaks = .62 + fractalNoise(cloudU * .68 - 2.4, cloudV * .68 + 4.2, 211, 3) * .38;
          const erodedVolume = smoothstep(.38, .68, volume * .68 + innerDepth * .24 + fine * .08);
          const cloudDensity = envelope * (.12 + erodedVolume * .75) * airyBreaks;
          const mass = smoothstep(.28, .44, cloudDensity + cursorInfluence * envelope * .1);
          const softFold = smoothstep(.49, .62, innerDepth * .58 + volume * .34 + fine * .08);
          const boundary = smoothstep(.14, .32, cloudDensity) * (1 - smoothstep(.45, .65, cloudDensity));
          const safeDx = (u - titleCenterX) / Math.max(.18, titleWidth / width * .6);
          const safeDy = (v - titleCenterY) / Math.max(.08, titleHeight / height * 1.45);
          const safeDistance = Math.sqrt(safeDx * safeDx + safeDy * safeDy);
          const titleSafety = .88 + smoothstep(.5, 1.2, safeDistance) * .12;
          const connectiveMist = smoothstep(.16, .48, envelope * volume) * .01;
          const opacity = entrance * titleSafety * (connectiveMist + mass * (.08 + volume * .1 + softFold * .42 + boundary * .28 + cursorInfluence * envelope * .25));
          const shade = clamp01(volume * .44 + innerDepth * .31 + boundary * .15 + fine * .1);
          const index = (py * fieldWidth + px) * 4;
          data[index] = Math.round(161 + shade * 15);
          data[index + 1] = Math.round(132 + shade * 9);
          data[index + 2] = Math.round(84 + shade * 4);
          data[index + 3] = Math.round(clamp01(opacity * 1.25) * 255);
        }
      }

      fieldContext.putImageData(fieldPixels, 0, 0);
      const paint = (ctx: CanvasRenderingContext2D, alpha: number, blur: number, passes = 1) => {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.filter = `blur(${blur * renderScale}px)`;
        ctx.globalAlpha = alpha;
        const overscan = 20 * renderScale;
        for (let pass = 0; pass < passes; pass += 1) {
          const shift = pass * renderScale * 2;
          ctx.drawImage(fieldCanvas, -overscan - shift, -overscan + shift, ctx.canvas.width + overscan * 2, ctx.canvas.height + overscan * 2);
        }
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
      };
      paint(baseContext, .92, 2.2);
      paint(detailContext, .78, .85, 2);
    };

    const drawRevealMask = (time: number) => {
      maskContext.setTransform(renderScale, 0, 0, renderScale, 0, 0);
      maskContext.clearRect(0, 0, width, height);
      if (reveal < .002) return;
      const speed = Math.min(1, Math.hypot(velocityX, velocityY) / 34);
      const direction = Math.atan2(velocityY, velocityX || .001);
      const radiusX = Math.min(190, Math.max(122, width * .115)) * (1 + speed * .2);
      const radiusY = Math.min(165, Math.max(108, height * .15)) * (1 - speed * .04);
      maskContext.save();
      maskContext.translate(x, y);
      maskContext.rotate(direction * .13);
      maskContext.filter = `blur(${42 + (1 - speed) * 16}px)`;
      const points = 14;
      const irregular = new Path2D();
      const coords: Array<[number, number]> = [];
      for (let index = 0; index < points; index += 1) {
        const angle = index / points * Math.PI * 2;
        const variance = 1 + Math.sin(angle * 3 + time * .00019) * .13 + Math.sin(angle * 5 - time * .00013) * .065;
        coords.push([Math.cos(angle) * radiusX * variance, Math.sin(angle) * radiusY * variance]);
      }
      coords.forEach((point, index) => {
        const next = coords[(index + 1) % points];
        const middleX = (point[0] + next[0]) / 2;
        const middleY = (point[1] + next[1]) / 2;
        if (index === 0) irregular.moveTo(middleX, middleY);
        irregular.quadraticCurveTo(next[0], next[1], (next[0] + coords[(index + 2) % points][0]) / 2, (next[1] + coords[(index + 2) % points][1]) / 2);
      });
      irregular.closePath();
      maskContext.fillStyle = `rgba(255,255,255,${.82 * reveal})`;
      maskContext.fill(irregular);
      maskContext.translate(-velocityX * 2.8, -velocityY * 2.8);
      maskContext.scale(.72, .68);
      maskContext.fillStyle = `rgba(255,255,255,${.28 * reveal})`;
      maskContext.fill(irregular);
      maskContext.restore();
      maskContext.filter = 'none';
    };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .05 });
    observer.observe(element);
    resize();
    measureTitle();
    const move = (event: globalThis.PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      targetVelocityX = nextX - targetX;
      targetVelocityY = nextY - targetY;
      targetX = nextX;
      targetY = nextY;
      pointerInside = true;
      element.dataset.cloudReveal = 'true';
    };
    const enter = () => { pointerInside = true; };
    const leave = () => { pointerInside = false; element.dataset.cloudReveal = 'false'; };
    const render = (time: number) => {
      if (visible && (reducedMotion || time - lastDraw > 28)) {
        lastDraw = time;
        x += (targetX - x) * .06;
        y += (targetY - y) * .06;
        slowX += (targetX - slowX) * .027;
        slowY += (targetY - slowY) * .027;
        velocityX += (targetVelocityX - velocityX) * .025;
        velocityY += (targetVelocityY - velocityY) * .025;
        targetVelocityX *= .86;
        targetVelocityY *= .86;
        reveal += ((pointerInside ? 1 : 0) - reveal) * (pointerInside ? .06 : .024);
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
        title?.style.setProperty('--title-x', `${x - titleOffsetX}px`);
        title?.style.setProperty('--title-y', `${y - titleOffsetY}px`);
        drawField(time);
        drawRevealMask(time);
        detailContext.setTransform(1, 0, 0, 1, 0, 0);
        detailContext.globalCompositeOperation = 'destination-in';
        detailContext.drawImage(maskCanvas, 0, 0);
        detailContext.globalCompositeOperation = 'source-over';
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(baseCanvas, 0, 0);
        context.drawImage(detailCanvas, 0, 0);
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };
    if (canTrackPointer) {
      element.addEventListener('pointerenter', enter);
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', leave);
    }
    addEventListener('resize', resize);
    addEventListener('resize', measureTitle);
    frame = requestAnimationFrame(render);
    return () => {
      observer.disconnect();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      removeEventListener('resize', resize);
      removeEventListener('resize', measureTitle);
      cancelAnimationFrame(frame);
    };
  }, [ref, canvasRef]);
}
*/

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
      uniform vec2 uPointer;
      uniform vec2 uTrail;
      uniform vec2 uVelocity;
      uniform float uEnergy;
      uniform float uPixelRatio;

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

      float inkShape(vec2 point, vec2 center, vec2 size, float angle, float seed, float life) {
        vec2 local = rotate2d(angle) * (point - center);
        local /= size;

        float broadNoise = fbmCompact(local * 0.76 + vec2(seed, uTime * 0.006));
        vec2 broadWarp = vec2(
          broadNoise - 0.5,
          sin(broadNoise * 5.4 + local.x * 0.9 + seed) * 0.24
        );
        vec2 warped = local + broadWarp * 0.5;
        warped.x += sin(warped.y * 1.72 + seed + uTime * 0.013) * 0.12;
        float contourNoise = fbmCompact(warped * 1.18 + vec2(seed * 1.7, -seed));
        float distanceField = length(warped) + (contourNoise - 0.5) * 0.38;
        float envelope = 1.0 - smoothstep(0.43, 1.08, distanceField);

        float inner = noise(warped * 2.15 + broadWarp * 2.1 + vec2(uTime * 0.006, seed));
        float density = envelope * (0.45 + inner * 0.55);
        density *= smoothstep(0.0, 0.14, life) * (1.0 - smoothstep(0.76, 1.0, life));
        return density;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        uv.y = 1.0 - uv.y;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        vec2 point = vec2(uv.x * aspect, uv.y);

        vec2 velocity = uVelocity;
        velocity.x *= aspect;
        float speed = min(1.0, length(velocity) * 4.5);
        vec2 direction = velocity / max(length(velocity), 0.0001);

        vec2 pointer = vec2(uPointer.x * aspect, uPointer.y);
        vec2 trail = vec2(uTrail.x * aspect, uTrail.y);
        vec2 pointerDelta = point - pointer;
        vec2 trailDelta = point - trail;
        vec2 tangent = vec2(-direction.y, direction.x);
        float activeSpeed = max(speed, 0.08);

        vec2 pointerLocal = vec2(
          dot(pointerDelta, direction) / (0.12 + activeSpeed * 0.17),
          dot(pointerDelta, tangent) / (0.09 + activeSpeed * 0.045)
        );
        vec2 trailLocal = vec2(
          dot(trailDelta, direction) / (0.17 + activeSpeed * 0.22),
          dot(trailDelta, tangent) / (0.11 + activeSpeed * 0.055)
        );

        float pointerNoise = fbmCompact(pointerLocal * 1.12 + vec2(uTime * 0.035, -uTime * 0.024));
        float trailNoise = fbmCompact(trailLocal * 0.94 + vec2(-uTime * 0.021, uTime * 0.017) + 4.3);
        vec2 pointerWarp = pointerLocal + vec2(
          (pointerNoise - 0.5) * 0.72,
          sin(pointerNoise * 6.2 + pointerLocal.x * 1.4) * 0.24
        );
        vec2 trailWarp = trailLocal + vec2(
          (trailNoise - 0.5) * 0.88,
          sin(trailNoise * 5.6 - trailLocal.x * 1.15) * 0.3
        );

        float pointerContour = 1.0 - smoothstep(0.36 + pointerNoise * 0.16, 1.12, length(pointerWarp));
        float trailContour = 1.0 - smoothstep(0.3 + trailNoise * 0.18, 1.18, length(trailWarp));
        float innerDetail = noise(pointerWarp * 2.2 + vec2(7.1, uTime * 0.045));
        float density = pointerContour * (0.62 + innerDetail * 0.38);
        density += trailContour * (0.31 + trailNoise * 0.24);
        density *= uEnergy;
        float alpha = min(0.22, density * (0.16 + speed * 0.08));

        vec3 darkGold = vec3(0.541, 0.408, 0.220);
        vec3 trivareGold = vec3(0.725, 0.584, 0.341);
        vec3 champagne = vec3(0.788, 0.651, 0.416);
        vec3 color = mix(darkGold, trivareGold, smoothstep(0.28, 0.76, pointerNoise));
        color = mix(color, champagne, smoothstep(0.68, 0.96, innerDetail) * 0.28);
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
      pointer: gl.getUniformLocation(program, 'uPointer'),
      trail: gl.getUniformLocation(program, 'uTrail'),
      velocity: gl.getUniformLocation(program, 'uVelocity'),
      energy: gl.getUniformLocation(program, 'uEnergy'),
      pixelRatio: gl.getUniformLocation(program, 'uPixelRatio'),
    };

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canTrackPointer = !matchMedia('(pointer: coarse)').matches && !reducedMotion;
    let visible = true;
    let frame = 0;
    let width = Math.max(1, element.clientWidth);
    let height = Math.max(1, element.clientHeight);
    let targetX = width * 0.76;
    let targetY = height * 0.4;
    let pointerX = targetX;
    let pointerY = targetY;
    let trailX = targetX;
    let trailY = targetY;
    let targetVelocityX = 0;
    let targetVelocityY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let energy = 0;
    let pointerInside = false;
    const startedAt = performance.now();

    const resize = () => {
      width = Math.max(1, element.clientWidth);
      height = Math.max(1, element.clientHeight);
      const pixelRatio = Math.min(devicePixelRatio || 1, 1.0);
      const pixelWidth = Math.max(1, Math.round(width * pixelRatio));
      const pixelHeight = Math.max(1, Math.round(height * pixelRatio));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        gl.viewport(0, 0, pixelWidth, pixelHeight);
      }
    };

    const move = (event: globalThis.PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;
      targetVelocityX = nextX - targetX;
      targetVelocityY = nextY - targetY;
      targetX = nextX;
      targetY = nextY;
      pointerInside = true;
    };
    const enter = () => { pointerInside = true; };
    const leave = () => { pointerInside = false; };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.02 });
    observer.observe(element);
    resize();

    const render = (time: number) => {
      if (visible) {
        const seconds = reducedMotion ? 16 : Math.max(0, (time - startedAt) / 1000);
        const intro = reducedMotion ? 1 : smoothstep(0.15, 2.35, seconds);
        pointerX += (targetX - pointerX) * 0.075;
        pointerY += (targetY - pointerY) * 0.075;
        trailX += (pointerX - trailX) * 0.028;
        trailY += (pointerY - trailY) * 0.028;
        velocityX += (targetVelocityX - velocityX) * 0.085;
        velocityY += (targetVelocityY - velocityY) * 0.085;
        targetVelocityX *= 0.8;
        targetVelocityY *= 0.8;
        const movement = Math.min(1, Math.hypot(velocityX, velocityY) / 52);
        const targetEnergy = pointerInside ? Math.min(1, movement * 1.35) : 0;
        energy += (targetEnergy - energy) * (targetEnergy > energy ? 0.18 : 0.035);

        activateProgram(program);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.time, seconds);
        gl.uniform1f(uniforms.intro, intro);
        gl.uniform2f(uniforms.pointer, pointerX / width, pointerY / height);
        gl.uniform2f(uniforms.trail, trailX / width, trailY / height);
        gl.uniform2f(uniforms.velocity, velocityX / width, velocityY / height);
        gl.uniform1f(uniforms.energy, energy);
        gl.uniform1f(uniforms.pixelRatio, Math.min(devicePixelRatio || 1, 1.0));
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    if (canTrackPointer) {
      element.addEventListener('pointerenter', enter);
      element.addEventListener('pointermove', move);
      element.addEventListener('pointerleave', leave);
    }
    addEventListener('resize', resize);
    if (reducedMotion) render(performance.now());
    else frame = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', leave);
      removeEventListener('resize', resize);
      cancelAnimationFrame(frame);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [ref, canvasRef]);
}

function InstagramMark() {
  return <svg className="instagram-mark" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3.7" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.4" cy="6.8" r="1" fill="currentColor" /></svg>;
}

function NorthEastArrow() {
  return <svg className="hero-cta-arrow-svg" viewBox="0 0 22 22" aria-hidden="true"><path d="M3.7 18.15 17.65 4.2" /><path d="M8.55 4.2h9.1v9.1" /></svg>;
}

function DownArrow() {
  return <svg className="hero-secondary-arrow-svg" viewBox="0 0 22 24" aria-hidden="true"><path d="M11 2.6v17.1" /><path d="m4.9 13.7 6.1 6.1 6.1-6.1" /></svg>;
}

function ProjectCard({ project, onOpen }: { project: typeof projects[number]; onOpen: () => void }) {
  return (
    <button className="project-card" onClick={onOpen} onPointerMove={setPointerPosition} aria-label={`Bekijk case ${project.title}`}>
      <span className="project-image">
        <Image src={`/projects/${project.slug}.png`} alt="" fill sizes="(max-width: 800px) 100vw, 33vw" />
        <span className="project-local-light" aria-hidden="true" />
        <span className="project-arrow" aria-hidden="true"><ArrowUpRight /></span>
      </span>
      <span className="project-meta"><span>{project.label}</span><span>{project.number}</span></span>
      <strong>{project.title}</strong>
      <span className="project-description">{project.description}</span>
    </button>
  );
}

export function TrivareSite() {
  const heroRef = useRef<HTMLElement>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const confettiFrameRef = useRef<number | null>(null);
  const logoMessageTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStart = useRef<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [caseIndex, setCaseIndex] = useState<number | null>(null);
  const [processIndex, setProcessIndex] = useState(0);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [serviceChoice, setServiceChoice] = useState('Nieuwe website');
  const [logoMessageVisible, setLogoMessageVisible] = useState(false);
  useFluidHeroField(heroRef, heroCanvasRef);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 20);
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => () => {
    if (confettiFrameRef.current) cancelAnimationFrame(confettiFrameRef.current);
    if (logoMessageTimerRef.current) clearTimeout(logoMessageTimerRef.current);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { revealItems.forEach((item) => item.dataset.visible = 'true'); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.visible = 'true'; observer.unobserve(entry.target); }
    }), { threshold: .13 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = processRef.current;
    if (!section) return;
    const key = (event: KeyboardEvent) => {
      if (!section.matches(':focus-within') && !section.matches(':hover')) return;
      if (event.key === 'ArrowRight') setProcessIndex((index) => (index + 1) % process.length);
      if (event.key === 'ArrowLeft') setProcessIndex((index) => (index - 1 + process.length) % process.length);
    };
    addEventListener('keydown', key);
    return () => removeEventListener('keydown', key);
  }, []);

  const submitContact = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault(); setFormState('sending'); setFormError('');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, service: serviceChoice }) });
      const result = await response.json() as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || 'Versturen is niet gelukt.');
      setFormState('success'); event.currentTarget.reset(); setServiceChoice('Nieuwe website');
    } catch (error) {
      setFormState('error'); setFormError(error instanceof Error ? error.message : 'Versturen is niet gelukt.');
    }
  };

  const activeProcess = process[processIndex];
  const selectedCase = caseIndex === null ? null : projects[caseIndex];
  const closeMenuAndNavigate = () => setMenuOpen(false);

  const celebrateLogo = (event: ReactMouseEvent<HTMLButtonElement>) => {
    setLogoMessageVisible(true);
    if (logoMessageTimerRef.current) clearTimeout(logoMessageTimerRef.current);
    logoMessageTimerRef.current = setTimeout(() => setLogoMessageVisible(false), 3000);
    document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = confettiCanvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    if (confettiFrameRef.current) cancelAnimationFrame(confettiFrameRef.current);
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * ratio;
    canvas.height = innerHeight * ratio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const rect = event.currentTarget.getBoundingClientRect();
    const palette = ['#b08d57', '#d7bc8c', '#fffef9', '#87683b'];
    const pieces = Array.from({ length: 92 }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.8 + Math.random() * 7.2;
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 4.5, gravity: .16, size: 2.5 + Math.random() * 4.5, rotation: Math.random() * Math.PI, spin: (Math.random() - .5) * .2, life: 1, decay: .012 + Math.random() * .01, color: palette[index % palette.length] };
    });
    const render = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      pieces.forEach((piece) => {
        piece.vy += piece.gravity; piece.x += piece.vx; piece.y += piece.vy; piece.rotation += piece.spin; piece.life -= piece.decay;
        context.save(); context.globalAlpha = Math.max(piece.life, 0); context.translate(piece.x, piece.y); context.rotate(piece.rotation); context.fillStyle = piece.color; context.fillRect(-piece.size, -piece.size / 3, piece.size * 2, piece.size / 1.5); context.restore();
      });
      if (pieces.some((piece) => piece.life > 0 && piece.y < innerHeight + 30)) confettiFrameRef.current = requestAnimationFrame(render);
      else { context.clearRect(0, 0, innerWidth, innerHeight); confettiFrameRef.current = null; }
    };
    render();
  };

  return (
    <main>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <button type="button" className="official-logo" onClick={celebrateLogo} aria-label="Trivare home en logo-animatie"><Image src="/trivare-logo.png" alt="Trivare" width={1086} height={362} priority /></button>
        <nav className="nav-links" aria-label="Hoofdnavigatie">
          <a href="#diensten">Diensten</a><a href="#werk">Werk</a><a href="#werkwijze">Werkwijze</a><a href="#over">Over Trivare</a><a href="#contact">Contact</a>
        </nav>
        <a className="outline-cta" href="#contact"><span>Kennismaken</span><ArrowUpRight /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Open menu">{menuOpen ? <X /> : <Menu />}</button>
      </header>
      <canvas className="confetti-canvas" ref={confettiCanvasRef} aria-hidden="true" />
      <div className={`logo-message ${logoMessageVisible ? 'is-visible' : ''}`} aria-live="polite">Websites die vertrouwen uitstralen.</div>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <nav>{['Diensten', 'Werk', 'Werkwijze', 'Over Trivare', 'Contact'].map((label) => <a key={label} href={`#${label === 'Over Trivare' ? 'over' : label.toLowerCase()}`} onClick={closeMenuAndNavigate}>{label}</a>)}</nav>
        <a className="mobile-menu-cta" href="#contact" onClick={closeMenuAndNavigate}>Plan een kennismaking <ArrowUpRight /></a>
      </div>

      <section className="hero-section" id="top" ref={heroRef}>
        <canvas className="hero-fluid-canvas" ref={heroCanvasRef} aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title"><span className="hero-title-base">Websites die vertrouwen uitstralen.</span><span className="hero-title-gold" aria-hidden="true">Websites die vertrouwen uitstralen.</span></h1>
          <div className="hero-lower">
            <div className="hero-actions">
              <a className="primary-cta hero-primary-cta" href="#contact"><span>Plan een kennismaking</span><span className="cta-arrow"><NorthEastArrow /></span></a>
              <a className="quiet-link" href="#werk"><span>Bekijk ons werk</span><DownArrow /></a>
            </div>
          </div>
        </div>
        <div className="hero-edge" aria-hidden="true"><span>ONTWERP · REALISATIE · OPTIMALISATIE</span></div>
      </section>

      <section className="section services" id="diensten">
        <div className="section-intro" data-reveal><p className="section-label">DIENSTEN</p><div><h2 className="services-heading">Een website die past <span>bij je bedrijf.</span></h2><p>Of het nu gaat om een nieuwe website, een redesign of het verbeteren van wat er al staat: we kijken graag mee naar wat je nodig hebt en hoe we daar een passende website van kunnen maken.</p></div></div>
        <div className="service-rows" data-reveal>{services.map((service) => <a href="#contact" className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><ArrowUpRight /></a>)}</div>
        <p className="service-tags">DESIGN · BRANDING · UX · SEO · CRO · ONDERHOUD</p>
        <div className="capability-grid">{capabilities.map((capability) => <article key={capability.number} data-reveal><span>{capability.number}</span><strong>{capability.title}</strong><p>{capability.text}</p><i /></article>)}</div>
      </section>

      <section className="section work-section" id="werk">
        <div className="section-intro work-intro" data-reveal><p className="section-label">SELECTIE VAN ONS WERK</p><div><h2 className="work-heading">Een selectie <span>van ons werk.</span></h2><p>Een aantal websites die we mochten ontwerpen, vernieuwen of verder uitwerken. Verschillende bedrijven en stijlen, met voor ieder project een aanpak die daarbij past.</p></div></div>
        <div className="project-grid" data-reveal>{projects.map((project, index) => <ProjectCard key={project.slug} project={project} onOpen={() => setCaseIndex(index)} />)}</div>
        <div className="proof-strip"><div data-reveal><strong>Geselecteerd werk</strong><span>VERSCHILLENDE STIJLEN, ZORGVULDIG UITGEWERKT</span><i /></div><div data-reveal><strong>Persoonlijk</strong><span>BEGELEIDING EN AFSTEMMING</span><i /></div><div data-reveal><strong>Ontwerp + realisatie</strong><span>ÉÉN ZORGVULDIG PROCES</span><i /></div><div data-reveal><strong>Na livegang</strong><span>RUIMTE OM TE OPTIMALISEREN</span><i /></div></div>
      </section>

      <section className="approach-section" id="aanpak">
        <div className="section-intro light-intro" data-reveal><p className="section-label light">ONZE AANPAK</p><div><h2>We kijken verder dan<br /><span>alleen het ontwerp.</span></h2><p>Een website moet er goed uitzien, maar vooral prettig werken en duidelijk vertellen waar je bedrijf voor staat.<br /><br />Daarom kijken we tijdens het ontwerpen ook naar de structuur, inhoud, gebruiksvriendelijkheid en techniek. We leggen belangrijke keuzes uit en stemmen ze samen af, zodat je weet waarom iets op een bepaalde manier wordt gemaakt.</p></div></div>
        <div className="approach-words" data-reveal><span>HELDER</span><span>DOORDACHT</span><span>ZORGVULDIG</span></div>
      </section>

      <section className="section process-section" id="werkwijze" ref={processRef}>
        <div className="process-intro" data-reveal><div><p className="section-label">WERKWIJZE</p><h2>Van eerste gesprek tot<br />een website die <span>staat.</span></h2></div><p>We beginnen met begrijpen wat je nodig hebt en wat je met de website wilt bereiken. Daarna werken we stap voor stap toe naar het ontwerp, de realisatie en uiteindelijk de livegang.<br /><br />Tijdens het hele traject blijf je betrokken en bespreken we belangrijke keuzes samen.</p></div>
        <div className="process-stage" data-reveal onTouchStart={(event) => touchStart.current = event.touches[0].clientX} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 48) setProcessIndex((processIndex + (distance < 0 ? 1 : -1) + process.length) % process.length); touchStart.current = null; }}>
          {process.map((step, index) => <Image key={step.number} className={index === processIndex ? 'is-active' : ''} src={step.image} alt="" fill sizes="100vw" />)}
          <div className="process-shade" />
          <div className="process-copy" key={activeProcess.number}><p><span>{activeProcess.number}</span> {activeProcess.label}</p><h3>{activeProcess.title}</h3><span>{activeProcess.text}</span></div>
          <div className="process-controls"><button onClick={() => setProcessIndex((processIndex - 1 + process.length) % process.length)} aria-label="Vorige stap"><ArrowLeft /></button><button onClick={() => setProcessIndex((processIndex + 1) % process.length)} aria-label="Volgende stap"><ArrowRight /></button></div>
          <div className="process-progress"><span>{activeProcess.number} / {String(process.length).padStart(2, '0')}</span><div><i style={{ width: `${((processIndex + 1) / process.length) * 100}%` }} /></div></div>
        </div>
      </section>

      <section className="section about-section" id="over">
        <div className="about-copy" data-reveal><p className="section-label">OVER TRIVARE</p><h2><span>Persoonlijk in aanpak.</span><span>Zorgvuldig in uitvoering.</span></h2><p className="about-intro">Trivare ontwerpt, bouwt en verbetert websites voor bedrijven die hun online uitstraling professioneler willen neerzetten.</p><p>We beginnen met jouw bedrijf. Wat doe je, wie wil je bereiken en wat moet iemand begrijpen wanneer die op je website terechtkomt?</p><p>Van daaruit werken we samen aan een website die daarbij past. Je hebt direct contact, blijft betrokken bij belangrijke keuzes en kunt tijdens het proces gewoon meedenken en feedback geven.</p><small>Geen ingewikkelde werkwijze of onnodig veel lagen.<br />Gewoon duidelijk contact en samen werken aan een website waar je achter staat.</small></div>
        <div className="about-image" data-reveal><Image src="/studio.png" alt="Persoonlijke samenwerking bij Trivare" fill sizes="(max-width: 900px) 100vw, 44vw" /><span>ACHTER TRIVARE</span></div>
      </section>

      <section className="section personality-section" aria-labelledby="personality-title">
        <div className="personality-intro" data-reveal><h2 id="personality-title">Je blijft betrokken bij <span>het hele proces.</span></h2><p>Een website maken we niet los van de mensen achter het bedrijf. Daarom bespreken we keuzes, laten we zien waar we mee bezig zijn en nemen we feedback mee tijdens het traject.<br /><br />Je hebt direct contact en weet waar het project staat. Zo komen we samen tot een resultaat waar beide kanten achter staan.</p></div>
        <div className="personality-visual" data-reveal><Image src="/personality-studio.png" alt="Persoonlijke samenwerking en ontwerpdetails in de studio" fill sizes="100vw" /><div className="personality-caption"><span>DIRECT CONTACT</span><span>SAMEN AFSTEMMEN</span><span>AANDACHT VOOR DETAIL</span></div></div>
      </section>

      <section className="values-grid">{values.map((value) => <article key={value.number} data-reveal><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p><i /></article>)}</section>

      <section className="section investment-section" id="investering">
        <div className="investment-copy" data-reveal><p className="section-label">INVESTERING</p><h2 className="investment-heading">Vooraf duidelijk wat <span>we gaan maken.</span></h2><p>Geen website is precies hetzelfde. Daarom bespreken we eerst wat je nodig hebt en wat we voor je gaan maken.<br /><br />Daarna ontvang je een duidelijk voorstel met de werkzaamheden, planning en investering. Zo weet je vóór de start waar je aan toe bent.</p><small><i /> Heldere afspraken vóór we beginnen.</small></div>
        <aside className="investment-panel" data-reveal><p>ZO WERKT HET</p><h3 className="investment-panel-heading">Zo starten we een project.</h3><div>{investmentSteps.map((step) => <article key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.text}</p></div></article>)}</div><small>PERSOONLIJK EN DUIDELIJK</small></aside>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro" data-reveal><p className="section-label light">CONTACT</p><h2 className="contact-heading">Laten we <span>kennismaken.</span></h2><p>Vertel waar je mee bezig bent of waar je tegenaan loopt. Dan kijken we samen wat er nodig is.</p><button className="calendar-link" onClick={() => setCalendlyOpen(true)}>Plan direct een afspraak <ArrowUpRight /></button><div className="mail-direct"><span>Liever mailen?</span><a href="mailto:contact@trivare.nl">contact@trivare.nl</a></div></div>
        <form className="contact-form" onSubmit={submitContact} data-reveal noValidate>
          <label htmlFor="contact-name"><span>Naam</span><Input id="contact-name" name="name" required autoComplete="name" placeholder="Jouw naam" /></label>
          <label htmlFor="contact-company"><span>Bedrijfsnaam</span><Input id="contact-company" name="company" required autoComplete="organization" placeholder="Naam van je bedrijf" /></label>
          <label htmlFor="contact-email"><span>E-mail</span><Input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="naam@bedrijf.nl" /></label>
          <label htmlFor="contact-phone"><span>Telefoon <small>(optioneel)</small></span><Input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" /></label>
          <fieldset><legend>Waar kunnen we mee helpen?</legend><div className="service-choices">{['Nieuwe website', 'Redesign', 'SEO / CRO', 'Branding', 'Onderhoud', 'Anders'].map((choice) => <button type="button" key={choice} aria-pressed={serviceChoice === choice} onClick={() => setServiceChoice(choice)}>{choice}</button>)}</div></fieldset>
          <label htmlFor="contact-message"><span>Bericht</span><Textarea id="contact-message" name="message" required minLength={10} rows={4} placeholder="Vertel kort waar je mee bezig bent" /></label>
          <Button className="submit-button" type="submit" disabled={formState === 'sending' || formState === 'success'}><span>{formState === 'sending' ? 'Versturen...' : formState === 'success' ? 'Bericht ontvangen' : 'Verstuur bericht'}</span>{formState === 'sending' ? <i className="mini-loader" /> : <ArrowUpRight />}</Button>
          <div className={`form-message ${formState}`} aria-live="polite">{formState === 'success' ? 'Bedankt — je bericht is verzonden.' : formState === 'error' ? formError : ''}</div>
        </form>
      </section>

      <footer>
        <div className="footer-top" data-reveal><div className="footer-brand"><button type="button" onClick={celebrateLogo} className="footer-logo" aria-label="Trivare logo-animatie"><Image src="/trivare-logo.png" alt="Trivare" width={1086} height={362} /></button></div><div><h3>NAVIGATIE</h3><nav><a href="#diensten">Diensten</a><a href="#werk">Werk</a><a href="#werkwijze">Werkwijze</a><a href="#over">Over Trivare</a><a href="#contact">Contact</a></nav></div><div><h3>CONTACT</h3><a href="mailto:contact@trivare.nl">contact@trivare.nl</a><a className="footer-instagram" href="https://www.instagram.com/trivare.studio" target="_blank" rel="noreferrer"><InstagramMark /><span>trivare.studio</span><ArrowUpRight /></a><p>Overijssel, Nederland</p></div></div>
        <div className="footer-bottom"><span>© 2026 Trivare</span><span>Webdesign · SEO · CRO · Branding · Onderhoud</span><span>Overijssel, Nederland</span></div>
      </footer>

      <Dialog open={caseIndex !== null} onOpenChange={(open) => !open && setCaseIndex(null)}>
        {selectedCase && <DialogContent className="case-dialog"><DialogHeader><DialogTitle>{selectedCase.title}</DialogTitle><DialogDescription>{selectedCase.label}</DialogDescription></DialogHeader><div className="case-visual"><Image src={`/projects/${selectedCase.slug}.png`} alt="" fill sizes="90vw" /></div><div className="case-detail-grid"><div><span>PROBLEEM</span><p>{selectedCase.problem}</p></div><div><span>AANPAK</span><p>{selectedCase.approach}</p></div><div><span>UITVOERING</span><p>{selectedCase.execution}</p></div><div><span>RESULTAAT</span><p>{selectedCase.result}</p></div></div><div className="case-proof">{selectedCase.proof.map((item) => <span key={item}>{item}</span>)}</div><a className="primary-cta" href="#contact" onClick={() => setCaseIndex(null)}><span>Bespreek jouw project</span><span className="cta-arrow"><ArrowUpRight /></span></a></DialogContent>}
      </Dialog>

      <Dialog open={calendlyOpen} onOpenChange={setCalendlyOpen}>
        <DialogContent className="calendar-dialog"><DialogHeader><DialogTitle>Plan direct een afspraak</DialogTitle><DialogDescription>Kies via Calendly een moment dat voor jou goed uitkomt.</DialogDescription></DialogHeader>{CALENDLY_URL.startsWith('http') ? <iframe title="Plan een afspraak via Calendly" src={CALENDLY_URL} /> : <div className="calendar-placeholder"><span>CALENDLY</span><h3>De agenda wordt hier gekoppeld.</h3><p>De integratie staat technisch klaar. Tot de definitieve link is ingevuld kun je mailen naar <a href="mailto:contact@trivare.nl">contact@trivare.nl</a>.</p></div>}</DialogContent>
      </Dialog>
    </main>
  );
}

