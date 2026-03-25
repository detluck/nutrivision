import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function History() {
  const colors = useThemeColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>History</Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        This is the History screen
      </Text>
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
