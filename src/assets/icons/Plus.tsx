import { Svg, Rect, Path } from 'react-native-svg';

const PlusIcon = ({ size = 56, color = '#6B6B7B' }) => (
  <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
    <Rect width={size} height={size} rx={12} fill={color} />
    <Path
      d={`M${size / 2} ${size * 0.32}V${size * 0.68}M${size * 0.32} ${
        size / 2
      }H${size * 0.68}`}
      stroke="#1A1A2E"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default PlusIcon;
