import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

import type { Navigation } from "@/routes/PublicRoutes";

export function Login() {
  const navigation = useNavigation<Navigation>();

  return (
    <View className="bg-red-500 flex-1 justify-center items-center">
      <Text>Loging Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
