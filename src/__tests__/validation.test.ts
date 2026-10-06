import {
  formatDueDate,
  validateRegistration,
  validateTaskTitle,
} from '../utils/validation';

describe('validateRegistration', () => {
  it('rechaza un usuario vacío', () => {
    expect(validateRegistration('   ', '1234', '1234')).toBe(
      'El nombre de usuario es obligatorio',
    );
  });

  it('rechaza contraseñas cortas', () => {
    expect(validateRegistration('ana', '12', '12')).toMatch(/al menos 4/);
  });

  it('rechaza contraseñas que no coinciden', () => {
    expect(validateRegistration('ana', '1234', '4321')).toBe(
      'Las contraseñas no coinciden',
    );
  });

  it('acepta datos válidos', () => {
    expect(validateRegistration('ana', '1234', '1234')).toBeNull();
  });
});

describe('validateTaskTitle', () => {
  it('rechaza títulos vacíos y acepta con texto', () => {
    expect(validateTaskTitle('  ')).not.toBeNull();
    expect(validateTaskTitle('Estudiar')).toBeNull();
  });
});

describe('formatDueDate', () => {
  it('devuelve vacío si no hay fecha o es inválida', () => {
    expect(formatDueDate(null)).toBe('');
    expect(formatDueDate('no-es-fecha')).toBe('');
  });

  it('formatea como dd/mm/aaaa hh:mm', () => {
    const iso = new Date(2026, 9, 6, 8, 5).toISOString();
    expect(formatDueDate(iso)).toBe('06/10/2026 08:05');
  });
});
