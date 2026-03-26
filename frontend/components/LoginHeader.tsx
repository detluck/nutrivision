import { Pressable, View, StyleSheet } from "react-native";
import { CustomComboBox } from "./CustomComboBox";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemePicker } from "./ThemePicker";

const languageOptions = [
  {
    label: "🇬🇧 English",
    value: "en",
  },
  {
    label: "🇩🇪 Deutsch",
    value: "de",
  },
  {
    label: "🇺🇦 Українська",
    value: "ua",
  },
];

export function LoginHeader() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.substring(0, 2) || "en";
  const [isDark, setDark] = useState(true);
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <CustomComboBox
        options={languageOptions}
        selectedValue={currentLang}
        onSelect={(value) => i18n.changeLanguage(value)}
      />
      <ThemePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
