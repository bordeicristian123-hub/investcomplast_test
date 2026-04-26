import { useInView } from 'motion/react';
import { useRef, useState, useEffect, useMemo } from 'react';
import Counter from './Counter';

interface AnimatedCounterProps {
  value: number;
  fontSize?: number;
  padding?: number;
  gap?: number;
  textColor?: string;
  fontWeight?: React.CSSProperties['fontWeight'];
  gradientFrom?: string;
  gradientTo?: string;
  borderRadius?: number;
  horizontalPadding?: number;
  active?: boolean;
}

function getPlacesForValue(value: number): number[] {
  const str = Math.abs(Math.floor(value)).toString();
  return str.split('').map((_, i) => Math.pow(10, str.length - i - 1));
}

export default function AnimatedCounter({
  value,
  fontSize = 32,
  padding = 0,
  gap = 2,
  textColor = 'white',
  fontWeight = 900,
  gradientFrom = 'transparent',
  gradientTo = 'transparent',
  borderRadius = 0,
  horizontalPadding = 0,
  active = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  // Always compute places from the TARGET value so all digit slots exist from the start
  const places = useMemo(() => getPlacesForValue(value), [value]);

  useEffect(() => {
    if (isInView && active) {
      const timeout = setTimeout(() => {
        setDisplayValue(value);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [isInView, active, value]);

  return (
    <span ref={ref}>
      <Counter
        value={displayValue}
        places={places}
        fontSize={fontSize}
        padding={padding}
        gap={gap}
        textColor={textColor}
        fontWeight={fontWeight}
        gradientFrom={gradientFrom}
        gradientTo={gradientTo}
        borderRadius={borderRadius}
        horizontalPadding={horizontalPadding}
      />
    </span>
  );
}
