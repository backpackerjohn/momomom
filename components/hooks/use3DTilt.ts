import React, { useRef, useEffect, useCallback } from "react";

/**
 * A custom React hook to apply a 3D tilt effect to an element on mouse move.
 * @param {object} options - Configuration for the tilt effect.
 * @param {number} options.max - The maximum rotation angle in degrees.
 * @param {boolean} options.useRAF - Use requestAnimationFrame for performance.
 * @returns {object} - A ref to attach to the element.
 */
export function use3DTilt<T extends HTMLElement = HTMLDivElement>({ max = 8, useRAF = true } = {}) {
  const ref = useRef<T>(null);
  const animationFrame = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = max * (y - 0.5) * -1;
    const rotateY = max * (x - 0.5);

    const update = () => {
      if (ref.current) {
        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        ref.current.style.transition = "transform 0.1s ease-out";
      }
    };

    if (useRAF) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(update);
    } else {
      update();
    }
  }, [max, useRAF]);

  const handleMouseLeave = useCallback(() => {
    if (useRAF) {
      cancelAnimationFrame(animationFrame.current);
    }
    if (ref.current) {
      ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      ref.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)";
    }
  }, [useRAF]);

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove, { passive: true });
      element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      
      return () => {
        element.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        if (useRAF) {
          cancelAnimationFrame(animationFrame.current);
        }
      };
    }
  }, [handleMouseMove, handleMouseLeave, useRAF]);

  // The hook no longer returns a style object, only the ref.
  return { ref };
}