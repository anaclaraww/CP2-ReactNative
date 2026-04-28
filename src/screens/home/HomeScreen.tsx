import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { HomeStackParamList } from '../../types/navigation';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTaskContext } from '../../context/TaskContext';
import { fetchMotivationalQuote, Quote } from '../../services/api';
import { Header } from '../../components/Header';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeScreen'>;

export function HomeScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user } = useAuth();
  const { tasks } = useTaskContext();
  const tabBarHeight = useBottomTabBarHeight();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(false);

  useEffect(() => {
    setQuoteLoading(true);
    setQuoteError(false);
    fetchMotivationalQuote()
      .then((q) => setQuote(q))
      .catch(() => setQuoteError(true))
      .finally(() => setQuoteLoading(false));
  }, []);

  const total = tasks.length;
  const pendentes = tasks.filter((t) => t.status === 'pendente').length;
  const emAndamento = tasks.filter((t) => t.status === 'em_andamento').length;
  const concluidas = tasks.filter((t) => t.status === 'concluida').length;

  const stats = [
    { label: 'Total', value: total, color: colors.accent },
    { label: 'Pendentes', value: pendentes, color: colors.warning },
    { label: 'Em andamento', value: emAndamento, color: colors.progress },
    { label: 'Concluídas', value: concluidas, color: colors.success },
  ];

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: tabBarHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.greeting}>
          <Text style={[styles.greetingText, { color: colors.text }]}>
            Olá, {user?.name.split(' ')[0]}! 👋
          </Text>
          <Text style={[styles.greetingSub, { color: colors.textSecondary }]}>
            Veja como estão suas tarefas hoje
          </Text>
        </View>

        <View
          style={[
            styles.quoteCard,
            {
              backgroundColor: colors.accentLight,
              borderLeftColor: colors.accent,
            },
          ]}
        >
          {quoteLoading ? (
            <View style={styles.quoteLoading}>
              <ActivityIndicator size="small" color={colors.accent} />
              <Text style={[styles.quoteLoadingText, { color: colors.accent }]}>
                Buscando frase motivacional...
              </Text>
            </View>
          ) : quoteError ? (
            <Text style={[styles.quoteText, { color: colors.accentDark }]}>
              Não foi possível carregar a frase. Tente novamente!
            </Text>
          ) : quote ? (
            <>
              <Text style={[styles.quoteText, { color: colors.accentDark }]}>
                "{quote.text}"
              </Text>
              <Text style={[styles.quoteAuthor, { color: colors.accent }]}>
                — {quote.author}
              </Text>
            </>
          ) : null}
        </View>

        <View style={styles.statsGrid}>
          {stats.map((s) => (
            <View
              key={s.label}
              style={[
                styles.statCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.statValue, { color: s.color }]}>
                {s.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.ctaBtn, { backgroundColor: colors.accent }]}
          onPress={() => navigation.getParent()?.navigate('Tasks')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaBtnText}>Ver todas as tarefas →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, gap: 16 },
  greeting: { gap: 4 },
  greetingText: { fontSize: 22, fontWeight: '600' },
  greetingSub: { fontSize: 14 },
  quoteCard: {
    borderLeftWidth: 3,
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  quoteLoading: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  quoteLoadingText: { fontSize: 13 },
  quoteText: { fontSize: 14, lineHeight: 20, fontStyle: 'italic' },
  quoteAuthor: { fontSize: 13, fontWeight: '500' },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    width: '47%',
    borderRadius: 14,
    borderWidth: 0.5,
    padding: 14,
    gap: 4,
  },
  statValue: { fontSize: 28, fontWeight: '600' },
  statLabel: { fontSize: 13 },
  ctaBtn: {
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
  },
  ctaBtnText: { color: '#fff', fontSize: 15, fontWeight: '500' },
});
