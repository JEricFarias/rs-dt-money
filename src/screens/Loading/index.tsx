import { useEffect } from "react";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuthContext } from "@/context/auth.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

interface Props {
  setLoading: (value: boolean) => void;
}

export function Loading({ setLoading }: Props) {
  const { restoreUserSession, handleLogout } = useAuthContext();
  const { handlerError } = useErrorHandler();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();

        if (!user) await handleLogout();
      } catch (error) {
        handlerError(error, "Algo deu errado com o carregamento dos dados.");
        await handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, [restoreUserSession, handleLogout, setLoading, handlerError]);

  return (
    <SafeAreaView className="bg-background-primary items-center justify-center flex-1">
      <Image className="h-12 w-64" source={require("@/assets/Logo.png")} />
      <ActivityIndicator color={colors.white} className="mt-20" />
    </SafeAreaView>
  );
}
