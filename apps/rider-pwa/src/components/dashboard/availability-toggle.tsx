'use client';

import { useState } from 'react';
import { Power } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRiderStore } from '@/store/rider-store';

export function AvailabilityToggle() {
  const { rider, updateAvailability } = useRiderStore();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      await updateAvailability(!rider?.isAvailable);
    } finally {
      setLoading(false);
    }
  };

  const isAvailable = rider?.isAvailable || false;

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={cn(
        'flex items-center gap-2 rounded-full px-4 py-2 font-semibold transition-all',
        isAvailable
          ? 'bg-success text-white hover:bg-success/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        loading && 'opacity-50 cursor-not-allowed'
      )}
    >
      <Power className="h-4 w-4" />
      {loading ? 'Updating...' : isAvailable ? 'Available' : 'Offline'}
    </button>
  );
}
