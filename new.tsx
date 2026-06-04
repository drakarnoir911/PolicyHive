import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';

import { PolicyHiveTypography } from '@/constants/design-system';
import { useAppColorScheme } from '@/contexts/color-scheme-context';
import { darkTheme, lightTheme, g } from '@/components/SharedUI';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function NewClientScreen() {
  const router = useRouter();
  const { mode, setMode } = useAppColorScheme();
  const isDark = mode === 'dark';
  const t = isDark ? darkTheme : lightTheme;
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [policyStartDate, setPolicyStartDate] = useState('');

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: t.bg }]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headerTitle, { color: t.text }]}>New Client</Text>
            <Text style={[styles.headerCaption, { color: t.textMid }]}>Capture profile and milestone dates for nudges.</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <ThemeToggle isDark={isDark} onToggle={() => setMode(isDark ? 'light' : 'dark')} t={t} />
            <Pressable onPress={() => router.back()} style={[styles.closeButton, { borderColor: t.border }]}>
              <X size={20} color={t.text} strokeWidth={2.5} />
            </Pressable>
          </View>
        </View>

        <BlurView intensity={t.blurIntensity} tint={t.blurTint} style={[styles.card, { backgroundColor: t.bgCard2, borderColor: t.border }]}>
          <Field label="Full Name" value={fullName} onChangeText={setFullName} t={t} />
          <Field label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" t={t} />
          <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" t={t} />
          <Field label="DOB (YYYY-MM-DD)" value={dob} onChangeText={setDob} t={t} />
          <Field
            label="Policy Start Date (YYYY-MM-DD)"
            value={policyStartDate}
            onChangeText={setPolicyStartDate}
            t={t}
          />

          <Pressable
            style={[styles.saveButton, { backgroundColor: t.teal }]}
            onPress={() => Alert.alert('Saved', 'Client draft saved locally. Connect API next.') }>
            <Text style={styles.saveButtonText}>Save Client</Text>
          </Pressable>
        </BlurView>
      </ScrollView>
    </SafeAreaView>
  );
}

type Theme = ReturnType<typeof lightTheme>;

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  t: Theme;
};

function Field({ label, value, onChangeText, keyboardType = 'default', t }: FieldProps) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={[styles.label, { color: t.textMid }]}>{label}</Text>
      <TextInput
        style={[styles.input, { backgroundColor: t.bgCard2, borderColor: t.border, color: t.text }]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
        placeholderTextColor={t.textMid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 16, gap: 10, paddingBottom: 30 },
  headerTitle: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 32,
  },
  headerCaption: {
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 12,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    gap: 10,
  },
  fieldWrap: { gap: 6 },
  label: {
    fontFamily: PolicyHiveTypography.bodyMedium,
    fontSize: 13,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: PolicyHiveTypography.bodyRegular,
  },
  saveButton: {
    marginTop: 6,
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 15,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

