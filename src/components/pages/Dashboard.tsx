import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Timer,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Dados mockados para os gráficos
  const weeklyData = [
    { day: 'Seg', hours: 8.2 },
    { day: 'Ter', hours: 8.5 },
    { day: 'Qua', hours: 7.8 },
    { day: 'Qui', hours: 8.1 },
    { day: 'Sex', hours: 8.0 },
    { day: 'Sáb', hours: 4.0 },
    { day: 'Dom', hours: 0 },
  ];

  const monthlyData = [
    { month: 'Jan', attendance: 95 },
    { month: 'Fev', attendance: 92 },
    { month: 'Mar', attendance: 97 },
    { month: 'Abr', attendance: 94 },
    { month: 'Mai', attendance: 98 },
    { month: 'Jun', attendance: 96 },
  ];

  const stats = [
    {
      title: 'Funcionários Presentes',
      value: '148',
      total: '162',
      icon: Users,
      color: 'bg-green-500',
      change: '+2.5%'
    },
    {
      title: 'Taxa de Presença',
      value: '94.2%',
      icon: TrendingUp,
      color: 'bg-blue-500',
      change: '+1.2%'
    },
    {
      title: 'Horas Extras',
      value: '23.5h',
      icon: Timer,
      color: 'bg-orange-500',
      change: '-5.3%'
    },
    {
      title: 'Atrasos Hoje',
      value: '7',
      icon: AlertTriangle,
      color: 'bg-red-500',
      change: '+1'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Maria Silva',
      action: 'Entrada registrada',
      time: '08:15',
      location: 'Portaria Principal',
      status: 'success'
    },
    {
      id: 2,
      user: 'João Santos',
      action: 'Saída para almoço',
      time: '12:00',
      location: 'Sala dos Professores',
      status: 'info'
    },
    {
      id: 3,
      user: 'Ana Costa',
      action: 'Atraso registrado',
      time: '08:32',
      location: 'Entrada Lateral',
      status: 'warning'
    },
    {
      id: 4,
      user: 'Pedro Lima',
      action: 'Saída registrada',
      time: '17:05',
      location: 'Portaria Principal',
      status: 'success'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Bem-vindo, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">
            Aqui está o resumo das atividades de hoje
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('pt-BR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      {stat.total && (
                        <span className="text-sm text-gray-500">
                          de {stat.total}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                        stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Hours Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Horas Trabalhadas (Semana)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3B82F6" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        {/* Monthly Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Taxa de Presença (Mensal)
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Atividades Recentes
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  activity.status === 'info' ? 'bg-blue-500' : 'bg-red-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.user}
                  </p>
                  <p className="text-sm text-gray-600">
                    {activity.action}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4" />
                  <span>{activity.location}</span>
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
