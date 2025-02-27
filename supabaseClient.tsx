import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage'

const SUPABASE_URL = 'https://pppqpfgdchvrsbmuwcyf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcHFwZmdkY2h2cnNibXV3Y3lmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODA4NTEsImV4cCI6MjA1MTg1Njg1MX0.4YV6ChJtkZZkxAKxTznFcBbKCNqhXrI2eSYmqcIqWgU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY,{
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
      },}
);

export default supabase;