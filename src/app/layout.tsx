import './globals.css'
import Navbar from '@/components/navbar-ui/Navbar'
import { Righteous, Nunito } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import ReactQueryProvider from '@/ReactQueryProvider'
import { Toaster } from '@/components/ui/toaster'

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

export default async function RootLayout({
  children,
  authModal
}:
  {
    children: React.ReactNode,
    authModal: React.ReactNode
  }) {

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <ReactQueryProvider>
          <body className={`${righteous.variable} ${nunito.variable} font-sans overflow-x-hidden bg-dark-body text-white`}>

            <Navbar />

            {authModal}

            <div className='h-full mx-auto'>
              {children}
            </div>
            <Toaster />
          </body>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  )
}
