import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

export interface Task {
  taskId: string;
  customerId: string;
  pickupLocation: {
    address: string;
    coordinates: [number, number];
  };
  deliveryLocation: {
    address: string;
    coordinates: [number, number];
  };
  status: 'pending' | 'assigned' | 'accepted' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  riderId?: string;
  riderName?: string;
  createdAt: string;
  scheduledFor?: string;
  estimatedDuration?: number;
}

interface TaskState {
  tasks: Task[];
  socket: Socket | null;
  isConnected: boolean;
  initializeSocket: () => void;
  disconnectSocket: () => void;
  assignTask: (taskId: string, riderId: string) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  socket: null,
  isConnected: false,

  initializeSocket: () => {
    const socket = io('http://localhost:3003', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Connected to task service');
      set({ isConnected: true });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from task service');
      set({ isConnected: false });
    });

    socket.on('task:created', (task: Task) => {
      set((state) => ({
        tasks: [...state.tasks, task],
      }));
    });

    socket.on('task:updated', (updatedTask: Task) => {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.taskId === updatedTask.taskId ? updatedTask : task
        ),
      }));
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  assignTask: (taskId: string, riderId: string) => {
    const { socket } = get();
    if (socket) {
      socket.emit('task:assign', { taskId, riderId });
    }
  },

  updateTaskStatus: (taskId: string, status: Task['status']) => {
    const { socket } = get();
    if (socket) {
      socket.emit('task:update', { taskId, status });
    }
  },
}));
