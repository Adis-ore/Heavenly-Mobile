import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';

export default function CrisisModal({ visible, data, onClose }) {
  function handleTalkToSomeone() {
    Alert.alert(
      'Reach Out Now',
      'Please contact a pastor, counsellor, or trusted family member right now. You do not have to carry this alone. Your life has great value.',
      [{ text: 'I will reach out', style: 'default' }]
    );
  }

  if (!data) return null;

  return (
    <Modal visible={visible} animationType="fade" statusBarTranslucent>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <MaterialCommunityIcons
            name="heart"
            size={56}
            color={THEME.colors.gold}
            style={styles.icon}
          />
          <Text style={styles.title}>You Are Not Alone</Text>
          <Text style={styles.message}>{data.message}</Text>

          <View style={styles.versesContainer}>
            {data.verses.map((verse, index) => (
              <View key={index} style={styles.verseRow}>
                <Text style={styles.verseRef}>{verse.reference}</Text>
                <Text style={styles.verseText}>{verse.text}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.talkButton} onPress={handleTalkToSomeone}>
            <Text style={styles.talkButtonText}>Talk To Someone</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backLink} onPress={onClose}>
            <Text style={styles.backLinkText}>Back to app</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontFamily: THEME.fonts.display,
    fontSize: 28,
    color: THEME.colors.gold,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontFamily: THEME.fonts.body,
    fontSize: 17,
    color: THEME.colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  versesContainer: {
    width: '100%',
    marginBottom: 36,
  },
  verseRow: {
    marginBottom: 18,
    borderLeftWidth: 3,
    borderLeftColor: THEME.colors.gold,
    paddingLeft: 16,
  },
  verseRef: {
    fontFamily: THEME.fonts.display,
    fontSize: 14,
    color: THEME.colors.gold,
    marginBottom: 6,
  },
  verseText: {
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 15,
    color: THEME.colors.textPrimary,
    lineHeight: 24,
  },
  talkButton: {
    width: '100%',
    backgroundColor: THEME.colors.gold,
    borderRadius: THEME.radius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 20,
    ...THEME.shadow,
  },
  talkButtonText: {
    fontFamily: THEME.fonts.display,
    fontSize: 18,
    color: THEME.colors.backgroundPrimary,
    fontWeight: 'bold',
  },
  backLink: {
    paddingVertical: 10,
  },
  backLinkText: {
    fontFamily: THEME.fonts.body,
    fontSize: 15,
    color: THEME.colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
