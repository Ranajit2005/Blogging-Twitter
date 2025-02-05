"use client";

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider, ThemeProviderProps } from 'next-themes'
import React from 'react'

const Provider = ({children,...props}:ThemeProviderProps) => {
  return (
    <NextThemeProvider {...props}>
        <SessionProvider>
            {children}
        </SessionProvider>
    </NextThemeProvider>
  );
}

export default Provider;
