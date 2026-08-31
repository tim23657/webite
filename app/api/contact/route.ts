import { saveContactSubmission } from '@/lib/contact-db';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const services = new Set(['Nieuwe website', 'Redesign', 'Optimalisatie', 'Anders']);
const textValue = (value: unknown) => typeof value === 'string' ? value : '';

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const submission = {
      name: textValue(body.name).trim().slice(0, 120),
      company: textValue(body.company).trim().slice(0, 160),
      email: textValue(body.email).trim().toLowerCase().slice(0, 200),
      phone: textValue(body.phone).trim().slice(0, 80),
      service: textValue(body.service).trim(),
      message: textValue(body.message).trim().slice(0, 5000),
    };

    if (!submission.name || !submission.company || !emailPattern.test(submission.email) || !services.has(submission.service) || submission.message.length < 10) {
      return Response.json({ ok: false, message: 'Controleer de gemarkeerde velden.' }, { status: 400 });
    }
    await saveContactSubmission(submission);
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact submission failed', error);
    return Response.json({ ok: false, message: 'Versturen lukt nu niet. Mail ons via contact@trivare.nl.' }, { status: 500 });
  }
}

