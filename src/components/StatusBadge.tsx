import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskStatus, TaskPriority } from '../types/task';
import { useTheme } from '../context/ThemeContext';

interface StatusBadgeProps {
  status: TaskStatus;
}

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  pendente: 'Pendente',
  em_andamento: 'Em andamento',
  concluida: 'Concluída',
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta',
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const { colors } = useTheme();

  const bgMap: Record<TaskStatus, string> = {
    pendente: colors.warningBg,
    em_andamento: colors.progressBg,
    concluida: colors.successBg,
  };
  const colorMap: Record<TaskStatus, string> = {
    pendente: colors.warning,
    em_andamento: colors.progress,
    concluida: colors.success,
  };

  return (
    <View style={[styles.badge, { backgroundColor: bgMap[status] }]}>
      <Text style={[styles.text, { color: colorMap[status] }]}>
        {STATUS_LABELS[status]}
      </Text>
    </View>
  );
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const { colors } = useTheme();

  const colorMap: Record<TaskPriority, string> = {
    baixa: colors.success,
    media: colors.warning,
    alta: colors.danger,
  };

  return (
    <View style={styles.priorityRow}>
      <View
        style={[styles.dot, { backgroundColor: colorMap[priority] }]}
      />
      <Text style={[styles.priorityText, { color: colors.textSecondary }]}>
        {PRIORITY_LABELS[priority]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  priorityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 12,
  },
});
