  import React, { useState } from 'react';
  import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
  } from 'react-native';
  import { useTheme } from '../../context/ThemeContext';
  import { useAuth } from '../../context/AuthContext';
  import { CustomInput } from '../../components/CustomInput';
  import { CustomButton } from '../../components/CustomButton';
  import { useNavigation } from '@react-navigation/native';

  export function LoginScreen() {
    const { colors } = useTheme();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    async function handleLogin() {
      if (!username.trim() || !password.trim()) {
        setError('Preencha usuário e senha.');
        return;
      }
      setLoading(true);
      setError('');
      await new Promise((r) => setTimeout(r, 400));
      const userLogged = login(username.trim(), password.trim());

      setLoading(false);

      if (!userLogged) {
        setError('Usuário ou senha inválidos.');
        return;
      }
    }

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { backgroundColor: colors.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <Text style={styles.logo}>✅</Text>
            <Text style={[styles.appName, { color: colors.text }]}>TaskFlow</Text>
            <Text style={[styles.tagline, { color: colors.textSecondary }]}>
              Gerencie suas tarefas com facilidade
            </Text>
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <CustomInput
              label="Usuário"
              placeholder="Digite seu usuário"
              value={username}
              onChangeText={(v) => { setUsername(v); setError(''); }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <CustomInput
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={(v) => { setPassword(v); setError(''); }}
              secureTextEntry
            />

            {error ? (
              <Text style={[styles.error, { color: colors.danger }]}>{error}</Text>
            ) : null}

            <CustomButton
              label="Entrar"
              onPress={handleLogin}
              loading={loading}
              fullWidth
            />
          </View>

          <Text style={[styles.hint, { color: colors.textSecondary }]}>
            admin / 123 → Configurações {'  '}|{'  '} user / 123 → Home
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      gap: 24,
    },
    hero: {
      alignItems: 'center',
      gap: 6,
    },
    logo: {
      fontSize: 52,
      marginBottom: 4,
    },
    appName: {
      fontSize: 28,
      fontWeight: '600',
    },
    tagline: {
      fontSize: 14,
      textAlign: 'center',
    },
    card: {
      width: '100%',
      borderRadius: 16,
      borderWidth: 0.5,
      padding: 20,
      gap: 14,
    },
    error: {
      fontSize: 13,
      textAlign: 'center',
    },
    hint: {
      fontSize: 12,
      textAlign: 'center',
    },
  });
