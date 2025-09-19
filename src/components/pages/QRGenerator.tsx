import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { QrCode, Download, Smartphone, MapPin, Clock } from 'lucide-react';
import QRCodeComponent from 'react-qr-code';

export const QRGenerator: React.FC = () => {
  const [qrData, setQrData] = useState({
    institutionId: 'escola-municipal-dom-pedro',
    location: 'Entrada Principal',
    validFor: '24'
  });

  const generateQRValue = () => {
    return JSON.stringify({
      type: 'timesheet_check',
      institutionId: qrData.institutionId,
      location: qrData.location,
      validUntil: new Date(Date.now() + parseInt(qrData.validFor) * 60 * 60 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    });
  };

  const handleDownload = () => {
    const svg = document.querySelector('#qr-code-svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `qr-ponto-${qrData.location.toLowerCase().replace(/\s+/g, '-')}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gerador de QR Code</h1>
          <p className="text-gray-600">Crie códigos QR para registro de ponto em locais específicos</p>
        </div>
        <QrCode className="w-8 h-8 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Configurações do QR Code</h2>
            
            <div className="space-y-4">
              <Input
                label="ID da Instituição"
                value={qrData.institutionId}
                onChange={(e) => setQrData(prev => ({ ...prev, institutionId: e.target.value }))}
                placeholder="escola-municipal-dom-pedro"
                helperText="Identificador único da instituição"
              />

              <Input
                label="Local de Registro"
                value={qrData.location}
                onChange={(e) => setQrData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Entrada Principal"
                icon={<MapPin className="w-4 h-4 text-gray-400" />}
                helperText="Nome do local onde o QR será usado"
              />

              <Input
                label="Válido por (horas)"
                type="number"
                value={qrData.validFor}
                onChange={(e) => setQrData(prev => ({ ...prev, validFor: e.target.value }))}
                placeholder="24"
                icon={<Clock className="w-4 h-4 text-gray-400" />}
                helperText="Tempo de validade do código em horas"
              />
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Como usar:</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Funcionários escaneiam o QR com o app móvel</li>
                <li>• O sistema valida localização automaticamente</li>
                <li>• Registros são salvos com timestamp e localização</li>
                <li>• Códigos expiram automaticamente por segurança</li>
              </ul>
            </div>
          </Card>
        </motion.div>

        {/* QR Code Display */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Código QR Gerado</h2>
            
            <div className="text-center">
              <div className="inline-block p-6 bg-white rounded-xl shadow-sm border-2 border-gray-100">
                <QRCodeComponent
                  id="qr-code-svg"
                  value={generateQRValue()}
                  size={200}
                  level="M"
                  includeMargin={true}
                />
              </div>

              <div className="mt-6 space-y-3">
                <div className="text-sm text-gray-600">
                  <p><strong>Local:</strong> {qrData.location}</p>
                  <p><strong>Válido até:</strong> {new Date(Date.now() + parseInt(qrData.validFor) * 60 * 60 * 1000).toLocaleString('pt-BR')}</p>
                </div>

                <Button onClick={handleDownload} className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar QR Code
                </Button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Instruções de Instalação:</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>1. Imprima o QR Code em papel resistente</p>
                <p>2. Fixe em local visível na entrada/saída</p>
                <p>3. Proteja contra intempéries se for área externa</p>
                <p>4. Teste o funcionamento com o app móvel</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Usage Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Estatísticas de Uso dos QR Codes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-green-700">15</p>
              <p className="text-sm text-green-600">QR Codes Ativos</p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-blue-700">847</p>
              <p className="text-sm text-blue-600">Escaneamentos Hoje</p>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-orange-700">8</p>
              <p className="text-sm text-orange-600">Localizações</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
