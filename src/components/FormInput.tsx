import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme';

interface FormInputProps extends TextInputProps {
    label: string;
}

export default function FormInput({ label, ...inputProps }: FormInputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                accessibilityLabel={label}
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                {...inputProps}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    label: {
        fontSize: 14,
        color: colors.textMuted,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: colors.text,
    },
});
