import { Colors } from "@/constants/GlobalStyles";
import Svg, { Path } from "react-native-svg";

export default function Bala() {
  return (
    <Svg width={24} height={24} fill={Colors.text} viewBox="0 0 24 24">
      {/* Punta de la bala */}
      <Path d="M12 1c-1.5 0-2.5 2-2.5 5h5c0-3-1-5-2.5-5z" />
      {/* Cuerpo de la bala */}
      <Path d="M9.5 6h5v8h-5z" />
      {/* Base / casquillo */}
      <Path d="M10 14h4c0 2 2 3 2 5v2H8v-2c0-2 2-3 2-5z" />
      {/* Ranura de la base */}
      <Path d="M9 19h6v1H9z" />
    </Svg>
  );
}
