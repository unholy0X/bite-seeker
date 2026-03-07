import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import BottomSheetModal from '../../../../components/BottomSheetModal';
import { colors, radii, spacing } from '@/src/theme/tokens';

function buildMeta(recipe: any) {
  const total = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const parts: string[] = [];
  if (total > 0) parts.push(`${total} min`);
  if (recipe.difficulty) parts.push(recipe.difficulty);
  return parts.join(' · ');
}

type AddRecipeSheetProps = {
  visible: boolean;
  onClose: () => void;
  recipes: any[];
  isLoading: boolean;
  onSelect: (recipe: any) => void;
};

export function AddRecipeSheet({ visible, onClose, recipes, isLoading, onSelect }: AddRecipeSheetProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (visible) { setSearch(''); setDebouncedSearch(''); }
  }, [visible]);

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(text), 150);
  }, []);

  const filtered = useMemo(() => {
    if (!debouncedSearch.trim()) return recipes;
    const q = debouncedSearch.toLowerCase();
    return recipes.filter((r) => r.title?.toLowerCase().includes(q));
  }, [recipes, debouncedSearch]);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <Pressable
        onPress={() => onSelect(item)}
        style={({ pressed }) => [styles.recipeRow, pressed && { opacity: 0.75 }]}
      >
        <View style={styles.thumbWrap}>
          {item.thumbnailUrl ? (
            <Image
              cachePolicy="memory-disk"
              contentFit="cover"
              source={{ uri: item.thumbnailUrl }}
              style={styles.thumb}
              transition={200}
            />
          ) : (
            <View style={[styles.thumb, styles.thumbPlaceholder]}>
              <Text style={styles.thumbInitial}>{(item.title || 'R')[0].toUpperCase()}</Text>
            </View>
          )}
        </View>
        <View style={styles.info}>
          <Text numberOfLines={2} style={styles.recipeTitle}>{item.title}</Text>
          {buildMeta(item) ? <Text style={styles.recipeMeta}>{buildMeta(item)}</Text> : null}
        </View>
        <View style={styles.addIndicator}>
          <Feather color={colors.accentText} name="plus" size={14} />
        </View>
      </Pressable>
    ),
    [onSelect],
  );

  return (
    <BottomSheetModal visible={visible} onClose={onClose} customScroll sheetBackground={colors.surfaceMuted}>
      {({ onScroll, scrollEnabled }: any) => (
        <>
          <Text style={styles.title}>Add Recipe</Text>

          <View style={styles.searchWrap}>
            <Feather color={colors.textMuted} name="search" size={16} />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleSearch}
              placeholder="Search your recipes..."
              placeholderTextColor={colors.textMuted}
              style={styles.searchInput}
              value={search}
            />
          </View>

          {isLoading ? (
            <View style={styles.centered}>
              <ActivityIndicator color={colors.accent} size="large" />
            </View>
          ) : filtered.length === 0 ? (
            <View style={styles.centered}>
              <Text style={styles.emptyTitle}>
                {search ? 'No recipes match' : 'No saved recipes'}
              </Text>
              <Text style={styles.emptySubtitle}>
                {search ? 'Try a different search term' : 'Add a recipe first from My Recipes'}
              </Text>
            </View>
          ) : (
            <FlatList
              contentContainerStyle={styles.listContent}
              data={filtered}
              keyExtractor={(item) => item.id}
              onScroll={onScroll}
              renderItem={renderItem}
              scrollEnabled={scrollEnabled}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
            />
          )}
        </>
      )}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: spacing.md,
  },
  searchWrap: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderColor: colors.surfaceBorder,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    color: colors.textPrimary,
    flex: 1,
    fontSize: 15,
    letterSpacing: -0.1,
    paddingVertical: spacing.sm,
  },
  centered: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: spacing.xxs,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    maxWidth: 220,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  recipeRow: {
    alignItems: 'center',
    backgroundColor: colors.surfaceStrong,
    borderRadius: radii.lg,
    flexDirection: 'row',
    marginBottom: spacing.xs,
    padding: spacing.xs,
  },
  thumbWrap: {
    borderRadius: radii.md,
    height: 52,
    overflow: 'hidden',
    width: 52,
  },
  thumb: {
    height: 52,
    width: 52,
  },
  thumbPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  thumbInitial: {
    color: colors.textSecondary,
    fontSize: 20,
    fontWeight: '700',
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  recipeTitle: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  recipeMeta: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  addIndicator: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radii.full,
    height: 28,
    justifyContent: 'center',
    marginLeft: spacing.xs,
    width: 28,
  },
});
