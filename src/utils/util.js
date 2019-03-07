export function dealTime (timeString) {
  const val = timeString.slice(0, 19).replace(/-/g, '/')
  let a = new Date().getTime()
  let b = new Date(val).getTime()
  let c = b - a
  if (c > 0) {
    let j = Math.floor(c / (24 * 60 * 60 * 1000)) // 天
    let d = Math.floor((c - j * 24 * 60 * 60 * 1000) / (60 * 60 * 1000)) // 时
    let e = Math.floor((c - j * 24 * 60 * 60 * 1000 - d * 60 * 60 * 1000) / (60 * 1000)) // 分
    let f = Math.floor((c - j * 24 * 60 * 60 * 1000 - d * 60 * 60 * 1000 - e * 60 * 1000) / 1000) // 秒
    let g = d > 9 ? d : '0' + d
    let h = e > 9 ? e : '0' + e
    let i = f > 9 ? f : '0' + f

    return {
      info: `${j}天${g}:${h}:${i}`,
      countdown: true
    }
  } else {
    return {
      info: '活动结束',
      countdown: false
    }
  }
}
