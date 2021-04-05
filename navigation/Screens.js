import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from '../screens/Onboarding';
import Interface003 from "../screens/Interface003";
import Interface006 from "../screens/Interface006";
import Interface004 from "../screens/Interface004";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();

const DetectStack = (props) => {
  return (
    <Stack.Navigator initialRouteName="Interface006" mode="card" headerMode="none">
        <Stack.Screen
        name="Nhận diện"
        component={Interface003}
      />
      <Stack.Screen
        name="Camera"
        component={Interface004}
      />
      <Stack.Screen
        name="Kết quả"
        component={Interface006}
      />
    </Stack.Navigator>
  )
}



export default function OnboardingStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="none">
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />
      <Stack.Screen name="App" component={DetectStack} />
    </Stack.Navigator>
  );
}