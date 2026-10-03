import { useState } from "react"
import Card from "@/components/common/Card"
import type { StatisticsPeriod } from "@/utils/types"

const MONTHLY_VOYAGES = [38, 32, 45, 58, 86, 142, 251, 326, 310, 260, 180, 114]
const YEARLY_LEVELS = [44, 53, 62, 70, 76, 92]
const YEARLY_LABELS = ["19년", "20년", "21년", "22년", "23년", "24년"]
const PERIODS: { id: StatisticsPeriod; label: string }[] = [
  { id: "yearly", label: "연간" },
  { id: "monthly", label: "월별" },
]

export default function VoyageChart() {
  const [period, setPeriod] = useState<StatisticsPeriod>("yearly")
  const monthly = period === "monthly"
  const data = monthly
    ? MONTHLY_VOYAGES.map((v) => (v / 326) * 100)
    : YEARLY_LEVELS
  const labels = monthly
    ? MONTHLY_VOYAGES.map((_, i) => `${i + 1}월`)
    : YEARLY_LABELS

  return (
    <Card
      title={monthly ? "월별 운항 건수" : "연간 운항 건수"}
      badge={monthly ? "2024년" : "2019–24년"}
    >
      <div
        className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1"
        role="group"
        aria-label="운항 통계 조회 단위"
      >
        {PERIODS.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-pressed={period === p.id}
            onClick={() => setPeriod(p.id)}
            className={`flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
              period === p.id
                ? "bg-white text-brand shadow-sm"
                : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div
        className="overflow-x-auto pb-1"
        tabIndex={0}
        role="region"
        aria-label={monthly ? "2024년 월별 운항 건수 차트" : "연간 운항 건수 차트"}
      >
        <div className={monthly ? "min-w-[320px]" : ""}>
          <div className="flex h-28 items-end gap-2 border-b border-slate-200 pb-1">
            {data.map((height, i) => (
              <div
                key={labels[i]}
                className="flex h-full flex-1 items-end"
                title={monthly ? `${labels[i]}: ${MONTHLY_VOYAGES[i]}건` : labels[i]}
              >
                <div
                  className={`w-full rounded-t-md transition-[height] duration-300 ${
                    i === data.length - 1 ? "bg-brand" : "bg-slate-200"
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-500">
            {labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold tracking-tight text-navy-900">
            1,842
          </p>
          <p className="text-[11px] text-slate-500">
            {monthly ? "2024년 운항 완료 건수" : "운항 완료 건수"}
          </p>
        </div>
        <span className="rounded-full bg-brand-soft px-2 py-1 text-[11px] font-bold text-brand">
          +12.4%
        </span>
      </div>
      {monthly && (
        <p className="mt-2 text-[10px] text-slate-400">
          월별 통계는 예시 데이터입니다.
        </p>
      )}
    </Card>
  )
}
