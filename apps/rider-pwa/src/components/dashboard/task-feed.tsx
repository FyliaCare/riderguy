'use client';

import { useQuery } from '@tanstack/react-query';
import { MapPin, DollarSign, Clock } from 'lucide-react';
import Link from 'next/link';

// Mock task data - replace with actual API call
const fetchTasks = async () => {
  return [
    {
      id: '1',
      pickup: '123 Main St',
      dropoff: '456 Oak Ave',
      distance: '2.5 km',
      earnings: 12.50,
      estimatedTime: '25 min',
      priority: 'high',
    },
    {
      id: '2',
      pickup: '789 Elm Rd',
      dropoff: '321 Pine Dr',
      distance: '1.8 km',
      earnings: 9.75,
      estimatedTime: '18 min',
      priority: 'normal',
    },
  ];
};

export function TaskFeed() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['available-tasks'],
    queryFn: fetchTasks,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  if (isLoading) {
    return (
      <div>
        <h2 className="mb-3 text-lg font-semibold">Available Tasks</h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-lg bg-secondary"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div>
        <h2 className="mb-3 text-lg font-semibold">Available Tasks</h2>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            No tasks available right now
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Check back soon or adjust your availability
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold">Available Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}`}
            className="block rounded-lg border bg-card p-4 transition-all hover:bg-secondary"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="font-medium">Pickup</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {task.pickup}
                </p>
              </div>
              {task.priority === 'high' && (
                <span className="rounded-full bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive">
                  Urgent
                </span>
              )}
            </div>

            <div className="mb-3 flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-destructive" />
              <span className="font-medium">Dropoff</span>
            </div>
            <p className="text-sm text-muted-foreground">{task.dropoff}</p>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {task.distance}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {task.estimatedTime}
                </div>
              </div>
              <div className="flex items-center gap-1 text-lg font-bold text-success">
                <DollarSign className="h-4 w-4" />
                {task.earnings.toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
