export interface AvatarCreateRequest {
  name: string;
  description: string;
  niche: string;
  nsfw: boolean;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
