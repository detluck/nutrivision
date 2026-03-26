import { View, Pressable } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";

export function ThemePicker() {
  const { isDark, toggleTheme } = useTheme();
  const colors = useThemeColors();

  return (
    <View>
      <Pressable onPress={() => toggleTheme()}>
        <MaterialIcons
          name={isDark ? "dark-mode" : "light-mode"}
          size={25}
          color={colors.tabIconDefault}
        />
      </Pressable>
    </View>
  );
}
