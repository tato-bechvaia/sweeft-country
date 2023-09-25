import React, { useEffect, useState } from "react";
import {NavLink, Outlet, useParams } from "react-router-dom";
import { CountriesService } from "../api/CountriesService";
import  './../App.css'

function SelectedCountry(props) {
    const params = useParams();
    const country = props.country;
    const onParamChange = props.onParamChange;
    const countryCurrency = country?.currencies[Object.keys(country.currencies)];
    const [borders, setBorders] = useState([]);
    
    useEffect(() =>  {
        const getBorders = async function() {
            const arr = [];
            for(let i = 0; i < props.country?.borders?.length; i++) {
                const currCountry = await CountriesService.fetchCountryByCca3(props.country.borders[i]);
                const countryName = currCountry?.name.common;
                arr[i] = countryName;
            }
            setBorders(arr);
        }
        getBorders();
    }, [props.country?.borders]);

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
                            <h1 className="country-name"><strong>{country.name?.common} </strong><img width={45} height={30} alt={country.flags.alt} src={country.flags.svg}></img></h1>
                        </div>
                        <div className="country-data">
                            <div className="country-data_row">
                                <div className="country-data_item">
                                    <div className="country-capital"><strong>Capital: </strong></div>
                                    <div className="country-currency"><strong>Currency: </strong></div>
                                    <div className="country-region"><strong>Region:</strong></div>
                                </div>
                                <div className="country-data_item">
                                    <div className="country-capital">{country.capital}</div>
                                    <div className="country-currency">{countryCurrency?.name} ({countryCurrency['symbol']??''})</div>
                                    <div className="country-region">{country.name?.common === 'Georgia' ? 'Europe' : country.region}</div>
                                </div>
                            </div>
                            <div className="country-data_row">
                                <div className="country-data_item">
                                    <div className="country-continent"><strong>Continent:</strong></div>
                                    <div className="country-population"><strong>Population: </strong></div>
                                    <div className="country-borders"><strong>Borders: </strong></div>
                                </div>
                                <div className="country-data_item">
                                    <div className="country-continent">{country.name?.common === 'Georgia' ? 'Europe' : country.continents[0]}</div>
                                    <div className="country-population">{country.population.toLocaleString()}</div>
                                    <div className="country-borders">{borders?.join(", ")}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="links">
                        <div>
                            <NavLink to={`/${country.cca2}`} className="button-link" end >Currency Exchange</NavLink> 
                        </div>
                        <div>
                            <NavLink to={`/${country.cca2}/airports`} className="button-link">Airports</NavLink>
                        </div>
                    </div>
                    <Outlet />
                </>
            )}
        </div>
    );
}

export default SelectedCountry;
