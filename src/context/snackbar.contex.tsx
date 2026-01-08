import { createContext, useContext, useState } from "react";

export type SnackbarMessageType = "ERROR" | "SUCCESS";

export type NotifyMessageParams = {
  message: string;
  messageType: SnackbarMessageType;
};

export type SnackbarContextType = {
  message: string | null;
  type: SnackbarMessageType | null;

  notify: (params: NotifyMessageParams) => void;
};

const SnackbarContext = createContext({} as SnackbarContextType);

type Props = {
  children: React.ReactNode;
};

export function SnackbarContextProvider({ children }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackbarMessageType | null>(null);

  function notify({ message, messageType }: NotifyMessageParams) {
    setMessage(message);
    setType(messageType);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  }

  return (
    <SnackbarContext.Provider
      value={{
        message,
        type,
        notify,
      }}
    >
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);
  return context;
}
