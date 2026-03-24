import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export function useThemeColors() {
  const colorScheme = useColorScheme() ?? "light";

  return Colors[colorScheme];
}
