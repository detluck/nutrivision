import {
  View,
  StyleSheet,
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useState } from "react";
import { useThemeColors } from "@/hooks/useThemeColors";
import { MaterialIcons } from "@expo/vector-icons";
import { setI18n } from "react-i18next";

export type ComboBoxOption = {
  label: string;
  value: string;
};

interface CustomComboBoxProps {
  options: ComboBoxOption[];
  placeholder?: string;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

export function CustomComboBox({
  options,
  placeholder,
  selectedValue,
  onSelect,
  style,
}: CustomComboBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = useThemeColors();
  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const handleSelection = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.header,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.headerText,
            { color: selectedOption ? colors.text : colors.textMuted },
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <MaterialIcons
          name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color={colors.textMuted}
        />
      </Pressable>

      {isOpen && (
        <View
          style={[
            styles.list,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {options.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => handleSelection(option.value)}
              style={[styles.item]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color:
                      option.value === selectedValue
                        ? colors.text
                        : colors.textMuted,
                    fontWeight:
                      option.value === selectedValue ? "bold" : "normal",
                  },
                ]}
              >
                {option.label}
              </Text>

              {option.value === selectedValue && (
                <MaterialIcons
                  name="check"
                  size={20}
                  color={colors.textMuted}
                />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    zIndex: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 16,
  },
  list: {
    position: "absolute",
    zIndex: 50,
    top: 50,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  itemText: {
    fontSize: 16,
  },
});
