
-- Drop all existing RLS policies on login_attempts
DROP POLICY IF EXISTS "Anyone can read login attempts" ON public.login_attempts;
DROP POLICY IF EXISTS "Anyone can insert login attempts" ON public.login_attempts;
DROP POLICY IF EXISTS "Anyone can update login attempts" ON public.login_attempts;

-- Ensure RLS is enabled (blocks all access since no policies remain)
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;
