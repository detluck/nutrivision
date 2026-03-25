import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginHeader } from "@/components/LoginHeader";
import { useTranslation } from "react-i18next";

export default function Login() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <LoginHeader />
      <Text style={[styles.title, { color: colors.text }]}>
        {t("login.welcome")}
      </Text>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {t("login.subtitle")}
      </Text>
    </SafeAreaView>
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
