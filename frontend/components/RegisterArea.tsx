import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { CustomInput } from "@/components/CustomInput";

export function RegisterArea() {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.panel }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("register.createAccount")}
      </Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t("register.usernamePlaceholder")}
      </Text>
      <CustomInput
        iconName="person"
        placeholder="login.usernamePlaceholder"
        autoFocus
      />
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t("register.passwordPlaceholder")}
      </Text>
      <CustomInput
        iconName="lock"
        placeholder="login.passwordPlaceholder"
        secureTextEntry
      />
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        {t("register.confirmPasswordPlaceholder")}
      </Text>
      <CustomInput
        iconName="lock"
        placeholder="login.passwordPlaceholder"
        secureTextEntry
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.noAccount, { color: colors.textSecondary }]}>
          By pressing "Register" you accept, that you data is not save and can
          be used everytime
        </Text>
        <Pressable onPress={() => router.replace("/onboarding")}>
          <Text style={[styles.noAccount, { color: colors.success }]}>
            {t("login.register")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 20,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  noAccount: {
    fontSize: 15,
    fontWeight: "300",
  },
});
