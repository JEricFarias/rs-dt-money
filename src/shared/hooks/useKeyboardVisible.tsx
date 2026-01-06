import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

export function useKeyboardVisible() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener("keyboardDidShow", () =>
      setIsKeyboardVisible(true)
    );

    const keyboardDidHideListern = Keyboard.addListener("keyboardDidHide", () =>
      setIsKeyboardVisible(false)
    );

    return () => {
      keyboardShowListener.remove();
      keyboardDidHideListern.remove();
    };
  }, []);

  return isKeyboardVisible;
}
