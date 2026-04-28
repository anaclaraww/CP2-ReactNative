import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { TaskStatus, TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../hooks/useTasks';
import { Header } from '../../components/Header';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { CATEGORIES } from '../../constants/categories';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskForm'>;

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'pendente', label: 'Pendente' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluida', label: 'Concluída' },
];

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'baixa', label: 'Baixa' },
  { value: 'media', label: 'Média' },
  { value: 'alta', label: 'Alta' },
];

export function TaskFormScreen({ route, navigation }: Props) {
  const { taskId } = route.params;
  const { colors } = useTheme();
  const { getTaskById, createTask, updateTask } = useTasks();

  const existing = taskId ? getTaskById(taskId) : undefined;
  const isEditing = !!existing;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(existing?.status ?? 'pendente');
  const [priority, setPriority] = useState<TaskPriority>(existing?.priority ?? 'media');
  const [category, setCategory] = useState(existing?.category ?? CATEGORIES[0].name);
  const [titleError, setTitleError] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      setTitleError('O título é obrigatório.');
      return;
    }
    setSaving(true);
    const cat = CATEGORIES.find((c) => c.name === category) ?? CATEGORIES[0];
    const input = {
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      category,
      categoryIcon: cat.icon,
    };
    if (isEditing && taskId) {
      await updateTask(taskId, input);
    } else {
      await createTask(input);
    }
    setSaving(false);
    navigation.goBack();
  }

  function SegmentedControl<T extends string>({
    options,
    value,
    onChange,
  }: {
    options: { value: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
  }) {
    return (
      <View
        style={[
          styles.segmented,
          { backgroundColor: colors.inputBg, borderColor: colors.border },
        ]}
      >
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onChange(opt.value)}
              style={[
                styles.segmentBtn,
                isActive && {
                  backgroundColor: colors.accent,
                },
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.segmentLabel,
                  { color: isActive ? '#fff' : colors.textSecondary },
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.screen, { backgroundColor: colors.background }]}>
        <Header
          showBack
          onBack={() => navigation.goBack()}
          title={isEditing ? 'Editar Tarefa' : 'Nova Tarefa'}
        />
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <CustomInput
            label="Título *"
            placeholder="Digite o título da tarefa"
            value={title}
            onChangeText={(v) => { setTitle(v); setTitleError(''); }}
            error={titleError}
          />

          <CustomInput
            label="Descrição"
            placeholder="Descreva a tarefa (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.textarea}
          />

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Status
            </Text>
            <SegmentedControl
              options={STATUS_OPTIONS}
              value={status}
              onChange={setStatus}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Prioridade
            </Text>
            <SegmentedControl
              options={PRIORITY_OPTIONS}
              value={priority}
              onChange={setPriority}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>
              Categoria
            </Text>
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((cat) => {
                const isActive = cat.name === category;
                return (
                  <TouchableOpacity
                    key={cat.name}
                    onPress={() => setCategory(cat.name)}
                    activeOpacity={0.8}
                    style={[
                      styles.catOption,
                      {
                        backgroundColor: isActive ? colors.accentLight : colors.surface,
                        borderColor: isActive ? colors.accent : colors.border,
                      },
                    ]}
                  >
                    <Text style={styles.catOptionIcon}>{cat.icon}</Text>
                    <Text
                      style={[
                        styles.catOptionLabel,
                        { color: isActive ? colors.accent : colors.textSecondary },
                      ]}
                    >
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <CustomButton
            label={isEditing ? 'Salvar alterações' : 'Criar tarefa'}
            onPress={handleSave}
            loading={saving}
            fullWidth
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 16 },
  textarea: { minHeight: 80, textAlignVertical: 'top' },
  fieldGroup: { gap: 8 },
  fieldLabel: { fontSize: 13, fontWeight: '500' },
  segmented: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentLabel: { fontSize: 13, fontWeight: '500' },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  catOptionIcon: { fontSize: 16 },
  catOptionLabel: { fontSize: 13, fontWeight: '500' },
});
