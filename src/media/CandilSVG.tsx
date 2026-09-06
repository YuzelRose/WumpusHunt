import { Colors } from "@/constants/GlobalStyles";
import Svg, { G, Path, Rect, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotation?: number;
}

export default function VerticalScope({
  rotation = 0,
  size = 24,
  color = Colors.text,
  strokeWidth = 3,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 57 73"
      fill="none"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <G transform="translate(-61.551622, -164.75175)">
        <Path
          d="m 91.470444,194.05725 c 0,0 -16.80435,15.07651 -15.491096,24.3631 0.726323,5.13809 12.045372,11.11012 12.045372,11.11012 0,0 13.59085,-4.94179 15.6198,-10.50844 2.08854,-5.73032 -5.820875,-17.317 -5.820875,-17.317 l -5.692138,7.5211 z m -2.755388,10.24453 1.942085,9.342 6.130915,-5.25157 c 0,0 4.286354,6.58874 3.001089,9.75896 -1.52607,3.76401 -11.009912,6.78219 -11.009912,6.78219 0,0 -6.9186,-3.76149 -7.482283,-6.95108 -0.886395,-5.01485 7.417946,-13.6805 7.417986,-13.6805 z"
          stroke={color}
          fill={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M 97.394609,178.99152 H 82.468381 l -20.175714,13.36545 h 55.277643 z"
          stroke={color}
          fill={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Rect
          width="43.451508"
          height="11.418974"
          x="68.220367"
          y="225.01884"
          rx="2.7857234"
          ry="2.7857234"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <Path
          d="m 180.62023,-85.381493 a 6.0434175,6.0601444 0 0 1 -6.00193,6.060002 6.0434175,6.0601444 0 0 1 -6.08434,-5.976801 6.0434175,6.0601444 0 0 1 5.9184,-6.14206 6.0434175,6.0601444 0 0 1 6.16559,5.892475"
          transform="rotate(88.501419)"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />
        <Path
          d="m 105.51295,192.5955 v 33.90216 h 2.33913 V 192.5955 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
        <Path
          d="m 72.03397,192.5955 v 33.90216 h 2.339151 V 192.5955 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
        <Path
          d="m 95.96216,192.5955 v 33.90216 h 1.847489 V 192.5955 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
        <Path
          d="m 82.014864,192.5955 v 33.90216 h 1.847487 V 192.5955 Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      </G>
    </Svg>
  );
}
