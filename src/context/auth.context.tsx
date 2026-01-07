import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";

import type { FormLoginParams } from "@/screens/Login/LoginForm";
import type { RegisterFormParams } from "@/screens/Register/RegisterForm";

import * as authService from "@/shared/services/dt-money/auth.service";
import type { IUser } from "@/shared/interfaces/user-interface";

type AuthContextType = {
  user: IUser | null;
  token: string | null;
  handleAuthenticate: (params: FormLoginParams) => Promise<void>;
  handleRegister: (params: RegisterFormParams) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function handleAuthenticate(userData: FormLoginParams) {
    const { token, user } = await authService.authenticate(userData);

    setToken(token);
    setUser(user);
  }

  async function handleRegister(formData: RegisterFormParams) {
    // TODO
  }

  function handleLogout() {
    // TODO
  }

  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}
