import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { WhatCanIMakeScreen } from "@/src/features/what-can-i-make/screens/what-can-i-make-screen";
import { colors } from "@/src/theme/tokens";

export default function WhatCanIMakeRoute() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <WhatCanIMakeScreen onBackPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { backgroundColor: colors.background, flex: 1 },
});
