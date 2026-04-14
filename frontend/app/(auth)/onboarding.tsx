import { useThemeColors } from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CustomInput } from "@/components/CustomInput";
import { LoginHeader } from "@/components/LoginHeader";

const { width } = Dimensions.get("window");

export default function onboarding() {
  const colors = useThemeColors();
  const { t } = useTranslation();

  // step states
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  //question info
  const [goal, setGoal] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
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
    <View style={styles.stepContainer}>
      <Text style={[styles.title, { color: colors.text }]}>
        {t("registerForm.question4")}
      </Text>
      {[
        { id: "lose", icon: "keyboard-double-arrow-down" },
        { id: "maintain", icon: "beenhere" },
        { id: "gain", icon: "keyboard-double-arrow-up" },
      ].map((option) => (
        <Pressable
          key={option.id}
          onPress={() => setGoal(option.id)}
          style={styles.card}
        >
          <MaterialIcons
            name={option.icon as any}
            size={24}
            color={goal === option.id ? colors.tabIconSelected : colors.text}
          />
          <Text
            style={[
              styles.cardText,
              {
                color:
                  goal === option.id ? colors.tabIconSelected : colors.text,
              },
            ]}
          >
            {t(`registerForm.optionsGoal.${option.id}`)}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  //sex, age
  const renderStep2 = () => {
    const ages = Array.from({ length: 85 }, (_, i) => i + 16);
    return (
      <View style={styles.stepContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("registerForm.question6")}
        </Text>

        {[
          { id: "male", icon: "man" },
          { id: "female", icon: "woman" },
          { id: "diverse", icon: "diversity-1" },
        ].map((option) => (
          <Pressable
            key={option.id}
            onPress={() => setGender(option.id)}
            style={styles.card}
          >
            <MaterialIcons
              name={option.icon as any}
              size={24}
              color={
                gender === option.id ? colors.tabIconSelected : colors.text
              }
            />
            <Text
              style={[
                styles.cardText,
                {
                  color:
                    gender === option.id ? colors.tabIconSelected : colors.text,
                },
              ]}
            >
              {t(`registerForm.optionsSex.${option.id}`)}
            </Text>
          </Pressable>
        ))}

        <Text style={[styles.title, { color: colors.text }]}>
          {t("registerForm.question3")}
        </Text>
        <View style={styles.pickerContainer}>
          <FlatList
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            data={ages}
            keyExtractor={(item) => item.toString()}
            snapToInterval={70}
            renderItem={({ item }) => {
              const isSelected = item === age;
              return (
                <Pressable onPress={() => setAge(item)} style={styles.ageItem}>
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
  //weight, height
  const renderStep3 = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("registerForm.question1")}
        </Text>
        <CustomInput
          placeholder="registerForm.question1"
          keyboardType="numeric"
          value={weight.toString()}
          onChangeText={(text) => setWeight(Number(text))}
          iconName="balance"
        />
        <Text style={[styles.title, { color: colors.text }]}>
          {t("registerForm.question2")}
        </Text>
        <CustomInput
          placeholder="registerForm.question2"
          keyboardType="numeric"
          value={height.toString()}
          onChangeText={(text) => setHeight(Number(text))}
          iconName="height"
        />
      </View>
    );
  };

  //activity
  const renderStep4 = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("registerForm.question5")}
        </Text>
        {[
          { id: "sedentary", icon: "airline-seat-recline-normal" },
          { id: "light", icon: "directions-walk" },
          { id: "moderate", icon: "directions-bike" },
          { id: "active", icon: "sports-martial-arts" },
        ].map((option) => (
          <Pressable
            key={option.id}
            onPress={() => setActivity(option.id)}
            style={styles.card}
          >
            <MaterialIcons
              name={option.icon as any}
              size={24}
              color={
                activity === option.id ? colors.tabIconSelected : colors.text
              }
            />
            <Text
              style={[
                styles.cardText,
                {
                  color:
                    activity === option.id
                      ? colors.tabIconSelected
                      : colors.text,
                },
              ]}
            >
              {t(`registerForm.optionsActivity.${option.id}`)}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const renderStep5 = () => {
    return (
      <View style={styles.stepContainer}>
        <Text style={[styles.title, { color: colors.text }]}>Done</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[
          { backgroundColor: colors.background, paddingTop: 20, flex: 1 },
        ]}
      >
        <LoginHeader />
        <View
          style={[styles.container, { backgroundColor: colors.background }]}
        >
          <View style={styles.progressBarContainer}>
            <View></View>
            <Text style={{ color: colors.text }}>
              {step} / {totalSteps}
            </Text>
          </View>

          <View style={[styles.content, { backgroundColor: colors.surface }]}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.nextButton}
          onPress={() => (step > 1 ? setStep(step - 1) : router.back())}
        >
          <Text style={styles.nextButtonText}>Back</Text>
        </Pressable>
        <Pressable onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {step === 5 ? "Done" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 20,
    marginRight: 20,
  },
  content: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
    marginVertical: 20,
    justifyContent: "center",
  },
  stepContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginHorizontal: 30,
    marginVertical: 20,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  pickerContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  ageItem: {
    width: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 20,
  },
  nextButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
