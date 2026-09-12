import type { Metadata } from 'next';
import { SiteHeader } from '@/app/components/site-header';
import { SiteFooter } from '@/app/components/site-footer';

export const metadata: Metadata = {
  title: 'Privacybeleid — Trivare',
  description: 'Hoe Trivare omgaat met persoonsgegevens die via deze website worden verzameld.',
  alternates: { canonical: '/privacybeleid' },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <SiteHeader />
      <section className="section legal-content" style={{ paddingTop: 'clamp(150px, 17vw, 220px)' }}>
        <p className="section-label">JURIDISCH</p>
        <h1 className="display-heading">Privacybeleid</h1>
        <p className="legal-updated">Laatst bijgewerkt: 12 september 2026</p>

        <h2>Wie is verantwoordelijk?</h2>
        <p>Trivare, gevestigd in Overijssel, Nederland, is verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in dit privacybeleid. Vragen? Mail naar <a href="mailto:contact@trivare.nl">contact@trivare.nl</a>.</p>

        <h2>Welke gegevens verzamelen we?</h2>
        <p>Wanneer je het contactformulier op deze website invult, verzamelen we de gegevens die je zelf invoert: naam, bedrijfsnaam, e-mailadres, eventueel telefoonnummer, het type dienst waarin je geïnteresseerd bent en je bericht. Deze gegevens worden gebruikt om contact met je op te nemen naar aanleiding van je aanvraag.</p>
        <p>Deze website plaatst geen tracking- of marketingcookies en gebruikt geen analytics- of advertentiediensten van derden.</p>

        <h2>Hoe bewaren we je gegevens?</h2>
        <p>Gegevens uit het contactformulier worden veilig opgeslagen en alleen gebruikt om je aanvraag te behandelen. We bewaren deze niet langer dan nodig is om je verzoek af te handelen en eventuele navolgende samenwerking, tenzij we wettelijk verplicht zijn ze langer te bewaren.</p>

        <h2>Delen met derden</h2>
        <p>We verkopen of verhuren je gegevens nooit aan derden. Gegevens worden alleen gedeeld met partijen die noodzakelijk zijn om de website te laten functioneren (zoals onze hostingpartij), en uitsluitend voor dat doel.</p>

        <h2>Jouw rechten</h2>
        <p>Je hebt het recht om je gegevens in te zien, te laten corrigeren of te laten verwijderen. Ook kun je bezwaar maken tegen de verwerking van je gegevens. Neem hiervoor contact op via <a href="mailto:contact@trivare.nl">contact@trivare.nl</a>.</p>

        <h2>Wijzigingen</h2>
        <p>Dit privacybeleid kan van tijd tot tijd worden aangepast. De meest actuele versie staat altijd op deze pagina.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
