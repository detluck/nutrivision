import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";

export function LoginArea() {
  const { t } = useTranslation();
  const colors = useThemeColors();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.panel }]}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("login.signIn")}
      </Text>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.icon}>
          <MaterialIcons name="person" size={24} color={colors.text} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={t("login.usernamePlaceholder")}
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
        />
      </View>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.icon}>
          <MaterialIcons name="lock" size={24} color={colors.text} />
        </View>
        <TextInput
          style={styles.input}
          placeholder={t("login.passwordPlaceholder")}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={colors.text}
            onPress={() => setShowPassword(!showPassword)}
          />
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 50,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  icon: {
    padding: 5,
    marginLeft: 5,
  },
  eyeIcon: {
    padding: 5,
    marginRight: 5,
  },
});
