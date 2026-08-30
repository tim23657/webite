const services = ['Webdesign', 'UX', 'SEO', 'CRO', 'Onderhoud', 'Branding'];

const serviceDetails = [
  { number: '01', title: 'Webdesign', text: 'Een onderscheidende website die jouw merk professioneel neerzet en bezoekers overtuigt.' },
  { number: '02', title: 'UX design', text: 'Logische, toegankelijke ervaringen die frictie wegnemen en klanten soepel naar actie leiden.' },
  { number: '03', title: 'SEO', text: 'Een sterke technische en inhoudelijke basis waarmee je duurzaam beter vindbaar wordt.' },
  { number: '04', title: 'CRO', text: 'Gerichte optimalisatie op basis van gedrag, data en duidelijke conversiedoelen.' },
  { number: '05', title: 'Onderhoud', text: 'Doorlopende aandacht voor snelheid, veiligheid, updates en inhoudelijke verbeteringen.' },
  { number: '06', title: 'Branding', text: 'Een helder merkverhaal en visuele identiteit die herkenning en vertrouwen opbouwen.' },
];

const process = [
  { number: '01', title: 'Koers bepalen', text: 'We brengen doelen, doelgroep en commerciële kansen scherp in beeld.' },
  { number: '02', title: 'Strategie & structuur', text: 'We vertalen inzichten naar een heldere inhoud, flow en digitale positionering.' },
  { number: '03', title: 'Design & realisatie', text: 'We ontwerpen en bouwen een snelle, overtuigende ervaring tot in de details.' },
  { number: '04', title: 'Lanceren & groeien', text: 'Na livegang blijven we meten, verbeteren en gericht doorontwikkelen.' },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Trivare home">
          TRIVARE<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Hoofdnavigatie">
          <a href="#diensten">Diensten</a>
          <a href="#werkwijze">Werkwijze</a>
          <a href="#over">Over Trivare</a>
        </nav>
        <a className="header-cta" href="#contact">
          Start een project <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Digital studio · Overijssel</p>
          <h1>
            Websites die<br />
            <em>bedrijven vooruitbrengen.</em>
          </h1>
          <p className="hero-intro">
            Trivare bouwt sterke digitale merken voor ambitieuze mkb-bedrijven.
            Strategisch doordacht, onderscheidend ontworpen en gemaakt om te groeien.
          </p>
          <div className="hero-actions">
            <a className="button button-gold" href="#contact">Plan een kennismaking <span>↗</span></a>
            <a className="text-link" href="#diensten">Ontdek onze expertise <span>↓</span></a>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Onze focus">
          <div className="panel-number">01</div>
          <p>Digitaal vakmanschap voor ondernemers met ambitie.</p>
          <div className="panel-mark" aria-hidden="true"><span>TRI</span><span>VARE</span></div>
          <div className="panel-footer">
            <span>Strategie</span><span>Design</span><span>Groei</span>
          </div>
        </aside>
      </section>

      <section className="services-strip" id="diensten" aria-label="Diensten">
        <p>Complete digitale expertise</p>
        <div>
          {services.map((service) => <span key={service}>{service}</span>)}
        </div>
      </section>

      <section className="section services-section">
        <div className="section-heading">
          <p className="section-kicker"><span>02</span> Onze expertise</p>
          <div>
            <h2>Van sterk merk naar<br /><em>sterk resultaat.</em></h2>
            <p>Alles wat jouw bedrijf nodig heeft om digitaal professioneel voor de dag te komen — van de eerste strategische keuzes tot blijvende groei.</p>
          </div>
        </div>
        <div className="service-grid">
          {serviceDetails.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-card-top">
                <span>{service.number}</span>
                <span aria-hidden="true">↗</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="manifesto" aria-label="Onze visie">
        <p className="section-kicker light"><span>03</span> Onze overtuiging</p>
        <blockquote>
          Geen website om er één te hebben.<br />
          Een digitaal fundament dat <em>werkt.</em>
        </blockquote>
        <div className="manifesto-bottom">
          <p>Goed design trekt aandacht. Een sterke strategie houdt die vast. Trivare brengt merk, gebruiksgemak en resultaat samen in één digitale ervaring.</p>
          <div>
            <span>Snel</span><span>Doordacht</span><span>Meetbaar</span>
          </div>
        </div>
      </section>

      <section className="section process-section" id="werkwijze">
        <div className="section-heading process-heading">
          <p className="section-kicker"><span>04</span> Onze werkwijze</p>
          <div>
            <h2>Een helder proces.<br /><em>Zonder gedoe.</em></h2>
            <p>Korte lijnen, duidelijke keuzes en focus op wat voor jouw bedrijf het verschil maakt.</p>
          </div>
        </div>
        <div className="process-list">
          {process.map((step) => (
            <article className="process-step" key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="regional" id="over">
        <div className="regional-visual" aria-hidden="true">
          <span>OV</span>
          <strong>TRIVARE</strong>
          <span>NL</span>
        </div>
        <div className="regional-copy">
          <p className="section-kicker"><span>05</span> Dichtbij betrokken</p>
          <h2>Geworteld in Overijssel.<br /><em>Gebouwd voor groei.</em></h2>
          <p>Wij helpen mkb-bedrijven in Overijssel en daarbuiten met een digitale uitstraling die past bij hun ambities. Persoonlijk contact, nuchtere adviezen en werk waar je op kunt bouwen.</p>
          <ul>
            <li><span>✓</span> Eén partner voor strategie, design en optimalisatie</li>
            <li><span>✓</span> Direct contact en korte communicatielijnen</li>
            <li><span>✓</span> Een schaalbare basis, klaar voor WordPress</li>
          </ul>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-orbit" aria-hidden="true" />
        <p className="section-kicker light"><span>06</span> Klaar voor de volgende stap?</p>
        <h2>Laten we iets<br /><em>sterks bouwen.</em></h2>
        <p>Vertel ons waar je bedrijf naartoe wil. Dan kijken we samen welke digitale stap het meeste oplevert.</p>
        <div className="contact-actions">
          <a className="button button-gold button-large" href="mailto:info@trivare.nl?subject=Kennismaking%20met%20Trivare">Plan een vrijblijvende kennismaking <span>↗</span></a>
          <a className="contact-email" href="mailto:info@trivare.nl">info@trivare.nl</a>
        </div>
      </section>

      <footer>
        <a className="wordmark footer-mark" href="#top">TRIVARE<span>.</span></a>
        <p>Webdesign · UX · SEO · CRO · Onderhoud · Branding</p>
        <div><span>Overijssel, Nederland</span><span>© {new Date().getFullYear()} Trivare</span></div>
      </footer>
    </main>
  );
}
