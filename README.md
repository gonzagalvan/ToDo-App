# Mi ToDo — Parcial 1 Aplicaciones Móviles

## Opción elegida
✅ **Gestor de tareas** (React Native + Expo + TypeScript).

## Cómo ejecutar la app

```bash
npm install
npx expo run:android      # build de desarrollo en el celular/emulador (usa expo-dev-client)
# o, si ya tenés el development build instalado:
npx expo start --dev-client
```

> Las notificaciones requieren un *development build*; no funcionan en Expo Go (SDK 53+).

## Tests

Instalar una vez las dependencias de testing (versiones compatibles con el SDK):

```bash
npx expo install jest-expo jest @types/jest react-test-renderer -- --save-dev
npm install --save-dev @testing-library/react-native
```

Ejecutar:

```bash
npm test
```

Incluye tests de componentes (`TaskItem`, `AppButton`) y de lógica (validaciones y `authService`).

## Funcionalidades implementadas

- **Registro y login locales** con usuario y contraseña guardados en AsyncStorage.
- **Sesión persistente**: al abrir la app se restaura la sesión; sin sesión no se puede acceder a Home ni a crear tareas.
- **Navegación** con React Navigation (Stack): Login, Registro, Home y Alta de tarea.
- **Tareas**: crear (título + fecha/hora de vencimiento opcional), listar, marcar como completada y eliminar. Se guardan en AsyncStorage y se mantienen al cerrar la app.
- **Notificaciones locales**: aviso a los 10 segundos al crear una tarea y aviso a la fecha/hora de vencimiento; se cancelan al eliminar o completar la tarea. Botón "Probar notificación" en Home.
- **Componentes básicos de RN** (`View`, `Text`, `TextInput`, `TouchableOpacity`) con `StyleSheet`, y componentes reutilizables (`AppButton`, `FormInput`, `TaskItem`).
- **useEffect**: restaurar sesión (`AuthContext`), inicializar permisos/canal de notificaciones (`App`) y limpiar errores de formulario al escribir.

## Video DEMO
Link del video:
