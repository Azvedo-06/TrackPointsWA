import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/Home";
import CategoriaProvas from "../screens/CategoriaProvas";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Track Points WA🏃" }}
        />
        <Stack.Screen
          name="Provas"
          component={CategoriaProvas}
          options={({ route }) => ({ title: route.params.name})}
        />
      </Stack.Navigator>
  );
}
