import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function StoryCard({ title, reference, summary }) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.reference}>{reference}</Text>
        </View>
        <MaterialCommunityIcons
          name="book-open-variant"
          size={22}
          color={THEME.colors.gold}
          style={styles.icon}
        />
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: THEME.colors.backgroundCard,
    borderRadius: THEME.radius.lg,
    padding: 18,
    marginBottom: 12,
    ...THEME.shadow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontFamily: THEME.fonts.display,
    fontSize: 16,
    color: THEME.colors.gold,
    marginBottom: 4,
  },
  reference: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: THEME.colors.textSecondary,
    letterSpacing: 0.2,
  },
  icon: {
    marginTop: 2,
  },
  summary: {
    fontFamily: THEME.fonts.body,
    fontSize: 15,
    color: THEME.colors.textPrimary,
    lineHeight: 24,
  },
});
