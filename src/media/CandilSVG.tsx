import { Colors } from "@/constants/GlobalStyles";
import Svg, { Path } from "react-native-svg";

export default function Candil() {
  return (
    <Svg width={24} height={24} fill={Colors.text} viewBox="0 0 24 24">
      {/* Mango superior */}
      <Path d="M9 2h6v2H9z" />
      {/* Cuerpo de la lámpara (la parte donde va el aceite) */}
      <Path d="M10 4h4v2h-4z" />
      {/* Base de la lámpara */}
      <Path d="M8 6h8v3c0 3-2 5-4 5s-4-2-4-5z" />
      {/* Boquilla / mecha */}
      <Path d="M11 14h2v3h-2z" />
      {/* Llamita */}
      <Path d="M12 17c-1 1-1.5 1.8-1.5 2.5 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-.7-.5-1.5-1.5-2.5z" />
      {/* Aro para colgar */}
      <Path d="M10 21h4v1h-4z" />
    </Svg>
  );
}
