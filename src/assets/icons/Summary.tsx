import {
  Svg,
  Rect,
  G,
  Path,
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
} from 'react-native-svg';

const SummaryIcon = ({ width, height, color, ...props }: any) => {
  return (
    <Svg
      width={width || 51}
      height={height || 47}
      viewBox="0 0 51 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        x={16}
        width={36}
        height={36}
        rx={8}
        transform="rotate(17.71 16 0)"
        fill={color || "#F94695"}
      />
      <G filter="url(#filter0_ii_40_474)" data-figma-bg-blur-radius={10}>
        <Rect
          y={11}
          width={36}
          height={36}
          rx={8}
          fill="#fff"
          fillOpacity={0.03}
        />
      </G>
      <Path
        d="M33 28.941a9.37 9.37 0 00-9.358-9.361h-11.28a9.362 9.362 0 100 18.723h10.625v3.387l6.664-5.578A9.347 9.347 0 0033 28.942zm-24.703 0a4.068 4.068 0 014.064-4.064h11.28a4.064 4.064 0 010 8.128h-11.28a4.068 4.068 0 01-4.064-4.064z"
        fill="url(#paint0_linear_40_474)"
      />
      <Path
        d="M23.195 30.322a1.381 1.381 0 100-2.762 1.381 1.381 0 000 2.762z"
        fill="url(#paint1_linear_40_474)"
      />
      <Path
        d="M12.804 30.322a1.381 1.381 0 100-2.762 1.381 1.381 0 000 2.762z"
        fill="url(#paint2_linear_40_474)"
      />
      <Defs>
        <ClipPath id="bgblur_0_40_474_clip_path">
          <Rect y={11} width={36} height={36} rx={8} />
        </ClipPath>
        <LinearGradient
          id="paint0_linear_40_474"
          x1={-5.65406}
          y1={44.2409}
          x2={24.7958}
          y2={15.8751}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color || "#F94695"} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.89} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_40_474"
          x1={21.0171}
          y1={30.6412}
          x2={24.5763}
          y2={28.1975}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color || "#F94695"} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.89} />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_40_474"
          x1={10.6263}
          y1={30.6412}
          x2={14.1855}
          y2={28.1975}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color || "#F94695"} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.89} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default SummaryIcon;
