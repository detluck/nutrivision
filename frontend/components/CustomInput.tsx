import { MaterialIcons } from "@expo/vector-icons";
import {
  TextInput,
  TextInputProps,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";

interface CustomInputProps extends TextInputProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  iconName,
  secureTextEntry,
  placeholder,
  ...rest
}) => {
  const colors = useThemeColors();
  const { t } = useTranslation();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  return (
    <View
      style={[
        styles.inputContainer,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {iconName && (
        <View style={styles.icon}>
          <MaterialIcons
            name={iconName}
            size={24}
            color={isFocused ? colors.text : colors.textMuted}
          />
        </View>
      )}

      <TextInput
        style={[styles.input, { color: colors.text }]}
        placeholder={t(placeholder || "")}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={!showPassword}
        {...rest}
      />
      {secureTextEntry && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color={isFocused ? colors.text : colors.textMuted}
            onPress={() => setShowPassword(!showPassword)}
          />
        </Pressable>
      )}
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
