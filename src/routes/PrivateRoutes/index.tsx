import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "@/screens/Home";

export type PrivateStackParamasList = {
  Home: undefined;
};

export function PrivateRoutes() {
  const PrivateStack = createStackNavigator<PrivateStackParamasList>();

  return (
    <PrivateStack.Navigator screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="Home" component={Home} />
    </PrivateStack.Navigator>
  );
}
