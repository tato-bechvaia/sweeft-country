import { AIRPORT_API_KEY } from "../config";

class AirportsServiceImpl {
    cache = {}; // {GE: []}

    async getAirports(cca2, name = '') {
        const cacheKey = cca2 + '_' + name;
        if(this.cache[cacheKey]) {
            return this.cache[cacheKey];
        }
                
        const response = await fetch(`https://api.api-ninjas.com/v1/airports?country=${cca2}&name=${name}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': AIRPORT_API_KEY,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        };
        const result = (await response.json()).filter(airport => airport.iata !== '');
        this.cache[cacheKey] = result;
        return result;
    }
}

export const AirportsService = new AirportsServiceImpl();
