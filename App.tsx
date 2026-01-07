import { NavigationRoutes } from "@/routes";
import { AuthContextProvider } from "@/context/auth.context";

import "./global.css";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}
