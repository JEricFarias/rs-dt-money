import { useSnackbarContext } from "@/context/snackbar.contex";
import { AppError } from "@/shared/helpers/AppError";

export function useErrorHandler() {
  const { notify } = useSnackbarContext();

  function handlerError(error: unknown, defaultMessage?: string) {
    const isAppError = error instanceof AppError;

    const message = isAppError
      ? error.message
      : (defaultMessage ?? "Falha na requisição");

    notify({ message, messageType: "ERROR" });
  }

  return { handlerError };
}
