import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import {
  Sun,
  Moon,
  RefreshCcw,
  TrendingUp,
  Shield,
  Briefcase,
  Building2,
  ArrowRight,
} from 'lucide-react-native';
import { useAppColorScheme } from '@/contexts/color-scheme-context';
import { agentProfile } from '@/constants/mock-data';
import { darkTheme, lightTheme, g, FadeIn, Divider, Tag, Theme } from '@/components/SharedUI';

type IconType = React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

type TrendRow = {
  id: string;
  Icon: IconType;
  label: string;
  value: string;
  pct: number;
  color: string;
  bg: string;
  delta: string;
  positive: boolean;
};

type RecCard = {
  id: string;
  title: string;
  sub: string;
  tags: string[];
  amt: string;
  company: string;
  color: string;
  bg: string;
  icon: IconType;
};

const policies = [{ annualPremium: 610 }, { annualPremium: 430 }, { annualPremium: 750 }, { annualPremium: 460 }];
const followUps = [{ done: false }, { done: false }, { done: false }, { done: true }];
const clients = [{ fullName: 'Alice Johnson' }];

const recommendations: RecCard[] = [
  { id: '1', title: 'Auto Renewal', sub: 'Premium policy', tags: ['Renewal', 'Full-time'], amt: '583', company: 'PolicyCo', color: '#D97706', bg: 'rgba(249, 115, 22, 0.15)', icon: Building2 },
  { id: '2', title: 'New Business', sub: 'Growth package', tags: ['New', 'Remote'], amt: '216', company: 'BizGroup', color: '#14B8A6', bg: 'rgba(20, 184, 166, 0.15)', icon: TrendingUp },
  { id: '3', title: 'Claims Support', sub: 'Active claim', tags: ['Claims', 'Urgent'], amt: '362', company: 'ClaimsCo', color: '#7C3AED', bg: 'rgba(124, 58, 237, 0.15)', icon: Shield },
];

const formatCurrency = (val: number) => `$${val.toLocaleString()}`;

