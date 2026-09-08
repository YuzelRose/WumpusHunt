import { IconProps } from "@/constants/constants";
import { Colors } from "@/constants/GlobalStyles";
import Svg, { G, Path } from "react-native-svg";

export default function Spyglass3Seg({
  rotation = 0,
  size = 24,
  color = Colors.text,
  strokeWidth = 8,
  ...props
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 114 81"
      fill="none"
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <G transform="translate(-63.789869, -79.412183)">
        {/* Sección 1 */}
        <Path
          d="m 102.87612,142.96867 -8.474165,-31.626 -27.845894,7.46128 8.474163,31.62601 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m 94.394384,111.31441 -1.263896,-4.71692 -27.845893,7.46128 1.263896,4.71693 z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m 101.3691,144.68209 -0.31767,-1.18556 -24.177063,6.47823 0.31767,1.18556 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
        <Path
          d="m 104.90369,150.53566 -0.99369,-3.70847 -27.84589,7.46128 0.993682,3.70847 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M 91.403808,106.52974 C 87.291308,91.181798 71.653273,82.036828 71.653273,82.036828 c 0,0 -8.970464,15.738785 -4.85802,31.086752"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />

        {/* Sección 2 */}
        <Path
          d="m 138.37625,142.96867 -8.47417,-31.626 -27.84589,7.46128 8.47416,31.62601 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m 129.89451,111.31441 -1.26389,-4.71692 -27.8459,7.46128 1.2639,4.71693 z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m 136.86923,144.68209 -0.31767,-1.18556 -24.17706,6.47823 0.31767,1.18556 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
        <Path
          d="m 140.40382,150.53566 -0.99369,-3.70847 -27.84589,7.46128 0.99368,3.70847 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M 126.90394,106.52974 C 122.79144,91.181798 107.1534,82.036828 107.1534,82.036828 c 0,0 -8.970461,15.738785 -4.85802,31.086752"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />

        {/* Sección 3 */}
        <Path
          d="m 173.87625,142.96867 -8.47417,-31.626 -27.84589,7.46128 8.47416,31.62601 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m 165.39451,111.31441 -1.26389,-4.71692 -27.8459,7.46128 1.2639,4.71693 z"
          fill={color}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="m 172.36923,144.68209 -0.31767,-1.18556 -24.17706,6.47823 0.31767,1.18556 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="miter"
        />
        <Path
          d="m 175.90382,150.53566 -0.99369,-3.70847 -27.84589,7.46128 0.99368,3.70847 z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M 162.40394,106.52974 C 158.29144,91.181798 142.6534,82.036828 142.6534,82.036828 c 0,0 -8.97046,15.738785 -4.85802,31.086752"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
        />
      </G>
    </Svg>
  );
}
