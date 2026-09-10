import { IconProps } from "@/constants/configs";
import { Colors } from "@/constants/GlobalStyles";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function BackGroundSVG({ color = Colors.text }: IconProps) {
  return (
    <Svg fill={color} viewBox="0 0 301.34921 200.81145">
      <Defs>
        <LinearGradient id="a">
          <Stop offset={0} stopColor="#80aa8e" stopOpacity={0.7446301} />
          <Stop offset={0.89875662} stopColor="#000" stopOpacity={0.64200479} />
        </LinearGradient>
        <RadialGradient
          cx={149.8206}
          cy={100.11104}
          fx={149.8206}
          fy={100.11104}
          r={150.09618}
          gradientTransform="matrix(1.08255 .00737 -.00561 .82396 -11.806 16.519)"
          gradientUnits="userSpaceOnUse"
        />
      </Defs>
      <Path
        d="M.364 199.7l91.47-64.137 119.892.365 88.918 64.137z"
        transform="translate(.276 -.122)"
        fill="#80aa8e"
        fillOpacity={0.765657}
        stroke="#79ae92"
        strokeWidth={0.277}
      />
      <Path
        d="M90.375 136.292L89.282.364 211.726.73l.365 135.199z"
        transform="translate(.276 -.122)"
        fill="#80aa8e"
        fillOpacity={0.30101}
        stroke="#79ae92"
        strokeWidth={0.277}
        strokeOpacity={0}
      />
      <Path
        d="M58.307 200.794l14.202-15.611-3.634-26.297-21.5-24.416-31.34 4.373L.728 150.14 0 199.7zM187.675 137.75l-2.915-13.484 8.017-11.297 13.119-3.644 14.212 4.738 8.017 15.305-5.102 13.848-13.483 6.924-17.492-3.28z"
        transform="translate(.276 -.122)"
        fill="#80aa8e"
        fillOpacity={1}
        stroke="#79ae92"
        strokeWidth={0.277}
      />
      <Path
        d="M-.137.26v199.702h299.915V.99z"
        transform="translate(.276 -.122)"
        fill="url(#b)"
        stroke="#79ae92"
        strokeWidth={0.277}
      />
    </Svg>
  );
}
