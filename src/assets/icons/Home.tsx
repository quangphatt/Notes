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

const HomeIcon = ({ width, height, color, ...props }: any) => {
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
        fill={color || '#F94695'}
      />
      <G filter="url(#filter0_ii_40_384)" data-figma-bg-blur-radius={10}>
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.808 15.149C16.246 12.492 19.552 11 23 11c3.448 0 6.754 1.492 9.192 4.149C34.63 17.805 36 21.407 36 25.163v7.082c0 2.198 0 3.297-.327 4.164-.44 1.156-1.283 2.075-2.344 2.554-.803.364-1.812.364-3.829.364H23c-3.448 0-6.754-1.492-9.192-4.149C11.37 32.523 10 28.92 10 25.164c0-3.757 1.37-7.36 3.808-10.016zm3.417 8.436c0-.41.15-.804.416-1.095.267-.29.628-.453 1.005-.453h8.688c.383 0 .75.166 1.022.462.271.295.423.696.423 1.113 0 .418-.152.819-.423 1.114a1.388 1.388 0 01-1.022.461h-8.667a1.321 1.321 0 01-.562-.116 1.42 1.42 0 01-.474-.348 1.568 1.568 0 01-.31-.523 1.672 1.672 0 01-.096-.615zm4.332 6.3c0-.41.15-.804.417-1.095.266-.29.628-.453 1.004-.453h4.334c.383 0 .75.166 1.022.461.271.296.423.696.423 1.114 0 .418-.152.819-.423 1.114a1.388 1.388 0 01-1.022.461H23a1.318 1.318 0 01-.562-.116 1.42 1.42 0 01-.475-.348 1.572 1.572 0 01-.31-.523 1.675 1.675 0 01-.095-.615z"
        fill="url(#paint0_linear_40_384)"
      />
      <Defs>
        <ClipPath id="bgblur_0_40_384_clip_path">
          <Rect y={11} width={36} height={36} rx={8} />
        </ClipPath>
        <LinearGradient
          id="paint0_linear_40_384"
          x1={2.5}
          y1={42.5965}
          x2={37.7813}
          y2={20.3641}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor={color || '#F94695'} />
          <Stop offset={1} stopColor="#fff" stopOpacity={0.89} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default HomeIcon;
