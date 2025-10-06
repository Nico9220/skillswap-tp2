"use client";

import { ThemeProvider } from "next-themes";
import {VT323 } from 'next/font/google';

export const vt323 = VT323({weight:"400",subsets:["latin"], variable:"--font-vt323"});
export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
