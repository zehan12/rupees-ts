const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
]
const TEENS = [
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
]
const TENS = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
]

const CRORE = 'Crore'
const LAKH = 'Lakh'
const THOUSAND = 'Thousand'
const HUNDRED = 'Hundred'

function twoDigitsToWords(num: number): string {
  if (num < 10) return ONES[num]
  if (num < 20) return TEENS[num - 10]
  const tens = Math.floor(num / 10)
  const ones = num % 10
  return TENS[tens] + (ones ? ` ${ONES[ones]}` : '')
}

function numberToWordsIndian(num: number): string {
  if (num === 0) return 'Zero'

  const parts: string[] = []

  const crore = Math.floor(num / 10000000)
  num %= 10000000
  if (crore) parts.push(`${numberToWordsIndian(crore)} ${CRORE}`)

  const lakh = Math.floor(num / 100000)
  num %= 100000
  if (lakh) parts.push(`${numberToWordsIndian(lakh)} ${LAKH}`)

  const thousand = Math.floor(num / 1000)
  num %= 1000
  if (thousand) parts.push(`${numberToWordsIndian(thousand)} ${THOUSAND}`)

  const hundred = Math.floor(num / 100)
  num %= 100
  if (hundred) parts.push(`${ONES[hundred]} ${HUNDRED}`)

  if (num > 0) {
    if (parts.length > 0) parts.push('and')
    parts.push(twoDigitsToWords(num))
  }

  return parts.join(' ')
}

export function convert(input: number | string): string | false {
  let rupees = 0
  let paise = 0
  let isNegative = false

  if (typeof input === 'number') {
    if (input < 0) {
      isNegative = true
      input = -input
    }
    rupees = Math.floor(input)
    const decimalStr = input.toFixed(10).split('.')[1] // safe capture decimals
    paise = Number.parseInt(decimalStr.padEnd(2, '0').slice(0, 2))
  } else if (typeof input === 'string') {
    let formattedInput = input.trim()

    if (formattedInput.startsWith('-')) {
      isNegative = true
      formattedInput = formattedInput.slice(1).trim()
    }

    if (formattedInput === '') {
      rupees = 0
      paise = 0
    } else {
      const parts = formattedInput.split('.')

      if (!/^\d*$/.test(parts[0])) return false
      rupees = Number.parseInt(parts[0] || '0', 10)

      if (parts[1]) {
        if (!/^\d+$/.test(parts[1])) return false
        paise = Number.parseInt(parts[1].padEnd(2, '0').slice(0, 2))
      } else {
        paise = 0
      }
    }
  } else {
    return false
  }

  if (rupees === 0 && paise === 0) {
    return 'Zero Rupees Only'
  }

  let output = isNegative ? 'Minus ' : ''

  if (rupees === 0) {
    if (paise > 0) {
      output += `${twoDigitsToWords(paise)} Paise`
    } else {
      output += 'Zero Rupees Only'
    }
  } else {
    output += numberToWordsIndian(rupees)
    if (paise > 0) {
      output += ` Rupees and ${twoDigitsToWords(paise)} Paise`
    } else {
      output += ' Rupees Only'
    }
  }

  return output
}
