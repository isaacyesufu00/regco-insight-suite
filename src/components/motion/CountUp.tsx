import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";

type CountUpProps = {
  to: number;
  durationMs?: number;
  className?: string;
  style?: React.CSSProperties;
  format?: (n: number) => string;
};

export function CountUp({
  to,
  durationMs = 1500,
  className,
  style,
  format,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });
  const [value, setValue] = useState(0);

  const fmt = useMemo(() => format ?? ((n: number) => Math.round(n).toString()), [format]);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, durationMs]);

  return (
    <span ref={ref} className={className} style={style}>
      {fmt(value)}
    </span>
  );
}

