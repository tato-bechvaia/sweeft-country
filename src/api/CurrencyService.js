import { CURRENCY_EXCHANGE_API } from '../config';

class CurrencyServiceImpl {
    cache = {};
    
    async getExchangeRate(fromCountrySign, toCountrySign) {
        if (!fromCountrySign || !toCountrySign) return 1;
        const cacheKey = `${fromCountrySign}_${toCountrySign}`;
        if (this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }  
        const response = await fetch(CURRENCY_EXCHANGE_API(fromCountrySign, toCountrySign));
        if (!response.ok) {
            throw new Error("Failed to fetch currency data");
        }
        const data = await response.json();
        // this.cache[cacheKey] = data.result;
        // return data.result;
        this.cache[cacheKey] = data.conversion_rate;
        return data.conversion_rate;
    }
}

export const CurrencyService = new CurrencyServiceImpl();
