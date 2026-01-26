/**
 * stringToColorWithFrame
 *
 * 任意の文字列から安定かつ高分散な鮮やかな HEX カラーコードと枠色を生成します。
 * 同じ文字列は常に同じ色を返し、先頭文字が同じ単語でも色がばらけます。
 *
 * @param str 任意の文字列
 * @returns [color, frame] HEX カラー配列。color が背景色、frame が明度に応じた枠色（'#000' または '#fff'）
 */

/**
 * FNV-1a ハッシュアルゴリズムで文字列をハッシュ化します
 * @internal
 */
const hashString = (s: string): number => {
  let h = 2166136261 >>> 0
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i) * (i + 1)
    h = Math.imul(h, 16777619)
  }
  h ^= h >>> 13
  h = Math.imul(h, 0x5bd1e995)
  h ^= h >>> 15
  return h >>> 0
}

/**
 * シード値から疑似乱数を生成します
 * @internal
 */
const generateRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

/**
 * HSL 色空間を RGB に変換します
 * @internal
 */
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}

/**
 * RGB 色から明るさ（YIQ）を計算します
 * @internal
 */
const calculateLuminance = (r: number, g: number, b: number): number => {
  return (r * 299 + g * 587 + b * 114) / 1000
}

/**
 * RGB 値を HEX 形式の文字列に変換します
 * @internal
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[r, g, b]
    .map((v) => {
      const hex = v.toString(16)
      return hex.length === 1 ? `0${hex}` : hex
    })
    .join('')}`
}

export function stringToColorWithFrame(str: string): [string, string] {
  const base = hashString(str)
  const hashH = hashString(str + 'h')
  const hashS = hashString(str + 's')
  const hashL = hashString(str + 'l')

  const h = Math.floor(generateRandom(base ^ hashH ^ hashS ^ hashL) * 360)
  const s = 60 + Math.floor(Math.pow(generateRandom(hashS), 0.6) * 40)
  const l = 45 + Math.floor(Math.pow(generateRandom(hashL), 0.8) * 20)

  const [r, g, b] = hslToRgb(h, s, l).map(Math.round)
  const hexColor = rgbToHex(r, g, b)

  const luminance = calculateLuminance(r, g, b)
  const frame = luminance >= 140 ? '#000' : '#fff'

  return [hexColor, frame]
}
