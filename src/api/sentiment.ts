// src/api/sentiment.ts

/**
 * Send journal text to your backend for emotion scoring.
 */
export async function analyzeEmotions(text: string): Promise<Record<string, number>> {
  const res = await fetch('http://localhost:3001/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    // Try to pull out a JSON error, otherwise use status text
    const err = await res.json().catch(() => null);
    throw new Error(err?.error || res.statusText);
  }

  // The backend now returns the raw scores object directly
  const scores = await res.json() as Record<string, number>;

  // Basic sanity check
  if (
    typeof scores !== 'object' ||
    !['joy','sadness','anger','fear','surprise','neutral'].every(k => k in scores)
  ) {
    console.error('Unexpected payload from /analyze:', scores);
    throw new Error('Invalid response format from server');
  }

  return scores;
}

const MAX_FLOWERS = 10;

export function mapScoresToFlowers(
  scores: Record<string, number>,
  maxFlowers = MAX_FLOWERS
): Record<string, number> {
  const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  const counts: Record<string, number> = {};
  for (const [emotion, score] of Object.entries(scores)) {
    counts[emotion] = Math.round((score / total) * maxFlowers);
  }
  return counts;
}
