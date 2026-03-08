
-- 1. compliance_scores: Remove INSERT and UPDATE for authenticated users (edge function only)
DROP POLICY IF EXISTS "Users can insert own scores" ON public.compliance_scores;
DROP POLICY IF EXISTS "Users can update own scores" ON public.compliance_scores;

-- 2. user_stats: Remove INSERT and UPDATE for authenticated users (edge function only)
DROP POLICY IF EXISTS "Users can insert own stats" ON public.user_stats;
DROP POLICY IF EXISTS "Users can update own stats" ON public.user_stats;

-- 3. profiles: Remove INSERT for authenticated users (handle_new_user trigger uses SECURITY DEFINER)
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
