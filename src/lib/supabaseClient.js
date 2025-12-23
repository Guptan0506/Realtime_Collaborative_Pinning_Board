import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// This 'export' is what makes it available to other files
export const supabase = createClient(supabaseUrl, supabaseAnonKey)