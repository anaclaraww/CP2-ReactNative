import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../components/Header';
import { CustomButton } from '../../components/CustomButton';
import { Tratamento } from '../../types/user';

const TRATAMENTOS: Tratamento[] = ['Sr.', 'Sra.', 'Srta.'];

export function SettingsScreen() {
  const { colors, darkMode, toggleTheme } = useTheme();
  const { user, tratamento, setTratamento, logout } = useAuth();

  const initials = user
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header title="Configurações" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: colors.accentLight }]}>
              <Text style={[styles.avatarText, { color: colors.accent }]}>
                {initials}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: colors.text }]}>
                {user?.name}
              </Text>
              <Text style={[styles.profileRole, { color: colors.textSecondary }]}>
                {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
              </Text>
            </View>
          </View>

          <View
            style={[styles.divider, { borderBottomColor: colors.border }]}
          />

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              Tratamento
            </Text>
            <View style={styles.tratamentoOptions}>
              {TRATAMENTOS.map((t) => (
                <TouchableOpacity
                  key={t}
                  onPress={() => setTratamento(t)}
                  activeOpacity={0.8}
                  style={[
                    styles.tratBtn,
                    {
                      backgroundColor:
                        tratamento === t ? colors.accent : colors.inputBg,
                      borderColor:
                        tratamento === t ? colors.accent : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tratBtnText,
                      {
                        color: tratamento === t ? '#fff' : colors.textSecondary,
                      },
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Aparência
          </Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                Tema escuro
              </Text>
              <Text style={[styles.settingDesc, { color: colors.textSecondary }]}>
                Alterna entre modo claro e escuro
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.accent }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Conta
          </Text>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Usuário
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.username}
            </Text>
          </View>
          <View style={[styles.divider, { borderBottomColor: colors.border }]} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Perfil
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {user?.role}
            </Text>
          </View>
          <View style={[styles.divider, { borderBottomColor: colors.border }]} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              ID
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              #{user?.id}
            </Text>
          </View>
        </View>

        <CustomButton
          label="Sair da conta"
          onPress={logout}
          variant="danger"
          fullWidth
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 14 },
  card: {
    borderRadius: 16,
    borderWidth: 0.5,
    padding: 16,
    gap: 12,
  },
  sectionTitle: { fontSize: 15, fontWeight: '500' },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '600' },
  profileInfo: { gap: 2 },
  profileName: { fontSize: 16, fontWeight: '500' },
  profileRole: { fontSize: 13 },
  divider: { borderBottomWidth: 0.5 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingLabel: { fontSize: 15 },
  settingDesc: { fontSize: 12, marginTop: 2 },
  tratamentoOptions: { flexDirection: 'row', gap: 6 },
  tratBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  tratBtnText: { fontSize: 13, fontWeight: '500' },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: { fontSize: 14 },
  infoValue: { fontSize: 14, fontWeight: '500' },
});
