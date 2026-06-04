import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAppColorScheme } from '@/contexts/color-scheme-context';
import { PolicyHiveTypography } from '@/constants/design-system';

export default function TabLayout() {
  const { mode } = useAppColorScheme();
  const isDark = mode === 'dark';
  const activeTint = isDark ? '#A884FF' : '#6E39DE';
  const inactiveTint = isDark ? '#8A93A7' : '#A2A4AE';

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: activeTint,
        tabBarInactiveTintColor: inactiveTint,
        tabBarStyle: [styles.tabBar, isDark ? styles.tabBarDark : null],
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarButton: HapticTab,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          title: 'Clients',
          tabBarButton: HapticTab,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="policies"
        options={{
          title: 'Policies',
          tabBarButton: HapticTab,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="doc.text.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarButton: HapticTab,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarButton: HapticTab,
          tabBarIcon: ({ color }) => <IconSymbol size={24} name="gearshape.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="followups"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 86,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderTopWidth: 0,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 14,
    shadowColor: '#1a1532',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  tabBarDark: {
    backgroundColor: '#111B2C',
    shadowColor: '#000',
  },
  tabItem: {
    paddingVertical: 0,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: PolicyHiveTypography.bodyMedium,
  },
});
