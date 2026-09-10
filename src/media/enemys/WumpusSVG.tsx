import { IconProps } from "@/constants/configs";
import { Colors } from "@/constants/GlobalStyles";
import Svg, {
    Defs,
    Ellipse,
    G,
    LinearGradient,
    Path,
    RadialGradient,
    Stop,
} from "react-native-svg";

export default function WumpusSVG({ color = Colors.text }: IconProps) {
  return (
    <Svg viewBox="0 0 177.12031 135.42171">
      <Defs>
        <LinearGradient id="c">
          <Stop offset={0.47069272} stopColor="#79ae92" stopOpacity={0} />
          <Stop offset={1} stopColor="#79ae92" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient id="b">
          <Stop offset={0.46358794} stopColor="#000" stopOpacity={0} />
          <Stop offset={1} stopColor="#000" stopOpacity={1} />
        </LinearGradient>
        <LinearGradient id="a">
          <Stop offset={0} stopColor="#79ae92" stopOpacity={0} />
          <Stop offset={1} stopColor="#000" stopOpacity={0.7368421} />
        </LinearGradient>
        <RadialGradient
          id="d"
          cx={100.87065}
          cy={63.468357}
          fx={100.87065}
          fy={63.468357}
          r={88.560158}
          gradientTransform="matrix(-.98438 -.13354 .09456 -.69706 214.202 118.006)"
          gradientUnits="userSpaceOnUse"
        />
        <RadialGradient
          id="e"
          cx={60.96291}
          cy={63.875477}
          fx={60.96291}
          fy={63.875477}
          r={17.474068}
          gradientTransform="matrix(1 0 0 1.00575 0 -.367)"
          gradientUnits="userSpaceOnUse"
        />
        <RadialGradient
          id="f"
          cx={151.93256}
          cy={57.161777}
          fx={151.93256}
          fy={57.161777}
          r={25.236774}
          gradientTransform="matrix(1 0 0 .9394 0 3.464)"
          gradientUnits="userSpaceOnUse"
        />
      </Defs>
      <G transform="translate(-33.542 -13.062)">
        <Path
          d="M35.878 51.742C95-35.884 190.948 51.532 199.56 67.259c8.146 14.879 20.977 26.856-2.73 57.134-11.506 14.693-45.345 14.936-60.467 14.027-15.121-.908-9.467-9.196-.76-11.922 8.706-2.726 33.347-13.293 33.127-23.233-.152-6.875-6.852-10.36-14.516-16.128-5.928-4.46-13.439-9.167-21.537.91-11.346 14.117-10.763 23.414-26.119 35.892-5.084 4.131-20.162 9.995-32.534 8.178-12.372-1.817-19.016-4.693-22.453-9.087-3.437-4.394-1.801-7.025-1.801-7.025l2.093-7.136s.805 8.352 2.973 9.255c2.95 1.23 4.923 2.208 9.107 3.089 5.717 1.203 12.587.744 18.53-1.304.853-.294-.539-9.398-.539-9.398s5.159 7.613 6.109 7.188c3.422-1.528 5.685-2.847 5.685-2.847s10.585-10.845 11.96-23.567c1.374-12.721.412-20.504.412-20.504s-4.582 7.27-19.246 14.993a261.796 261.796 0 01-7.945 4.04c-.636.308.88 12.294.88 12.294s-5.287-10.245-6.497-9.734c-6.828 2.882-12.537 4.304-17.457 3.528-.833-.132-4.29 9.407-4.29 9.407l-2.57-11.564c.095.43-7.019-3.958-11.151-10.242-6.757-10.275-3.302-33.053-1.946-31.761z"
          stroke="#79ae92"
          fill={color}
          strokeWidth={0.481871}
        />
        <Ellipse
          cx={60.96291}
          cy={63.875477}
          rx={17.174067}
          ry={17.274498}
          fill="#000"
          fillOpacity={1}
          stroke="#000"
          strokeWidth={0.600001}
        />
        <Ellipse
          cx={62.388889}
          cy={-60.432217}
          rx={7.5311193}
          ry={3.6175179}
          transform="matrix(-.01977 .9998 -.99927 -.0381 0 0)"
          fill="#79ae92"
          fillOpacity={1}
          stroke="#000"
          strokeWidth={0.509207}
          strokeOpacity={1}
        />
        <Path
          d="M73.919 78.137c8.637-2.812 6.83-13.458 6.83-13.458M42.182 68.295c2.21 11.85 10.847 14.06 10.847 14.06"
          fill="none"
          fillOpacity={1}
          stroke="#79ae92"
          strokeWidth={0.600001}
          strokeOpacity={1}
        />
        <Path
          d="M153.462 55.64c.614.685-.62 1.166-1.138 1.021-1.405-.393-1.534-2.226-.904-3.298 1.127-1.917 3.788-2.004 5.457-.786 2.448 1.787 2.49 5.372.67 7.616-2.428 2.99-6.965 2.983-9.776.552-3.538-3.058-3.48-8.56-.436-11.934 3.687-4.087 10.159-3.977 14.095-.319 4.638 4.312 4.475 11.758.2 16.254-4.935 5.19-13.357 4.976-18.412.084-5.745-5.56-5.477-14.958.033-20.572 6.181-6.299 16.56-5.978 22.731.15 6.853 6.804 6.48 18.16-.267 24.89-7.425 7.408-19.762 6.981-27.05-.384-7.962-8.047-7.482-21.364.502-29.21 8.668-8.516 22.966-7.983 31.368.62 9.073 9.289 8.486 24.568-.736 33.528-9.91 9.627-26.17 8.988-35.687-.854-9.527-9.851-9.643-25.775-.73-36.055"
          transform="matrix(-2.05842 .09148 -.30313 -.5207 477.352 151.598)"
          fill="#000"
          fillRule="evenodd"
          strokeWidth={0.264162}
          strokeDasharray="none"
        />
      </G>
    </Svg>
  );
}
