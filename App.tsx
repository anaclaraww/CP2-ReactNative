import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { AppRoutes } from './src/routes/AppRoutes';

function ThemedNavigation() {
  const { colors } = useTheme();
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: colors.accent,
          background: colors.background,
          card: colors.surface,
          text: colors.text,
          border: colors.border,
          notification: colors.danger,
        },
      }}
    >
      <AppRoutes />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <ThemedNavigation />
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
