export const MIN_PASSWORD_LENGTH = 4;

export function validateUsername(username: string): string | null {
    if (!username.trim()) {
        return 'El nombre de usuario es obligatorio';
    }

    return null;
}

export function validatePassword(password: string): string | null {
    if (password.length < MIN_PASSWORD_LENGTH) {
        return `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`;
    }

    return null;
}

/** Devuelve el primer mensaje de error, o null si el formulario es válido. */
export function validateRegistration(
    username: string,
    password: string,
    confirmPassword: string,
): string | null {
    const usernameError = validateUsername(username);
    if (usernameError) return usernameError;

    const passwordError = validatePassword(password);
    if (passwordError) return passwordError;

    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden';
    }

    return null;
}

export function validateTaskTitle(title: string): string | null {
    if (!title.trim()) {
        return 'Ingresá el título de la tarea.';
    }

    return null;
}

/** Formatea una fecha ISO como "dd/mm/aaaa hh:mm". Devuelve '' si es null o inválida. */
export function formatDueDate(iso: string | null): string {
    if (!iso) return '';

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';

    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
