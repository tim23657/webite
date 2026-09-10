'use client';

import { useEffect } from 'react';
import { TrivareSite } from './trivare-site';

const serviceCopy = [
  'Een professionele website die past bij je bedrijf en prettig werkt.',
  'Een frisse uitstraling en duidelijkere structuur voor je bestaande website.',
  'Gerichte verbeteringen in snelheid, gebruiksgemak, SEO en conversie.',
];

const capabilityCopy = [
  'Een sterke technische en inhoudelijke basis voor betere vindbaarheid.',
  'Gerichte verbeteringen die bezoekers makkelijker tot actie laten komen.',
  'Een visuele richting die herkenbaar bij je bedrijf past.',
  'Updates, technische aandacht en verbeteringen na livegang.',
  'Direct contact en samen belangrijke keuzes maken.',
  'Een duidelijke structuur waarin bezoekers makkelijk hun weg vinden.',
];

const valueCopy = [
  'We nemen de tijd om je bedrijf en wensen te begrijpen.',
  'Ontwerp en techniek worden tot in de details verzorgd.',
  'We bespreken keuzes en verwerken feedback tijdens het proces.',
];

function setText(selector: string, value: string) {
  const element = document.querySelector<HTMLElement>(selector);
  if (element && element.textContent !== value) element.textContent = value;
}

function setTexts(selector: string, values: string[]) {
  document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
    const value = values[index];
    if (value && element.textContent !== value) element.textContent = value;
  });
}

