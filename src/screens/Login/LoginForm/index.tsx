import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";

import type { Navigation } from "@/routes/PublicRoutes";

import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";

import { schema } from "./schema";
import { useAuthContext } from "@/context/auth.context";

export interface FormLoginParams {
  email: string;
  password: string;
}

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { handleAuthenticate } = useAuthContext();
  const navigation = useNavigation<Navigation>();

  async function onSubmit(userData: FormLoginParams) {
    try {
      await handleAuthenticate(userData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  }

  return (
    <>
      <AppInput
        control={control}
        name="email"
        label="EMAIL"
        placeholder="mail@example.com"
        leftIconName="mail-outline"
        textContentType="emailAddress"
      />

      <AppInput
        control={control}
        name="password"
        label="SENHA"
        placeholder="Sua senha"
        leftIconName="lock-outline"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6">
        <AppButton
          iconName="arrow-forward"
          mode="fill"
          onPress={handleSubmit(onSubmit)}
        >
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
