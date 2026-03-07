import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { GetInspiredScreen } from "@/src/features/get-inspired/screens/get-inspired-screen";
import { colors } from "@/src/theme/tokens";

export default function GetInspiredRoute() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <GetInspiredScreen onBackPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
});
