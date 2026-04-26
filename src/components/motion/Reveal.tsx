import { useMemo, useRef } from "react";
import { useInView } from "@/hooks/useInView";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /**
   * Start offset in px, default 30px (Apple spec).
   */
  y?: number;
  /**
   * Transition duration in seconds.
   */
  duration?: number;
  /**
   * Delay in seconds.
   */
  delay?: number;
};

export function Reveal({
  children,
  className,
  style,
  y = 30,
  duration = 0.7,
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.1 });
  const transition = useMemo(
    () => `opacity ${duration}s ease, transform ${duration}s ease`,
    [duration],
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition,
        transitionDelay: `${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

