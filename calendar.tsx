import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

import {
  CalendarEvent,
  getCalendarEvents,
  getEventsOnDate,
  getUpcomingEvents,
} from '@/constants/mock-data';
import { PolicyHiveTypography } from '@/constants/design-system';

import { useAppColorScheme } from '@/contexts/color-scheme-context';

import {
  darkTheme,
  lightTheme,
  g,
  FadeIn,
  Divider,
  Theme,
  W,
  H,
} from '@/components/SharedUI';
import { ThemeToggle } from '@/components/ThemeToggle';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function toISO(date: Date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

function monthDays(anchor: Date) {
  const y = anchor.getFullYear();
  const m = anchor.getMonth();

  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);

  const days: Date[] = [];

  const startOffset = first.getDay();

  for (let i = 0; i < startOffset; i++) {
    days.push(
      new Date(y, m, i - startOffset + 1)
    );
  }

  for (let day = 1; day <= last.getDate(); day++) {
    days.push(new Date(y, m, day));
  }

  while (days.length % 7 !== 0) {
    const tail = days[days.length - 1];

    days.push(
      new Date(
        tail.getFullYear(),
        tail.getMonth(),
        tail.getDate() + 1
      )
    );
  }

  return days;
}

function daysBetween(a: Date, b: Date) {
  return Math.round(
    (
      new Date(
        b.getFullYear(),
        b.getMonth(),
        b.getDate()
      ).getTime() -
      new Date(
        a.getFullYear(),
        a.getMonth(),
        a.getDate()
      ).getTime()
    ) / 86400000
  );
}

