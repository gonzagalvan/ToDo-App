import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';
import AppButton from '../components/AppButton';
import FormInput from '../components/FormInput';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [username, password]);

    const handleLogin = async () => {
        if (!username.trim() || !password) {
            setError('Completá el usuario y la contraseña');
            return;
        }

        try {
            const user = await authService.login(username, password);
            await login(user);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Ocurrió un error al iniciar sesión',
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi To-Do</Text>
            <Text style={styles.subtitle}>
                Iniciá sesión para administrar tus tareas
            </Text>

            <FormInput
                label="Nombre de usuario"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <FormInput
                label="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            <AppButton title="Iniciar sesión" onPress={handleLogin} />

            <AppButton
                title="¿No tenés cuenta? Registrate"
                variant="text"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        gap: 16,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: colors.text,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 8,
        color: colors.textMuted,
    },
    error: {
        color: colors.error,
        textAlign: 'center',
    },
});
