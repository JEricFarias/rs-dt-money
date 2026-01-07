import { dtMoneyApi } from "@/shared/api/dt-money";
import type { FormLoginParams } from "@/screens/Login/LoginForm";
import type { IAuthenticateResponse } from "@/shared/interfaces/https/authenticate-response";
import type { FormRegisterParams } from "@/screens/Register/RegisterForm";

export async function authenticate(userData: FormLoginParams) {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/login",
    userData
  );

  return data;
}

export async function registerUser(userData: FormRegisterParams) {
  const { data } = await dtMoneyApi.post<IAuthenticateResponse>(
    "/auth/register",
    userData
  );

  return data;
}
