import { useEffect, useRef, useState } from "react";

export function useVisible(threshold = 0.08) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export function useSectionProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let current = 0;
    let target = 0;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        target = Math.max(
          0,
          Math.min(1, 1 - (rect.top + rect.height) / (viewportHeight + rect.height)),
        );
        current = lerp(current, target, 0.12);

        if (Math.abs(current - target) > 0.001) {
          setProgress(current);
        } else {
          setProgress(target);
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref]);

  return progress;
}

export function useScrollToggle(offset = 0.7) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * offset);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return visible;
}
