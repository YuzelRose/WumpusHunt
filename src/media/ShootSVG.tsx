import { IconProps } from "@/constants/configs";
import { Colors } from "@/constants/GlobalStyles";
import Svg, { G, Path } from "react-native-svg";

export default function ShootSVG({
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
      stroke={color}
      viewBox="0 0 31.699308 78.923431"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <G display="inline" fill="#000" fillOpacity={0}>
        <Path
          d="M39.8 147.728v-32.742H10.973v32.742z"
          transform="translate(-9.537 -78.074)"
          fillOpacity={1}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
        />
        <Path
          d="M39.8 114.957v-4.883H10.973v4.883z"
          transform="translate(-9.537 -78.074)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M37.901 148.993v-1.227h-25.03v1.227z"
          transform="translate(-9.537 -78.074)"
          fillOpacity={1}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="miter"
          strokeOpacity={1}
        />
        <Path
          d="M39.8 155.562v-3.84H10.973v3.84z"
          transform="translate(-9.537 -78.074)"
          fillOpacity={1}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity={1}
        />
        <Path
          d="M38.15 109.562c0-15.89-12.738-28.77-12.738-28.77s-12.738 12.88-12.738 28.77"
          transform="translate(-9.537 -78.074)"
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      </G>
    </Svg>
  );
}
