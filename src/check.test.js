import * as check from './check';

describe('isRequired check', () => {
  test('empty string to be "false"', () => {
    expect(check.isRequired("")).toBe(false)
  })

  test('not empty string to be "true"', () => {
    expect(check.isRequired("text")).toBe(true)
  })

  test('0 to be "true"', () => {
    expect(check.isRequired(0)).toBe(true)
  })

  test('number to be "true"', () => {
    expect(check.isRequired(10)).toBe(true)
  })
})
