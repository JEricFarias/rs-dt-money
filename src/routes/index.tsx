import { NavigationContainer } from "@react-navigation/native";
import { useCallback, useState } from "react";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

export function NavigationRoutes() {
  const [user, _] = useState({ name: "Eric" });

  const Routes = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
