import './globals.css'
import Navbar from '@/components/Navbar'
import { Righteous } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'RecipeRealm',
  description: 'Discover and try new recipes',
}

const righteous = Righteous({
  subsets: ['latin'],
  variable: '--font-righteous',
  weight: '400'
})


export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={`${righteous.variable} flex flex-col overflow-x-hidden`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
