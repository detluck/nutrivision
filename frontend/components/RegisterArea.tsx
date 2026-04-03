import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@/hooks/useThemeColors";
import { UsernameInput, PasswordInput } from "@/components/LoginDataInput";
import { router } from "expo-router";

export function LoginArea() {
  const { t } = useTranslation();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.panel }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("register.createAccount")}
      </Text>
      <Text>
        {t("register.usernamePlaceholder")}
      </Text>
      <UsernameInput />
      <Text>
        {t("register.passwordPlaceholder")}
      </Text>
      <PasswordInput />
      <Text>
        {t("register.confirmPasswordPlaceholder")}
      </Text>
      <PasswordInput />
      <View style={styles.infoContainer}>
        <Text style={[styles.noAccount, { color: colors.textSecondary }]}>
          By pressing "Register" you accept, that you data is not save and can be used everytime
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
