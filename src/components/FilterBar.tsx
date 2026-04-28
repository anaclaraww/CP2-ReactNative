import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { TaskStatus } from '../types/task';
import { useTheme } from '../context/ThemeContext';

type FilterOption = 'todos' | TaskStatus;

interface FilterBarProps {
  active: FilterOption;
  onChange: (f: FilterOption) => void;
}

const OPTIONS: { value: FilterOption; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluida', label: 'Concluída' },
];

export function FilterBar({ active, onChange }: FilterBarProps) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {OPTIONS.map((opt) => {
        const isActive = opt.value === active;
        return (
          <TouchableOpacity
            key={opt.value}
            onPress={() => onChange(opt.value)}
            activeOpacity={0.8}
            style={[
              styles.btn,
              {
                backgroundColor: isActive ? colors.accent : colors.surface,
                borderColor: isActive ? colors.accent : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isActive ? '#fff' : colors.textSecondary },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 0.5,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
});
