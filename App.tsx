import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { notificationService } from './src/services/notificationService';

export default function App() {
  // Al arrancar la app: crear el canal de Android y pedir permiso de notificaciones.
  useEffect(() => {
    notificationService.init().catch(err => {
      console.warn('No se pudieron inicializar las notificaciones:', err);
    });
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
