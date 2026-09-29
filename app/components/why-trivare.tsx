'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { whyTrivare } from '@/app/lib/site-data';

export function WhyTrivare() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const getStep = () => {
    const track = trackRef.current;
    const first = cardRefs.current[0];
    if (!track || !first) return 0;
    return first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0');
  };

  // Read the active index straight from scroll position rather than React
  // state, so "next"/"prev" always act on where the track actually is —
  // never a stale value from a click that fired mid-animation.
  const getCurrentIndex = () => {
    const track = trackRef.current;
    const step = getStep();
    if (!track || step <= 0) return 0;
    return Math.max(0, Math.min(whyTrivare.length - 1, Math.round(track.scrollLeft / step)));
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => setActive(getCurrentIndex());
    // 'scrollend' fires exactly once scrolling truly settles (programmatic
    // or user-driven) — far more reliable than guessing a debounce delay.
    if ('onscrollend' in window) {
      track.addEventListener('scrollend', sync);
      return () => track.removeEventListener('scrollend', sync);
    }
    let timer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(sync, 120);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => { track.removeEventListener('scroll', onScroll); if (timer) clearTimeout(timer); };
  }, []);

  const scrollToIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(whyTrivare.length - 1, index));
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: reducedMotionRef.current ? 'auto' : 'smooth',
      inline: 'start',
      block: 'nearest',
    });
    setActive(clamped);
  };

  const goNext = () => scrollToIndex(getCurrentIndex() + 1);
  const goPrev = () => scrollToIndex(getCurrentIndex() - 1);

  const progress = whyTrivare.length > 1 ? (active / (whyTrivare.length - 1)) * 100 : 0;

  return (
    <section className="section why-trivare-section" id="waarom-trivare">
      <div className="section-intro" data-reveal>
        <p className="section-label">WAAROM TRIVARE</p>
        <h2 className="display-heading">Een website die bij je past.</h2>
        <p>Direct contact. Een vaste prijs. Snel online.</p>
      </div>

      <div className="why-carousel" data-reveal>
        <div className="why-track" ref={trackRef} aria-label="Waarom Trivare">
          {whyTrivare.map((item, index) => (
            <div
              className="why-card"
              key={item.number}
              ref={(el) => { cardRefs.current[index] = el; }}
              aria-roledescription="slide"
              aria-label={`${index + 1} van ${whyTrivare.length}`}
            >
              <div className="why-card-body">
                <span className="why-card-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
              <div className="why-card-media">
                <Image src={item.image} alt={item.alt} fill quality={72} sizes="(max-width: 700px) 86vw, 42vw" />
              </div>
            </div>
          ))}
        </div>

        <div className="why-carousel-nav">
          <span className="why-counter">{String(active + 1).padStart(2, '0')} / {String(whyTrivare.length).padStart(2, '0')}</span>
          <div className="why-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
          <div className="why-arrows">
            <button type="button" className="why-arrow" onClick={goPrev} disabled={active === 0} aria-label="Vorige">
              <ArrowLeft />
            </button>
            <button type="button" className="why-arrow" onClick={goNext} disabled={active === whyTrivare.length - 1} aria-label="Volgende">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
