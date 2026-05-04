import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ListRenderItemInfo,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { Task } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import { useTasks } from '../../hooks/useTasks';
import { Header } from '../../components/Header';
import { TaskCard } from '../../components/TaskCard';
import { FilterBar } from '../../components/FilterBar';
import { EmptyState } from '../../components/EmptyState';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';

type Props = NativeStackScreenProps<TaskStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const {
    filteredTasks,
    isLoading,
    filter,
    searchQuery,
    setFilter,
    setSearchQuery,
  } = useTasks();

  function renderItem({ item }: ListRenderItemInfo<Task>) {
    return (
      <TaskCard
        task={item}
        onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
      />
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header title="Tarefas" />

      <View style={styles.toolbar}>
        <View style={styles.searchRow}>
          <CustomInput
            placeholder="Buscar tarefas..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={styles.searchInput}
          />
          <CustomButton
            label="+ Nova"
            onPress={() => navigation.navigate('TaskForm', {})}
            variant="primary"
            style={styles.newBtn}
          />
        </View>
        <FilterBar active={filter} onChange={setFilter} />
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      ) : (
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.list,
            filteredTasks.length === 0 && styles.listEmpty,
          ]}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
          ListEmptyComponent={
            <EmptyState
              icon=""
              title="Nenhuma tarefa encontrada"
              description={
                filter !== 'todos'
                  ? 'Tente mudar o filtro ou criar uma nova tarefa.'
                  : 'Crie sua primeira tarefa agora!'
              }
              actionLabel="Criar tarefa"
              onAction={() => navigation.navigate('TaskForm', {})}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  toolbar: { gap: 0 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
  },
  searchInput: { flex: 1 },
  newBtn: { flexShrink: 0 },
  list: { padding: 16, paddingTop: 8 },
  listEmpty: { flexGrow: 1 },
  loader: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
