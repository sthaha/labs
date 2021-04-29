interface Time {
  H: number
  M: number
  S: number
  ms: number
}

export const toHMS = (t: number): Time => {
  if(!t) {
    return {H:0, M:0, S:0, ms:0}
  }
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

export const prettyHMS = (t: number|Time) => {
  if (!t) {
    return {H: '00', M: '00', S:'00', ms: '000'}
  }

  const hms = toTime(t)
  const H = twoDigits(hms.H)
  const M = twoDigits(hms.M)
  const S = twoDigits(hms.S)
  const ms = String(hms.ms).padStart(3, '0')
  return {H, M, S, ms}
}

export const formatHMS = (t: number|Time) => {
  const {H, M, S} = prettyHMS(t)
  return `${H}:${M}:${S}`
}

export const formatTime = (t: number|Time) => {
  const {H, M, S, ms} = prettyHMS(t)
  return `${H}:${M}:${S}.${ms}`
}
