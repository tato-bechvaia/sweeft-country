
export const COUNTRIES_API = `https://restcountries.com/v3.1/all`;
export const COUNTRY_API = `https://restcountries.com/v3.1/name/`; // + {name} --> one country
export const AIRPORT_API_KEY = `FG/LBBV3K3jO+mMgoMZ5xA==v5jCbTkTSGIGhHsw`;
export const COUNTRY_ALPHA_API = `https://restcountries.com/v3.1/alpha?codes=`;
// export const CURRENCY_EXCHANGE_API = (from, to) => `https://api.exchangerate.host/convert?from=${from}&to=${to}`;

// CURRENCY EXCHANGE
const CURRENCY_API_KEY = '81097bf9b7d75e218cbc23b0';
export const CURRENCY_EXCHANGE_API = (from, to) => 
`https://v6.exchangerate-api.com/v6/${CURRENCY_API_KEY}/pair/${from}/${to}`;

// LOCATION
const MAP_KEY = 'AIzaSyA3TuOWhvQXlSEzyeWruDwVTRRXvvUNtjY';
export const LOCATION_API = (lat, lng) => `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_KEY}`;


