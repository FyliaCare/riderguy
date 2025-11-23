'use client';

import Link from 'next/link';
import { Bell, User } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-top">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary" />
          <span className="text-xl font-bold">RiderGuy</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/notifications"
            className="relative rounded-full p-2 hover:bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
          </Link>

          <Link
            href="/profile"
            className="rounded-full p-2 hover:bg-secondary"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
