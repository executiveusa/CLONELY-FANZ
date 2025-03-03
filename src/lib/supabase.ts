import { createClient } from "@supabase/supabase-js";

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client for development
const mockClient = {
  auth: {
    signInWithPassword: async () => ({ data: null, error: null }),
    signInWithOAuth: async () => ({ data: null, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
    getSession: () => null,
  },
  from: () => ({
    insert: () => ({
      select: () => ({ single: () => ({ data: null, error: null }) }),
    }),
    update: () => ({
      eq: () => ({
        select: () => ({ single: () => ({ data: null, error: null }) }),
      }),
    }),
    delete: () => ({ eq: () => ({ error: null }) }),
    select: () => ({ eq: () => ({ data: null, error: null }) }),
  }),
  storage: {
    from: () => ({
      upload: async () => ({ data: { path: "" }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: "" } }),
    }),
  },
};

// Use mock client if no valid credentials, otherwise create real client
export const supabase =
  !supabaseUrl || !supabaseAnonKey || supabaseUrl === "your-supabase-url"
    ? mockClient
    : createClient(supabaseUrl, supabaseAnonKey);
