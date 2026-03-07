import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { usePathname } from "expo-router";
import { PantryScreen } from "@/src/features/pantry/screens/pantry-screen";
import { AppBottomNav } from "@/src/features/navigation/components/app-bottom-nav";
import BottomSheetModal from "../components/BottomSheetModal";
import AddToPantrySheetContent from "../components/pantry/AddToPantrySheetContent";
import { usePantryStore } from "../store";
import { colors } from "@/src/theme/tokens";

export default function PantryRoute() {
  const pathname = usePathname();
  const [isAddOpen, setAddOpen] = useState(false);

  const { loadPantry } = usePantryStore();

  useEffect(() => {
    loadPantry({}).catch(() => {});
  }, []);

  useEffect(() => {
    if (pathname === "/pantry") {
      loadPantry({}).catch(() => {});
    }
  }, [pathname]);

  const handleSheetClose = useCallback(() => {
    setAddOpen(false);
    loadPantry({}).catch(() => {});
  }, []);

  return (
    <View style={styles.screen}>
      <PantryScreen onAddPress={() => setAddOpen(true)} />
      <AppBottomNav />

      <BottomSheetModal visible={isAddOpen} onClose={handleSheetClose} sheetBackground="#0E131D">
        <AddToPantrySheetContent
          onPressBack={handleSheetClose}
          onItemAdded={handleSheetClose}
        />
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1,
  },
});
