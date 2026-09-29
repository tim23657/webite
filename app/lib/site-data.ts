export const services = [
  { number: '01', title: 'Website ontwerp', text: 'Een professionele website die past bij je bedrijf en prettig werkt.', image: '/kaffie-co-lxSRLFSA_8M-unsplash.jpg' },
  { number: '02', title: 'Website redesign', text: 'Een frisse uitstraling en duidelijkere structuur voor je bestaande website.', image: '/sydney-rae-658TyhDubS4-unsplash.jpg' },
  { number: '03', title: 'Website optimalisatie', text: 'Gerichte verbeteringen in snelheid, gebruiksgemak, SEO en conversie.', image: '/robert-clark-guP70X3HWtY-unsplash.jpg' },
];

export const whyTrivare = [
  {
    number: '01', title: 'Direct met de maker',
    text: 'Geen tussenpersoon of accountmanager. Je spreekt direct met mij: degene die jouw website ontwerpt en bouwt. Daardoor gaat het sneller dan bij een bureau en worden je wensen meteen opgepakt.',
    image: '/process/strategy.jpg', alt: 'Handgetekende schetsen en ontwerpmateriaal op een bureau',
  },
  {
    number: '02', title: 'Eén prijs. Vooraf afgesproken.',
    text: 'Je weet vóór de start precies wat jouw website kost. Voor het afgesproken werk blijft die prijs staan. Geen onverwachte toeslagen of hogere factuur achteraf. Extra wensen? Die bespreken we eerst.',
    image: '/stats/stat-trust.jpg', alt: 'Twee mensen die elkaar een hand geven',
  },
  {
    number: '03', title: 'Binnen twee weken live',
    text: 'Jouw website staat binnen twee weken live nadat alle benodigde teksten, beelden en informatie zijn aangeleverd. Haal ik de afgesproken deadline niet door mijn toedoen? Dan krijg je het betaalde bedrag terug.',
    image: '/process/launch.jpg', alt: 'Een scherm met een geometrische compositie op een sokkel',
  },
  {
    number: '04', title: 'Ontwerp dat voor je werkt',
    text: 'Een mooie website moet ook iets opleveren. Ik maak jouw aanbod duidelijk en help bezoekers de stap te zetten naar een aanvraag, bestelling of contact.',
    image: '/process/design-build.jpg', alt: 'Tablet met een websiteontwerp in zwart, wit en goud',
  },
  {
    number: '05', title: 'Marketing als basis',
    text: 'Ik kijk verder dan alleen het uiterlijk van een website: ook jouw boodschap, doelgroep en klantreis tellen mee.',
    image: '/projects/bloom-weddings.jpg', alt: 'Sierlijke bloemvormen in wit en goud',
  },
  {
    number: '06', title: 'Sterk op ieder scherm',
    text: 'Op telefoon, tablet of computer: jouw website blijft overzichtelijk, herkenbaar en makkelijk te gebruiken.',
    image: '/stats/stat-mobile.jpg', alt: 'Iemand bekijkt een webshop op een telefoon naast een beeldscherm',
  },
  {
    number: '07', title: 'De techniek die bij jou past',
    text: 'WordPress, Shopify of een volledig op maat gebouwde website. Ik bouw jouw site zelf, met behulp van de nieuwste AI-tools of binnen het platform dat bij jouw bedrijf past.',
    image: '/stats/stat-revenue.jpg', alt: 'Laptop met een webshop naast een winkelwagentje',
  },
  {
    number: '08', title: 'Ook na de lancering bereikbaar',
    text: 'Je website is live, maar het contact stopt niet. Voor vragen, wijzigingen en verdere uitbreiding kun je rechtstreeks bij mij terecht.',
    image: '/projects/north.jpg', alt: 'Abstracte gelaagde compositie in wit, zwart en goud',
  },
];

// `fallbackImage` is the previously-used, known-good image for each slide.
// If `image` is ever swapped for a new asset that fails to load, StatsStage
// falls back to it automatically instead of showing a broken image.
export const stats = [
  { headline: 'Bezoekers oordelen razendsnel.', supporting: 'Nog voor ze verder lezen.', image: '/stats/stat-first-impression.jpg', fallbackImage: '/stats/stat-first-impression.jpg' },
  { headline: 'Ontwerp maakt het verschil.', supporting: 'Belangrijker dan de tekst zelf.', image: '/stats/stat-design.jpg', fallbackImage: '/stats/stat-design.jpg' },
  { headline: 'Vertrouwen begint bij je website.', supporting: 'Nog voor het eerste contact.', image: '/stats/stat-trust.jpg', fallbackImage: '/stats/stat-trust.jpg' },
  { headline: 'Mobiel bepaalt de ervaring.', supporting: 'Verreweg de meeste bezoekers.', image: '/stats/stat-mobile.jpg', fallbackImage: '/stats/stat-mobile.jpg' },
  { headline: 'Een goede website loont.', supporting: 'Aantoonbaar meer omzet.', image: '/stats/stat-revenue.jpg', fallbackImage: '/stats/stat-revenue.jpg' },
];

export const capabilities = [
  { number: '01', title: 'SEO', text: 'Een heldere structuur en technische basis.' },
  { number: '02', title: 'CRO', text: 'Gerichte verbeteringen die contact makkelijker maken.' },
  { number: '03', title: 'Branding', text: 'Een visuele richting die herkenbaar voelt.' },
  { number: '04', title: 'Onderhoud', text: 'Betrokken blijven na de livegang.' },
];

type Project = {
  slug: string;
  number: string;
  label: string;
  title: string;
  description: string;
  proof: string[];
  problem: string;
  approach: string;
  execution: string;
  result: string;
  url?: string;
  alt?: string;
};

