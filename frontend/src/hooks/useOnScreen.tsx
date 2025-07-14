import { useState, useEffect, useRef, type RefObject } from "react";

export function useOnScreen<T extends Element>(
  options?: IntersectionObserverInit
): { ref: RefObject<T | null>; isVisible: boolean } {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      options
    )

    if (ref.current) observer.observe(ref.current)

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    };
  }, [ref, options])

  return { ref, isVisible }
}
