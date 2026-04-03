import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Link } from "expo-router";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Info() {
  const { t } = useTranslation();
  const colors = useThemeColors();
  return (
    <View style={styles.container}>
      <Link href={"https://github.com/detluck/nutrivision"}>
        <Text style={[styles.text, { color: colors.link }]}>
          {t("info.project")}
        </Text>
      </Link>
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {t("info.please")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
});
