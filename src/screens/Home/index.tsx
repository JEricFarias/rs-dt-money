import { useAuthContext } from "@/context/auth.context";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
  const { handleLogout } = useAuthContext();

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Text>Home Screen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
