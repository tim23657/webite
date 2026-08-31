'use client';

import Image from 'next/image';
import { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// TODO: vervang de placeholder zodra de definitieve Calendly-link beschikbaar is.
const CALENDLY_URL = 'PLAATS_HIER_DE_CALENDLY_LINK';

const services = [
  { number: '01', title: 'Website ontwerp', text: 'Een professionele website die past bij je bedrijf, vertrouwen uitstraalt en prettig werkt.' },
  { number: '02', title: 'Website redesign', text: 'Een bestaande website opnieuw ontworpen voor een sterkere uitstraling, duidelijkere structuur en betere gebruikerservaring.' },
  { number: '03', title: 'Website optimalisatie', text: 'Gerichte verbeteringen in snelheid, gebruiksgemak, vindbaarheid en conversie.' },
];

const capabilities = [
  { number: '01', title: 'SEO', text: 'Een heldere sitestructuur, sterke contentbasis en techniek die vindbaarheid ondersteunen.' },
  { number: '02', title: 'CRO', text: 'Gerichte verbeteringen die bezoekers duidelijker naar contact, aanvraag of aankoop begeleiden.' },
  { number: '03', title: 'Branding', text: 'Een herkenbare visuele richting die past bij de kwaliteit en persoonlijkheid van je bedrijf.' },
  { number: '04', title: 'Onderhoud', text: 'Technische aandacht, updates en optimalisatie om je website sterk en actueel te houden.' },
  { number: '05', title: 'Persoonlijke samenwerking', text: 'Direct contact, duidelijke keuzes en betrokken begeleiding van eerste idee tot livegang.' },
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
  { number: '01', label: 'STRATEGIE & RICHTING', title: 'Eerst begrijpen wat jouw website moet bereiken.', text: 'We bespreken je bedrijf, doelgroep, aanbod en doelen. Zo ontstaat een heldere basis voor de structuur, boodschap en uitstraling.', image: '/process/strategy.png' },
  { number: '02', label: 'ONTWERP & REALISATIE', title: 'Elk onderdeel krijgt een duidelijke functie.', text: 'We vertalen de gekozen richting naar een sterk ontwerp en bouwen dit zorgvuldig uit. Van hiërarchie en teksten tot mobiel gebruik, snelheid en duidelijke call-to-actions.', image: '/process/design-build.png' },
  { number: '03', label: 'LIVE & VERDER', title: 'Klaar om professioneel naar buiten te treden.', text: 'Voor de livegang controleren we de belangrijkste details, zodat alles goed werkt en professioneel staat. Daarna kunnen we gericht blijven verbeteren.', image: '/process/launch.png' },
];

const values = [
  { number: '01', title: 'Aandacht', text: 'We kijken goed naar wat je nodig hebt en nemen de tijd om keuzes zorgvuldig uit te werken.' },
  { number: '02', title: 'Vakmanschap', text: 'Ontwerp, techniek en gebruiksgemak moeten in ieder detail kloppen.' },
  { number: '03', title: 'Samenwerking', text: 'We houden je betrokken, leggen keuzes uit en stemmen belangrijke beslissingen samen af.' },
];

const investmentSteps = [
  { number: '01', title: 'Bespreken', text: 'We bepalen wat nodig is.' },
  { number: '02', title: 'Voorstel', text: 'Je ontvangt een helder voorstel met scope, planning en investering.' },
  { number: '03', title: 'Start', text: 'Akkoord? Dan gaan we aan de slag.' },
];

function setPointerPosition(event: ReactPointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
}

function useHeroField(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element || matchMedia('(pointer: coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const title = element.querySelector<HTMLElement>('.hero-title');
    let visible = true;
    let frame = 0;
    let targetX = element.clientWidth * .72;
    let targetY = element.clientHeight * .47;
    let x = targetX;
    let y = targetY;
    let lightX = targetX;
    let lightY = targetY;
    let titleOffsetX = 0;
    let titleOffsetY = 0;

    const measureTitle = () => {
      if (!title) return;
      const heroRect = element.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();
      titleOffsetX = titleRect.left - heroRect.left;
      titleOffsetY = titleRect.top - heroRect.top;
    };

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .05 });
    observer.observe(element);
    measureTitle();
    const move = (event: globalThis.PointerEvent) => {
      const rect = element.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      element.dataset.cloudReveal = 'true';
    };
    const leave = () => { element.dataset.cloudReveal = 'false'; };
    const render = () => {
      if (visible) {
        x += (targetX - x) * .08;
        y += (targetY - y) * .08;
        lightX += (targetX - lightX) * .03;
        lightY += (targetY - lightY) * .03;
        element.style.setProperty('--mouse-x', `${x}px`);
        element.style.setProperty('--mouse-y', `${y}px`);
        element.style.setProperty('--light-x', `${lightX}px`);
        element.style.setProperty('--light-y', `${lightY}px`);
        title?.style.setProperty('--title-x', `${x - titleOffsetX}px`);
        title?.style.setProperty('--title-y', `${y - titleOffsetY}px`);
      }
      frame = requestAnimationFrame(render);
    };
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', leave);
    addEventListener('resize', measureTitle);
    frame = requestAnimationFrame(render);
    return () => { observer.disconnect(); element.removeEventListener('pointermove', move); element.removeEventListener('pointerleave', leave); removeEventListener('resize', measureTitle); cancelAnimationFrame(frame); };
  }, [ref]);
}

