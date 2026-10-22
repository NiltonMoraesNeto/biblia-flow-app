import { Tabs, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppText } from '../../components/AppText';
import { ptBR } from '../../i18n/pt-BR';
import { layout, radii, spacing } from '../../theme/tokens';
import { useTheme } from '../../theme/ThemeProvider';

const tabs = [
  { name: 'index', title: ptBR.navigation.today },
  { name: 'biblia', title: ptBR.navigation.bible },
  { name: 'diario', title: ptBR.navigation.journal },
  { name: 'ajustes', title: ptBR.navigation.settings },
] as const;

export default function NavigationTabs() {
  const { theme } = useTheme();
  const { width, fontScale } = useWindowDimensions();
  const largeText = fontScale >= layout.largeTextScale;
  const pathname = usePathname();
  const scrollRef = useRef<ScrollView>(null);
  const positions = useRef<Record<string, number>>({});
  const selectedName = pathname === '/' ? 'index' : pathname.slice(1);

  useEffect(() => {
    if (largeText)
      scrollRef.current?.scrollTo({
        x: Math.max(0, (positions.current[selectedName] ?? 0) - spacing.sm),
        animated: false,
      });
  }, [selectedName, width, fontScale, largeText]);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: theme.background },
      }}
      tabBar={({ state, navigation }) => {
        const buttons = state.routes.map((route, index) => {
          const selected = state.index === index;
          const title = tabs.find((tab) => tab.name === route.name)?.title;
          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityLabel={title}
              accessibilityState={{ selected }}
              onLayout={({ nativeEvent }) => {
                positions.current[route.name] = nativeEvent.layout.x;
                if (largeText && selected)
                  scrollRef.current?.scrollTo({
                    x: Math.max(0, nativeEvent.layout.x - spacing.sm),
                    animated: false,
                  });
              }}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!selected && !event.defaultPrevented)
                  navigation.navigate(route.name, route.params);
              }}
              onLongPress={() =>
                navigation.emit({ type: 'tabLongPress', target: route.key })
              }
              style={({ pressed }) => [
                styles.tab,
                largeText && styles.largeTab,
                {
                  backgroundColor: selected
                    ? theme.primary
                    : pressed
                      ? theme.surface
                      : theme.controlBackground,
                },
              ]}
            >
              {({ pressed }) => (
                <AppText
                  variant="control"
                  tone={selected ? 'onPrimary' : pressed ? 'onSurface' : 'text'}
                  numberOfLines={largeText ? 1 : undefined}
                  style={[styles.label, largeText && styles.largeLabel]}
                >
                  {title}
                </AppText>
              )}
            </Pressable>
          );
        });
        return (
          <SafeAreaView
            edges={['bottom', 'left', 'right']}
            style={{ backgroundColor: theme.background }}
          >
            {largeText ? (
              <ScrollView
                ref={scrollRef}
                horizontal
                accessibilityLabel={ptBR.navigation.scrollHint}
                showsHorizontalScrollIndicator
                contentContainerStyle={styles.scrollContent}
                style={[styles.scrollBar, { borderTopColor: theme.border }]}
              >
                {buttons}
              </ScrollView>
            ) : (
              <View style={[styles.bar, { borderTopColor: theme.border }]}>
                {buttons}
              </View>
            )}
          </SafeAreaView>
        );
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{ title: tab.title }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.sm,
    borderTopWidth: 1,
  },
  tab: {
    flexGrow: 1,
    flexBasis: layout.tabBasis,
    minWidth: 0,
    maxWidth: '100%',
    minHeight: layout.touchTarget,
    padding: spacing.sm,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeTab: {
    flexBasis: 'auto',
    flexGrow: 0,
    flexShrink: 0,
    maxWidth: undefined,
  },
  largeLabel: { alignSelf: 'auto', maxWidth: undefined },
  scrollBar: { flexGrow: 0, flexShrink: 0, borderTopWidth: 1 },
  scrollContent: { flexDirection: 'row', gap: spacing.sm, padding: spacing.sm },
  label: { textAlign: 'center' },
});
