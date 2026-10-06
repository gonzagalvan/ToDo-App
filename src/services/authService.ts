import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

const USERS_KEY = '@todo/users';
const SESSION_KEY = '@todo/session';

async function getUsers(): Promise<User[]> {
  const data = await AsyncStorage.getItem(USERS_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data) as User[];
}

async function register(
  username: string,
  password: string,
): Promise<void> {
  const users = await getUsers();

  const usernameExists = users.some(
    user => user.username.toLowerCase() === username.trim().toLowerCase(),
  );

  if (usernameExists) {
    throw new Error('Ese nombre de usuario ya está registrado');
  }

  const newUser: User = {
    id: Date.now().toString(),
    username: username.trim(),
    password,
  };

  users.push(newUser);

  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

async function login(
  username: string,
  password: string,
): Promise<User> {
  const users = await getUsers();

  const user = users.find(
    user => user.username.toLowerCase() === username.trim().toLowerCase(),
  );

  if (!user || user.password !== password) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  return user;
}

async function saveSession(userId: string): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, userId);
}

async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

/** Devuelve el usuario de la sesión guardada, o null si no hay sesión. */
async function getSessionUser(): Promise<User | null> {
  const userId = await AsyncStorage.getItem(SESSION_KEY);

  if (!userId) {
    return null;
  }

  const users = await getUsers();

  return users.find(user => user.id === userId) ?? null;
}

export const authService = {
  register,
  login,
  saveSession,
  clearSession,
  getSessionUser,
};
