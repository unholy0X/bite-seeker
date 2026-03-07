import { View, StyleSheet } from "react-native";
import { MealPlanScreen } from "@/src/features/meal-plan/screens/meal-plan-screen";
import { colors } from "@/src/theme/tokens";

export default function MealPlanRoute() {
  return (
    <View style={styles.screen}>
      <MealPlanScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
});
