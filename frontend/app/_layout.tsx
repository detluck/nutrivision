import { Stack } from "expo-router";
import i18n from "../i18n";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </I18nextProvider>
  );
}
