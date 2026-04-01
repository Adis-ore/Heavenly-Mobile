import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../constants/theme';
import CategoryBadge from '../components/CategoryBadge';
import VerseCard from '../components/VerseCard';
import StoryCard from '../components/StoryCard';
import PrayerSection from '../components/PrayerSection';
import CrisisModal from '../components/CrisisModal';

function SectionHeader({ title }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function CategorySection({ category }) {
  return (
    <View style={styles.categorySection}>
      <SectionHeader title="Stories From Scripture" />
      {category.stories.map((story, index) => (
        <StoryCard
          key={index}
          title={story.title}
          reference={story.reference}
          summary={story.summary}
        />
      ))}

      <SectionHeader title="Scriptures For This Season" />
      {category.verses.map((verse, index) => (
        <VerseCard key={index} reference={verse.reference} text={verse.text} />
      ))}

      <SectionHeader title="A Word For You" />
      <View style={styles.encouragementCard}>
        <View style={styles.encouragementAccent} />
        <Text style={styles.encouragementText}>{category.encouragement}</Text>
      </View>

      <SectionHeader title="Prayers You Can Pray" />
      <PrayerSection prayerPoints={category.prayerPoints} />

      <SectionHeader title="Speak This Over Yourself" />
      <View style={styles.declarationCard}>
        <Text style={styles.declarationQuote}>"</Text>
        <Text style={styles.declarationText}>{category.declaration}</Text>
        <Text style={[styles.declarationQuote, styles.declarationQuoteClose]}>"</Text>
      </View>
    </View>
  );
}

export default function ResultScreen({ navigation, route }) {
  const { data } = route.params;
  const [crisisVisible, setCrisisVisible] = useState(data.crisis === true);

  function handleBack() {
    navigation.goBack();
  }

  function handlePrayAgain() {
    navigation.navigate('Home');
  }

  if (data.crisis) {
    return (
      <CrisisModal
        visible={crisisVisible}
        data={data}
        onClose={() => {
          setCrisisVisible(false);
          navigation.navigate('Home');
        }}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={THEME.colors.backgroundPrimary} />
      <SafeAreaView style={styles.flex} edges={['top']}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={22}
              color={THEME.colors.gold}
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Text style={styles.introLabel}>Your heart may be carrying...</Text>
          <View style={styles.badgesRow}>
            {data.categories.map((cat) => (
              <CategoryBadge key={cat.id} title={cat.title} />
            ))}
          </View>

          {data.categories.map((category, index) => (
            <View key={category.id}>
              {data.categories.length > 1 && (
                <View style={styles.categoryDivider}>
                  <Text style={styles.categoryDividerText}>{category.title}</Text>
                </View>
              )}
              <CategorySection category={category} />
              {index < data.categories.length - 1 && (
                <View style={styles.categorySpacer} />
              )}
            </View>
          ))}

          <TouchableOpacity
            style={styles.prayAgainButton}
            onPress={handlePrayAgain}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={18}
              color={THEME.colors.backgroundPrimary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.prayAgainText}>Bring Another Concern</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundPrimary,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.md,
    paddingBottom: 50,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backText: {
    fontFamily: THEME.fonts.body,
    fontSize: 15,
    color: THEME.colors.gold,
    marginLeft: 6,
  },
  introLabel: {
    fontFamily: THEME.fonts.display, fontStyle: 'italic',
    fontSize: 17,
    color: THEME.colors.textSecondary,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 28,
  },
  categorySection: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontFamily: THEME.fonts.display,
    fontSize: 20,
    color: THEME.colors.gold,
    marginBottom: 14,
    marginTop: 28,
    letterSpacing: 0.3,
  },
  encouragementCard: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.backgroundCard,
    borderRadius: THEME.radius.lg,
    overflow: 'hidden',
    marginBottom: 4,
    ...THEME.shadow,
  },
  encouragementAccent: {
    width: 4,
    backgroundColor: THEME.colors.gold,
  },
  encouragementText: {
    flex: 1,
    fontFamily: THEME.fonts.body, fontStyle: 'italic',
    fontSize: 17,
    color: THEME.colors.textPrimary,
    lineHeight: 28,
    padding: 18,
  },
  declarationCard: {
    backgroundColor: THEME.colors.backgroundCard,
    borderRadius: THEME.radius.lg,
    padding: 24,
    alignItems: 'center',
    ...THEME.shadow,
  },
  declarationQuote: {
    fontFamily: THEME.fonts.display,
    fontSize: 48,
    color: THEME.colors.gold,
    lineHeight: 52,
    opacity: 0.7,
  },
  declarationQuoteClose: {
    alignSelf: 'flex-end',
  },
  declarationText: {
    fontFamily: THEME.fonts.display,
    fontSize: 18,
    color: THEME.colors.gold,
    textAlign: 'center',
    lineHeight: 30,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  categoryDivider: {
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
    paddingTop: 28,
    marginBottom: 4,
  },
  categoryDividerText: {
    fontFamily: THEME.fonts.display,
    fontSize: 22,
    color: THEME.colors.goldLight,
    marginBottom: 4,
  },
  categorySpacer: {
    height: 20,
  },
  prayAgainButton: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.gold,
    borderRadius: THEME.radius.lg,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    ...THEME.shadow,
  },
  prayAgainText: {
    fontFamily: THEME.fonts.display,
    fontSize: 16,
    color: THEME.colors.backgroundPrimary,
    fontWeight: 'bold',
  },
});
