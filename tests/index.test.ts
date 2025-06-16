import { expect, test } from 'vitest'
import { convert } from '../src'

test('convert function should exist', () => {
  expect(typeof convert).toBe('function')
})

// ✅ Basic integer rupees
test('convert integer rupees', () => {
  expect(convert(0)).toBe('Zero Rupees Only')
  expect(convert(1)).toBe('One Rupees Only')
  expect(convert(12)).toBe('Twelve Rupees Only')
  expect(convert(100)).toBe('One Hundred Rupees Only')
  expect(convert(1234)).toBe(
    'One Thousand Two Hundred and Thirty Four Rupees Only',
  )
  expect(convert(100000)).toBe('One Lakh Rupees Only')
  expect(convert(12345678)).toBe(
    'One Crore Twenty Three Lakh Forty Five Thousand Six Hundred and Seventy Eight Rupees Only',
  )
  expect(convert(99999999)).toBe(
    'Nine Crore Ninety Nine Lakh Ninety Nine Thousand Nine Hundred and Ninety Nine Rupees Only',
  )
})

// ✅ Rupees + paise
test('convert rupees and paise', () => {
  expect(convert(0.25)).toBe('Twenty Five Paise')
  expect(convert(1.5)).toBe('One Rupees and Fifty Paise')
  expect(convert(1234.75)).toBe(
    'One Thousand Two Hundred and Thirty Four Rupees and Seventy Five Paise',
  )
  expect(convert(100000.99)).toBe('One Lakh Rupees and Ninety Nine Paise')
})

test('paise rounding', () => {
  expect(convert(1234.999)).toBe(
    'One Thousand Two Hundred and Thirty Four Rupees and Ninety Nine Paise',
  )
  expect(convert(99.995)).toBe('Ninety Nine Rupees and Ninety Nine Paise')
})

// ✅ Negative values
test('negative rupees', () => {
  expect(convert(-1234.75)).toBe(
    'Minus One Thousand Two Hundred and Thirty Four Rupees and Seventy Five Paise',
  )
  expect(convert(-1)).toBe('Minus One Rupees Only')
  expect(convert(-0.5)).toBe('Minus Fifty Paise')
})

// ✅ String inputs
test('string inputs', () => {
  expect(convert('1234')).toBe(
    'One Thousand Two Hundred and Thirty Four Rupees Only',
  )
  expect(convert('-9876543.21')).toBe(
    'Minus Ninety Eight Lakh Seventy Six Thousand Five Hundred and Forty Three Rupees and Twenty One Paise',
  )
})

// ✅ Invalid string inputs
test('invalid inputs', () => {
  expect(convert('abc')).toBe(false)
  expect(convert('1234abc')).toBe(false)
  expect(convert('')).toBe('Zero Rupees Only')
  expect(convert(' ')).toBe('Zero Rupees Only')
})

// ✅ Large values
test('large numbers', () => {
  expect(convert(1234567890)).toBe(
    'One Hundred and Twenty Three Crore Forty Five Lakh Sixty Seven Thousand Eight Hundred and Ninety Rupees Only',
  )
  expect(convert(100000000000)).toBe('Ten Thousand Crore Rupees Only')
})
