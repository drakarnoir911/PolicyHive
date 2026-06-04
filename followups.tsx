import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PolicyHiveColors, PolicyHiveTypography } from '@/constants/design-system';
import { followUps as seedFollowUps } from '@/constants/mock-data';
import { useAppColorScheme } from '@/contexts/color-scheme-context';

export default function FollowUpsScreen() {
  const { mode } = useAppColorScheme();
  const isDark = mode === 'dark';
  const [doneIds, setDoneIds] = useState<string[]>(
    seedFollowUps.filter((item) => item.done).map((item) => item.id)
  );

  const followUps = useMemo(
    () =>
      seedFollowUps.map((item) => ({
        ...item,
        done: doneIds.includes(item.id),
      })),
    [doneIds]
  );

  return (
    <SafeAreaView style={[styles.safeArea, isDark ? styles.safeAreaDark : null]}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.headerTitle, isDark ? styles.headerTitleDark : null]}>Follow-ups</Text>
        <Text style={[styles.headerCaption, isDark ? styles.headerCaptionDark : null]}>
          Tap a row to mark done/open.
        </Text>

        {followUps.map((item) => (
          <Pressable
            key={item.id}
            style={[styles.itemCard, isDark ? styles.itemCardDark : null]}
            onPress={() =>
              setDoneIds((prev) =>
                prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
              )
            }>
            <View style={styles.itemHeader}>
              <Text style={[styles.itemTitle, isDark ? styles.itemTitleDark : null]}>{item.title}</Text>
              <Text style={[styles.badge, item.done ? styles.badgeDone : styles.badgeOpen]}>
                {item.done ? 'Done' : 'Open'}
              </Text>
            </View>
            <Text style={[styles.itemMeta, isDark ? styles.itemMetaDark : null]}>
              {item.clientName} • {item.priority} • Due {item.dueDate}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F2F8',
  },
  safeAreaDark: {
    backgroundColor: '#0C1422',
  },
  container: {
    padding: 16,
    gap: 10,
    paddingBottom: 120,
  },
  headerTitle: {
    color: PolicyHiveColors.navy900,
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 32,
  },
  headerTitleDark: {
    color: '#ECF2FF',
  },
  headerCaption: {
    color: '#7E8AA2',
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 12,
    marginBottom: 6,
  },
  headerCaptionDark: {
    color: '#9CABBE',
  },
  itemCard: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    gap: 6,
  },
  itemCardDark: {
    backgroundColor: '#132238',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  itemTitle: {
    flex: 1,
    color: '#17233B',
    fontFamily: PolicyHiveTypography.bodyMedium,
    fontSize: 16,
  },
  itemTitleDark: {
    color: '#ECF2FF',
  },
  itemMeta: {
    color: '#6E7B94',
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 13,
  },
  itemMetaDark: {
    color: '#9CABBE',
  },
  badge: {
    borderRadius: 999,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 3,
    color: '#fff',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 11,
  },
  badgeDone: {
    backgroundColor: '#19A55F',
  },
  badgeOpen: {
    backgroundColor: '#E67E22',
  },
});
