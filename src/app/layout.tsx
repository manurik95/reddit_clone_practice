import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import Providers from '@/components/Providers'
import {Inter} from "next/font/google"

export const metadata = {
  title: 'Breadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,
  // @authModal interceptet die Anfrage hier können wir es verarbeiten
  authModal
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang='en' className={cn(
      'bg-white text-slate-900 antialiased ligth',
      inter.className  
    )}>
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Providers>
        
        {/* @ts-expect-error server component */}
        <Navbar />
         {/* hier wir der intercept gerendert */}
        {authModal}

        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}

        </div>
        
        <Toaster/>
        </Providers>
      </body>
    </html>
  )
}
