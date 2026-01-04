import { useNavigation } from "@react-navigation/native";
import { Text, TextInput, TouchableOpacity } from "react-native";

import type { Navigation } from "@/routes/PublicRoutes";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";

export function Login() {
  const navigation = useNavigation<Navigation>();

  return (
    <DismissKeyboardView>
      <Text>Tela de login</Text>
      <TextInput className="bg-gray-500 w-full" />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text>Registrar</Text>
      </TouchableOpacity>
    </DismissKeyboardView>
  );
}
