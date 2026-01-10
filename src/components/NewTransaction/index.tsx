import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CurrencyInput from "react-native-currency-input";
import { ValidationError } from "yup";

import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { useTransactionContext } from "@/context/transaction.context";

import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import type { ICreateTransaction } from "@/shared/interfaces/https/create-transaction-request";
import { TransactionTypeSelector } from "../TransactionTypeSelector";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";

import { colors } from "@/shared/colors";
import { schema } from "./schema";

type ValidationErrosTypes = Record<keyof ICreateTransaction, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handlerError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<ICreateTransaction>({
    categoryId: 0,
    description: "",
    typeId: 0,
    value: 0,
  });
  const [validationErrors, setValidationErros] =
    useState<ValidationErrosTypes>();

  async function handleCreateTransaction() {
    try {
      setLoading(true);
      await schema.validate(transaction, {
        abortEarly: false,
      });

      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = {} as ValidationErrosTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof ICreateTransaction] = err.message;
          }
        });

        setValidationErros(errors);
      } else {
        handlerError(error, "Falha ao criar a transação");
      }
    } finally {
      setLoading(false);
    }
  }

  function setTransactionData(
    key: keyof ICreateTransaction,
    value: string | number
  ) {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  }

  return (
    <View className="px-8 py-5">
      <View className="w-full flex-row items-center justify-between ">
        <Text className="text-white font-bold text-xl">Nova Transação</Text>
        <TouchableOpacity onPress={closeBottomSheet}>
          <MaterialIcons name="close" color={colors.gray[700]} size={20} />
        </TouchableOpacity>
      </View>

      <View className="flex-1 mt-8 mb-8">
        <TextInput
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData("description", text)}
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}

        <CurrencyInput
          className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData("value", value ?? 0)}
        />
        {validationErrors?.value && (
          <ErrorMessage>{validationErrors.value}</ErrorMessage>
        )}

        <SelectCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) =>
            setTransactionData("categoryId", categoryId)
          }
        />
        {validationErrors?.categoryId && (
          <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
        )}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData("typeId", typeId)}
        />
        {validationErrors?.typeId && (
          <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
        )}

        <View className="my-4">
          <AppButton onPress={handleCreateTransaction} disabled={loading}>
            {loading ? <ActivityIndicator color={colors.white} /> : "Registrar"}
          </AppButton>
        </View>
      </View>
    </View>
  );
}
