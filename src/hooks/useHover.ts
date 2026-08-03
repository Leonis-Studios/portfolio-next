import { useEffect, useRef, useState } from "react";

export function useHover<T extends HTMLElement = HTMLDivElement>() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);

    node.addEventListener("mouseenter", handleEnter);
    node.addEventListener("mouseleave", handleLeave);

    return () => {
      node.removeEventListener("mouseenter", handleEnter);
      node.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return { hovered, ref };
}
