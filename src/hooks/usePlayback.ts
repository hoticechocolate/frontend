import { useEffect } from "react"
import { useDashboardStore } from "@/hooks/useDashboardStore"

export function usePlayback() {
  const playing = useDashboardStore((s) => s.playing)
  const speed = useDashboardStore((s) => s.speed)
  const play = useDashboardStore((s) => s.play)
  const pause = useDashboardStore((s) => s.pause)
  const setSpeed = useDashboardStore((s) => s.setSpeed)
  const advanceMonth = useDashboardStore((s) => s.advanceMonth)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(advanceMonth, speed)
    return () => clearInterval(id)
  }, [playing, speed, advanceMonth])

  return { playing, speed, play, pause, setSpeed }
}
