import { calculateBackoff } from "./backoff";

export async function retryRequest(
  fn: () => Promise<any>,
  retries: number,
  backoffFactor: number
): Promise<any> {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, calculateBackoff(attempt, backoffFactor)));
    }
  }
}
