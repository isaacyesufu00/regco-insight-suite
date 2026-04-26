import { useMemo, useRef } from "react";
import { useInView } from "@/hooks/useInView";

type WordRevealProps = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;
};

export function WordReveal({ text, className, style, stagger = 0.06 }: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.15 });
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);

  return (
    <div ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, idx) => (
        <span
          key={`${w}-${idx}`}
          style={{
            display: "inline-block",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transitionDelay: `${idx * stagger}s`,
            willChange: "opacity, transform",
          }}
        >
          {w}
          {idx < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </div>
  );
}

