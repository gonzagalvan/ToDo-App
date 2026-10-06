# Mi ToDo — Parcial 1 Aplicaciones Móviles

## Opción elegida
✅ **Gestor de tareas** (React Native + Expo + TypeScript).

## Cómo ejecutar la app

Requisitos: Node.js y la app **Expo Go** instalada en el celular (o un emulador Android).

​```
npm install
npx expo start
​```

Escaneá el código QR con Expo Go. Si el proyecto abre en modo "development build" en lugar de Expo Go, presioná `s` en la terminal para cambiar a Expo Go.

> Las notificaciones locales piden permiso la primera vez: aceptalo para que se muestren.

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
- **Notificaciones locales**: aviso inmediato al crear una tarea y aviso a la fecha/hora de vencimiento; se cancelan al eliminar o completar la tarea.
- **Componentes básicos de RN** (`View`, `Text`, `TextInput`, `TouchableOpacity`) con `StyleSheet`, y componentes reutilizables (`AppButton`, `FormInput`, `TaskItem`).
- **useEffect**: restaurar sesión (`AuthContext`), inicializar permisos/canal de notificaciones (`App`) y limpiar errores de formulario al escribir.

## Video DEMO
Link del video: https://www.youtube.com/shorts/hXRrEn0RV4g
