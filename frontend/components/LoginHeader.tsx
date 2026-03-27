import { View, StyleSheet } from "react-native";
import { CustomComboBox } from "./CustomComboBox";
import { useTranslation } from "react-i18next";
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
  return (
    <View style={styles.container}>
      <CustomComboBox
        options={languageOptions}
        selectedValue={currentLang}
        onSelect={(value) => i18n.changeLanguage(value)}
        style={{ marginRight: 10 }}
      />
      <ThemePicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
});
