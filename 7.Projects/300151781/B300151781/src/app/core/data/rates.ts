// Taux de change indicatifs : 1 dollar canadien (CAD) = X unités locales
export interface Rate {
  code: string
  perCad: number
}

const PER_CAD: { [code: string]: number } = {
  CAD: 1, USD: 0.72, EUR: 0.66, GBP: 0.56, CZK: 16.5, SEK: 7.6, TRY: 29,
  DZD: 96, MAD: 6.6, TND: 2.2, EGP: 35, XOF: 435, ZAR: 13, KES: 93,
  MXN: 13, ARS: 900, PEN: 2.7, CUP: 17, BRL: 3.9,
  JPY: 108, CNY: 5.2, KRW: 1000, THB: 25, SGD: 0.96, VND: 18000, INR: 61,
  AED: 2.64, QAR: 2.6, LBP: 64000, AUD: 1.1, NZD: 1.2,
}

// « Euro (EUR) » → { code: 'EUR', perCad: 0.66 }
export function rateFor(currency: string): Rate | null {
  const code = ((currency || '').match(/\(([A-Z]{3})\)/) || [])[1]
  return code && PER_CAD[code] ? { code, perCad: PER_CAD[code] } : null
}
