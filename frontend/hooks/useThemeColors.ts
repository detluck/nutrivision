import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

export fun  ction useThemeColors() {
  const colorScheme = useColorScheme() ?? "light";
  
  return Colors[colorScheme];
}
