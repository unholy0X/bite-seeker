import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { HomeScreen } from "@/src/features/home/screens/home-screen";
import { AppBottomNav } from "@/src/features/navigation/components/app-bottom-nav";
import BottomSheetModal from "../components/BottomSheetModal";
import AddRecipeSheetContent from "../components/recipies/AddRecipeSheetContent";
import SearchOverlay from "../components/SearchOverlay";
import { colors } from "@/src/theme/tokens";
import { useFeaturedStore } from "../store/featuredStore";
import { useSuggestedStore } from "../store/suggestedStore";

export default function HomeRoute() {
  const router = useRouter();
  const [isAddRecipeOpen, setAddRecipeOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    useFeaturedStore.getState().loadFeatured({ limit: 30 });
    useSuggestedStore.getState().loadSuggested({ limit: 10 });
  }, []);

  return (
    <View style={styles.screen}>
      <HomeScreen
        onAddRecipePress={() => setAddRecipeOpen(true)}
        onRecipePress={(id) => router.push(`/recipe/${id}`)}
        onSearchPress={() => setSearchOpen(true)}
      />
      <AppBottomNav />

      <BottomSheetModal visible={isAddRecipeOpen} onClose={() => setAddRecipeOpen(false)}>
        <AddRecipeSheetContent
          onPressBack={() => {
            setAddRecipeOpen(false);
            router.replace("/recipes");
          }}
        />
      </BottomSheetModal>

      <SearchOverlay
        visible={isSearchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectRecipe={(recipe) => {
          setSearchOpen(false);
          router.push(`/recipe/${recipe.id}`);
        }}
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
