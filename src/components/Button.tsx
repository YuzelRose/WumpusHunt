import { Colors, GlobalStyles } from "@/constants/GlobalStyles";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
  texto?: string;
  svg?: React.ReactNode;
  onPress: () => void;
}

export default function Button({ texto, onPress, svg = null }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonActive]}
    >
      {({ pressed }) =>
        svg ? (
          svg
        ) : (
          <Text style={[GlobalStyles.text, pressed && GlobalStyles.textActive]}>
            {texto}
          </Text>
        )
      }
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.text,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonActive: {
    borderColor: Colors.LightAccent,
    color: Colors.LightAccent,
  },
});
