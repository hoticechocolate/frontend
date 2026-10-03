import type { ReactNode } from "react"
import Icon from "@/components/common/Icon"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { VARIABLES } from "@/utils/colorScales"
import { formatYearMonth } from "@/utils/formatters"
import MapView from "./MapView"
import MapLegend from "./MapLegend"
import PlaybackControls from "./PlaybackControls"

function Compass({
  children,
  className,
}: {
  children: ReactNode
  className: string
}) {
  return (
    <span
      className={`pointer-events-none absolute text-[11px] font-semibold text-slate-300/90 ${className}`}
    >
      {children}
    </span>
  )
}

export default function MapViewer() {
  const variable = useDashboardStore((s) => s.variable)
  const month = useDashboardStore((s) => s.month)
  const year = useDashboardStore((s) => s.year)
  const meta = VARIABLES[variable]

  return (
    <section className="overflow-hidden rounded-2xl bg-navy-950 text-white">
      <h2 className="px-5 pt-4 text-sm font-bold">
        북극 해빙 지도 뷰어
      </h2>

      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="relative mx-auto w-full max-w-[760px]">
          <div className="absolute left-0 top-0 z-10 rounded-lg border border-white/25 bg-navy-950/70 px-3 py-2 backdrop-blur">
            <p className="text-base font-bold">{formatYearMonth(year, month)}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-300">
              {meta.label}
              <Icon name="info" className="size-3.5" />
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-[88%]">
            <MapView
              variable={variable}
              year={year}
              month={month}
              size={720}
              className="size-full"
              label={`${formatYearMonth(year, month)} 북극 ${meta.label} 지도`}
            />
            <Compass className="left-1/2 -top-5 -translate-x-1/2">180°</Compass>
            <Compass className="left-1/2 -bottom-5 -translate-x-1/2">0°</Compass>
            <Compass className="-left-1 top-1/2 -translate-x-full -translate-y-1/2 sm:left-[3%] sm:translate-x-0">
              90°W
            </Compass>
            <Compass className="-right-1 top-1/2 translate-x-full -translate-y-1/2 sm:right-[3%] sm:translate-x-0">
              90°E
            </Compass>
            <Compass className="left-[10%] top-[28%] hidden sm:block">
              북아메리카
            </Compass>
            <Compass className="right-[8%] top-[34%] hidden sm:block">
              아시아
            </Compass>
            <Compass className="bottom-[8%] left-[56%] hidden sm:block">
              유럽
            </Compass>
          </div>
        </div>

        <MapLegend variable={variable} />
      </div>

      <PlaybackControls />
    </section>
  )
}
