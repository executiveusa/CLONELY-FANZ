interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export class RateLimiter {
  private requests: { [key: string]: number[] } = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  canMakeRequest(userId: string): boolean {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Initialize or clean old requests
    this.requests[userId] = (this.requests[userId] || []).filter(
      (time) => time > windowStart,
    );

    if (this.requests[userId].length >= this.config.maxRequests) {
      return false;
    }

    this.requests[userId].push(now);
    return true;
  }
}

export const avatarGenerationLimiter = new RateLimiter({
  maxRequests: 10,
  windowMs: 60 * 60 * 1000, // 1 hour
});
