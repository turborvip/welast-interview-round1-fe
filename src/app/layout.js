// app/layout.tsx
import { fonts } from '@/app/constants/fonts'
import { Providers } from './providers'
import DefaultHeader from './components/DefaultHeader'

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en' className={fonts.rubik.variable} >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}