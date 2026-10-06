
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@todo/tasks';

async function getTasks(userId: string): Promise<Task[]> {
    const data = await AsyncStorage.getItem(TASKS_KEY);

    if (!data) {
        return [];
    }

    const tasks = JSON.parse(data) as Task[];

    return tasks.filter(task => task.userId === userId);
}

async function addTask(task: Task): Promise<void> {
    const data = await AsyncStorage.getItem(TASKS_KEY);
    const tasks: Task[] = data ? JSON.parse(data) as Task[] : [];

    tasks.push(task);

    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

async function deleteTask(taskId: string, userId: string): Promise<void> {
    const data = await AsyncStorage.getItem(TASKS_KEY);

    if (!data) {
        return;
    }

    const tasks = JSON.parse(data) as Task[];

    const updatedTasks = tasks.filter(
        task => !(task.id === taskId && task.userId === userId),
    );

    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
}

async function toggleTaskCompleted(
    taskId: string,
    userId: string,
): Promise<void> {
    const data = await AsyncStorage.getItem(TASKS_KEY);

    if (!data) {
        return;
    }

    const tasks = JSON.parse(data) as Task[];

    const updatedTasks = tasks.map(task => {
        if (task.id === taskId && task.userId === userId) {
            return {
                ...task,
                completed: !task.completed,
            };
        }

        return task;
    });

    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
}

export const taskService = {
    getTasks,
    addTask,
    deleteTask,
    toggleTaskCompleted,
};
