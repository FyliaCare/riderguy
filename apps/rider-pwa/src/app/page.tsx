import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect to dashboard or onboarding based on auth state
  // For now, redirect to dashboard
  redirect('/dashboard');
}
