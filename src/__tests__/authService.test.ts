import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';

describe('authService', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('registra un usuario y permite iniciar sesión', async () => {
    await authService.register('Ana', '1234');

    const user = await authService.login('ana', '1234');

    expect(user.username).toBe('Ana');
  });

  it('no permite registrar un usuario repetido', async () => {
    await authService.register('ana', '1234');

    await expect(authService.register('ANA', 'abcd')).rejects.toThrow(
      'Ese nombre de usuario ya está registrado',
    );
  });

  it('rechaza credenciales incorrectas', async () => {
    await authService.register('ana', '1234');

    await expect(authService.login('ana', 'mal')).rejects.toThrow(
      'Usuario o contraseña incorrectos',
    );
  });

  it('restaura la sesión guardada y la borra al cerrar sesión', async () => {
    await authService.register('ana', '1234');
    const user = await authService.login('ana', '1234');

    await authService.saveSession(user.id);
    expect((await authService.getSessionUser())?.id).toBe(user.id);

    await authService.clearSession();
    expect(await authService.getSessionUser()).toBeNull();
  });
});
