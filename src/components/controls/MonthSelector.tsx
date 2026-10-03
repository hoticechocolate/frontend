import Card from "@/components/common/Card"
import ToggleButton from "@/components/common/ToggleButton"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { MONTHS } from "@/utils/constants"

export default function MonthSelector() {
  const month = useDashboardStore((s) => s.month)
  const setMonth = useDashboardStore((s) => s.setMonth)

  return (
    <Card title="월 선택">
      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 xl:grid-cols-12">
        {MONTHS.map((m) => (
          <ToggleButton
            key={m}
            active={month === m}
            onClick={() => setMonth(m)}
            className="rounded-lg py-2.5"
          >
            {m}월
          </ToggleButton>
        ))}
      </div>
    </Card>
  )
}
