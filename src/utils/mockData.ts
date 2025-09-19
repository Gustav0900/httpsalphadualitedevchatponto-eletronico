import { faker } from '@faker-js/faker';
import { User, TimeRecord, Institution, WorkSchedule } from '../types';

// Gerar dados mock para demonstração
export const generateMockUsers = (count: number = 10): User[] => {
  const roles: Array<'admin' | 'director' | 'teacher' | 'employee' | 'manager'> = 
    ['admin', 'director', 'teacher', 'employee', 'manager'];
  
  const departments = ['Administração', 'Pedagogia', 'Tecnologia', 'Recursos Humanos', 'Limpeza', 'Segurança'];
  
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    role: faker.helpers.arrayElement(roles),
    department: faker.helpers.arrayElement(departments),
    institution: 'Escola Municipal Dom Pedro II',
    avatar: faker.image.avatar(),
    isActive: faker.datatype.boolean(0.9),
    createdAt: faker.date.past()
  }));
};

export const generateMockTimeRecords = (userId: string, days: number = 30): TimeRecord[] => {
  const records: TimeRecord[] = [];
  const methods: Array<'web' | 'mobile' | 'biometric' | 'qr_code'> = ['web', 'mobile', 'biometric', 'qr_code'];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Check-in (entrada)
    const checkIn = new Date(date);
    checkIn.setHours(8, faker.number.int({ min: 0, max: 30 }), 0, 0);
    
    records.push({
      id: faker.string.uuid(),
      userId,
      type: 'check_in',
      timestamp: checkIn,
      location: {
        latitude: -23.550520 + faker.number.float({ min: -0.01, max: 0.01 }),
        longitude: -46.633309 + faker.number.float({ min: -0.01, max: 0.01 }),
        address: 'Rua das Flores, 123 - Centro'
      },
      ipAddress: faker.internet.ip(),
      method: faker.helpers.arrayElement(methods)
    });
    
    // Break start (início do intervalo)
    const breakStart = new Date(checkIn);
    breakStart.setHours(12, 0, 0, 0);
    
    records.push({
      id: faker.string.uuid(),
      userId,
      type: 'break_start',
      timestamp: breakStart,
      method: faker.helpers.arrayElement(methods)
    });
    
    // Break end (fim do intervalo)
    const breakEnd = new Date(breakStart);
    breakEnd.setHours(13, 0, 0, 0);
    
    records.push({
      id: faker.string.uuid(),
      userId,
      type: 'break_end',
      timestamp: breakEnd,
      method: faker.helpers.arrayElement(methods)
    });
    
    // Check-out (saída)
    const checkOut = new Date(checkIn);
    checkOut.setHours(17, faker.number.int({ min: 0, max: 60 }), 0, 0);
    
    records.push({
      id: faker.string.uuid(),
      userId,
      type: 'check_out',
      timestamp: checkOut,
      location: {
        latitude: -23.550520 + faker.number.float({ min: -0.01, max: 0.01 }),
        longitude: -46.633309 + faker.number.float({ min: -0.01, max: 0.01 }),
        address: 'Rua das Flores, 123 - Centro'
      },
      ipAddress: faker.internet.ip(),
      method: faker.helpers.arrayElement(methods)
    });
  }
  
  return records.reverse();
};

export const mockInstitutions: Institution[] = [
  {
    id: '1',
    name: 'Escola Municipal Dom Pedro II',
    type: 'public_school',
    address: 'Rua das Flores, 123 - Centro, São Paulo - SP',
    allowedLocations: [
      {
        latitude: -23.550520,
        longitude: -46.633309,
        radius: 100
      }
    ],
    workSchedules: [
      {
        id: '1',
        name: 'Horário Padrão',
        startTime: '08:00',
        endTime: '17:00',
        breakDuration: 60,
        daysOfWeek: [1, 2, 3, 4, 5],
        tolerance: 15
      }
    ]
  }
];
