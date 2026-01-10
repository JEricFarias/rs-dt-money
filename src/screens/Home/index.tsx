import { useEffect } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppHeader } from "@/components/AppHeader";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export function Home() {
  const { fetchCategories } = useTransactionContext();
  const { handlerError } = useErrorHandler();

  async function handleFetchCategories() {
    try {
      await fetchCategories();
    } catch (error) {
      handlerError(error);
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: handleFetchCategories is recreate every re-render causing a infinity loop if added on useEffect dependence
  useEffect(() => {
    (async () => {
      await handleFetchCategories();
    })();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}
