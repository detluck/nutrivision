import { useThemeColors } from "@/hooks/useThemeColors";

const { width } = Dimensions.get("window");

export default function onboarding() {
    const colors = useThemeColors();
    const { t } = useTranslation();

    // step states
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    
    //question info
    const [goal, setGoal] = useState<string | null>(null);
    const [gender, setGender] = useState< "male" | "female" | "diverse" | null>(null);
    const [age, setAge] = useState(30);
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(170);
    const [activity, setActivity] = useState< "sedentary" | "light" | "moderate" | "active" | null>(null);

    //switch steps
    const handleNext = () => {
        if(step < totalSteps){
            setStep(step+1);
        }
        else{
            router.replace("/(tabs)");
        }
    }

    //goal
    const renderStep1 = () => (
        <View>
            <Text>
                {t("registerForm.question4")}
            </Text> 
            ‚
        </View>
    );

    //weight, height
    const renderStep2 = () => (

    );

    //age, gender
    const renderStep3 = () => (

    );

    //activity
    const renderStep4 = () => (

    );

    return(

    );
}