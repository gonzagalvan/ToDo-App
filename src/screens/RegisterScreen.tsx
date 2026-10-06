import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { authService } from '../services/authService';
import { RootStackParamList } from '../types/navigation';
import { validateRegistration } from '../utils/validation';
import AppButton from '../components/AppButton';
import FormInput from '../components/FormInput';
import { colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [username, password, confirmPassword]);

    const handleRegister = async () => {
        const validationError = validateRegistration(
            username,
            password,
            confirmPassword,
        );

        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await authService.register(username, password);

            Alert.alert('Cuenta creada', 'Ya podés iniciar sesión.');
            navigation.navigate('Login');
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Ocurrió un error al registrar el usuario',
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

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

            <FormInput
                label="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            <AppButton title="Registrarme" onPress={handleRegister} />

            <AppButton
                title="Ya tengo una cuenta"
                variant="text"
                onPress={() => navigation.navigate('Login')}
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
        marginBottom: 8,
        color: colors.text,
    },
    error: {
        color: colors.error,
        textAlign: 'center',
    },
});
