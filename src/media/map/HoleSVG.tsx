import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function HoleSVG() {
  return (
    <Svg viewBox="0 0 216.81607 145.38652">
      <Defs>
        <LinearGradient id="a">
          <Stop
            offset={0.19360571}
            stopColor="#79ae92"
            stopOpacity={0.88066828}
          />
          <Stop offset={0.91296625} stopColor="#79ae92" stopOpacity={0} />
        </LinearGradient>
        <RadialGradient
          id="b"
          cx={152.53418}
          cy={240.81982}
          fx={152.53418}
          fy={240.81982}
          r={107.81419}
          gradientTransform="matrix(.99985 .0172 -.01195 .69444 2.9 36.37)"
          gradientUnits="userSpaceOnUse"
        />
      </Defs>
      <Path
        d="M125.233 117.245c17.767-3.597 46.404-9.133 46.404-9.133s-5.257 6.108-1.283 7.511c7.768 2.744 28.268 2.051 34.402 4.458 3.068 1.203 7.636-4.528 7.636-4.528 5.315 1.212 49.56 26.172 47.867 59.67-1.693 33.5-2.577 41.23-24.48 46.126-21.903 4.896-102.042.257-102.042.257s-23.191-1.546-36.076-2.576c-12.884-1.031-43.032-9.02-50.763-32.468-7.73-23.45 14.173-59.525 25.253-64.42 3.447-1.524 10.739 4.274 19.793-.531 10.633-5.645 22.631-11.344 30.113-11.906 1.535-.115 3.176 7.54 3.176 7.54z"
        transform="translate(-44.978 -94.436)"
        fill="#000"
        fillOpacity={1}
        stroke="#79ae92"
        strokeWidth={0.600001}
        strokeOpacity={1}
      />
      <Path
        d="M171.602 108.33l2.72-8.22 9.663-5.412M82.2 216.195l-3.35 6.442-11.337 1.804 3.865 5.669M200.734 223.41l10.565 7.215-5.154 8.761 3.608-.773M61.844 131.933l-12.627 3.35-3.865 6.184M244.411 138.89l10.179 1.547 6.957 10.05"
        transform="translate(-44.978 -94.436)"
        fill="none"
        fillOpacity={1}
        stroke="#79ae92"
        strokeWidth={0.600001}
        strokeOpacity={1}
      />
    </Svg>
  );
}
