# WordPress-ready opzet

De huidige Trivare-site is een snelle, zelfstandige one-page site. De code is bewust semantisch opgebouwd: iedere sectie heeft een eigen id en de inhoud staat los van de visuele stijl. Daardoor kan de site later op twee manieren aan WordPress worden gekoppeld.

## Aanbevolen: WordPress als headless CMS

1. Beheer pagina-inhoud, cases en SEO-velden in WordPress.
2. Vul `WORDPRESS_API_URL` in met de REST API van de WordPress-installatie.
3. Gebruik `lib/wordpress.ts` om pagina’s op slug op te halen.
4. Vervang de huidige lokale teksten stapsgewijs door WordPress-data.
5. Houd deze front-end apart voor maximale snelheid en ontwerpvrijheid.

## Alternatief: volledig hosten als WordPress-theme

De secties in `app/page.tsx` kunnen één-op-één worden vertaald naar Gutenberg blocks of ACF Flexible Content. De CSS uit `app/globals.css` kan grotendeels rechtstreeks mee naar een custom theme. Voor livegang moeten contactgegevens, het formulier, de cookiebanner en analytics nog met de gekozen WordPress-plugins worden gekoppeld.

## Secties

- `#top`: hero en primaire positionering
- `#diensten`: dienstenoverzicht
- `#werkwijze`: proces
- `#over`: regionale positionering en voordelen
- `#contact`: contact-call-to-action
