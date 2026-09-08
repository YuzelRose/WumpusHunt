import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const Colors = {
  prim: "#1c5560",
  backg: "black",
  text: "#79ae92",
  LightAccent: "#fbffcd",
  balance: "#000000",
} as const;

interface GlobalStyles {
  backG: ViewStyle;
  textActive: TextStyle;
  text: TextStyle;
  h1: TextStyle;
  h4: TextStyle;
  h6: TextStyle;
  center: ViewStyle;
  brightText: TextStyle;
}

export const GlobalStyles = StyleSheet.create<GlobalStyles>({
  backG: {
    flex: 1,
    display: "flex",
    width: "100%",
    backgroundColor: Colors.backg,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  textActive: {
    color: Colors.LightAccent,
  },
  text: {
    fontSize: 20,
    color: Colors.text,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  brightText: {
    fontSize: 20,
    color: Colors.LightAccent,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    borderColor: Colors.text,
    borderBottomWidth: 2,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  h4: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    borderColor: Colors.text,
    borderBottomWidth: 2,
    paddingHorizontal: 80,
    borderRadius: 10,
  },
  h6: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.text,
    borderColor: Colors.text,
    padding: 5,
    borderBottomWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
