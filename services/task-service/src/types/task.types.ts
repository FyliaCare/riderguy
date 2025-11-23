export interface Task {
  id: string;
  taskId?: string;
  task_id?: string;
  type: 'delivery' | 'pickup' | 'service';
  clientId: string;
  client_id?: string;
  riderId?: string;
  rider_id?: string;
  pickupLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  pickup_location?: any;
  deliveryLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  delivery_location?: any;
  packageDetails?: {
    description: string;
    weight?: number;
    dimensions?: { length: number; width: number; height: number };
  };
  package_details?: any;
  scheduledPickupTime?: Date;
  scheduled_pickup_time?: Date;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  slaTime?: Date;
  sla_time?: Date;
  metadata?: Record<string, any>;
  createdAt?: Date;
  created_at?: Date;
  updatedAt?: Date;
  updated_at?: Date;
}

export interface TaskCreateData {
  type: 'delivery' | 'pickup' | 'service';
  clientId: string;
  pickupLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  deliveryLocation: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  packageDetails?: {
    description: string;
    weight?: number;
    dimensions?: { length: number; width: number; height: number };
  };
  scheduledPickupTime?: Date;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  metadata?: Record<string, any>;
}

export interface TaskFilters {
  status?: string;
  riderId?: string;
  priority?: string;
  dateFrom?: string;
  dateTo?: string;
}
