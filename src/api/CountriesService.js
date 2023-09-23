import { COUNTRIES_API, COUNTRY_API } from "../config";

class CountriesServiceImpl {
    cache = {};

    async fetchAllCountries() {
        const response = await fetch(COUNTRIES_API);
        if (!response.ok) {
            throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        return data;
    }

    async fetchCountryByCca2(cca2) {
        if (this.cache[cca2]) {
            return this.cache[cca2];
        }
        const response = await fetch(`${COUNTRY_API}${cca2}`);
        if (!response.ok) {
            throw new Error("Failed to fetch country data");
        }
        const countries = await response.json();
        const country = countries.find((country) => country.cca2 === cca2);
        this.cache[cca2] = country;
        return country;
    }
}

export const CountriesService = new CountriesServiceImpl();