function InstagramMark() {
  return <svg className="instagram-mark" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="3.7" fill="none" stroke="currentColor" strokeWidth="1.7" /><circle cx="17.4" cy="6.8" r="1" fill="currentColor" /></svg>;
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
  useHeroField(heroRef);

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
        <div className="hero-atmosphere" aria-hidden="true">
          {['base', 'reveal', 'echo'].map((layer) => <div className={`hero-cloud-layer hero-cloud-${layer}`} key={layer}>{['a', 'b', 'c', 'd'].map((shape) => <i className={`hero-cloud-shape hero-cloud-${shape}`} key={shape} />)}</div>)}
        </div>
        <div className="grain" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title"><span className="hero-title-base">Websites die<br />vertrouwen<br />uitstralen.</span><span className="hero-title-gold" aria-hidden="true">Websites die<br />vertrouwen<br />uitstralen.</span></h1>
          <div className="hero-lower">
            <p>Trivare ontwerpt en bouwt websites die professioneel ogen, logisch werken en passen bij het bedrijf erachter.</p>
            <div className="hero-actions">
              <a className="primary-cta" href="#contact"><span>Plan een kennismaking</span><span className="cta-arrow"><ArrowUpRight /></span></a>
              <a className="quiet-link" href="#werk">Bekijk ons werk <ArrowDown /></a>
            </div>
          </div>
        </div>
        <div className="hero-edge" aria-hidden="true"><span>01</span><span>ONTWERP · REALISATIE · OPTIMALISATIE</span></div>
      </section>

      <section className="section services" id="diensten">
        <div className="section-intro" data-reveal><p className="section-label"><span>02</span> DIENSTEN</p><div><h2>Alles voor een website<br /><span>die sterker staat.</span></h2><p>Van een compleet nieuw ontwerp tot het verbeteren van een bestaande website. We kijken naar wat er nodig is en bouwen van daaruit verder.</p></div></div>
        <div className="service-rows" data-reveal>{services.map((service) => <a href="#contact" className="service-row" key={service.number}><span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.text}</p><ArrowUpRight /></a>)}</div>
        <p className="service-tags">DESIGN · BRANDING · UX · SEO · CRO · ONDERHOUD</p>
        <div className="capability-grid">{capabilities.map((capability) => <article key={capability.number} data-reveal><span>{capability.number}</span><strong>{capability.title}</strong><p>{capability.text}</p><i /></article>)}</div>
      </section>

      <section className="section work-section" id="werk">
        <div className="section-intro work-intro" data-reveal><p className="section-label"><span>03</span> SELECTIE VAN ONS WERK</p><div><h2>Websites met<br /><span>een eigen karakter.</span></h2><p>Geen standaard template met een ander logo, maar websites waarin uitstraling, gebruiksgemak en het karakter van het bedrijf samenkomen.</p></div></div>
        <div className="project-grid" data-reveal>{projects.map((project, index) => <ProjectCard key={project.slug} project={project} onOpen={() => setCaseIndex(index)} />)}</div>
        <div className="proof-strip"><div data-reveal><strong>Geselecteerd werk</strong><span>VERSCHILLENDE STIJLEN, ZORGVULDIG UITGEWERKT</span><i /></div><div data-reveal><strong>Persoonlijk</strong><span>BEGELEIDING EN AFSTEMMING</span><i /></div><div data-reveal><strong>Ontwerp + realisatie</strong><span>ÉÉN ZORGVULDIG PROCES</span><i /></div><div data-reveal><strong>Na livegang</strong><span>RUIMTE OM TE OPTIMALISEREN</span><i /></div></div>
      </section>

      <section className="approach-section" id="aanpak">
        <div className="section-intro light-intro" data-reveal><p className="section-label light"><span>04</span> ONZE AANPAK</p><div><h2>Niet alleen mooi.<br /><span>Vooral goed doordacht.</span></h2><p>Een sterke website moet er professioneel uitzien, prettig werken en duidelijk maken waar je bedrijf voor staat.<br /><br />Daarom kijken we niet alleen naar design. We denken ook na over structuur, gebruiksgemak, techniek en de keuzes die bezoekers helpen om verder te gaan.</p></div></div>
        <div className="approach-words" data-reveal><span>HELDER</span><span>DOORDACHT</span><span>ZORGVULDIG</span></div>
      </section>

      <section className="section process-section" id="werkwijze" ref={processRef}>
        <div className="process-intro" data-reveal><div><p className="section-label"><span>05</span> WERKWIJZE</p><h2>Van een goed idee<br />naar een website die <span>voor je werkt.</span></h2></div><p>Een sterk resultaat begint met een duidelijke richting. We kijken eerst naar wat je wilt bereiken, wat je wilt uitstralen en wat je website moet doen.</p></div>
        <div className="process-stage" data-reveal onTouchStart={(event) => touchStart.current = event.touches[0].clientX} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 48) setProcessIndex((processIndex + (distance < 0 ? 1 : -1) + process.length) % process.length); touchStart.current = null; }}>
          {process.map((step, index) => <Image key={step.number} className={index === processIndex ? 'is-active' : ''} src={step.image} alt="" fill sizes="100vw" />)}
          <div className="process-shade" />
          <div className="process-copy" key={activeProcess.number}><p><span>{activeProcess.number}</span> {activeProcess.label}</p><h3>{activeProcess.title}</h3><span>{activeProcess.text}</span></div>
          <div className="process-controls"><button onClick={() => setProcessIndex((processIndex - 1 + process.length) % process.length)} aria-label="Vorige stap"><ArrowLeft /></button><button onClick={() => setProcessIndex((processIndex + 1) % process.length)} aria-label="Volgende stap"><ArrowRight /></button></div>
          <div className="process-progress"><span>{activeProcess.number} / 03</span><div><i style={{ width: `${((processIndex + 1) / process.length) * 100}%` }} /></div></div>
        </div>
      </section>

      <section className="section about-section" id="over">
        <div className="about-copy" data-reveal><p className="section-label"><span>06</span> OVER TRIVARE</p><h2><span>Persoonlijk in aanpak.</span><span>Zorgvuldig in uitvoering.</span></h2><p className="about-intro">Trivare helpt bedrijven aan websites die professioneel aanvoelen en passen bij wie ze zijn.</p><p>We beginnen niet bij een template, maar bij jouw bedrijf. Wat wil je uitstralen? Wie wil je bereiken? En wat moet iemand begrijpen zodra die op je website terechtkomt?</p><p>Je hebt rechtstreeks contact, blijft betrokken bij belangrijke keuzes en weet steeds waar het project staat. Zo bouwen we stap voor stap aan een helder en sterk geheel.</p><small>Geen ingewikkeld proces.<br />Wel aandacht voor detail, duidelijke keuzes en persoonlijk contact.</small></div>
        <div className="about-image" data-reveal><Image src="/studio.png" alt="Persoonlijke samenwerking bij Trivare" fill sizes="(max-width: 900px) 100vw, 44vw" /><span>ACHTER TRIVARE</span></div>
      </section>

      <section className="values-grid">{values.map((value) => <article key={value.number} data-reveal><span>{value.number}</span><h3>{value.title}</h3><p>{value.text}</p><i /></article>)}</section>

      <section className="section investment-section" id="investering">
        <div className="investment-copy" data-reveal><p className="section-label"><span>07</span> INVESTERING</p><h2>Maatwerk in ontwerp.<br /><span>Duidelijkheid in prijs.</span></h2><p>We kijken naar wat jouw website nodig heeft en spreken vooraf duidelijk af wat we maken en wat de investering wordt.</p><small><i /> Heldere afspraken vóór de start.</small></div>
        <aside className="investment-panel" data-reveal><p>ZO WERKT HET</p><h3>Eerst helder.<br />Dan bouwen.</h3><div>{investmentSteps.map((step) => <article key={step.number}><span>{step.number}</span><div><strong>{step.title}</strong><p>{step.text}</p></div></article>)}</div><small>PERSOONLIJK EN DUIDELIJK</small></aside>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-intro" data-reveal><p className="section-label light"><span>08</span> CONTACT</p><h2>Laten we<br /><span>kennismaken.</span></h2><p>Vertel waar je mee bezig bent of waar je tegenaan loopt. Dan kijken we samen wat er nodig is.</p><button className="calendar-link" onClick={() => setCalendlyOpen(true)}>Plan direct een afspraak <ArrowUpRight /></button><div className="mail-direct"><span>Liever mailen?</span><a href="mailto:contact@trivare.nl">contact@trivare.nl</a></div></div>
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
        <div className="footer-top" data-reveal><div className="footer-brand"><button type="button" onClick={celebrateLogo} className="footer-logo" aria-label="Trivare logo-animatie"><Image src="/trivare-logo.png" alt="Trivare" width={1086} height={362} /></button><p>Websites die vertrouwen uitstralen.</p></div><div><h3>NAVIGATIE</h3><nav><a href="#diensten">Diensten</a><a href="#werk">Werk</a><a href="#werkwijze">Werkwijze</a><a href="#over">Over Trivare</a><a href="#contact">Contact</a></nav></div><div><h3>CONTACT</h3><a href="mailto:contact@trivare.nl">contact@trivare.nl</a><a className="footer-instagram" href="https://www.instagram.com/trivare.studio" target="_blank" rel="noreferrer"><InstagramMark /><span>trivare.studio</span><ArrowUpRight /></a><p>Overijssel, Nederland</p></div></div>
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

