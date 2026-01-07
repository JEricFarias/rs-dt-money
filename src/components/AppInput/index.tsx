import { useRef, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps,
} from "react-native";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import clsx from "clsx";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/shared/colors";
import { ErrorMessage } from "../ErrorMessage";

interface AppInputsParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export function AppInput<T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  secureTextEntry,
  ...rest
}: AppInputsParams<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  function checkFocus() {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="w-full mt-4">
          {label && (
            <Text
              className={clsx(
                "mb-2 mt-3 text-base",
                isFocused ? "text-accent-brand" : "text-gray-600"
              )}
            >
              {label}
            </Text>
          )}

          <TouchableOpacity className="flex-row items-center justify-between border-b border-gray-600 px-3 py-2 h-16">
            {leftIconName && (
              <MaterialIcons
                name={leftIconName}
                color={
                  error
                    ? colors["accent-red-background-primary"]
                    : isFocused
                      ? colors["accent-brand"]
                      : colors.gray[600]
                }
                size={24}
                className="mr-2"
              />
            )}
            <TextInput
              ref={inputRef}
              value={value}
              onChangeText={onChange}
              placeholderTextColor={colors.gray[700]}
              className="flex-1 text-base text-gray-500"
              onFocus={checkFocus}
              onEndEditing={checkFocus}
              secureTextEntry={showText}
              {...rest}
            />

            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShowText((value) => !value)}>
                <MaterialIcons
                  name={showText ? "visibility" : "visibility-off"}
                  size={24}
                  color={colors.gray[600]}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </View>
      )}
    />
  );
}
