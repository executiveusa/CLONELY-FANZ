import { supabase } from "./supabase";
import { AvatarCreateRequest } from "@/types/api";

export const apiClient = {
  async createAvatar(data: AvatarCreateRequest) {
    const { data: avatar, error } = await supabase
      .from("avatars")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return avatar;
  },

  async updateAvatar(id: string, data: Partial<AvatarCreateRequest>) {
    const { data: avatar, error } = await supabase
      .from("avatars")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return avatar;
  },

  async deleteAvatar(id: string) {
    const { error } = await supabase.from("avatars").delete().eq("id", id);
    if (error) throw error;
    return { message: "Avatar deleted successfully" };
  },

  async uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) throw error;
    return supabase.storage.from("avatars").getPublicUrl(data.path).data
      .publicUrl;
  },

  async getUserAvatars(userId: string) {
    const { data: avatars, error } = await supabase
      .from("avatars")
      .select("*")
      .eq("user_id", userId);

    if (error) throw error;
    return avatars;
  },
};
