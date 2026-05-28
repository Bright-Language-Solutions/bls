import locations from '@/data/locations'

export const metadata = {
  title: 'Locations',
  description: 'Bright Language Solutions serves Delhi NCR with 50 locations across West Delhi, Central Delhi, North Delhi, South Delhi, East Delhi, and the broader NCR.',
  openGraph: {
    title: 'Locations | Bright Language Solutions',
    description: 'Bright Language Solutions serves Delhi NCR with 50 locations across West Delhi, Central Delhi, North Delhi, South Delhi, East Delhi, and the broader NCR.',
    type: 'website',
    url: '/locations',
  },
}

const REGION_ORDER = ['West Delhi', 'Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'NCR']

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
        Delhi NCR presence. Global reach.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        {locations.length} locations across Delhi NCR, covering all major areas from Uttam Nagar HQ to Gurgaon, Noida, and beyond.
      </p>

      {byRegion.map(({ region, cities }) => cities.length > 0 && (
        <div key={region} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0 }}>
              {region}
            </h2>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 28, height: 22, padding: '0 8px', borderRadius: 999, background: 'var(--tint-2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--blue)', fontWeight: 600 }}>
              {cities.length}
            </span>
          </div>
          <div className="locations-region-grid">
            {cities.map((loc) => (
              <div key={loc.slug} className="bls-card" style={{ padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 16, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0 }}>
                    {loc.city}
                  </h3>
                  {loc.headquarters && (
                    <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#06184F', background: '#F5B819', padding: '2px 6px', borderRadius: 999, flexShrink: 0 }}>
                      HQ
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {loc.servicesAvailable.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--tint)', fontSize: 11, color: 'var(--muted-c)', textTransform: 'capitalize' }}
                    >
                      {s}
                    </span>
                  ))}
                  {loc.servicesAvailable.length > 3 && (
                    <span style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--tint)', fontSize: 11, color: 'var(--muted-c)' }}>
                      +{loc.servicesAvailable.length - 3} more
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
