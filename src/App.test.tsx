import { describe, expect, it } from 'vitest'
import AppWrapper from './AppRedux'
import { render, screen } from './test/test-utils'

describe('Simple working test', () => {
  it('render the logo', async () => {
    render(<AppWrapper />)
    expect(await screen.findByText(/Todo/i)).toBeInTheDocument()
  })
})
