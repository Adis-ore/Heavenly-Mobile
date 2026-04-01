import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function CategoryBadge({ title }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderWidth: 1,
    borderColor: THEME.colors.gold,
    borderRadius: THEME.radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  text: {
    fontFamily: THEME.fonts.body, fontWeight: 'bold',
    fontSize: 12,
    color: THEME.colors.textPrimary,
    letterSpacing: 0.3,
  },
});
