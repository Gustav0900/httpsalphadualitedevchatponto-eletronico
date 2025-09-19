export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'director' | 'teacher' | 'employee' | 'manager';
  department: string;
  institution: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface TimeRecord {
  id: string;
  userId: string;
  type: 'check_in' | 'check_out' | 'break_start' | 'break_end';
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  ipAddress?: string;
  method: 'web' | 'mobile' | 'biometric' | 'qr_code';
  photo?: string;
  notes?: string;
}

export interface Institution {
  id: string;
  name: string;
  type: 'public_school' | 'private_school' | 'company' | 'hospital' | 'other';
  address: string;
  allowedLocations: {
    latitude: number;
    longitude: number;
    radius: number;
  }[];
  workSchedules: WorkSchedule[];
}

export interface WorkSchedule {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  daysOfWeek: number[];
  tolerance: number; // minutos de tolerância
}

export interface Report {
  userId: string;
  period: {
    start: Date;
    end: Date;
  };
  totalHours: number;
  expectedHours: number;
  overtimeHours: number;
  lateArrivals: number;
  earlyDepartures: number;
  absences: number;
  records: TimeRecord[];
}
