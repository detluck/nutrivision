import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginHeader } from "@/components/LoginHeader";
import { useTranslation } from "react-i18next";
import { LoginArea } from "@/components/LoginArea";

export default function Login() {
  const colors = useThemeColors();
  const { t } = useTranslation();
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <LoginHeader />
        <View style={styles.contentContainer}>
          <Text style={[styles.title, { color: colors.text }]}>
            {t("login.welcome")}
          </Text>
          <Text style={[styles.text, { color: colors.textSecondary }]}>
            {t("login.subtitle")}
          </Text>
          <LoginArea />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
