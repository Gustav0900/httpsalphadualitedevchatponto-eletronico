import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Clock, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

interface LoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Clock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900">PontoDigital</h1>
          <p className="text-gray-600 mt-2">Sistema Inteligente de Ponto Eletrônico</p>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta!</h2>
            <p className="text-gray-600 mt-1">Faça login para acessar sua conta</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              icon={<Mail className="w-5 h-5 text-gray-400" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                placeholder="Sua senha"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Entrar
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-900 mb-2">🚀 Teste a plataforma:</h3>
            <div className="text-sm text-blue-800">
              <p><strong>Admin:</strong> admin@escola.com</p>
              <p><strong>Funcionário:</strong> funcionario@escola.com</p>
              <p><strong>Senha:</strong> 123456</p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-3">Recursos da plataforma:</p>
            <div className="flex justify-center space-x-6 text-xs text-gray-600">
              <span>✓ Geolocalização</span>
              <span>✓ Biometria</span>
              <span>✓ Relatórios IA</span>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>© 2025 PontoDigital - Sistema desenvolvido para escolas e empresas</p>
        </div>
      </motion.div>
    </div>
  );
};
