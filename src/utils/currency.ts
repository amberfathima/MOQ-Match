export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // 1 USD = rate
  label: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, label: 'INR (₹)' }
};

export const convertPrice = (usdAmount: number, currency: CurrencyCode = 'USD'): number => {
  const rate = CURRENCIES[currency]?.rate ?? 1;
  return usdAmount * rate;
};

export const formatCurrency = (usdAmount: number, currency: CurrencyCode = 'USD', decimals?: number): string => {
  const config = CURRENCIES[currency] ?? CURRENCIES.USD;
  const converted = usdAmount * config.rate;

  if (currency === 'INR') {
    return `${config.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }

  const dec = decimals !== undefined ? decimals : (converted % 1 === 0 ? 0 : 2);
  return `${config.symbol}${converted.toLocaleString(undefined, {
    minimumFractionDigits: dec,
    maximumFractionDigits: dec
  })}`;
};