export function TrivarePolished() {
  useEffect(() => {
    let scheduled = false;

    const applyCopy = () => {
      scheduled = false;

      setText('.services .section-intro > div > p', 'Nieuwe website, redesign of optimalisatie. We kijken naar wat je nodig hebt en bouwen van daaruit verder.');
      setTexts('.service-row > p', serviceCopy);
      setTexts('.capability-grid article > p', capabilityCopy);

      setText('.work-intro > div > p', 'Websites met ieder een eigen uitstraling en aanpak.');
      setText('.light-intro > div > p', 'Een goede website ziet er sterk uit, werkt prettig en maakt direct duidelijk waar je bedrijf voor staat.');
      setText('.process-intro > p', 'We werken stap voor stap van eerste idee naar ontwerp, realisatie en livegang.');

      setText('.about-copy .about-intro', 'Trivare ontwerpt en bouwt professionele websites die passen bij het bedrijf erachter.');
      const aboutParagraphs = document.querySelectorAll<HTMLElement>('.about-copy > p:not(.section-label):not(.about-intro)');
      if (aboutParagraphs[0] && aboutParagraphs[0].textContent !== 'We bespreken belangrijke keuzes samen, leggen uit waarom we iets doen en nemen je feedback mee tijdens het hele traject.') {
        aboutParagraphs[0].textContent = 'We bespreken belangrijke keuzes samen, leggen uit waarom we iets doen en nemen je feedback mee tijdens het hele traject.';
      }
      if (aboutParagraphs[1]) aboutParagraphs[1].hidden = true;
      const aboutSmall = document.querySelector<HTMLElement>('.about-copy > small');
      if (aboutSmall) aboutSmall.hidden = true;

      setText('.personality-intro > p', 'Direct contact, korte lijnen en samen belangrijke keuzes maken.');
      setTexts('.values-grid article > p', valueCopy);

      setText('.investment-copy > p:not(.section-label)', 'We bespreken wat je nodig hebt. Daarna ontvang je een duidelijk voorstel voor de werkzaamheden, planning en investering.');
      const investmentSmall = document.querySelector<HTMLElement>('.investment-copy > small');
      if (investmentSmall) investmentSmall.hidden = true;

      setText('.contact-intro > p:not(.section-label)', 'Vertel waar je mee bezig bent. Dan kijken we samen wat er nodig is.');
    };

    const scheduleApply = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(applyCopy);
    };

    applyCopy();
    const observer = new MutationObserver(scheduleApply);
    observer.observe(document.body, { subtree: true, childList: true });

    const stopLogoEffects = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const logo = target?.closest('.official-logo, .footer-logo');
      if (!logo) return;
      event.preventDefault();
      event.stopPropagation();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.addEventListener('click', stopLogoEffects, true);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', stopLogoEffects, true);
    };
  }, []);

  return (
    <>
      <TrivareSite />
      <style jsx global>{`
        /* Keep the current Trivare identity, but remove noisy motion and decorative numbering. */
        .confetti-canvas,
        .logo-message,
        .hero-title-gold,
        .service-number,
        .capability-grid article > span:first-child,
        .values-grid article > span:first-child,
        .project-meta > span:last-child {
          display: none !important;
        }

        .hero-title,
        .hero-title * {
          animation: none !important;
        }

        .section,
        .approach-section,
        .contact-section,
        footer {
          --polish-pad: clamp(24px, 4.2vw, 72px);
        }

        .section-intro,
        .process-intro,
        .personality-intro {
          column-gap: clamp(36px, 6vw, 104px) !important;
          row-gap: clamp(28px, 4vw, 56px) !important;
        }

        .section-intro > div > p,
        .process-intro > p,
        .personality-intro > p,
        .about-copy > p,
        .investment-copy > p,
        .contact-intro > p {
          max-width: 58ch;
          line-height: 1.65 !important;
        }

        .services-heading,
        .work-heading,
        .investment-heading,
        .contact-heading,
        .personality-intro h2 {
          text-wrap: balance;
        }

        .service-row {
          grid-template-columns: minmax(190px, .85fr) minmax(0, 1.5fr) auto !important;
          gap: clamp(22px, 3vw, 52px) !important;
          align-items: center !important;
        }

        .service-row h3,
        .service-row p {
          min-width: 0;
        }

        .capability-grid,
        .values-grid,
        .project-grid {
          gap: clamp(28px, 3vw, 52px) !important;
        }

        .capability-grid article,
        .values-grid article {
          padding-top: clamp(24px, 2.5vw, 38px) !important;
          padding-bottom: clamp(28px, 3vw, 44px) !important;
        }

        .project-card {
          gap: 0 !important;
        }

        .project-meta {
          margin-top: 18px !important;
          margin-bottom: 10px !important;
        }

        .project-card strong {
          display: block;
          margin-bottom: 12px !important;
        }

        .project-description {
          max-width: 38ch;
          line-height: 1.6 !important;
        }

        .about-copy {
          padding-right: clamp(0px, 2vw, 34px);
        }

        .about-copy h2,
        .personality-intro h2 {
          line-height: .98 !important;
        }

        .personality-intro h2 {
          max-width: 15ch !important;
          font-size: clamp(48px, 5.2vw, 82px) !important;
        }

        .investment-heading {
          max-width: 12ch !important;
          line-height: .98 !important;
        }

        .contact-intro {
          padding-right: clamp(20px, 4vw, 68px) !important;
        }

        .contact-heading {
          max-width: 9ch !important;
          margin-bottom: clamp(28px, 3vw, 46px) !important;
          line-height: .94 !important;
          font-size: clamp(58px, 6.4vw, 104px) !important;
        }

        .calendar-link {
          margin-top: clamp(28px, 3vw, 44px) !important;
        }

        .mail-direct {
          margin-top: clamp(28px, 3vw, 44px) !important;
        }

        footer .footer-top {
          gap: clamp(44px, 6vw, 112px) !important;
          align-items: start !important;
        }

        footer .footer-top > div {
          min-width: 0;
        }

        footer .footer-top > div:last-child {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          gap: 12px !important;
        }

        footer .footer-top > div:last-child > h3 {
          margin-bottom: 10px !important;
        }

        .footer-instagram {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 9px !important;
          width: max-content !important;
          max-width: 100% !important;
          position: static !important;
          transform: none !important;
          margin: 2px 0 !important;
          white-space: nowrap;
        }

        .footer-instagram .instagram-mark {
          flex: 0 0 18px;
          width: 18px !important;
          height: 18px !important;
        }

        .footer-instagram > svg:last-child {
          flex: 0 0 14px;
          width: 14px !important;
          height: 14px !important;
        }

        .footer-bottom {
          gap: 24px !important;
        }

        @media (max-width: 1024px) {
          .service-row {
            grid-template-columns: minmax(150px, .75fr) minmax(0, 1.4fr) auto !important;
          }

          .personality-intro h2 {
            max-width: 17ch !important;
          }
        }

        @media (max-width: 780px) {
          .section-intro,
          .process-intro,
          .personality-intro {
            gap: 24px !important;
          }

          .service-row {
            grid-template-columns: 1fr auto !important;
            gap: 14px 20px !important;
          }

          .service-row h3 {
            grid-column: 1;
          }

          .service-row p {
            grid-column: 1 / -1;
          }

          .service-row > svg {
            grid-column: 2;
            grid-row: 1;
          }

          .contact-intro {
            padding-right: 0 !important;
          }

          .contact-heading {
            max-width: 10ch !important;
            margin-bottom: 26px !important;
            font-size: clamp(52px, 15vw, 78px) !important;
          }

          .personality-intro h2 {
            max-width: 15ch !important;
            font-size: clamp(44px, 12vw, 68px) !important;
          }

          footer .footer-top {
            gap: 40px !important;
          }

          .footer-instagram {
            white-space: normal;
          }
        }

        @media (max-width: 420px) {
          .contact-heading {
            font-size: clamp(48px, 14vw, 64px) !important;
          }

          .footer-bottom {
            gap: 14px !important;
          }
        }
      `}</style>
    </>
  );
}
