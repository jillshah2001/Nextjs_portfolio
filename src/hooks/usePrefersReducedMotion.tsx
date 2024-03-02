import { useState, useEffect } from "react";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => {
        setPrefersReducedMotion(mediaQuery.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      // Cleanup
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;