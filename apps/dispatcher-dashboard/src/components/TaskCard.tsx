import { useDraggable } from '@dnd-kit/core';
import { Task } from '../stores/task.store';
import { MapPin, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.taskId,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const priorityColors = {
    low: 'bg-gray-100 text-gray-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-orange-100 text-orange-700',
    urgent: 'bg-red-100 text-red-700',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            priorityColors[task.priority]
          }`}
        >
          {task.priority.toUpperCase()}
        </span>
        <span className="text-xs text-gray-500">
          {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <MapPin size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="text-gray-900 font-medium truncate">
              {task.pickupLocation.address}
            </p>
            <p className="text-gray-500 text-xs truncate">
              → {task.deliveryLocation.address}
            </p>
          </div>
        </div>

        {task.riderName && (
          <div className="flex items-center gap-2">
            <User size={14} className="text-gray-400" />
            <p className="text-sm text-gray-600">{task.riderName}</p>
          </div>
        )}

        {task.estimatedDuration && (
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <p className="text-sm text-gray-600">{task.estimatedDuration} min</p>
          </div>
        )}
      </div>
    </div>
  );
}