const styles = StyleSheet.create({
  monthHeader: {
    marginBottom: 14,
  },
  monthTitle: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 18,
  },
  monthSubtitle: {
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 12,
    marginTop: 4,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weekDay: {
    flex: 1,
    textAlign: 'center',
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 12,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: '13.7%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  dayNumber: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 14,
  },
  eventPillsRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginTop: 10,
  },
  eventBadge: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    marginRight: 12,
  },
  eventTitle: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 15,
  },
  eventMeta: {
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 12,
    marginTop: 2,
  },
  eventType: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 12,
  },
  upcomingRow: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginTop: 10,
  },
  sectionHeading: {
    fontFamily: PolicyHiveTypography.bodyBold,
    fontSize: 15,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 12,
  },
  moreDotText: {
    fontFamily: PolicyHiveTypography.bodyRegular,
    fontSize: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

function getEventColor(
  type: string,
  t: Theme
) {
  switch (type) {
    case 'birthday':
      return t.gold;

    case 'anniversary':
      return t.teal;

    case 'renewal':
      return t.orange;

    case 'followup':
      return t.violet;

    case 'lapse':
      return t.red;

    default:
      return t.textMid;
  }
}

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────

export default function CalendarScreen() {
  const { mode, setMode } =
    useAppColorScheme();

  const isDark = mode === 'dark';
  const t = isDark
    ? darkTheme
    : lightTheme;

  const today = useMemo(
    () => new Date(),
    []
  );

  const [selectedISO, setSelectedISO] =
    useState(toISO(today));

  const monthAnchor = useMemo(
    () =>
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      ),
    [today]
  );

  const days = useMemo(
    () => monthDays(monthAnchor),
    [monthAnchor]
  );

  const allEvents = useMemo(
    () => getCalendarEvents(today),
    [today]
  );

  const selectedDate = useMemo(() => {
    const [y, m, d] = selectedISO
      .split('-')
      .map(Number);

    return new Date(
      y,
      (m || 1) - 1,
      d || 1
    );
  }, [selectedISO]);

  const selectedEvents = useMemo(
    () =>
      getEventsOnDate(
        selectedDate,
        today
      ),
    [selectedDate, today]
  );

  const upcoming = useMemo(
    () =>
      getUpcomingEvents(
        30,
        today
      ),
    [today]
  );

  const grouped = useMemo(() => {
    const thisWeek: CalendarEvent[] = [];
    const next30Days: CalendarEvent[] = [];

    upcoming.forEach(evt => {
      const [y, m, d] = evt.date
        .split('-')
        .map(Number);

      const diff = daysBetween(
        today,
        new Date(
          y,
          (m || 1) - 1,
          d || 1
        )
      );

      if (diff >= 0 && diff <= 7) {
        thisWeek.push(evt);
      } else if (diff <= 30) {
        next30Days.push(evt);
      }
    });

    return {
      thisWeek,
      next30Days,
    };
  }, [today, upcoming]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: t.bg,
      }}
    >
      {/* Background Blobs */}

      <View
        style={[
          g.blob,
          {
            width: 320,
            height: 320,
            backgroundColor: t.blobB,
            top: -80,
            right: -100,
          },
        ]}
      />

      <View
        style={[
          g.blob,
          {
            width: 400,
            height: 400,
            backgroundColor: t.blobA,
            bottom: 0,
            left: -150,
          },
        ]}
      />

      <View
        style={[
          g.blob,
          {
            width: 200,
            height: 200,
            backgroundColor: t.blobC,
            top: H * 0.45,
            right: W * 0.1,
            opacity: 0.25,
          },
        ]}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={g.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <FadeIn delay={0}>
            <View style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}> 
              <View style={styles.headerRow}>
                <View style={{ flex: 1 }}>
                  <Text style={[g.cardTitle, { color: t.text }]}>Calendar</Text>
                  <Text style={{ color: t.textMid, marginTop: 6 }}>Track upcoming renewals, birthdays, and follow-ups.</Text>
                </View>
                <ThemeToggle isDark={isDark} onToggle={() => setMode(isDark ? 'light' : 'dark')} t={t} />
              </View>
            </View>
          </FadeIn>

          {/* Calendar Card */}
          <FadeIn delay={80}>
            <View style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}> 
              <View style={styles.monthHeader}>
                <Text style={[styles.monthTitle, { color: t.text }]}>{monthAnchor.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
                <Text style={[styles.monthSubtitle, { color: t.textMid }]}>{allEvents.length} events this month</Text>
              </View>
              <View style={styles.weekDaysRow}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text key={day} style={[styles.weekDay, { color: t.textMid }]}>{day}</Text>
                ))}
              </View>
              <View style={styles.calendarGrid}>
                {days.map((day) => {
                  const iso = toISO(day);
                  const events = allEvents.filter((event) => event.date === iso);
                  const isSelected = iso === selectedISO;
                  const isCurrentMonth = day.getMonth() === monthAnchor.getMonth();

                  return (
                    <Pressable
                      key={iso}
                      onPress={() => setSelectedISO(iso)}
                      style={[
                        styles.dayCell,
                        {
                          backgroundColor: isSelected ? t.bgCard : 'transparent',
                          borderColor: isSelected ? t.teal : 'transparent',
                        },
                      ]}
                    >
                      <Text style={[
                        styles.dayNumber,
                        { color: isCurrentMonth ? t.text : t.textMid },
                      ]}
                      >{day.getDate()}</Text>
                      <View style={styles.eventPillsRow}>
                        {events.slice(0, 3).map((event) => (
                          <View
                            key={event.id}
                            style={[styles.dot, { backgroundColor: getEventColor(event.type, t) }]}
                          />
                        ))}
                        {events.length > 3 ? (
                          <Text style={[styles.moreDotText, { color: t.textMid }]}>+{events.length - 3}</Text>
                        ) : null}
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <View style={styles.legendRow}>
                {[
                  { label: 'Birthday', type: 'birthday' },
                  { label: 'Anniversary', type: 'anniversary' },
                  { label: 'Renewal', type: 'renewal' },
                  { label: 'Follow-up', type: 'followup' },
                  { label: 'Lapse', type: 'lapse' },
                ].map((item) => (
                  <View key={item.type} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: getEventColor(item.type, t) }]} />
                    <Text style={[styles.legendLabel, { color: t.textMid }]}>{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </FadeIn>

          {/* Selected Day Events */}
          <FadeIn delay={140}>
            <View style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}> 
              <Text style={[g.cardTitle, { color: t.text }]}>Selected Day</Text>
              <Text style={{ color: t.textMid, marginTop: 6, marginBottom: 12 }}>{selectedISO}</Text>
              {selectedEvents.length === 0 ? (
                <Text style={{ color: t.textMid }}>No events scheduled for this date.</Text>
              ) : (
                selectedEvents.map((event) => (
                  <View key={event.id} style={[styles.eventRow, { borderColor: t.border, backgroundColor: t.bgCard }]}> 
                    <View style={[styles.eventBadge, { backgroundColor: getEventColor(event.type, t) }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.eventTitle, { color: t.text }]}>{event.title}</Text>
                      <Text style={[styles.eventMeta, { color: t.textMid }]}>{event.clientName}</Text>
                    </View>
                    <Text style={[styles.eventType, { color: t.textMid }]}>{event.type}</Text>
                  </View>
                ))
              )}
            </View>
          </FadeIn>

          {/* Upcoming Overview */}
          <FadeIn delay={200}>
            <View style={[g.card, { borderColor: t.border, backgroundColor: t.bgCard2 }]}> 
              <Text style={[g.cardTitle, { color: t.text }]}>Upcoming</Text>
              <Text style={{ color: t.textMid, marginTop: 6, marginBottom: 12 }}>This week and next 30 days.</Text>
              {grouped.thisWeek.length === 0 ? (
                <Text style={{ color: t.textMid }}>No events this week.</Text>
              ) : (
                grouped.thisWeek.map((event) => (
                  <View key={event.id} style={[styles.upcomingRow, { borderColor: t.border, backgroundColor: t.bgCard }]}> 
                    <Text style={[styles.eventTitle, { color: t.text }]}>{event.title}</Text>
                    <Text style={[styles.eventMeta, { color: t.textMid }]}>{event.clientName}</Text>
                    <Text style={[styles.eventType, { color: getEventColor(event.type, t) }]}>{event.date}</Text>
                  </View>
                ))
              )}
              {grouped.next30Days.length > 0 && (
                <>
                  <Text style={[styles.sectionHeading, { color: t.text, marginTop: 16 }]}>Next 30 days</Text>
                  {grouped.next30Days.map((event) => (
                    <View key={event.id} style={[styles.upcomingRow, { borderColor: t.border, backgroundColor: t.bgCard }]}> 
                      <Text style={[styles.eventTitle, { color: t.text }]}>{event.title}</Text>
                      <Text style={[styles.eventMeta, { color: t.textMid }]}>{event.clientName}</Text>
                      <Text style={[styles.eventType, { color: getEventColor(event.type, t) }]}>{event.date}</Text>
                    </View>
                  ))}
                </>
              )}
            </View>
          </FadeIn>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}