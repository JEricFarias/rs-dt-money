import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import type { Navigation } from "@/routes/PublicRoutes";

export interface FormLoginParams {
  email: string;
  passaword: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>();

  const navigation = useNavigation<Navigation>();

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@exemplo.com"
        leftIconName="mail-outline"
      />

      <AppInput
        control={control}
        name="passaword"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6">
        <AppButton iconName="arrow-forward" mode="fill">
          Login
        </AppButton>

        <View className="">
          <Text className="mb-6 text-gray-300 text-base">
            Ainda não possui uma conta?
          </Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Register")}
          >
            Cadastro
          </AppButton>
        </View>
      </View>
    </>
  );
}
