import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { initDB } from '@/lib/db';

useEffect(() => {
  initDB();
}, []);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 80,
          paddingTop: 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Statistics',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Exercises',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" size={size} color={color}/>
          ),
        }}
      />
    </Tabs>
  );
}