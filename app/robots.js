export default function robots() {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguage.in'
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  }
}
