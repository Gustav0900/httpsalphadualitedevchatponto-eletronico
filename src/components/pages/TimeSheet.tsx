import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Clock, 
  MapPin, 
  Smartphone, 
  Coffee, 
  CheckCircle,
  Calendar,
  Timer,
  User
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useGeolocation } from '../../hooks/useGeolocation';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const TimeSheet: React.FC = () => {
  const { user } = useAuth();
  const { getCurrentLocation, loading: locationLoading } = useGeolocation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastRecord, setLastRecord] = useState<'check_out' | 'break_end'>('check_out');
  const [todayRecords] = useState([
    { type: 'check_in', time: '08:15', location: 'Aprovada' },
    { type: 'break_start', time: '12:00', location: 'Aprovada' },
    { type: 'break_end', time: '13:00', location: 'Aprovada' },
  ]);

  // Atualizar relógio em tempo real
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimeRecord = async (type: 'check_in' | 'check_out' | 'break_start' | 'break_end') => {
    try {
      const location = await getCurrentLocation();
      
      // Simular registro do ponto
      console.log('Registrando ponto:', {
        type,
        timestamp: new Date(),
        location,
        userId: user?.id
      });

      setLastRecord(type === 'check_in' ? 'check_out' : 
                   type === 'break_start' ? 'break_end' : 
                   type === 'break_end' ? 'check_out' : 'check_out');

      // Feedback visual de sucesso
      alert(`Ponto registrado com sucesso!\nTipo: ${
        type === 'check_in' ? 'Entrada' :
        type === 'check_out' ? 'Saída' :
        type === 'break_start' ? 'Início do Intervalo' : 'Fim do Intervalo'
      }\nHorário: ${format(new Date(), 'HH:mm:ss')}`);
    } catch (error) {
      alert('Erro ao obter localização. Verifique as permissões do navegador.');
    }
  };

  const getNextAction = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 8) return { action: 'check_in', label: 'Registrar Entrada', icon: Clock, color: 'bg-green-500' };
    if (hour >= 8 && hour < 12) return { action: 'break_start', label: 'Iniciar Intervalo', icon: Coffee, color: 'bg-orange-500' };
    if (hour >= 12 && hour < 13) return { action: 'break_end', label: 'Finalizar Intervalo', icon: CheckCircle, color: 'bg-blue-500' };
    return { action: 'check_out', label: 'Registrar Saída', icon: Clock, color: 'bg-red-500' };
  };

  const nextAction = getNextAction();
  const NextIcon = nextAction.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ponto Eletrônico</h1>
          <p className="text-gray-600">Registre sua jornada de trabalho</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">
            {format(currentTime, 'HH:mm:ss')}
          </p>
          <p className="text-sm text-gray-600">
            {format(currentTime, "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="text-center py-8">
              <div className={`w-20 h-20 ${nextAction.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <NextIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {nextAction.label}
              </h2>
              <p className="text-gray-600 mb-6">
                Clique no botão abaixo para registrar seu ponto
              </p>
              
              <Button
                size="lg"
                onClick={() => handleTimeRecord(nextAction.action as any)}
                loading={locationLoading}
                className="px-8 py-4 text-lg"
              >
                <NextIcon className="w-5 h-5 mr-2" />
                {nextAction.label}
              </Button>

              <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Localização verificada</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Smartphone className="w-4 h-4" />
                  <span>Dispositivo autorizado</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="text-center">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'}
                alt={user?.name}
                className="w-16 h-16 rounded-full mx-auto mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-500">{user?.department}</p>
              
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Horas hoje:</span>
                  <span className="font-semibold">7h 15m</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-600">Entrada:</span>
                  <span className="font-semibold">08:15</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { action: 'check_in', label: 'Entrada', icon: Clock, color: 'bg-green-500' },
              { action: 'break_start', label: 'Início Intervalo', icon: Coffee, color: 'bg-orange-500' },
              { action: 'break_end', label: 'Fim Intervalo', icon: CheckCircle, color: 'bg-blue-500' },
              { action: 'check_out', label: 'Saída', icon: Timer, color: 'bg-red-500' },
            ].map((item) => {
              const ItemIcon = item.icon;
              return (
                <motion.button
                  key={item.action}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTimeRecord(item.action as any)}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <ItemIcon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                </motion.button>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Today's Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Registros de Hoje</h3>
          <div className="space-y-3">
            {todayRecords.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {record.type === 'check_in' ? 'Entrada' :
                       record.type === 'check_out' ? 'Saída' :
                       record.type === 'break_start' ? 'Início do Intervalo' : 'Fim do Intervalo'}
                    </p>
                    <p className="text-xs text-gray-500">Localização {record.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{record.time}</p>
                  <p className="text-xs text-gray-500">Web</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
