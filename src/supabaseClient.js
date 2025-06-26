import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://szanmebcgfxlgkhsmpkn.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YW5tZWJjZ2Z4bGdraHNtcGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4MzgwMzYsImV4cCI6MjA2NjQxNDAzNn0.OYg1GXRMo5q5U3abM2c18ITBoJ8Zvq0yZ0wFLvEqkdU'; // 👈 paste your anon public key
export const supabase = createClient(supabaseUrl, supabaseKey);
