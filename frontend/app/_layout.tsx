import { Stack } from "expo-router";
import i18n from "../i18n";
import { I18nextProvider } from "react-i18next";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </I18nextProvider>
  );
}
