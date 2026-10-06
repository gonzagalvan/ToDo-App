import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Task } from '../types/task';
import { formatDueDate } from '../utils/validation';
import { colors } from '../theme';

interface TaskItemProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

export default function TaskItem({
  task,
  onDelete,
  onToggleComplete,
}: TaskItemProps) {
  const due = formatDueDate(task.dueDate);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        accessibilityRole="checkbox"
        accessibilityLabel="Marcar tarea como completada"
        accessibilityState={{ checked: task.completed }}
        onPress={() => onToggleComplete(task.id)}
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
      >
        {task.completed ? <Text style={styles.checkMark}>✓</Text> : null}
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={[styles.title, task.completed && styles.completed]}>
          {task.title}
        </Text>

        <Text style={styles.subtitle}>
          {task.completed ? 'Completada' : 'Pendiente'}
          {due ? ` · Vence: ${due}` : ''}
        </Text>
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Eliminar tarea"
        onPress={() => onDelete(task.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: colors.surface,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
  },
  checkMark: {
    color: colors.primaryText,
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  deleteText: {
    color: colors.error,
    fontWeight: '600',
  },
});
