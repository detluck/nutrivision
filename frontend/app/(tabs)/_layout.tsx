import TabIcon from "@/components/TabIcon";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@/hooks/useThemeColors";

const Layout = () => {
  const { t } = useTranslation();
  const colors = useThemeColors();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.panel,
          borderTopColor: colors.border,
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          paddingHorizontal: 15,
          paddingTop: 0,
          position: "absolute",
          overflow: "hidden",
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          marginTop: 3,
        },
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarLabel: t("tabNavigation.home"),
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Home" icon="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: t("tabNavigation.history"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Scan" icon="history" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: t("tabNavigation.profile"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="Profile" icon="person" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarLabel: t("tabNavigation.about"),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon title="About" icon="info" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
