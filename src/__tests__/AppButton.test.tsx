import { fireEvent, render, screen } from '@testing-library/react-native';
import AppButton from '../components/AppButton';

describe('AppButton', () => {
  it('muestra el título y responde al toque', async () => {
    const onPress = jest.fn();
    await render(<AppButton title="Guardar" onPress={onPress} />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('no dispara onPress cuando está deshabilitado', async () => {
    const onPress = jest.fn();
    await render(<AppButton title="Guardar" onPress={onPress} disabled />);

    await fireEvent.press(screen.getByText('Guardar'));

    expect(onPress).not.toHaveBeenCalled();
  });
});