import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../hooks/useTasks';
import { Header } from '../../components/Header';
import { StatusBadge, PriorityBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { formatDateTime } from '../../utils/formatDate';
import { CATEGORIES } from '../../constants/categories';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskDetail'>;

export function TaskDetailScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { colors } = useTheme();
  const { getTaskById, deleteTask } = useTasks();
  const [deleting, setDeleting] = useState(false);

  const task = getTaskById(taskId);
  const cat = CATEGORIES.find((c) => c.name === task?.category) ?? CATEGORIES[0];

  if (!task) {
    return (
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Header showBack onBack={() => navigation.goBack()} title="Detalhe" />
        <View style={styles.notFound}>
          <Text style={[styles.notFoundText, { color: colors.textSecondary }]}>
            Tarefa não encontrada.
          </Text>
        </View>
      </View>
    );
  }

  function confirmDelete() {
    Alert.alert(
      'Excluir tarefa?',
      'Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            await deleteTask(task.id);
            navigation.goBack();
          },
        },
      ],
    );
  }

  const rows = [
    { label: 'Criado em', value: formatDateTime(task.createdAt) },
    { label: 'Atualizado em', value: formatDateTime(task.updatedAt) },
    { label: 'ID', value: task.id },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header showBack onBack={() => navigation.goBack()} title="Detalhe" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleRow}>
          <View style={[styles.catIcon, { backgroundColor: cat.color }]}>
            <Text style={styles.catIconText}>{cat.icon}</Text>
          </View>
          <View style={styles.titleTexts}>
            <Text style={[styles.taskTitle, { color: colors.text }]}>
              {task.title}
            </Text>
            <Text style={[styles.catName, { color: colors.textSecondary }]}>
              {cat.name}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardLabel, { color: colors.textSecondary }]}>
            Descrição
          </Text>
          <Text style={[styles.description, { color: colors.text }]}>
            {task.description || 'Sem descrição.'}
          </Text>
        </View>

        <View style={styles.badgeRow}>
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {rows.map((r, i) => (
            <View
              key={r.label}
              style={[
                styles.metaRow,
                i < rows.length - 1 && {
                  borderBottomWidth: 0.5,
                  borderBottomColor: colors.border,
                  paddingBottom: 10,
                  marginBottom: 10,
                },
              ]}
            >
              <Text style={[styles.metaLabel, { color: colors.textSecondary }]}>
                {r.label}
              </Text>
              <Text
                style={[styles.metaValue, { color: colors.text }]}
                numberOfLines={1}
              >
                {r.value}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <CustomButton
            label="✏️  Editar"
            onPress={() => navigation.navigate('TaskForm', { taskId: task.id })}
            variant="secondary"
            style={styles.actionBtn}
          />
          <CustomButton
            label="🗑️  Excluir"
            onPress={confirmDelete}
            variant="danger"
            loading={deleting}
            style={styles.actionBtn}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 14 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  catIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  catIconText: { fontSize: 26 },
  titleTexts: { flex: 1, gap: 2 },
  taskTitle: { fontSize: 18, fontWeight: '600' },
  catName: { fontSize: 13 },
  card: {
    borderRadius: 14,
    borderWidth: 0.5,
    padding: 14,
  },
  cardLabel: { fontSize: 12, fontWeight: '500', marginBottom: 6 },
  description: { fontSize: 15, lineHeight: 22 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaLabel: { fontSize: 13 },
  metaValue: { fontSize: 13, flex: 1, textAlign: 'right', marginLeft: 16 },
  actions: { flexDirection: 'row', gap: 10 },
  actionBtn: { flex: 1 },
});
