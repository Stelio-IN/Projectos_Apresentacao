import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vsextivqnidkfhapdcxe.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZXh0aXZxbmlka2ZoYXBkY3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzMTYyMzUsImV4cCI6MjA0MTg5MjIzNX0.YMJiAL3-SsLUvp6YsfMie48i_S3YzpuJsDW3chLWi5M';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
