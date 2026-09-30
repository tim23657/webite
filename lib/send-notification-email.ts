import { env } from 'cloudflare:workers';

type NotificationSubmission = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const NOTIFY_TO = 'contact@trivare.nl';

// Never throws — a failed notification email must not turn a successful,
// already-saved submission into an error response for the visitor.
export async function sendContactNotification(submission: NotificationSubmission) {
  try {
    const { RESEND_API_KEY, RESEND_FROM_EMAIL } = env as unknown as { RESEND_API_KEY?: string; RESEND_FROM_EMAIL?: string };
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set — skipping contact notification email.');
      return;
    }

    const subject = submission.service === 'Gratis ontwerp aanvraag'
      ? `Nieuwe aanvraag: gratis ontwerp — ${submission.company}`
      : `Nieuw contactformulier — ${submission.company}`;

    const text = [
      `Naam: ${submission.name}`,
      `Bedrijf: ${submission.company}`,
      `E-mail: ${submission.email}`,
      submission.phone ? `Telefoon: ${submission.phone}` : null,
      `Type: ${submission.service}`,
      '',
      submission.message,
    ].filter((line): line is string => line !== null).join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: RESEND_FROM_EMAIL || 'Trivare Website <onboarding@resend.dev>',
        to: [NOTIFY_TO],
        reply_to: submission.email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error('Resend notification email failed', response.status, await response.text().catch(() => ''));
    }
  } catch (error) {
    console.error('Resend notification email threw', error);
  }
}
