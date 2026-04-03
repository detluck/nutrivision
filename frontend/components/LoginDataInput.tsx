import React from "react";
import { View, Pressable, TextInput, StyleSheet } from "react-native";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export const UsernameInput = () => {
  const colors = useThemeColors();
  const { t } = useTranslation();
  return (
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
  );
};

export const PasswordInput = () => {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = React.useState(false);
  return (
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
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
