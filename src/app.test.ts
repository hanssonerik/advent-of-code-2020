import { App } from './app'

describe('App', () => {
  it('runs without crash', async () => {
    expect.assertions(1)

    return expect(App()).resolves.toBe(undefined)
  })
})
