export const MAP_KEY = 'AIzaSyA3TuOWhvQXlSEzyeWruDwVTRRXvvUNtjY';

export const COUNTRIES_API = `https://restcountries.com/v3.1/all`;
export const COUNTRY_API = `https://restcountries.com/v3.1/name/`; // + {name} --> one country
export const AIRPORT_API_KEY = `FG/LBBV3K3jO+mMgoMZ5xA==v5jCbTkTSGIGhHsw`;
export const CURRENCY_EXCHANGE_API = (from, to) => `https://api.exchangerate.host/convert?from=${from}&to=${to}`; 
export const LOCATION_API = (lat, lng) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_KEY}`;
