/**
 * Optionele WordPress REST-koppeling voor een latere headless migratie.
 * De huidige preview gebruikt lokale content en doet dus geen externe requests.
 */
export type WordPressPage = {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
};

export async function getWordPressPage(slug: string): Promise<WordPressPage | null> {
  const apiUrl = process.env.WORDPRESS_API_URL;

  if (!apiUrl) return null;

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/pages?slug=${encodeURIComponent(slug)}`, {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed with status ${response.status}`);
  }

  const pages = (await response.json()) as WordPressPage[];
  return pages[0] ?? null;
}
