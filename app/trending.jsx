import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import RecipePlaceholder from "../components/RecipePlaceholder";
import { useSuggestedStore } from "../store/suggestedStore";
import { colors, radii, spacing } from "@/src/theme/tokens";

function RecipeRow({ recipe, onPress }) {
  const totalTime = (recipe.prepTime || 0) + (recipe.cookTime || 0);
  const meta = [
    totalTime > 0 ? `${totalTime} min` : null,
    recipe.difficulty || null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <Pressable
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.75 }]}
      onPress={() => onPress(recipe.id)}
    >
      <View style={styles.thumb}>
        {recipe.thumbnailUrl ? (
          <Image
            source={{ uri: recipe.thumbnailUrl }}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
          />
        ) : (
          <RecipePlaceholder title={recipe.title} variant="thumb" style={StyleSheet.absoluteFill} />
        )}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={2} style={styles.title}>
          {recipe.title}
        </Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
      <Feather color={colors.textMuted} name="chevron-right" size={18} />
    </Pressable>
  );
}

export default function TrendingRoute() {
  const router = useRouter();
  const { recipes, isLoading } = useSuggestedStore();

  return (
    <SafeAreaView edges={["top"]} style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
          <Feather color={colors.textPrimary} name="arrow-left" size={22} />
        </Pressable>
        <Text style={styles.heading}>Trending Now</Text>
        <View style={{ width: 34 }} />
      </View>

      {isLoading && recipes.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator color={colors.accent} />
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <RecipeRow
              recipe={item}
              onPress={(id) => router.push(`/recipe/${id}`)}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <Text style={styles.empty}>No trending recipes yet.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 34,
    alignItems: "flex-start",
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: radii.md,
    overflow: "hidden",
    backgroundColor: colors.surfaceStrong,
  },
  info: { flex: 1 },
  title: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 3,
  },
  separator: { height: spacing.xs },
  centered: { flex: 1, alignItems: "center", justifyContent: "center" },
  empty: { color: colors.textMuted, textAlign: "center", marginTop: spacing.xl },
});
