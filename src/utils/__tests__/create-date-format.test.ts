import { describe, it, expect } from 'vitest'

import createDateFormat from '../create-date-format'

describe('createDateFormat', () => {
  it('formats ISO string using default format and Asia/Tokyo timezone', () => {
    const fmt = createDateFormat()
    // 2020-01-01T00:00:00Z in Asia/Tokyo should be 2020/01/01 09:00
    const out = fmt('2020-01-01T00:00:00Z')
    expect(out).toBe('2020/01/01 09:00')
  })

  it('accepts custom format string and timezone', () => {
    const fmt = createDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX", 'UTC')
    const out = fmt('2020-01-01T09:30:15Z')
    // date-fns-tz may format UTC as 'Z' or '+00:00' depending on tokens/version
    expect(['2020-01-01T09:30:15+00:00', '2020-01-01T09:30:15Z']).toContain(out)
  })

  it('formats Date input passed as stringified date', () => {
    const fmt = createDateFormat('yyyy/MM/dd', 'UTC')
    const d = new Date(Date.UTC(2021, 5, 10, 0, 0, 0))
    // pass ISO string
    expect(fmt(d.toISOString())).toBe('2021/06/10')
  })

  it('throws or errors on invalid date string', () => {
    const fmt = createDateFormat()
    let threw = false
    try {
      // invalid date input
      fmt('not-a-date')
    } catch {
      threw = true
    }
    expect(threw).toBe(true)
  })
})
