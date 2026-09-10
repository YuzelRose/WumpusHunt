import { passFlag } from "@/constants/configs";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { placeMsg } from "@/constants/msg/msgStorage";
import { defaultMSG } from "@/constants/msg/msgUtils";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Bar({ flag }: passFlag) {
  const [msg, setMsg] = useState(placeMsg.S);

  useEffect(() => {
    defaultMSG({ setMsg });
  }, [flag]);

  return (
    <View style={styles.wrapper}>
      <Text style={[GlobalStyles.text, { textAlign: "justify" }]}>{msg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: "center",
  },
});
