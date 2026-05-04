import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../types/navigation';
import { HomeStackRoutes } from './HomeStackRoutes';
import { TaskStackRoutes } from './TaskStackRoutes';
import { SettingsStackRoutes } from './SettingsStackRoutes';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Tab = createBottomTabNavigator<TabParamList>();

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: focused ? 22 : 20 }}>{emoji}</Text>;
}

export function TabRoutes() {
  const { colors } = useTheme();
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={user?.role === 'admin' ? 'Settings' : 'Home'}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500', marginBottom: 2 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackRoutes}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="合" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskStackRoutes}
        options={{
          tabBarLabel: 'Tarefas',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="☑" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackRoutes}
        options={{
          tabBarLabel: 'Config',
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="⚙︎" focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
