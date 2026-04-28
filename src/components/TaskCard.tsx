import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types/task';
import { useTheme } from '../context/ThemeContext';
import { StatusBadge, PriorityBadge } from './StatusBadge';
import { formatDate } from '../utils/formatDate';
import { CATEGORIES } from '../constants/categories';

interface TaskCardProps {
  task: Task;
  onPress: (task: Task) => void;
}

export function TaskCard({ task, onPress }: TaskCardProps) {
  const { colors } = useTheme();
  const cat = CATEGORIES.find((c) => c.name === task.category) ?? CATEGORIES[0];

  return (
    <TouchableOpacity
      onPress={() => onPress(task)}
      activeOpacity={0.8}
      style={[
        styles.card,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View
        style={[styles.iconBox, { backgroundColor: cat.color }]}
      >
        <Text style={styles.icon}>{cat.icon}</Text>
      </View>

      <View style={styles.body}>
        <Text
          style={[styles.title, { color: colors.text }]}
          numberOfLines={1}
        >
          {task.title}
        </Text>
        <Text
          style={[styles.meta, { color: colors.textSecondary }]}
          numberOfLines={1}
        >
          {cat.name} · Criado {formatDate(task.createdAt)}
        </Text>
        <View style={styles.footer}>
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 14,
    borderWidth: 0.5,
    padding: 12,
    gap: 10,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 20,
  },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
  meta: {
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    flexWrap: 'wrap',
  },
});
