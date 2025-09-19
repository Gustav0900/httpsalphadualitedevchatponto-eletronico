import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  BarChart3, 
  Settings, 
  Building, 
  Calendar,
  Shield,
  LogOut,
  Home,
  QrCode
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'timesheet', label: 'Ponto Eletrônico', icon: Clock },
    { id: 'employees', label: 'Funcionários', icon: Users },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 },
    { id: 'schedule', label: 'Horários', icon: Calendar },
    { id: 'qr-generator', label: 'QR Code', icon: QrCode },
    { id: 'institutions', label: 'Instituições', icon: Building },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  // Filtrar itens baseado no papel do usuário
  const filteredItems = menuItems.filter(item => {
    if (user?.role === 'employee') {
      return ['dashboard', 'timesheet'].includes(item.id);
    }
    return true;
  });

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">PontoDigital</h1>
            <p className="text-xs text-gray-500">Sistema Inteligente</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role === 'admin' ? 'Administrador' : 
               user?.role === 'teacher' ? 'Professor' : 
               user?.role === 'employee' ? 'Funcionário' : user?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-1">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(item.id)}
              className={`
                w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sair</span>
        </motion.button>
      </div>
    </div>
  );
};
