import { IconProps } from "@/constants/configs";
import { Colors } from "@/constants/GlobalStyles";
import Svg, { Path } from "react-native-svg";

export default function SpyGlass({
  rotation = 0,
  size = 24,
  color = Colors.text,
  strokeWidth = 8,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <Path
        strokeWidth={strokeWidth}
        d="M17.06 14.94l-2.8-1.34A6.96 6.96 0 0016 9c0-3.86-3.14-7-7-7S2 5.14 2 9s3.14 7 7 7c1.76 0 3.37-.66 4.6-1.74l1.34 2.8 5 5 2.12-2.12zM9 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5"
      />
    </Svg>
  );
}