export default function DashboardScreen() {
  const { mode, setMode } = useAppColorScheme();
  const isDark = mode === 'dark';
  const t: Theme = isDark ? darkTheme : lightTheme;

  const totalBudget = useMemo(() => policies.reduce((sum, item) => sum + item.annualPremium, 0), []);
  const spentBudget = Math.round(totalBudget * 0.46);
  const leftBudget = totalBudget - spentBudget;
  const spentPct = Math.round((spentBudget / totalBudget) * 100);
  const pendingFU = followUps.filter((item) => !item.done).length;
  const commissionMTD = 450;

  const trendRows: TrendRow[] = useMemo(
    () => [
      { id: '1', Icon: RefreshCcw, label: 'Renewals', value: formatCurrency(583), pct: 96, color: t.teal, bg: t.tealDim, delta: '+4.2%', positive: true },
      { id: '2', Icon: TrendingUp, label: 'New Business', value: formatCurrency(216), pct: 50, color: t.gold, bg: t.goldDim, delta: '+2.1%', positive: true },
      { id: '3', Icon: Shield, label: 'Claims', value: formatCurrency(362), pct: 48, color: t.violet, bg: t.violetDim, delta: '-1.4%', positive: false },
      { id: '4', Icon: Briefcase, label: 'Cross-Sell', value: formatCurrency(194), pct: 42, color: t.coral, bg: t.redDim, delta: '+0.8%', positive: true },
    ],
    [t]
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[g.blob, { width: 320, height: 320, backgroundColor: t.blobB, top: -110, left: -80 }]} />
      <View style={[g.blob, { width: 360, height: 360, backgroundColor: t.blobA, bottom: -120, right: -120, opacity: 0.3 }]} />
      <View style={[g.blob, { width: 180, height: 180, backgroundColor: t.blobC, top: 160, right: -40, opacity: 0.22 }]} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={g.scroll} showsVerticalScrollIndicator={false}>
          <FadeIn delay={0}>
            <View style={[g.topRow, styles.topHeaderRow]}>
              <View style={{ flex: 1 }}>
                <Text style={[g.headerTitle, { color: t.text }]}>PolicyHive</Text>
                <Text style={[g.headerCaption, { color: t.textMid }]}>Renewals, claims, and portfolio health in one place.</Text>
              </View>
              <View style={styles.headerActions}>
                <Pressable
                  onPress={() => {
                    // placeholder profile action
                  }}
                  style={[styles.profileBtn, { backgroundColor: t.bgCard, borderColor: t.border }]}
                >
                  <Text style={[styles.profileInitials, { color: t.text }]}>
                    {agentProfile.fullName
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setMode(isDark ? 'light' : 'dark')}
                  style={[g.iconBtn, { borderColor: t.border, backgroundColor: t.bgCard }]}
                >
                  {isDark ? <Sun size={18} color={t.gold} /> : <Moon size={18} color={t.teal} />}
                </Pressable>
              </View>
            </View>
          </FadeIn>

          <FadeIn delay={160}>
            <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
              <Text style={[g.cardTitle, { color: t.text }]}>Renewal Snapshot</Text>
              <Divider t={t} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <View>
                  <Text style={{ color: t.textMid, fontSize: 12, marginBottom: 6 }}>Available budget</Text>
                  <Text style={{ color: t.text, fontSize: 32, fontWeight: '800' }}>{formatCurrency(leftBudget)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: t.gold, fontWeight: '700', fontSize: 12 }}>+46% used</Text>
                  <Text style={{ color: t.textMid, fontSize: 12 }}>{formatCurrency(totalBudget)} total</Text>
                </View>
              </View>
            </BlurView>
          </FadeIn>

          <FadeIn delay={160}>
            <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
              <Text style={[g.cardTitle, { color: t.text }]}>Key metrics</Text>
              <Divider t={t} />
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 }}>
                <View style={[styles.metricPill, { backgroundColor: t.bgCard, borderColor: t.border }]}>
                  <Text style={[styles.metricLabel, { color: t.textMid }]}>Follow-ups</Text>
                  <Text style={[styles.metricValue, { color: t.text }]}>{pendingFU}</Text>
                </View>
                <View style={[styles.metricPill, { backgroundColor: t.bgCard, borderColor: t.border }]}>
                  <Text style={[styles.metricLabel, { color: t.textMid }]}>Policies</Text>
                  <Text style={[styles.metricValue, { color: t.text }]}>{policies.length}</Text>
                </View>
                <View style={[styles.metricPill, { backgroundColor: t.bgCard, borderColor: t.border }]}>
                  <Text style={[styles.metricLabel, { color: t.textMid }]}>Commission</Text>
                  <Text style={[styles.metricValue, { color: t.text }]}>{formatCurrency(commissionMTD)}</Text>
                </View>
              </View>
            </BlurView>
          </FadeIn>

          <FadeIn delay={240}>
            <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
              <Text style={[g.cardTitle, { color: t.text }]}>Recommendations</Text>
              <Divider t={t} />
              <View style={{ marginTop: 12 }}>
                {recommendations.map((card, index) => (
                  <View key={card.id} style={[styles.recCard, { backgroundColor: t.bgCard, borderColor: t.border, marginBottom: index === recommendations.length - 1 ? 0 : 12 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <card.icon size={18} color={card.color} />
                        <Text style={[styles.recTitle, { color: t.text, marginLeft: 10 }]}>{card.title}</Text>
                      </View>
                      <Pressable style={[styles.iconBtn, { backgroundColor: card.bg }]}>
                        <ArrowRight size={18} color={card.color} />
                      </Pressable>
                    </View>
                    <Text style={[styles.recSub, { color: t.textMid }]}>{card.sub}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                      {card.tags.map((tag, index) => (
                        <View key={`${card.id}-${index}`} style={{ marginRight: 8, marginBottom: 8 }}>
                          <Tag label={tag} accent={tag === 'Renewal'} t={t} />
                        </View>
                      ))}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
                      <Text style={[styles.recAmount, { color: card.color }]}>{card.amt}</Text>
                      <Text style={[styles.recCompany, { color: t.textMid }]}>{card.company}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </BlurView>
          </FadeIn>

          <FadeIn delay={320}>
            <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
              <Text style={[g.cardTitle, { color: t.text }]}>Spending trends</Text>
              <Divider t={t} />
              <View style={{ marginTop: 12 }}>
                {trendRows.map((row, index) => (
                  <View key={row.id} style={[styles.trendRow, { borderColor: t.border, backgroundColor: t.bgCard, marginBottom: index === trendRows.length - 1 ? 0 : 12 }]}>
                    <View style={styles.trendIconBox}>
                      <row.Icon size={18} color={row.color} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={[styles.trendLabel, { color: t.text }]}>{row.label}</Text>
                      <View style={styles.progressBarBackground}>
                        <View style={[styles.progressBarFill, { width: `${row.pct}%`, backgroundColor: row.color }]} />
                      </View>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={[styles.trendValue, { color: t.text }]}>{row.value}</Text>
                      <Text style={[styles.trendDelta, { color: row.positive ? t.teal : t.red }]}>{row.delta}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </BlurView>
          </FadeIn>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  topHeaderRow: {
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  profileInitials: {
    fontSize: 14,
    fontWeight: '800',
  },
  metricPill: {
    flex: 1,
    minWidth: 160,
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    marginBottom: 12,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  recCard: {
    borderRadius: 28,
    borderWidth: 1,
    padding: 18,
  },
  recTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  recSub: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  recAmount: {
    fontSize: 26,
    fontWeight: '800',
  },
  recCompany: {
    fontSize: 12,
    fontWeight: '700',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendRow: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendIconBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: '800',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  profileDetail: {
    fontSize: 13,
    fontWeight: '500',
  },
  trendLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 999,
  },
  trendValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  trendDelta: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
  },
});
