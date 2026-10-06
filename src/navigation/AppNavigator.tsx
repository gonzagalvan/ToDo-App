import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateTaskScreen from '../screens/CreateTaskScreen';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList } from '../types/navigation';
import { colors } from '../theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {user ? (
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'Mis tareas' }}
                    />
                    <Stack.Screen
                        name="CreateTask"
                        component={CreateTaskScreen}
                        options={{ title: 'Nueva tarea' }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ title: 'Iniciar sesión' }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ title: 'Crear cuenta' }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
});
