import MainLayout from "@/components/layout/MainLayout"
import IceAreaTrendChart from "@/components/charts/IceAreaTrendChart"
import VoyageChart from "@/components/charts/VoyageChart"
import SwipeCompare from "@/components/comparison/SwipeCompare"
import MonthSelector from "@/components/controls/MonthSelector"
import VariableSelector from "@/components/controls/VariableSelector"
import DataSources from "@/components/information/DataSources"
import KpiSummary from "@/components/information/KpiSummary"
import RouteInfo from "@/components/information/RouteInfo"
import MapViewer from "@/components/mapViewer/MapViewer"
import TripleView from "@/components/multiViews/TripleView"

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-navy-900">
            북극 항로 현황
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            북극해 항로 전 구간의 운항 환경
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
          <span className="size-2 rounded-full bg-brand shadow-[0_0_0_3px_rgba(23,105,224,.15)]" />
          실시간 데이터 · 2025년 9월 18일 14:32 세계협정시
        </div>
      </div>

      <KpiSummary />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <VariableSelector />
        <MonthSelector />
      </div>

      <MapViewer />

      <div className="grid gap-4 xl:grid-cols-2">
        <TripleView />
        <SwipeCompare />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <VoyageChart />
        <IceAreaTrendChart />
        <RouteInfo />
        <DataSources />
      </div>
    </MainLayout>
  )
}
