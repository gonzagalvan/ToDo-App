export interface Task {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: string;
    dueDate: string | null;
    reminderAt: string | null;
    creationNotificationId: string | null;
    dueDateNotificationId: string | null;
}