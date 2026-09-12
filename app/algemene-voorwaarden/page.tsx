import type { Metadata } from 'next';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';

export const metadata: Metadata = {
  title: 'Algemene voorwaarden — Trivare',
  description: 'De algemene voorwaarden die van toepassing zijn op opdrachten bij Trivare.',
  alternates: { canonical: '/algemene-voorwaarden' },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <SiteHeader />
      <section className="section legal-content" style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }}>
        <p className="section-label">JURIDISCH</p>
        <h1 className="display-heading">Algemene voorwaarden</h1>
        <p className="legal-updated">Laatst bijgewerkt: 12 september 2026</p>

        <h2>Toepasselijkheid</h2>
        <p>Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachten en overeenkomsten tussen Trivare en de opdrachtgever, tenzij schriftelijk anders is overeengekomen.</p>

        <h2>Offertes en overeenkomsten</h2>
        <p>Offertes van Trivare zijn vrijblijvend en 30 dagen geldig, tenzij anders aangegeven. Een overeenkomst komt tot stand zodra de opdrachtgever akkoord geeft op de offerte of het voorstel.</p>

        <h2>Uitvoering van de opdracht</h2>
        <p>Trivare spant zich in om de opdracht naar beste inzicht en vermogen uit te voeren. Genoemde planningen zijn indicatief; vertraging door aanlevering van materiaal of feedback door de opdrachtgever kan de doorlooptijd beïnvloeden.</p>

        <h2>Prijzen en betaling</h2>
        <p>Alle prijzen zijn exclusief btw, tenzij anders vermeld. Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan, tenzij schriftelijk anders overeengekomen.</p>

        <h2>Intellectueel eigendom</h2>
        <p>Na volledige betaling gaat het eigendom van de opgeleverde website over naar de opdrachtgever. Trivare behoudt het recht om opgeleverd werk te tonen als portfolio, tenzij nadrukkelijk anders is afgesproken.</p>

        <h2>Aansprakelijkheid</h2>
        <p>Trivare is niet aansprakelijk voor indirecte schade, gevolgschade of gederfde winst. De aansprakelijkheid van Trivare is in alle gevallen beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht.</p>

        <h2>Onderhoud en wijzigingen</h2>
        <p>Onderhoud en kleine aanpassingen na livegang worden in overleg en, indien van toepassing, tegen een vooraf afgesproken vergoeding uitgevoerd.</p>

        <h2>Toepasselijk recht</h2>
        <p>Op alle overeenkomsten met Trivare is Nederlands recht van toepassing.</p>

        <h2>Vragen</h2>
        <p>Heb je vragen over deze voorwaarden? Neem contact op via <a href="mailto:contact@trivare.nl">contact@trivare.nl</a>.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
