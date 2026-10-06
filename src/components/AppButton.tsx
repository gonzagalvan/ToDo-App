import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { colors } from '../theme';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'outline' | 'text';
    disabled?: boolean;
    loading?: boolean;
}

export default function AppButton({
    title,
    onPress,
    variant = 'primary',
    disabled = false,
    loading = false,
}: AppButtonProps) {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}
            activeOpacity={0.7}
            disabled={isDisabled}
            onPress={onPress}
            style={[
                styles.base,
                variant === 'primary' && styles.primary,
                variant === 'outline' && styles.outline,
                isDisabled && styles.disabled,
            ]}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? colors.primaryText : colors.primary}
                />
            ) : (
                <Text
                    style={[
                        styles.label,
                        variant === 'primary' && styles.labelPrimary,
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    base: {
        minHeight: 44,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primary: {
        backgroundColor: colors.primary,
    },
    outline: {
        borderWidth: 1,
        borderColor: colors.primary,
    },
    disabled: {
        opacity: 0.5,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
    },
    labelPrimary: {
        color: colors.primaryText,
    },
});
