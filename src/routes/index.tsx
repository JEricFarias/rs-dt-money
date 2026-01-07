import { useCallback } from "react";
import { StatusBar } from "react-native";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "@/context/auth.context";

export function NavigationRoutes() {
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, token]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
