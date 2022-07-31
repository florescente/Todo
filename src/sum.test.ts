import sum from './sum'
import { describe, it, expect } from 'vitest'

describe('#sum', () => {
  it('returns 0 with no numbers', () => {
    expect(sum()).toBe(0)
  })
})
