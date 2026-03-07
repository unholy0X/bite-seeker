import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FavoritesScreen } from "@/src/features/favorites/screens/favorites-screen";
import { colors } from "@/src/theme/tokens";
import { useRecipeStore } from "../store";

export default function FavoritesRoute() {
  const router = useRouter();
  const { loadRecipes, recipes } = useRecipeStore();

  useEffect(() => {
    if (recipes.length === 0) {
      loadRecipes({}).catch(() => {});
    }
  }, []);

  return (
    <View style={styles.screen}>
      <FavoritesScreen onBackPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
});
