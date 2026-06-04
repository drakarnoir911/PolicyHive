import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PolicyHiveColors, PolicyHiveTypography } from '@/constants/design-system';
import { agentProfile, clients, followUps, policies } from '@/constants/mock-data';
import { useAuth } from '@/contexts/auth-context';

export default function ProfileScreen() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>TG</Text>
          </View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.name}>{agentProfile.fullName}</Text>
            <Text style={styles.subtitle}>Licensed Insurance Agent</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account</Text>
          <Text style={styles.line}>Email: {agentProfile.email}</Text>
          <Text style={styles.line}>Phone: {agentProfile.phone}</Text>
          <Text style={styles.line}>Territory: {agentProfile.territory}</Text>
          <Text style={styles.line}>License ID: {agentProfile.licenseId}</Text>
          <Text style={styles.line}>Joined: {agentProfile.joinDate}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Clients</Text>
            <Text style={styles.statValue}>{clients.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Policies</Text>
            <Text style={styles.statValue}>{policies.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Open Tasks</Text>
            <Text style={styles.statValue}>{followUps.filter((f) => !f.done).length}</Text>
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={() => void signOut()}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F2F8',
  },
  container: {
    padding: 16,
    gap: 12,
    paddingBottom: 120,
  },
  profileHero: {
    borderRadius: 18,
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F3763',
  },
  avatarText: {
    color: '#fff',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 18,
  },
  heroTextWrap: {
    flex: 1,
  },
  name: {
    color: PolicyHiveColors.navy900,
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 22,
  },
  subtitle: {
    color: '#72829C',
    fontFamily: PolicyHiveTypography.bodyRegular,
    marginTop: 2,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    gap: 7,
  },
  cardTitle: {
    color: '#17233B',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 18,
    marginBottom: 2,
  },
  line: {
    color: '#41506A',
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    color: '#72829C',
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 12,
  },
  statValue: {
    color: PolicyHiveColors.navy900,
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 24,
  },
  logoutBtn: {
    marginTop: 4,
    borderRadius: 12,
    backgroundColor: '#B42318',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutText: {
    color: '#fff',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 15,
  },
});
