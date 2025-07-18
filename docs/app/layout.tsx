import '@/app/global.css'
import '@/app/styles/index.scss'

import { RootProvider } from 'fumadocs-ui/provider'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.png', // or '/favicon.svg'
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={inter.className}
      suppressHydrationWarning
    >
      <body className='flex flex-col min-h-screen'>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
