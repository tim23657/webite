import type { CSSProperties } from 'react';

export function Testimonial() {
  return (
    <section className="testimonial-section" id="ervaringen">
      <span className="testimonial-divider" aria-hidden="true" />
      <div className="testimonial-grid">
        <div className="testimonial-heading-col">
          <p className="section-label testimonial-label">ERVARINGEN</p>
          <h2 className="testimonial-heading">Wat klanten zeggen</h2>
        </div>
        <div className="testimonial-content-col">
          <span className="testimonial-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="testimonial-quote testimonial-reveal" data-reveal>
            <p>Hele fijne samenwerking. Er wordt goed geluisterd naar je wensen, kwaliteit geleverd en meegedacht. Ik ben heel blij met het verloop en kan met al mijn vragen terecht.</p>
          </blockquote>
          <p
            className="testimonial-attribution testimonial-reveal"
            data-reveal
            style={{ '--reveal-delay': '160ms' } as CSSProperties}
          >
            <span className="testimonial-name">Chantal</span>
            <span className="testimonial-sep"> · </span>
            <a className="testimonial-company" href="https://creabychantal.nl" target="_blank" rel="noreferrer">Crea by Chantal</a>
          </p>
        </div>
      </div>
      <noscript>
        <style>{'.testimonial-reveal{opacity:1!important;transform:none!important;}'}</style>
      </noscript>
    </section>
  );
}