export const projects: Project[] = [
  {
    slug: 'crea-by-chantal', number: '01', label: 'WEBDESIGN', title: 'Crea by Chantal',
    url: 'https://creabychantal.nl/',
    description: 'Website voor handgemaakte creaties · overzichtelijke collectie · duidelijke bestelroute',
    alt: 'Laptop op een bureau met de homepage van Crea by Chantal in beeld',
    proof: ['Overzichtelijke collectie', 'Duidelijke bestelroute', 'Persoonlijk verhaal'],
    problem: 'Handgemaakte creaties hadden een eigen plek nodig waar bezoekers de collectie zien en kunnen bestellen.',
    approach: 'Collectie, bestelproces en het verhaal van Chantal komen samen op één rustige pagina.',
    execution: 'Een overzicht van vier productgroepen met bestelknop, een bestelformulier in vier duidelijke stappen en een persoonlijke sectie over Chantal.',
    result: 'Een persoonlijke website die het werk van Chantal toont en bezoekers naar een bestelling leidt.',
  },
  {
    slug: 'north', number: '02', label: 'WEBDESIGN', title: 'North',
    description: 'Nieuwbouw webdesign · rustige merkbeleving · sterke mobiele ervaring',
    proof: ['Heldere structuur', 'Rustige merkbeleving', 'Sterke mobiele ervaring'],
    problem: 'De uitstraling miste rust en een duidelijke inhoudelijke hiërarchie.',
    approach: 'Een compacte structuur waarin boodschap, ritme en beeld elkaar versterken.',
    execution: 'Een helder designsysteem met veel ruimte, scherpe typografie en gerichte interactie.',
    result: 'Een rustige website die het karakter van North professioneel en herkenbaar overbrengt.',
  },
  {
    slug: 'bloom-weddings', number: '03', label: 'WEBDESIGN & BRANDING', title: 'Bloom Weddings',
    description: 'Webdesign en branding · warme uitstraling · verfijnde mobiele ervaring',
    proof: ['Consistente uitstraling', 'Prettige gebruikersroute', 'Verfijnde mobiele ervaring'],
    problem: 'De sfeer en persoonlijke aanpak kwamen online onvoldoende tot hun recht.',
    approach: 'Beeld, typografie en informatie zijn opgebouwd als één rustige, uitnodigende ervaring.',
    execution: 'Een verfijnd ontwerp met duidelijke contactmomenten en aandacht voor elk schermformaat.',
    result: 'Een warme website die vertrouwen geeft en tegelijk praktisch en overzichtelijk blijft.',
  },
];

export const process = [
  { number: '01', label: 'STRATEGIE & RICHTING', title: 'Eerst begrijpen wat de website moet bereiken.', image: '/process/strategy.jpg' },
  { number: '02', label: 'ONTWERP & REALISATIE', title: 'Van richting naar een zorgvuldig ontworpen en gebouwde website.', image: '/process/design-build.jpg' },
  { number: '03', label: 'LIVE & VERDER', title: 'Na controle gaat de website live en verbeteren we waar nodig verder.', image: '/process/launch.jpg' },
];

export const values = [
  { number: '01', title: 'Aandacht', text: 'We nemen de tijd om je bedrijf en wensen goed te begrijpen voordat we keuzes maken.' },
  { number: '02', title: 'Vakmanschap', text: 'We besteden aandacht aan ontwerp, techniek en gebruiksgemak, zodat de website ook in de details goed in elkaar zit.' },
  { number: '03', title: 'Samenwerking', text: 'We leggen keuzes uit, luisteren naar feedback en stemmen belangrijke beslissingen samen af.' },
];

export const investmentSteps = [
  { number: '01', title: 'Bespreken', text: 'We bespreken je wensen, huidige situatie en wat de website moet gaan doen.' },
  { number: '02', title: 'Voorstel', text: 'Je ontvangt een duidelijk voorstel met de werkzaamheden, planning en investering.' },
  { number: '03', title: 'Start', text: 'Zijn we allebei tevreden met het plan? Dan gaan we aan de slag.' },
];

export const faqs = [
  { q: 'Hoe snel kan mijn website live staan?', a: 'Dat verschilt per project. Soms staat een website al binnen enkele dagen live, bij een uitgebreider project kan dat oplopen tot een week of langer. Na het eerste gesprek geven we een realistische inschatting.' },
  { q: 'Wat kost een website?', a: 'Elk project is anders, dus we kijken per project naar wat nodig is. Na het eerste gesprek ontvang je een duidelijke offerte met de kosten.' },
  { q: 'Werken jullie met vaste sjablonen of maatwerk?', a: 'We bouwen op maat. Ieder ontwerp wordt afgestemd op je bedrijf, niet op een standaardsjabloon.' },
  { q: 'Kan ik ook mijn bestaande website laten verbeteren?', a: 'Zeker. We kijken naar wat er al staat en verbeteren gericht wat nodig is, van redesign tot snelheid en vindbaarheid.' },
  { q: 'Hoe verloopt de samenwerking tijdens het project?', a: 'Je hebt rechtstreeks contact tijdens het hele traject. Belangrijke keuzes bespreken we samen, zodat je weet waar het project staat.' },
  { q: 'Wat heb ik nodig om te starten?', a: 'Een duidelijk beeld van je bedrijf en wensen is genoeg om te beginnen. De rest bespreken we samen in het eerste gesprek.' },
  { q: 'Blijven jullie ook na livegang beschikbaar?', a: 'Ja. Na de livegang blijft er ruimte voor onderhoud, kleine aanpassingen en gerichte optimalisatie.' },
];

export const CALENDLY_URL = 'https://calendly.com/trivarestudio/30min';
