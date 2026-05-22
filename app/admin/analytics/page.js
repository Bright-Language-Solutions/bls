export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getQuotesCollection } from '@/lib/mongo'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function buildLastSixMonths() {
  const months = []
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ year: d.getFullYear(), month: d.getMonth() + 1, label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}` })
  }
  return months
}

export default async function AnalyticsPage() {
  let stats = { total: 0, received: 0, inProgress: 0, delivered: 0 }
  let serviceRows = []
  let monthlyRows = []
  let error = null

  try {
    const col = await getQuotesCollection()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    sixMonthsAgo.setDate(1)
    sixMonthsAgo.setHours(0, 0, 0, 0)

    const [total, received, inProgress, delivered, serviceAgg, monthlyAgg] = await Promise.all([
      col.countDocuments({}),
      col.countDocuments({ status: 'RECEIVED' }),
      col.countDocuments({ status: { $in: ['IN_REVIEW', 'IN_PROGRESS', 'QUOTED'] } }),
      col.countDocuments({ status: 'DELIVERED' }),
      col.aggregate([
        { $group: { _id: '$serviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).toArray(),
      col.aggregate([
        { $match: { createdAt: { $gte: sixMonthsAgo } } },
        { $group: { _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]).toArray(),
    ])

    stats = { total, received, inProgress, delivered }
    serviceRows = serviceAgg.map((r) => ({ service: r._id || 'Unknown', count: r.count }))

    const monthlyMap = {}
    for (const r of monthlyAgg) {
      monthlyMap[`${r._id.year}-${r._id.month}`] = r.count
    }
    monthlyRows = buildLastSixMonths().map(({ year, month, label }) => ({
      label,
      count: monthlyMap[`${year}-${month}`] || 0,
    }))
  } catch (err) {
    console.error('[admin/analytics] fetch failed', err?.message || err)
    error = 'Could not load analytics from the database.'
  }

  const STAT_CARDS = [
    { label: 'Total Quotes',  value: stats.total,      color: 'text-brand-navy dark:text-white' },
    { label: 'Received',      value: stats.received,   color: 'text-blue-600 dark:text-blue-400' },
    { label: 'In Progress',   value: stats.inProgress, color: 'text-amber-600 dark:text-amber-400' },
    { label: 'Delivered',     value: stats.delivered,  color: 'text-green-600 dark:text-green-400' },
  ]

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Analytics</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Quote volume by service and status</p>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {STAT_CARDS.map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <p className={['mt-1 text-3xl font-bold', color].join(' ')}>{value}</p>
          </div>
        ))}
      </div>

      {/* Monthly quote volume */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-brand-navy dark:text-white">Monthly Quote Volume — Last 6 Months</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Month</th>
              <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Quotes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {monthlyRows.map(({ label, count }) => (
              <tr key={label} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-5 py-3 font-medium text-brand-navy dark:text-white">{label}</td>
                <td className="px-5 py-3 text-right text-slate-700 dark:text-slate-300">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service breakdown */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-brand-navy dark:text-white">Quotes by Service Type</h2>
        </div>
        {serviceRows.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">No quote data yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Service</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">Count</th>
                <th className="px-5 py-3 text-right text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {serviceRows.map(({ service, count }) => (
                <tr key={service} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-5 py-3 font-medium text-brand-navy dark:text-white">{service}</td>
                  <td className="px-5 py-3 text-right text-slate-700 dark:text-slate-300">{count}</td>
                  <td className="px-5 py-3 text-right text-slate-500 dark:text-slate-400">
                    {stats.total > 0 ? `${Math.round((count / stats.total) * 100)}%` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
