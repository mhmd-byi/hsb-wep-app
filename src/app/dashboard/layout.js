import { Inter } from 'next/font/google'
import Header from '../common/header'
import Sidebar from '../common/sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HSB Indore Web App',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-4 bg-gray-100">{children}</main>
        </div>
      </body>
    </html>
  )
}