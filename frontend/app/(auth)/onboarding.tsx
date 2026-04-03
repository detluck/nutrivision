import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useState } from "react";
import { View, Pressable, Text, Dimensions, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function onboarding() {
  const colors = useThemeColors();
  const { t } = useTranslation();

  // step states
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  //question info
  const [goal, setGoal] = useState<string | null>(null);
  const [gender, setGender] = useState<"male" | "female" | "diverse" | null>(
    null,
  );
  const [age, setAge] = useState(30);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [activity, setActivity] = useState<string | null>(null);

  //switch steps
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      router.replace("/(tabs)");
    }
  };

  //goal
  const renderStep1 = () => (
    <View>
      <Text>{t("registerForm.question4")}</Text>
      {[
        { id: "lose", icon: "down" },
        { id: "maintain", icon: "equal" },
        { id: "gain", icon: "up" },
      ].map((option) => (
        <Pressable key={option.id} onPress={() => setGoal(option.id)}>
          <MaterialIcons
            name={option.icon as any}
            size={24}
            color={goal === option.id ? colors.tabIconSelected : colors.text}
          />
          <Text
            style={{
              color: goal === option.id ? colors.tabIconSelected : colors.text,
            }}
          >
            {t(`registerForm.${option.id}`)}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  //weight, height
  const renderStep2 = () => {
    const ages = Array.from({ length: 85 }, (_, i) => i + 16);
    return (
      <View>
        <Text>{t("registerForm.question6")}</Text>

        <View>
          <Pressable onPress={() => setGender("male")}>
            <Text style={{ color: colors.text }}>
              {t("registerForm.optionsSex.male")}
            </Text>
          </Pressable>
          <Pressable onPress={() => setGender("female")}>
            <Text style={{ color: colors.text }}>
              {t("registerFprm.optionsSex.female")}
            </Text>
          </Pressable>
          <Pressable onPress={() => setGender("diverse")}>
            <Text style={{ color: colors.text }}>
              {t("registerForm.optionsSex.diverse")}
            </Text>
          </Pressable>
        </View>

        <Text>{t("registerForm.question3")}</Text>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={ages}
            keyExtractor={(item) => item.toString()}
            snapToInterval={70}
            contentContainerStyle={{ paddingHorizontal: width / 2 - 50 }}
            renderItem={({ item }) => {
              const isSelected = item === age;
              return (
                <Pressable onPress={() => setAge(item)}>
                  <Text
                    style={{
                      color: isSelected ? colors.tabIconSelected : colors.text,
                    }}
                  >
                    {item}
                  </Text>
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    );
  };
  //age, gender
  const renderStep3 = () => <View></View>;

  //activity
  const renderStep4 = () => <View></View>;

  return <View></View>;
}

