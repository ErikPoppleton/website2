import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Drafts stay visible under `astro dev` so they can be previewed, and are
 * excluded from production builds — including their own URL, not just the
 * blog index.
 */
export function isVisible(post: CollectionEntry<'blog'>): boolean {
  return import.meta.env.PROD ? !post.data.draft : true;
}

/** Visible posts, newest first. */
export async function getVisiblePosts(): Promise<CollectionEntry<'blog'>[]> {
  const posts = await getCollection('blog', isVisible);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
