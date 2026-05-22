import './globals.css'
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguagesolutions.com'),
  title: {
    default: 'Bright Language Solutions | ISO-Certified Translation & Localisation',
    template: '%s | Bright Language Solutions',
  },
  description:
    'ISO 17100 & 9001 certified translation, localisation, voice-over, dubbing, interpretation, and DTP in 120+ languages. Quote in 4 hours. Kickoff in 24.',
  keywords: [
    'translation services india',
    'localisation company',
    'certified translation',
    'interpretation services',
    'voice over services',
    'dubbing services',
    'ISO 17100 translation',
    'multilingual content',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.brightlanguagesolutions.com',
    siteName: 'Bright Language Solutions',
    title: 'Bright Language Solutions | ISO-Certified Translation & Localisation',
    description:
      'ISO 17100 & 9001 certified translation, localisation, voice-over, and interpretation in 120+ languages.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Bright Language Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bright Language Solutions',
    description: 'ISO-certified language services. 120+ languages. Quote in 4 hours.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('bls-theme'),s=window.matchMedia('(prefers-color-scheme: dark)').matches,dark=t==='dark'||(!t&&s);document.documentElement.setAttribute('data-theme',dark?'dark':'light');if(dark)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  )
}
