import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function VerseCard({ reference, text }) {
  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <View style={styles.content}>
        <Text style={styles.reference}>{reference}</Text>
        <Text style={styles.verseText}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.backgroundCard,
    borderRadius: THEME.radius.lg,
    marginBottom: 12,
    overflow: 'hidden',
    ...THEME.shadow,
  },
  accentBar: {
    width: 3,
    backgroundColor: THEME.colors.gold,
  },
  content: {
    flex: 1,
    padding: 18,
  },
  reference: {
    fontFamily: THEME.fonts.display,
    fontSize: 14,
    color: THEME.colors.gold,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  verseText: {
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 16,
    color: THEME.colors.textPrimary,
    lineHeight: 26,
  },
});
