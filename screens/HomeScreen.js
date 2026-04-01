import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchComfort } from '../api/comfort';
import { THEME } from '../constants/theme';

const MAX_LENGTH = 2000;

const QUICK_PILLS = [
  {
    label: 'Debt & Lack',
    prompt:
      "I am really struggling financially. I have bills I cannot pay and I don't know how to get out of this debt.",
  },
  {
    label: 'Fear & Worry',
    prompt:
      'I am so anxious about my future and I cannot stop worrying about everything. My mind will not rest.',
  },
  {
    label: 'Grief',
    prompt:
      'I lost someone very dear to me and the grief is overwhelming. I do not know how to keep going.',
  },
  {
    label: 'Heartbreak',
    prompt:
      'My heart is broken. Someone I trusted and loved deeply has hurt me deeply and I feel so lost.',
  },
  {
    label: "I'm Lost",
    prompt:
      'I am at a crossroads and completely confused about which direction to go with my life. I need guidance.',
  },
];

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!message.trim() || loading) return;

    setLoading(true);
    try {
      const data = await fetchComfort(message.trim());
      navigation.navigate('Result', { data });
    } catch (err) {
      const isNetworkError =
        err.message === 'Network Error' ||
        err.code === 'ECONNABORTED' ||
        err.code === 'ERR_NETWORK';

      Alert.alert(
        'Could Not Connect',
        isNetworkError
          ? 'Could not connect. Please check your connection and make sure the server is running.'
          : 'Something went wrong. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
    }
  }

  function handlePillPress(prompt) {
    setMessage(prompt);
  }

  const charCount = message.length;
  const isSubmitDisabled = !message.trim() || loading;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.colors.backgroundPrimary} />
      <LinearGradient
        colors={['transparent', 'rgba(212, 168, 83, 0.06)', 'transparent']}
        style={styles.glowOverlay}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
      />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          <ScrollView
            style={styles.flex}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <MaterialCommunityIcons
                name="cross"
                size={22}
                color={THEME.colors.gold}
                style={styles.headerIcon}
              />
              <Text style={styles.appName}>HeavenlyComfort</Text>
            </View>

            <Text style={styles.subHeader}>What is weighing on your heart today?</Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Tell God and tell us what is going on. You can write everything. Nothing is too heavy..."
                placeholderTextColor={THEME.colors.textMuted}
                multiline
                maxLength={MAX_LENGTH}
                textAlignVertical="top"
                returnKeyType="default"
              />
              <Text style={styles.charCount}>
                {charCount}/{MAX_LENGTH}
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.submitButton, isSubmitDisabled && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitDisabled}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color={THEME.colors.backgroundPrimary} size="small" />
              ) : (
                <Text style={styles.submitButtonText}>Find Comfort & Prayer</Text>
              )}
            </TouchableOpacity>

            <Text style={styles.coverageNote}>10 categories of life burdens covered</Text>

            <View style={styles.pillsSection}>
              <Text style={styles.pillsLabel}>Quick topics:</Text>
              <View style={styles.pillsRow}>
                {QUICK_PILLS.map((pill) => (
                  <TouchableOpacity
                    key={pill.label}
                    style={styles.pill}
                    onPress={() => handlePillPress(pill.prompt)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.pillText}>{pill.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
  glowOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.xl,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  headerIcon: {
    marginRight: 10,
  },
  appName: {
    fontFamily: THEME.fonts.display,
    fontSize: 26,
    color: THEME.colors.gold,
    letterSpacing: 0.4,
  },
  subHeader: {
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 15,
    color: THEME.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 28,
    opacity: 0.85,
  },
  inputWrapper: {
    marginBottom: 20,
    borderRadius: THEME.radius.lg,
    overflow: 'hidden',
    backgroundColor: THEME.colors.backgroundCard,
    borderWidth: 1,
    borderColor: THEME.colors.borderStrong,
  },
  textInput: {
    minHeight: 180,
    padding: 16,
    fontFamily: THEME.fonts.body,
    fontSize: 16,
    color: THEME.colors.textPrimary,
    lineHeight: 26,
  },
  charCount: {
    fontFamily: THEME.fonts.body,
    fontSize: 12,
    color: THEME.colors.textMuted,
    textAlign: 'right',
    paddingRight: 12,
    paddingBottom: 10,
  },
  submitButton: {
    backgroundColor: THEME.colors.gold,
    borderRadius: THEME.radius.lg,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    ...THEME.shadow,
  },
  submitButtonDisabled: {
    opacity: 0.45,
  },
  submitButtonText: {
    fontFamily: THEME.fonts.display,
    fontSize: 18,
    color: THEME.colors.backgroundPrimary,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  coverageNote: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    marginBottom: 32,
  },
  pillsSection: {
    marginBottom: 10,
  },
  pillsLabel: {
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginBottom: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    borderWidth: 1,
    borderColor: THEME.colors.gold,
    borderRadius: THEME.radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
  pillText: {
    fontFamily: THEME.fonts.body,
    fontSize: 13,
    color: THEME.colors.textPrimary,
  },
});
