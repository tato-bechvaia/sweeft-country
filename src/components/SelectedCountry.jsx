import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Airports from "./Airports";
import CurrencyExchange from "./CurrencyExchange";
// import './../styles/SelectedCountry.css';

function SelectedCountry(props) {
    const country = props.country;
    const countryCurrency = country.currencies[Object.keys(country.currencies)];
    console.log(countryCurrency);
    console.log(country);

    return (
        <div className="selected-country-info">
            {country && (
                <div>
                    <div className="country">
                        <div className="country-name"><strong>{country.name?.common} </strong><img width={45} height={30} alt={country.flags.alt} src={country.flags.svg}></img></div>
                    </div>
                    <div className="country-data">
                        <div className="country-capital"><strong>Capital: </strong>{country.capital}</div>
                        <div className="country-currency"><strong>Currency: </strong>{countryCurrency['name']}: {countryCurrency['symbol']}</div>
                        <div className="country-region"><strong>Region:</strong>{country.region}</div>
                        <div className="country-continent"><strong>Continent:</strong>{country.continents[0]}</div>
                        <div className="country-population"><strong>Population: </strong>{country.population.toLocaleString()}</div>
                        <div className="country-borders"><strong>Borders: </strong>{country.borders?.join(", ")}</div>
                    </div>
                </div>
            )}
            <Link to={country.cca2}>Currency Exchange</Link>
            <Link to={`${country.cca2}/airports`}>Airports</Link>
            <Routes>
                <Route path={`/:cca2`} element={<CurrencyExchange country={country} countries=  {props.countries} />}></Route>
                <Route path={`/:cca2/airports`} element={<Airports country={country} />}></Route>
            </Routes>
        </div>
    );
}

export default SelectedCountry;
