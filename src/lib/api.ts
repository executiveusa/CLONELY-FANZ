import { supabase } from "./supabase";

export interface Avatar {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  niche: string;
  isNsfw: boolean;
  redditAutomation?: boolean;
  subscriberCount?: number;
  messageCount?: number;
  likeCount?: number;
  userId?: string;
  createdAt?: string;
}

export async function createAvatar(
  avatar: Omit<Avatar, "id">,
): Promise<Avatar> {
  const { data, error } = await supabase
    .from("avatars")
    .insert([avatar])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getAvatars(): Promise<Avatar[]> {
  const { data, error } = await supabase
    .from("avatars")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getUserAvatars(userId: string): Promise<Avatar[]> {
  const { data, error } = await supabase
    .from("avatars")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateAvatar(
  id: string,
  updates: Partial<Avatar>,
): Promise<Avatar> {
  const { data, error } = await supabase
    .from("avatars")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAvatar(id: string): Promise<void> {
  const { error } = await supabase.from("avatars").delete().eq("id", id);

  if (error) throw error;
}
