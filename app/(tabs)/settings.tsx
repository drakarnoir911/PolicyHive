import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import { agentProfile } from '@/constants/mock-data';
import { useAuth } from '@/contexts/auth-context';
import { useAppColorScheme } from '@/contexts/color-scheme-context';
import { PolicyHiveTypography } from '@/constants/design-system';
import { darkTheme, lightTheme, g, FadeIn, Divider, Theme, W, H } from '@/components/SharedUI';
import { ThemeToggle } from '@/components/ThemeToggle';

function Toggle({ label, value, onChange, t, isLast = false }: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
  t: Theme;
  isLast?: boolean;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
        },
        isLast && { marginBottom: 0 },
      ]}
    >
      <Text
        style={{
          fontFamily: PolicyHiveTypography.bodyMedium,
          fontSize: 15,
          color: t.textMid,
        }}
      >
        {label}
      </Text>

      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: t.border, true: t.teal }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function SettingsScreen() {
const { signOut, userEmail } = useAuth();
const { mode, setMode } = useAppColorScheme();
const isDark = mode === 'dark';
const t = isDark ? darkTheme : lightTheme;

const [birthdayPush, setBirthdayPush] = useState(true);
const [anniversaryPush, setAnniversaryPush] = useState(true);
const [renewalPush, setRenewalPush] = useState(true);
const [followupPush, setFollowupPush] = useState(true);
const [lapsePush, setLapsePush] = useState(true);

return (
<View style={{ flex: 1, backgroundColor: t.bg }}>
<View style={[g.blob, { width: 340, height: 340, backgroundColor: t.blobA, top: -100, right: -120 }]} />
<View style={[g.blob, { width: 380, height: 380, backgroundColor: t.blobC, bottom: -50, left: -160 }]} />
<View style={[g.blob, { width: 220, height: 220, backgroundColor: t.blobB, top: H * 0.4, right: W * 0.2, opacity: 0.25 }]} />

  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={g.scroll} showsVerticalScrollIndicator={false}>
      <FadeIn delay={0}>
        <View style={g.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={[g.headerTitle, { color: t.text }]}>Settings</Text>
            <Text style={[g.headerCaption, { color: t.textMid }]}>Profile, defaults, and preferences.</Text>
          </View>
          <View style={{ marginTop: 4 }}>
            <ThemeToggle isDark={isDark} onToggle={() => setMode(isDark ? 'light' : 'dark')} t={t} />
          </View>
        </View>
      </FadeIn>

      <FadeIn delay={80}>
        <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
          <Text style={[g.cardTitle, { color: t.text }]}>Agent Profile</Text>
          <Divider t={t} marginVertical={14} />
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyBold, fontSize: 10, letterSpacing: 1.2, color: t.textDim }}>NAME</Text>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 14, color: t.text }}>{agentProfile.fullName}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyBold, fontSize: 10, letterSpacing: 1.2, color: t.textDim }}>EMAIL</Text>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 14, color: t.text }}>{userEmail ?? agentProfile.email}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyBold, fontSize: 10, letterSpacing: 1.2, color: t.textDim }}>AGENCY</Text>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 14, color: t.text }}>{agentProfile.agencyName}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyBold, fontSize: 10, letterSpacing: 1.2, color: t.textDim }}>LICENSE</Text>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 14, color: t.text }}>{agentProfile.licenseId}</Text>
          </View>
        </BlurView>
      </FadeIn>

      <FadeIn delay={140}>
        <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
          <Text style={[g.cardTitle, { color: t.text }]}>Commission Defaults</Text>
          <Divider t={t} marginVertical={14} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 15, color: t.textMid }}>Default Rate</Text>
            <View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, backgroundColor: t.goldDim, borderColor: t.gold + '40' }}>
              <Text style={{ color: t.gold, fontFamily: PolicyHiveTypography.bodyBold, fontSize: 14 }}>{agentProfile.commissionDefaultRate}%</Text>
            </View>
          </View>
          <Text style={{ fontFamily: PolicyHiveTypography.bodyRegular, fontSize: 12, color: t.textDim, marginTop: 10 }}>New policies will auto-fill with this rate.</Text>
        </BlurView>
      </FadeIn>

      <FadeIn delay={200}>
        <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}>
          <Text style={[g.cardTitle, { color: t.text }]}>Notifications</Text>
          <Divider t={t} marginVertical={14} />
          <Toggle label="Birthdays" value={birthdayPush} onChange={setBirthdayPush} t={t} />
          <Toggle label="Policy anniversaries" value={anniversaryPush} onChange={setAnniversaryPush} t={t} />
          <Toggle label="Renewals due" value={renewalPush} onChange={setRenewalPush} t={t} />
          <Toggle label="Follow-up reminders" value={followupPush} onChange={setFollowupPush} t={t} />
          <Toggle label="Lapse alerts" value={lapsePush} onChange={setLapsePush} t={t} isLast />
        </BlurView>
      </FadeIn>

      <FadeIn delay={260}>
        <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}> 
          <Text style={[g.cardTitle, { color: t.text }]}>Locale & Theme</Text>
          <Divider t={t} marginVertical={14} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 15, color: t.textMid }}>Currency</Text>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 14, color: t.text }}>{agentProfile.currency}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 15, color: t.textMid }}>Date format</Text>
            <Text style={{ fontFamily: PolicyHiveTypography.bodyMedium, fontSize: 14, color: t.text }}>{agentProfile.dateFormat}</Text>
          </View>
        </BlurView>
      </FadeIn>

      <FadeIn delay={320}>
        <Pressable style={{ borderRadius: 16, borderWidth: 1, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', marginTop: 8, backgroundColor: t.redDim, borderColor: t.red + '40' }} onPress={() => void signOut()}>
          <Text style={{ fontFamily: PolicyHiveTypography.bodyBold, fontSize: 15, letterSpacing: 0.5, color: t.red }}>Log Out</Text>
        </Pressable>
      </FadeIn>
    </ScrollView>
  </SafeAreaView>
</View>


);
}