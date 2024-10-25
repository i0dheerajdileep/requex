export function calculateBackoff(retries: number, backoffFactor: number, jitter = true): number {
    let delay = Math.pow(2, retries) * backoffFactor;
    if (jitter) delay += Math.random() * 100; // Adds jitter
    return delay;
  }
  