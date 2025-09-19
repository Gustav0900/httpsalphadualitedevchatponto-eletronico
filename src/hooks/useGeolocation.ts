import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface GeolocationHook {
  location: LocationData | null;
  error: string | null;
  loading: boolean;
  getCurrentLocation: () => Promise<LocationData>;
}

export const useGeolocation = (): GeolocationHook => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);

      if (!navigator.geolocation) {
        const error = 'Geolocalização não é suportada neste navegador';
        setError(error);
        setLoading(false);
        reject(new Error(error));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          
          setLocation(locationData);
          setLoading(false);
          resolve(locationData);
        },
        (error) => {
          const errorMessage = `Erro ao obter localização: ${error.message}`;
          setError(errorMessage);
          setLoading(false);
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  return {
    location,
    error,
    loading,
    getCurrentLocation
  };
};
