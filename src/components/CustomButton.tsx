import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function CustomButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}: CustomButtonProps) {
  const { colors } = useTheme();

  const bgMap: Record<Variant, string> = {
    primary: colors.accent,
    secondary: colors.surface,
    danger: colors.dangerBg,
    ghost: 'transparent',
  };

  const textMap: Record<Variant, string> = {
    primary: '#FFFFFF',
    secondary: colors.text,
    danger: colors.danger,
    ghost: colors.accent,
  };

  const borderMap: Record<Variant, string> = {
    primary: colors.accent,
    secondary: colors.border,
    danger: colors.danger,
    ghost: 'transparent',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.base,
        {
          backgroundColor: bgMap[variant],
          borderColor: borderMap[variant],
          opacity: disabled ? 0.5 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? '#fff' : colors.accent}
        />
      ) : (
        <Text style={[styles.label, { color: textMap[variant] }, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
});
