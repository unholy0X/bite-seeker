import { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Alert } from "react-native";
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

  const { loadPantry, clearPantry } = usePantryStore();

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

  const handleMenuPress = useCallback(() => {
    Alert.alert('Pantry', 'What would you like to do?', [
      {
        text: 'Clear Pantry',
        style: 'destructive',
        onPress: () => {
          Alert.alert('Clear Pantry', 'Remove all items from your pantry?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Clear', style: 'destructive', onPress: () => clearPantry({}) },
          ]);
        },
      },
      { text: 'Cancel', style: 'cancel' },
    ]);
  }, [clearPantry]);

  return (
    <View style={styles.screen}>
      <PantryScreen onAddPress={() => setAddOpen(true)} onMenuPress={handleMenuPress} />
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
