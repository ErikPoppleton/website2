/**
 * Helpers for the build-time feed fetches in BlueskyFeed / PodcastFeed.
 *
 * These run during `astro build`, so an unhandled throw takes down the whole
 * deploy — including pages unrelated to the feed. Everything here returns
 * null on failure and logs a warning instead, so a flaky upstream degrades
 * one card rather than the site.
 */

const TIMEOUT_MS = 10_000;

function warn(message: string): void {
  console.warn(`[feed] ${message}`);
}

async function request(url: string, label: string): Promise<Response | null> {
  try {
    // Guard against a hung connection stalling CI until the job times out.
    const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!res.ok) {
      warn(`${label}: HTTP ${res.status} ${res.statusText} from ${url}`);
      return null;
    }
    return res;
  } catch (err) {
    warn(`${label}: ${err instanceof Error ? err.message : String(err)} (${url})`);
    return null;
  }
}

export async function fetchJson<T>(url: string, label: string): Promise<T | null> {
  const res = await request(url, label);
  if (!res) return null;
  try {
    return (await res.json()) as T;
  } catch (err) {
    warn(`${label}: invalid JSON from ${url}`);
    return null;
  }
}

export async function fetchText(url: string, label: string): Promise<string | null> {
  const res = await request(url, label);
  if (!res) return null;
  try {
    return await res.text();
  } catch (err) {
    warn(`${label}: could not read body from ${url}`);
    return null;
  }
}
