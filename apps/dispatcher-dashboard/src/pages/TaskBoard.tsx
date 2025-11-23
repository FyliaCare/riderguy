import { useState } from 'react';
import { useTaskStore, Task } from '../stores/task.store';
import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core';
import TaskColumn from '../components/TaskColumn';
import TaskCard from '../components/TaskCard';
import { Clock, AlertCircle } from 'lucide-react';

export default function TaskBoard() {
  const { tasks } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const columns = [
    { id: 'pending', title: 'Pending', status: 'pending' as const, color: 'bg-yellow-500' },
    { id: 'assigned', title: 'Assigned', status: 'assigned' as const, color: 'bg-blue-500' },
    { id: 'in_progress', title: 'In Progress', status: 'in_progress' as const, color: 'bg-purple-500' },
    { id: 'completed', title: 'Completed', status: 'completed' as const, color: 'bg-green-500' },
  ];

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter((task) => task.status === status);
  };

  const urgentTasks = tasks.filter((task) => task.priority === 'urgent').length;
  const pendingTasks = tasks.filter((task) => task.status === 'pending').length;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];

    // Update task status logic here
    console.log(`Moving task ${taskId} to ${newStatus}`);
    
    setActiveTask(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Task Board</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
              <Clock className="text-primary-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Tasks</p>
                <p className="text-2xl font-bold">{pendingTasks}</p>
              </div>
              <AlertCircle className="text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent Tasks</p>
                <p className="text-2xl font-bold">{urgentTasks}</p>
              </div>
              <AlertCircle className="text-red-600" size={32} />
            </div>
          </div>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => (
            <TaskColumn
              key={column.id}
              id={column.id}
              title={column.title}
              color={column.color}
              tasks={getTasksByStatus(column.status)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
