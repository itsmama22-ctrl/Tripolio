import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

type ClientRole = "anon" | "service";

const cachedClients: Partial<Record<ClientRole, SupabaseClient>> = {};

function ensureEnv(url?: string | null, key?: string | null, role: ClientRole = "anon") {
  if (!url || !key) {
    throw new Error(`Supabase ${role} client missing configuration`);
  }
  return { url, key };
}

export function getSupabaseClient(role: ClientRole = "anon"): SupabaseClient | null {
  try {
    if (cachedClients[role]) {
      return cachedClients[role] ?? null;
    }

    if (role === "service") {
      const { url, key } = ensureEnv(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, "service");
      cachedClients[role] = createClient(url, key, {
        auth: {
          persistSession: false,
        },
      });
    } else {
      const { url, key } = ensureEnv(SUPABASE_URL, SUPABASE_ANON_KEY, "anon");
      cachedClients[role] = createClient(url, key, {
        auth: {
          persistSession: false,
        },
      });
    }

    return cachedClients[role] ?? null;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Supabase] Falling back to local data:", (error as Error).message);
    }
    return null;
  }
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

