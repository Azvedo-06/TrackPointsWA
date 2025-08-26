import React from "react";
import {AppNavigation} from "../src/navigation/AppNavigation";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Invalid prop `style` supplied to `React.Fragment`"
]);

export default function App() {
  return (
      <AppNavigation />
  );
}
