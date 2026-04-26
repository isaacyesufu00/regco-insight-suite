import { useEffect, useState } from "react";

export function useInView<T extends Element>(
  ref: React.RefObject<T>,
  options?: IntersectionObserverInit,
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) setInView(true);
      },
      {
        threshold: 0.15,
        ...options,
      },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, options?.root, options?.rootMargin, options?.threshold]);

  return inView;
}

