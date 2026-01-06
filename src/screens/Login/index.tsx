import { View } from "react-native";

import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { LoginForm } from "./LoginForm";
import { HiddableHeader } from "@/components/HiddableHeader";

export function Login() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <HiddableHeader />
        <LoginForm />
      </View>
    </DismissKeyboardView>
  );
}
