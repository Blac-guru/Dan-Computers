"use client";

import React, { useEffect, useRef, ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FadeInUp({ children, delay = 0, duration = 0.6 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Convert delay from ms to seconds for CSS animation
  const delayInSeconds = delay / 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation =
            `fadeInUp ${duration}s ease-out ${delayInSeconds}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delayInSeconds, duration]);

  return <div ref={ref}>{children}</div>;
}

export function FadeInLeft({
  children,
  delay = 0,
  duration = 0.6,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Convert delay from ms to seconds for CSS animation
  const delayInSeconds = delay / 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `slideInRight ${duration}s ease-out ${delayInSeconds}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delayInSeconds, duration]);

  return <div ref={ref}>{children}</div>;
}

export function ScaleIn({ children, delay = 0, duration = 0.6 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Convert delay from ms to seconds for CSS animation
  const delayInSeconds = delay / 1000;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `scaleIn ${duration}s ease-out ${delayInSeconds}s both`;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delayInSeconds, duration]);

  return <div ref={ref}>{children}</div>;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const items = ref.current.querySelectorAll("[data-stagger]");
    items.forEach((item, index) => {
      const delay = index * staggerDelay;
      item.style.animation = `fadeInUp 0.6s ease-out ${delay}s both`;
    });
  }, [staggerDelay]);

  return <div ref={ref}>{children}</div>;
}
