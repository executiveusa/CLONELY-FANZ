type EventName =
  | "avatar_created"
  | "avatar_deleted"
  | "subscription_changed"
  | "auth_success";

interface EventProperties {
  [key: string]: string | number | boolean;
}

export function trackEvent(name: EventName, properties?: EventProperties) {
  // Initialize with your preferred analytics provider
  console.log(`[Analytics] ${name}:`, properties);
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  console.log(`[Analytics] Identify user:`, { userId, traits });
}
