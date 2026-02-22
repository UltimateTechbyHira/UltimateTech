/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

declare module '@pagefind/default-ui';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
    dataLayer: any[]
    umami: {
      track: (name: string, data?: Record<string, any>) => void
    }
  }
}

export {}
