'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';

export function ServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const wb = new Workbox('/sw.js');

      wb.addEventListener('waiting', () => {
        setShowUpdatePrompt(true);
        setWaitingWorker(wb.getSW() as unknown as ServiceWorker);
      });

      wb.addEventListener('controlling', () => {
        window.location.reload();
      });

      wb.register();
    }
  }, []);

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
      setShowUpdatePrompt(false);
    }
  };

  return (
    <>
      {children}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-4 right-4 z-50 rounded-lg bg-primary p-4 text-primary-foreground shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Update Available</p>
              <p className="text-sm opacity-90">A new version of RiderGuy is ready to install.</p>
            </div>
            <button
              onClick={handleUpdate}
              className="ml-4 rounded bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-gray-100"
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
}
