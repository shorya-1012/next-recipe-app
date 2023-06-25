import './globals.css'
import Navbar from '@/components/Navbar'
import { Righteous, Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ReactQueryProvider from '@/ReactQueryProvider'

export const metadata = {
  title: 'RecipeRealm',
  description: 'Discover and try new recipes',
}

const righteous = Righteous({
  subsets: ['latin'],
  variable: '--font-righteous',
  weight: '400'
})

const nunito = Nunito({
  weight: '600',
  subsets: ['latin'],
  variable: '--font-nunito'
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <ReactQueryProvider>
          <body className={`${righteous.variable} ${nunito.variable} font-sans flex flex-col overflow-x-hidden`}>
            <Navbar />
            {children}
          </body>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  )
}
