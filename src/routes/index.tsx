import { useState, useCallback } from "react";
import { StatusBar } from "react-native";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

import { NavigationContainer } from "@react-navigation/native";

export function NavigationRoutes() {
  const [user, _] = useState(undefined);

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
