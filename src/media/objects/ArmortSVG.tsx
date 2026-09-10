import { IconProps } from "@/constants/configs";
import { Colors } from "@/constants/GlobalStyles";
import Svg, { Path } from "react-native-svg";

export default function ArmortSVG({ color = Colors.text }: IconProps) {
  return (
    <Svg viewBox="0 0 126.70437 96.284859">
      <Path
        d="M93.796 167.493h102.042v-48.96l12.627-25.252H82.2l11.853 25.768z"
        transform="translate(-81.984 -71.347)"
        fill="#000"
        fillOpacity={0.78098}
        stroke="#7996ae"
        strokeWidth={0.277}
        strokeOpacity={0}
      />
      <Path
        d="M134.714 115.13l13.968-15.665 5.154 3.865-11.112 11.747z"
        transform="translate(-81.984 -71.347)"
        fill="#79ae92"
        fillOpacity={1}
        stroke="#7996ae"
        strokeWidth={0.277}
        strokeOpacity={0}
      />
      <Path
        d="M151.26 101.527l11.915-13.702 5.67 3.501-19.967 23.493-5.607.107 10.565-11.338z"
        transform="translate(-81.984 -71.347)"
        fill="#79ae92"
        fillOpacity={0.769452}
        stroke="#7996ae"
        strokeWidth={0.277}
        strokeOpacity={0}
      />
      <Path
        d="M165.496 115.506l15.139-17.78s-.047-.88-5.798-.966c-6.394-.098-9.148-.13-9.148-.13s5.557-5.316 8.762-5.926c5.78-1.1 8.89 1.482 8.89 1.482l7.601-11.145 1.16-5.347 6.12-4.058-1.095 7.086-4.188 3.672-6.12 11.531s4.75.227 6.7 5.669c.997 2.782-.258 9.083-.258 9.083s-2.273-3.929-4.573-6.377c-1.997-2.126-4.445-3.672-4.445-3.672l-9.02 16.942z"
        transform="translate(-81.984 -71.347)"
        fill="#79ae92"
        fillOpacity={0.829971}
        stroke="#7996ae"
        strokeWidth={0.277}
        strokeOpacity={0}
      />
      <Path
        d="M124.976 115.313C98.95 91.09 123.043 74.47 123.043 74.47s-6.645-1.92-14.172 3.994c-5.412 4.252-9.792 9.92-6.571 22.676 2.516 9.963 6.184 14.301 6.184 14.301z"
        transform="translate(-81.984 -71.347)"
        fill="#79ae92"
        fillOpacity={0.870317}
        stroke="#7996ae"
        strokeWidth={0.277}
        strokeOpacity={0}
      />
    </Svg>
  );
}
