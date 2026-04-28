export type TaskStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetail: { taskId: string };
};

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};

export type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Settings: undefined;
};
