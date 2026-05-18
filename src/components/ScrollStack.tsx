import React, { useLayoutEffect, useRef, useCallback, Children } from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden' }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  rotationAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  useWindowScroll = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const parsePct = useCallback((value: string, base: number) => {
    if (value.endsWith('%')) return (parseFloat(value) / 100) * base;
    return parseFloat(value);
  }, []);

  // Only computes scale + rotation. Pinning is handled by CSS sticky (on the
  // compositor), so we never animate translate3d per scroll frame — that's
  // what caused the mobile shiver on pinned cards. Once a card is fully
  // stuck, progress clamps to 1 and its transform stops changing.
  const updateScales = useCallback(() => {
    const cards = cardsRef.current;
    if (!cards.length) return;
    const containerHeight = useWindowScroll
      ? document.documentElement.clientHeight
      : containerRef.current?.clientHeight ?? 0;
    const stackPositionPx = parsePct(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePct(scaleEndPosition, containerHeight);

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const stickTop = stackPositionPx + i * itemStackDistance;
      let progress = (stickTop + scaleEndPositionPx - rect.top) / scaleEndPositionPx;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      const targetScale = baseScale + i * itemScale;
      const scale = 1 - progress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * progress : 0;

      card.style.transform = `scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(2)}deg)`;
    });
  }, [stackPosition, scaleEndPosition, itemStackDistance, baseScale, itemScale, rotationAmount, useWindowScroll, parsePct]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;

    cards.forEach(card => {
      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    let scheduled = false;
    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      animationFrameRef.current = requestAnimationFrame(() => {
        scheduled = false;
        updateScales();
      });
    };

    const target: Window | HTMLDivElement = useWindowScroll ? window : container;
    target.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    // Late-mount: above-the-fold layout may settle after we render (fonts,
    // lazy images, route transitions). One short tick + load event covers it.
    window.addEventListener('load', scheduleUpdate);
    const lateTick = window.setTimeout(scheduleUpdate, 200);

    updateScales();

    cleanupRef.current = () => {
      target.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('load', scheduleUpdate);
      window.clearTimeout(lateTick);
    };

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      cardsRef.current = [];
    };
  }, [updateScales, useWindowScroll]);

  // Wrap each child in a sticky positioning div. CSS sticky pins each card at
  // its progressively-lower top position; the browser handles this on the
  // compositor thread, so pinned cards do NOT depend on per-frame JS to stay
  // in place — eliminating the JS-vs-compositor scroll-sync shiver on mobile.
  //
  // Convert a "%" stackPosition to "vh". For sticky `top`, `%` resolves
  // against the containing block height (the tall scroll-stack-inner), not
  // the viewport — so "20%" would place the stick point hundreds of pixels
  // off-screen and cards never appear stuck.
  const stickyTopExpr = stackPosition.endsWith('%')
    ? `${parseFloat(stackPosition)}vh`
    : stackPosition;
  const childArr = Children.toArray(children);
  const wrappedChildren = childArr.map((child, i) => (
    <div
      key={i}
      style={{
        position: 'sticky',
        top: `calc(${stickyTopExpr} + ${i * itemStackDistance}px)`,
        marginBottom: i < childArr.length - 1 ? `${itemDistance}px` : 0,
        // Later cards on top so newest in the stack covers older ones where
        // they overlap. Matches original stack visual.
        zIndex: i + 1,
        // A separate compositor layer per sticky wrapper keeps the scale
        // transform inside the layer cheap to recomposite.
        willChange: 'transform'
      }}
    >
      {child}
    </div>
  ));

  const outerClass = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto ${className}`.trim();

  const outerStyle: React.CSSProperties = useWindowScroll
    ? {}
    : {
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth'
      };

  return (
    <div className={outerClass} ref={containerRef} style={outerStyle}>
      <div className="scroll-stack-inner pt-[1vh] px-20 pb-[3.75rem]">
        {wrappedChildren}
      </div>
    </div>
  );
};

export default ScrollStack;
