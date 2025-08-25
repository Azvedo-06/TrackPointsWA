import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home"

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Track Points WA🏃" }}
        />
      </Stack.Navigator>
  );
}