import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Crea la instancia de Supabase de manera limpia para inyectar en Dokploy
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
