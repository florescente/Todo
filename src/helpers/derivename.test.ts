import { describe, expect, it } from 'vitest'
import derivename from './derivename'

describe('Get the Nickname from email', () => {
  it('returns username', async () => {
    expect(derivename('abc@gmail.com')).toBe('abc')
  })
})
