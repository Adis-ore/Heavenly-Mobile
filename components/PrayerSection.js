import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '../constants/theme';

export default function PrayerSection({ prayerPoints }) {
  return (
    <View style={styles.container}>
      {prayerPoints.map((point, index) => (
        <View key={index}>
          <View style={styles.prayerRow}>
            <View style={styles.numberCircle}>
              <Text style={styles.numberText}>{index + 1}</Text>
            </View>
            <Text style={styles.prayerText}>{point}</Text>
          </View>
          {index < prayerPoints.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
      <Text style={styles.note}>
        You can pray these out loud, one at a time.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.backgroundCard,
    borderRadius: THEME.radius.lg,
    padding: 18,
    ...THEME.shadow,
  },
  prayerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  numberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: THEME.colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    marginTop: 1,
    flexShrink: 0,
  },
  numberText: {
    fontFamily: THEME.fonts.body, fontWeight: 'bold',
    fontSize: 13,
    color: THEME.colors.backgroundPrimary,
  },
  prayerText: {
    flex: 1,
    fontFamily: THEME.fonts.body,
    fontSize: 15,
    color: THEME.colors.textPrimary,
    lineHeight: 24,
  },
  separator: {
    height: 1,
    backgroundColor: THEME.colors.border,
    marginLeft: 42,
  },
  note: {
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
});
