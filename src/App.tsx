import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Sidebar } from './components/layout/Sidebar';
import { Dashboard } from './components/pages/Dashboard';
import { TimeSheet } from './components/pages/TimeSheet';
import { QRGenerator } from './components/pages/QRGenerator';
import { Login } from './components/pages/Login';
import { motion, AnimatePresence } from 'framer-motion';

const AppContent: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'timesheet':
        return <TimeSheet />;
      case 'qr-generator':
        return <QRGenerator />;
      case 'employees':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Funcionários</h2>
              <p className="text-gray-600">Módulo em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Relatórios</h2>
              <p className="text-gray-600">Módulo em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'schedule':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Horários</h2>
              <p className="text-gray-600">Módulo em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'institutions':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Instituições</h2>
              <p className="text-gray-600">Módulo em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Segurança</h2>
              <p className="text-gray-600">Módulo em desenvolvimento...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Configurações</h2>
              <p className="text-gray-600">Módulo em desenvolvimento...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
