import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBack, onBack, title }: HeaderProps) {
  const { colors } = useTheme();
  const { user, logout } = useAuth();

  const initials = user
    ? user.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : '?';

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={[styles.backIcon, { color: colors.accent }]}>←</Text>
          </TouchableOpacity>
        ) : null}
        <View>
          <Text style={[styles.title, { color: colors.text }]}>
            {title ?? `Olá, ${user?.name.split(' ')[0]}!`}
          </Text>
          {!title ? (
            <Text style={[styles.sub, { color: colors.textSecondary }]}>
              {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.right}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                user?.role === 'admin' ? colors.accentLight : colors.successBg,
            },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              {
                color:
                  user?.role === 'admin' ? colors.accent : colors.success,
              },
            ]}
          >
            {user?.role}
          </Text>
        </View>
        <View
          style={[styles.avatar, { backgroundColor: colors.accentLight }]}
        >
          <Text style={[styles.avatarText, { color: colors.accent }]}>
            {initials}
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          style={[
            styles.logoutBtn,
            { borderColor: colors.border, backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.logoutText, { color: colors.textSecondary }]}>
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  backBtn: {
    padding: 4,
    marginRight: 4,
  },
  backIcon: {
    fontSize: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  sub: {
    fontSize: 12,
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '500',
  },
  logoutBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  logoutText: {
    fontSize: 13,
  },
});
