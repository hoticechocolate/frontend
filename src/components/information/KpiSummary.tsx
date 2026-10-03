import KpiCard from "@/components/common/KpiCard"
import type { IconName } from "@/components/common/Icon"

interface KpiItem {
  label: string
  value: string
  detail: string
  icon: IconName
  accent?: boolean
  warning?: boolean
}

const KPI_ITEMS: KpiItem[] = [
  {
    label: "항로 안전 수준",
    value: "낮은 위험",
    detail: "↑ 안정적",
    icon: "shield",
    accent: true,
  },
  { label: "평균 해빙 두께", value: "1.24 미터", detail: "−6.8%", icon: "ice" },
  {
    label: "예상 통항 시간",
    value: "12일 8시간",
    detail: "−14시간",
    icon: "clock",
  },
  {
    label: "기상 경보",
    value: "발효 중 3건",
    detail: "심각 2건",
    icon: "alert",
    warning: true,
  },
]

export default function KpiSummary() {
  return (
    <section
      aria-label="핵심 지표"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {KPI_ITEMS.map((item) => (
        <KpiCard key={item.label} {...item} />
      ))}
    </section>
  )
}
