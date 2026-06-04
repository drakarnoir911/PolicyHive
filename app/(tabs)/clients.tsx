import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

import { formatCurrency, getPolicyCommission, policies, type PolicyStatus } from '@/constants/mock-data';
import { useAppColorScheme } from '@/contexts/color-scheme-context';
import { darkTheme, lightTheme, g, FadeIn, Divider, W, H } from '@/components/SharedUI';

function getRenewalStatus(renewalDate: string) {
const [y, m, d] = renewalDate.split('-').map(Number);
const target = new Date(y, (m || 1) - 1, d || 1);
const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const diff = Math.round((target.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

if (diff < 0) return { label: `${Math.abs(diff)}d overdue`, state: 'danger' as const };
if (diff === 0) return { label: 'Due today', state: 'warning' as const };
if (diff <= 30) return { label: `${diff}d left`, state: 'warning' as const };
return { label: `${diff}d left`, state: 'safe' as const };
}

type Filter = 'All' | PolicyStatus;

export default function PoliciesScreen() {
const router = useRouter();
const { mode, setMode } = useAppColorScheme();
const isDark = mode === 'dark';
const t = isDark ? darkTheme : lightTheme;
const [filter, setFilter] = useState('All');

const filtered = useMemo(() => {
if (filter === 'All') return policies;
return policies.filter((policy) => policy.status === filter);
}, [filter]);

return (
<View style={{ flex: 1, backgroundColor: t.bg }}>
<View style={[g.blob, { width: 340, height: 340, backgroundColor: t.blobB, top: -120, left: -80 }]} />
<View style={[g.blob, { width: 380, height: 380, backgroundColor: t.blobA, bottom: 80, right: -160 }]} />
<View style={[g.blob, { width: 220, height: 220, backgroundColor: t.blobC, top: H * 0.4, left: W * 0.2, opacity: 0.25 }]} />

  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={g.scroll} showsVerticalScrollIndicator={false}>
      <FadeIn delay={0}>
        <View style={g.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={[g.headerTitle, { color: t.text }]}>Policies</Text>
            <Text style={[g.headerCaption, { color: t.textMid }]}>All / Active / Lapsed / Due visibility.</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 }}>
            <Pressable style={[g.actionBtn, { backgroundColor: t.tealDim, borderColor: t.teal + '35' }]} onPress={() => setMode(isDark ? 'light' : 'dark')}>
              <Text style={[g.actionText, { color: t.teal }]}>{isDark ? '☀️' : '🌙'}</Text>
            </Pressable>
            <Pressable style={[g.actionBtn, { backgroundColor: t.tealDim, borderColor: t.teal + '35' }]} onPress={() => router.push('/policy/new')}>
              <Text style={[g.actionText, { color: t.teal }]}>+ Add</Text>
            </Pressable>
          </View>
        </View>
      </FadeIn>

      <FadeIn delay={80}>
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {(['All', 'Active', 'Lapsed', 'Due'] as const).map((item) => {
            const active = filter === item;
            return (
              <Pressable key={item} onPress={() => setFilter(item)} style={[{ borderRadius: 999, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 8 }, { backgroundColor: active ? t.tealDim : t.bgCard3, borderColor: active ? t.teal + '40' : t.borderSub }]}>
                <Text style={[{ fontWeight: '500', fontSize: 12, letterSpacing: 0.2 }, { color: active ? t.teal : t.textMid }]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>
      </FadeIn>

      <View style={{ gap: 14 }}>
        {filtered.map((policy, i) => {
          const status = getRenewalStatus(policy.renewalDate);
          const statusColors = {
            danger: { bg: t.redDim, border: t.red + '40', text: t.red },
            warning: { bg: t.goldDim, border: t.gold + '40', text: t.gold },
            safe: { bg: t.bgCard3, border: t.borderSub, text: t.textMid },
          };
          const activeColor = statusColors[status.state];

          return (
            <FadeIn key={policy.id} delay={140 + (i * 50)}>
              <Pressable onPress={() => router.push({ pathname: '/policy/[id]', params: { id: policy.id } })}>
                <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, borderRadius: 22, backgroundColor: t.bgCard2 }]}>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                    <Text style={[{ fontWeight: '700', fontSize: 17, letterSpacing: -0.2, flex: 1 }, { color: t.text }]} numberOfLines={1}>{policy.policyName}</Text>
                    <View style={[{ borderRadius: 999, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4 }, { backgroundColor: activeColor.bg, borderColor: activeColor.border }]}>
                      <Text style={[{ fontWeight: '500', fontSize: 10, letterSpacing: 0.5, textTransform: 'uppercase' }, { color: activeColor.text }]}>{status.label}</Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
                    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={t.textMid} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <Circle cx="12" cy="7" r="4" />
                    </Svg>
                    <Text style={[{ fontWeight: '500', fontSize: 13 }, { color: t.textMid }]}>{policy.clientName} • {policy.insurer}</Text>
                  </View>
                  
                  <Divider t={t} />
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                      <Text style={[{ fontWeight: '700', fontSize: 9, letterSpacing: 1.2, marginBottom: 4 }, { color: t.textDim }]}>ANNUAL PREMIUM</Text>
                      <Text style={[{ fontWeight: '700', fontSize: 16, letterSpacing: -0.3 }, { color: t.text }]}>{formatCurrency(policy.annualPremium)}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={[{ fontWeight: '700', fontSize: 9, letterSpacing: 1.2, marginBottom: 4 }, { color: t.textDim }]}>COMMISSION ({policy.commissionRate}%)</Text>
                      <Text style={[{ fontWeight: '700', fontSize: 16, letterSpacing: -0.3 }, { color: t.gold }]}>{formatCurrency(getPolicyCommission(policy))}</Text>
                    </View>
                  </View>

                </BlurView>
              </Pressable>
            </FadeIn>
          );
        })}
        
        {filtered.length === 0 && (
          <FadeIn delay={200}>
            <View style={{ alignItems: 'center', paddingVertical: 40, gap: 12 }}>
              <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: t.bgCard3, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: t.borderSub }}>
                <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke={t.textDim} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <Rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                  <Path d="M3 9h18" />
                  <Path d="m9 22 3-3 3 3" />
                </Svg>
              </View>
              <Text style={{ color: t.textMid, fontWeight: '500', fontSize: 15 }}>No policies found.</Text>
            </View>
          </FadeIn>
        )}
      </View>

    </ScrollView>
  </SafeAreaView>
</View>


);
}