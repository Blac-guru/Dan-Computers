"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Convert delay from ms to seconds for CSS animation
  const delayInSeconds = delay / 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (
            (entry.target as HTMLElement).style as CSSStyleDeclaration
          ).animation =
            `fadeInUp ${duration}s ease-out ${delayInSeconds}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delayInSeconds, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function FadeInLeft({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Convert delay from ms to seconds for CSS animation
  const delayInSeconds = delay / 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (
            (entry.target as HTMLElement).style as CSSStyleDeclaration
          ).animation =
            `slideInRight ${duration}s ease-out ${delayInSeconds}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delayInSeconds, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function ScaleIn({ children, delay = 0, duration = 0.6 }: FadeInProps) {
  // include className support
  const { className } = (arguments[0] || {}) as FadeInProps;
  const ref = useRef<HTMLDivElement>(null);
  // Convert delay from ms to seconds for CSS animation
  const delayInSeconds = delay / 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (
            (entry.target as HTMLElement).style as CSSStyleDeclaration
          ).animation = `scaleIn ${duration}s ease-out ${delayInSeconds}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delayInSeconds, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll("[data-stagger]");
    items.forEach((item, index) => {
      const delay = index * staggerDelay;
      ((item as HTMLElement).style as CSSStyleDeclaration).animation =
        `fadeInUp 0.6s ease-out ${delay}s both`;
    });
  }, [staggerDelay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
