import { useCallback, useState } from "react";
import { StatusBar } from "react-native";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "@/context/auth.context";
import { Loading } from "@/screens/Loading";

export function NavigationRoutes() {
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuthContext();

  const Routes = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />;
    }

    if (!user || !token) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, token, loading]);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
}
