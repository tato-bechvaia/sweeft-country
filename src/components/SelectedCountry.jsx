import React, { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
// import './../styles/SelectedCountry.css';

function SelectedCountry(props) {
    const params = useParams();
    const country = props.country;
    const onParamChange = props.onParamChange;
    const countryCurrency = country?.currencies[Object.keys(country.currencies)];
    
    useEffect(() => {
        if(params.cca2) {
            onParamChange(params.cca2);
        }
    }, [onParamChange, params.cca2]);

    return (
        <div className="selected-country-info">
            {country && (
                <>
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
                    <Link to={`/${country.cca2}`}>Currency Exchange</Link>
                    <Link to={`/${country.cca2}/airports`}>Airports</Link>
                    <Outlet />
                </>
            )}
        </div>
    );
}

export default SelectedCountry;
