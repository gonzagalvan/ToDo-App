import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { notificationService } from '../services/notificationService';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';
import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { RootStackParamList } from '../types/navigation';
import { validateTaskTitle } from '../utils/validation';
import AppButton from '../components/AppButton';
import FormInput from '../components/FormInput';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateTask'>;

export default function CreateTaskScreen({ navigation }: Props) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const { user } = useAuth();

    useEffect(() => {
        setError('');
    }, [title]);

    const handleSave = async () => {
        const titleError = validateTaskTitle(title);

        if (titleError) {
            setError(titleError);
            return;
        }

        if (!user) {
            setError('Debés iniciar sesión para crear una tarea.');
            return;
        }

        try {
            setSaving(true);
            setError('');

            const creationNotificationId =
                await notificationService.notifyNow(
                    'Tarea creada',
                    `Tarea guardada: ${title.trim()}`,
                );

            let dueDateNotificationId: string | null = null;

            if (dueDate) {
                dueDateNotificationId =
                    await notificationService.scheduleNotificationAtDate(
                        'Tarea pendiente',
                        `Vence ahora: ${title.trim()}`,
                        dueDate
                    );
            }

            const newTask: Task = {
                id: Date.now().toString(),
                userId: user.id,
                title: title.trim(),
                completed: false,
                createdAt: new Date().toISOString(),

                dueDate: dueDate
                    ? dueDate.toISOString()
                    : null,

                reminderAt: creationNotificationId
                    ? new Date().toISOString()
                    : null,

                creationNotificationId,
                dueDateNotificationId,
            };

            await taskService.addTask(newTask);

            navigation.goBack();
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            setError('No se pudo guardar la tarea. Intentá nuevamente.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Nueva tarea</Text>

            <FormInput
                label="Título de la tarea"
                value={title}
                onChangeText={setTitle}
            />

            <AppButton
                title={
                    dueDate
                        ? `Fecha: ${dueDate.toLocaleDateString()}`
                        : 'Elegir fecha de vencimiento'
                }
                variant="outline"
                onPress={() => setShowDatePicker(true)}
            />

            <AppButton
                title={
                    dueDate
                        ? `Hora: ${dueDate.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}`
                        : 'Elegí primero la fecha'
                }
                variant="outline"
                onPress={() => setShowTimePicker(true)}
                disabled={!dueDate}
            />

            {showDatePicker && (
                <DateTimePicker
                    value={dueDate || new Date()}
                    mode="date"
                    minimumDate={new Date()}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);

                        if (selectedDate) {
                            const newDate = new Date(
                                dueDate || new Date()
                            );

                            newDate.setFullYear(
                                selectedDate.getFullYear(),
                                selectedDate.getMonth(),
                                selectedDate.getDate()
                            );

                            setDueDate(newDate);
                        }
                    }}
                />
            )}

            {showTimePicker && (
                <DateTimePicker
                    value={dueDate || new Date()}
                    mode="time"
                    onChange={(event, selectedTime) => {
                        setShowTimePicker(false);

                        if (selectedTime) {
                            const newDate = new Date(
                                dueDate || new Date()
                            );

                            newDate.setHours(
                                selectedTime.getHours(),
                                selectedTime.getMinutes(),
                                0,
                                0
                            );

                            setDueDate(newDate);
                        }
                    }}
                />
            )}

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <AppButton
                title="Guardar tarea"
                onPress={handleSave}
                loading={saving}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        gap: 16,
        backgroundColor: colors.background,
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
    },
    error: {
        color: colors.error,
    },
});