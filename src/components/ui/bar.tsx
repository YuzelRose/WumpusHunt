import { flag, placeMsg, roomType } from "@/constants/constants";
import { GlobalStyles } from "@/constants/GlobalStyles";
import { defaultMSG, passagewayMSG } from "@/utils/roomMSGSelector";
import { getRoom } from "@/utils/utils";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Bar({ flag }: flag) {
  const [msg, setMsg] = useState(placeMsg.S);

  useEffect(() => {
    const room = getRoom();
    if (room !== roomType.passageway) defaultMSG({ setMsg });
    else passagewayMSG({ setMsg });
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
