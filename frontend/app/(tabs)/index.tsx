import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";

export default function Home() {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Home</Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        This is the Home screen
      </Text>
      <Link href="/(auth)/login" style={{ marginTop: 20 }}>
        Go to Login
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});
