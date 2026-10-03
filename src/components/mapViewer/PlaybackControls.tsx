import Icon from "@/components/common/Icon"
import { usePlayback } from "@/hooks/usePlayback"
import { useDashboardStore } from "@/hooks/useDashboardStore"
import { PLAYBACK_SPEEDS, YEAR_MAX, YEAR_MIN } from "@/utils/constants"

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"

export default function PlaybackControls() {
  const { playing, speed, play, pause, setSpeed } = usePlayback()
  const month = useDashboardStore((s) => s.month)
  const year = useDashboardStore((s) => s.year)
  const setMonth = useDashboardStore((s) => s.setMonth)
  const setYear = useDashboardStore((s) => s.setYear)
  const stepMonth = useDashboardStore((s) => s.stepMonth)
  const timelineIndex = (year - YEAR_MIN) * 12 + (month - 1)
  const lastTimelineIndex = (YEAR_MAX - YEAR_MIN + 1) * 12 - 1
  const progress = (timelineIndex / lastTimelineIndex) * 100

  const setTimelineIndex = (index: number) => {
    setYear(YEAR_MIN + Math.floor(index / 12))
    setMonth((index % 12) + 1)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-white/15 px-4 py-3">
      <button
        type="button"
        onClick={playing ? pause : play}
        className={`flex w-28 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-semibold ${focusRing} ${
          playing
            ? "border-brand bg-brand text-white"
            : "border-white/25 bg-white/5 text-slate-100 hover:bg-white/10"
        }`}
      >
        <Icon name={playing ? "pause" : "play"} className="size-4" />
        {playing ? "일시정지" : "재생"}
      </button>

      <div className="flex items-center rounded-lg border border-white/25 bg-white/5">
        <button
          type="button"
          aria-label="이전 이미지"
          onClick={() => stepMonth(-1)}
          className={`grid size-9 place-items-center hover:bg-white/10 ${focusRing}`}
        >
          <Icon name="left" className="size-4" />
        </button>
        <span className="w-24 text-center text-sm font-semibold tabular-nums">
          {year}.{String(month).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="다음 이미지"
          onClick={() => stepMonth(1)}
          className={`grid size-9 place-items-center hover:bg-white/10 ${focusRing}`}
        >
          <Icon name="right" className="size-4" />
        </button>
      </div>

      <div className="order-last min-w-[220px] flex-1 basis-full sm:order-none sm:basis-0">
        <input
          type="range"
          min={0}
          max={lastTimelineIndex}
          value={timelineIndex}
          onChange={(e) => setTimelineIndex(Number(e.target.value))}
          aria-label="월별 이미지 타임라인"
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-sky-400"
          style={{
            background: `linear-gradient(to right, #38a1ff ${progress}%, rgba(255,255,255,.2) ${progress}%)`,
          }}
        />
        <div className="mt-1 flex justify-between text-[11px] text-slate-300">
          <span>{YEAR_MIN}</span>
          <span>{YEAR_MAX}</span>
        </div>
      </div>

      <label className="flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-3 py-2 text-[11px] text-slate-200">
        재생 속도
        <select
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="rounded bg-navy-900 px-1 py-0.5 text-xs font-semibold text-white"
        >
          {PLAYBACK_SPEEDS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
