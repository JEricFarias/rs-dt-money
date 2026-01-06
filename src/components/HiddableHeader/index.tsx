import { Image, View } from "react-native";

import { useKeyboardVisible } from "@/shared/hooks/useKeyboardVisible";

export function HiddableHeader() {
  const isKeyboardVisible = useKeyboardVisible();

  if (isKeyboardVisible) return;

  return (
    <View className="items-center justify-center min-h-40">
      <Image className="h-12 w-64" source={require("@/assets/Logo.png")} />
    </View>
  );
}
