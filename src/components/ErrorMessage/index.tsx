import type { PropsWithChildren } from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";

export function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <View className="flex-row items-center mt-1 gap-1 ">
      <MaterialIcons
        name="error-outline"
        size={16}
        color={colors["accent-red-background-primary"]}
      />
      <Text className="text-accent-red-background-primary">{children}</Text>
    </View>
  );
}
