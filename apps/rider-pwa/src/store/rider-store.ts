import { create } from 'zustand';

interface RiderState {
  rider: {
    id: string;
    name: string;
    email: string;
    phone: string;
    isAvailable: boolean;
    level: number;
    xp: number;
    rating: number;
    todayEarnings: number;
    tasksCompletedToday: number;
    streak: number;
  } | null;
  fetchRiderProfile: () => Promise<void>;
  updateAvailability: (isAvailable: boolean) => Promise<void>;
}

export const useRiderStore = create<RiderState>((set) => ({
  rider: null,
  
  fetchRiderProfile: async () => {
    try {
      // Mock data - replace with actual API call
      const mockRider = {
        id: '1',
        name: 'John Rider',
        email: 'john@example.com',
        phone: '+1234567890',
        isAvailable: false,
        level: 5,
        xp: 1250,
        rating: 4.8,
        todayEarnings: 85.50,
        tasksCompletedToday: 12,
        streak: 7,
      };
      
      set({ rider: mockRider });
    } catch (error) {
      console.error('Failed to fetch rider profile:', error);
    }
  },
  
  updateAvailability: async (isAvailable: boolean) => {
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      set((state) => ({
        rider: state.rider ? { ...state.rider, isAvailable } : null,
      }));
    } catch (error) {
      console.error('Failed to update availability:', error);
    }
  },
}));
