import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

interface TabIconProps {
  title: string;
  icon: MaterialIconName;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ title, icon, focused }) => {
  const colors = useThemeColors();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: focused ? "rgba(0, 0, 0, 0.1)" : "transparent" },
      ]}
    >
      <MaterialIcons
        name={icon}
        size={28}
        color={focused ? colors.tabIconSelected : colors.tabIconDefault}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  icon: {
    marginBottom: 4,
  },
});

export default TabIcon;
