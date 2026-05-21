import locations from '@/data/locations'

export const metadata = {
  title: 'Locations',
  description: 'Bright Language Solutions production hubs and linguist networks across 27 Indian cities — Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and more.',
  openGraph: {
    title: 'Locations | Bright Language Solutions',
    description: 'Bright Language Solutions production hubs and linguist networks across 27 Indian cities — Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, and more.',
    type: 'website',
    url: '/locations',
  },
}

const REGION_ORDER = ['North', 'West', 'South', 'East', 'Central']

export default function LocationsPage() {
  const byRegion = REGION_ORDER.map((r) => ({
    region: r,
    cities: locations.filter((l) => l.region === r),
  }))

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Locations
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 520 }}>
        Pan-India presence. Global reach.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        {locations.length} cities across India, with international hubs in London, Dubai, Singapore, Tokyo, New York, and Toronto.
      </p>

      {byRegion.map(({ region, cities }) => (
        <div key={region} style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
            {region} India
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {cities.map((loc) => (
              <div key={loc.slug} className="bls-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0 }}>
                    {loc.city}
                  </h3>
                  <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted-c)' }}>
                    {loc.state}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {loc.servicesAvailable.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--tint)', fontSize: 11, color: 'var(--muted-c)', textTransform: 'capitalize' }}
                    >
                      {s.replace(/-/g, ' ')}
                    </span>
                  ))}
                  {loc.servicesAvailable.length > 4 && (
                    <span style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--tint)', fontSize: 11, color: 'var(--muted-c)' }}>
                      +{loc.servicesAvailable.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
