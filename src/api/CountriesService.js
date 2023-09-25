import { COUNTRIES_API } from "../config";
class CountriesServiceImpl {
    cache2 = {};
    cache3 = {};
    
    async fetchAllCountries() {
        const response = await fetch(COUNTRIES_API);
        if (!response.ok) {
            throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        data.forEach(country => {
            this.cache2[country.cca2] = country;
            this.cache3[country.cca3] = country;
        })
        return data;
    }

    async fetchCountryByCca3(cca3) {
        if(this.cache3[cca3]) {
            return this.cache3[cca3];
        }
    }
    
    async fetchCountryByCca2(cca2) {
        if (this.cache2[cca2]) {
            return this.cache2[cca2];
        }
    }
}

export const CountriesService = new CountriesServiceImpl();
