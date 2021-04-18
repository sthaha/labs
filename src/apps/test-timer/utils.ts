interface Time {
  H: number
  M: number
  S: number
  ms: number
}

export const toHMS = (t: number): Time => {

  const H = Math.floor(t / (60 * 60 * 1000))
  t -= H * 60 * 60 * 1000

  const M = Math.floor(t / (60 * 1000))
  t -= M * 60 * 1000

  const S = Math.floor(t / 1000)
  t -= S * 1000

  const ms = t
  return {H, M, S, ms}
}

export const twoDigits = (x: number) => x < 10 ? `0${x}` : `${x}`

const toTime = (t: number|Time) =>  typeof t === 'number' ? toHMS(t) : t

export const formatTime = (t: number|Time) => {
  const hms = toTime(t)
  const h = twoDigits(hms.H)
  const m = twoDigits(hms.M)
  const s = twoDigits(hms.S)
  const ms = String(hms.ms).padStart(3, '0')
  return `${h}:${m}:${s}.${ms}`
}
