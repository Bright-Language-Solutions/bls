import services from '@/data/services'
import industries from '@/data/industries'
import locations from '@/data/locations'

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguagesolutions.com'

const LANGUAGE_REGIONS = [
  'indian-languages',
  'european-languages',
  'asian-languages',
  'middle-east-languages',
]

export default function sitemap() {
  const staticPages = [
    { url: BASE,                              changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,                changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/get-quote`,               changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/contact`,                 changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/about`,                   changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/languages`,               changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/industries`,              changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about/why-choose-us`,     changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about/industries-we-serve`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/case-studies`,            changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/locations`,               changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/testimonials`,            changeFrequency: 'monthly', priority: 0.6 },
  ].map((p) => ({ ...p, lastModified: new Date() }))

  const servicePages = services.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const languagePages = LANGUAGE_REGIONS.map((region) => ({
    url: `${BASE}/languages/${region}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const industryPages = industries.map((i) => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const locationPages = locations.map((l) => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...languagePages, ...industryPages, ...locationPages]
}
