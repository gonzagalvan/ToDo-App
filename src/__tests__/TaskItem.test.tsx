import { fireEvent, render, screen } from '@testing-library/react-native';
import TaskItem from '../components/TaskItem';
import { Task } from '../types/task';

const baseTask: Task = {
  id: '1',
  userId: 'u1',
  title: 'Comprar pan',
  completed: false,
  createdAt: new Date().toISOString(),
  dueDate: null,
  reminderAt: null,
  creationNotificationId: null,
  dueDateNotificationId: null,
};

describe('TaskItem', () => {
  it('renderiza el título y el estado pendiente', async () => {
    await render(
      <TaskItem task={baseTask} onDelete={jest.fn()} onToggleComplete={jest.fn()} />,
    );

    expect(screen.getByText('Comprar pan')).toBeTruthy();
    expect(screen.getByText(/Pendiente/)).toBeTruthy();
  });

  it('muestra "Completada" si la tarea está completa', async () => {
    await render(
      <TaskItem
        task={{ ...baseTask, completed: true }}
        onDelete={jest.fn()}
        onToggleComplete={jest.fn()}
      />,
    );

    expect(screen.getByText(/Completada/)).toBeTruthy();
  });

  it('llama a onDelete con el id al tocar "Eliminar"', async () => {
    const onDelete = jest.fn();
    await render(
      <TaskItem task={baseTask} onDelete={onDelete} onToggleComplete={jest.fn()} />,
    );

    await fireEvent.press(screen.getByLabelText('Eliminar tarea'));

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('llama a onToggleComplete con el id al tocar el checkbox', async () => {
    const onToggle = jest.fn();
    await render(
      <TaskItem task={baseTask} onDelete={jest.fn()} onToggleComplete={onToggle} />,
    );

    await fireEvent.press(screen.getByLabelText('Marcar tarea como completada'));

    expect(onToggle).toHaveBeenCalledWith('1');
  });
});