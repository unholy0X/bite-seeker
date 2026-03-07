import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { RecipesScreen } from "@/src/features/recipes/screens/recipes-screen";
import { AppBottomNav } from "@/src/features/navigation/components/app-bottom-nav";
import BottomSheetModal from "../components/BottomSheetModal";
import AddRecipeSheetContent from "../components/recipies/AddRecipeSheetContent";
import SearchOverlay from "../components/SearchOverlay";
import { useRecipeStore } from "../store";
import { colors } from "@/src/theme/tokens";

export default function RecipesRoute() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAddRecipeOpen, setAddRecipeOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const { loadRecipes, refresh } = useRecipeStore();

  useEffect(() => {
    loadRecipes({}).catch(() => {});
  }, []);

  useEffect(() => {
    if (pathname === "/recipes") {
      refresh({}).catch(() => {});
    }
  }, [pathname]);

  const handleSheetClose = useCallback(() => {
    setAddRecipeOpen(false);
    refresh({}).catch(() => {});
  }, []);

  return (
    <View style={styles.screen}>
      <RecipesScreen
        onAddPress={() => setAddRecipeOpen(true)}
        onSearchPress={() => setSearchOpen(true)}
        onRecipePress={(id) => router.push(`/recipe/${id}`)}
      />
      <AppBottomNav />

      <BottomSheetModal visible={isAddRecipeOpen} onClose={handleSheetClose} sheetBackground="#0E131D">
        <AddRecipeSheetContent onPressBack={handleSheetClose} />
      </BottomSheetModal>

      <SearchOverlay
        visible={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectRecipe={(recipe) => router.push(`/recipe/${recipe.id}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
