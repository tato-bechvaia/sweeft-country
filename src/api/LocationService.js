import { LOCATION_API } from '../config';

class LocationServiceImpl {
    async getCurrLocationCountryCca2(lat, lng) {
        const response = await fetch(LOCATION_API(lat, lng));
        const data =  await response.json();
        if (data.status !== 'OK') {
            throw new Error(data.error_message);
        }
        return data.results[0].address_components.find((component) => component.types.includes('country')).short_name;
    }
}

export const LocationService = new LocationServiceImpl();
