import { View } from "react-native";

import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { RegisterForm } from "./RegisterForm";
import { HiddableHeader } from "@/components/HiddableHeader";

export function Register() {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <HiddableHeader />
        <RegisterForm />
      </View>
    </DismissKeyboardView>
  );
}
