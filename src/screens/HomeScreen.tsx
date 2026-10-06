import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import { notificationService } from '../services/notificationService';
import { Task } from '../types/task';
import { RootStackParamList } from '../types/navigation';
import TaskItem from '../components/TaskItem';
import AppButton from '../components/AppButton';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      return;
    }

    try {
      const savedTasks = await taskService.getTasks(user.id);
      setTasks(savedTasks);
      setError('');
    } catch {
      setError('No se pudieron cargar las tareas.');
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [loadTasks]),
  );

  const handleDeleteTask = async (taskId: string) => {
    if (!user) return;

    const task = tasks.find(t => t.id === taskId);

    try {
      await taskService.deleteTask(taskId, user.id);

      if (task) {
        await notificationService.cancelNotification(task.creationNotificationId);
        await notificationService.cancelNotification(task.dueDateNotificationId);
      }

      await loadTasks();
    } catch {
      setError('No se pudo eliminar la tarea.');
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    if (!user) return;

    const task = tasks.find(t => t.id === taskId);

    try {
      await taskService.toggleTaskCompleted(taskId, user.id);

      if (task && !task.completed) {
        await notificationService.cancelNotification(task.dueDateNotificationId);
      }

      await loadTasks();
    } catch {
      setError('No se pudo actualizar la tarea.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a ToDo App!</Text>
      <Text style={styles.greeting}>Hola, {user?.username ?? 'usuario'}</Text>

      <AppButton
        title="Nueva tarea"
        onPress={() => navigation.navigate('CreateTask')}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        style={styles.list}
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Todavía no tenés tareas. ¡Creá la primera!
          </Text>
        }
      />

      <AppButton title="Cerrar sesión" variant="outline" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 32,
    gap: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  greeting: {
    fontSize: 16,
    color: colors.textMuted,
  },
  list: {
    flex: 1,
    width: '100%',
  },
  empty: {
    textAlign: 'center',
    marginTop: 24,
    color: colors.textMuted,
  },
  error: {
    color: colors.error,
  },
});
