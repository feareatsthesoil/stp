"use client";

import { useEffect } from "react";

interface ThemeComponentProps {
  color: string;
}

export default function ThemeComponent({ color }: ThemeComponentProps) {
  useEffect(() => {
    if (color) {
      document.body.style.backgroundColor = color;
    }
  }, [color]);

  return null;
}
