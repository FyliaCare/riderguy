import { useDroppable } from '@dnd-kit/core';
import { Task } from '../stores/task.store';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  color: string;
  tasks: Task[];
}

export default function TaskColumn({ id, title, color, tasks }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-50 rounded-lg p-4 min-h-[500px] transition-colors ${
        isOver ? 'bg-primary-50 ring-2 ring-primary-400' : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="ml-auto bg-gray-200 px-2 py-1 rounded-full text-xs font-medium">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.taskId} task={task} />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          <p className="text-sm">No tasks</p>
        </div>
      )}
    </div>
  );
}
