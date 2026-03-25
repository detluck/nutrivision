import { Pressable, View } from "react-native";
import { CustomComboBox } from "./CustomComboBox";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

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
    <View>
      <CustomComboBox
        options={languageOptions}
        selectedValue={currentLang}
        onSelect={(value) => i18n.changeLanguage(value)}
      />
      <Pressable onPress={() => setDark(!isDark)}>
        <MaterialIcons
          name={isDark ? "dark-mode" : "light-mode"}
          size={25}
          color={colors.tabIconDefault}
        />
      </Pressable>
    </View>
  );
}
