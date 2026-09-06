import { Colors } from "@/constants/GlobalStyles";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  rotation?: number;
}

export default function ArrowSVG({
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
        d="M13 21c.15 0 .3-.03.43-.1.35-.17.57-.52.57-.9v-4h3c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1h-3V4a1.004 1.004 0 00-1.63-.78l-9.99 8c-.24.19-.38.48-.38.78s.14.59.38.78l10 8c.18.14.4.22.62.22m-1-6v2.92L4.6 12 12 6.08V9c0 .55.45 1 1 1h3v4h-3c-.55 0-1 .45-1 1m8-7h2v8h-2z"
      />
    </Svg>
  );
}
