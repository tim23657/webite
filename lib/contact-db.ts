import { env } from 'cloudflare:workers';
import { createContactSubmissionsTable } from '@/db/schema';

type ContactSubmission = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

function getDb() {
  return (env as unknown as { DB?: D1Database }).DB;
}

export async function saveContactSubmission(submission: ContactSubmission) {
  const db = getDb();
  if (!db) throw new Error('Contact storage is not configured.');
  await db.prepare(createContactSubmissionsTable).run();
  await db.prepare(
    `INSERT INTO contact_submissions (name, company, email, phone, service, message)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).bind(submission.name, submission.company, submission.email, submission.phone || null, submission.service, submission.message).run();
}

