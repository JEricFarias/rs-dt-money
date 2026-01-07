import { Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Navigation } from "@/routes/PublicRoutes";

import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { schema } from "./schema";

export interface RegisterFormParams {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFormParams>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const navigation = useNavigation<Navigation>();

  async function onSubmit() {}

  return (
    <View>
      <AppInput
        control={control}
        name="name"
        leftIconName="person"
        label="NOME"
        placeholder="Seu nome"
        textContentType="name"
      />
      <AppInput
        control={control}
        name="email"
        leftIconName="email"
        label="EMAIL"
        placeholder="email@example.com"
        textContentType="emailAddress"
      />
      <AppInput
        control={control}
        name="password"
        leftIconName="lock-outline"
        label="SENHA"
        placeholder="Sua senha"
        secureTextEntry
      />
      <AppInput
        control={control}
        name="confirmPassword"
        leftIconName="lock-outline"
        label="CONFIRMAR SENHA"
        placeholder="Confirme sua senha"
        secureTextEntry
      />

      <View className="flex-1 justify-between mt-8 mb-6 min-h-64">
        <AppButton
          iconName="arrow-forward"
          mode="fill"
          onPress={handleSubmit(onSubmit)}
        >
          Cadastrar
        </AppButton>

        <View className="">
          <Text className="mb-6 text-gray-300 text-base">
            Já possui uma conta?
          </Text>
          <AppButton
            iconName="arrow-forward"
            mode="outline"
            onPress={() => navigation.navigate("Login")}
          >
            Acessar
          </AppButton>
        </View>
      </View>
    </View>
  );
}
