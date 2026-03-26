import { Colors } from "../constants/Colors";
import { useTheme } from "./useTheme";

export const useThemeColors = () => {
  const { theme } = useTheme();

  return Colors[theme];
};
