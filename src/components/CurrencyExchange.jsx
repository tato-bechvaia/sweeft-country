import React, { useEffect, useState } from "react";
import { CountriesService } from '../api/CountriesService';
import { CurrencyService } from '../api/CurrencyService';

function CurrencyExchange(props){

    const fromCountryCurrencySign = Object.keys(props.country.currencies)[0];

    const [amount, setAmount] = useState(0);
    const [k, setK] =  useState(1);
    const [toCountryCurrencySign, setToCountryCurrencySign] = useState();
    const [error, setError] = useState('');

    useEffect(() => {
        const getK = async function() {
            try {
                setK(await CurrencyService.getExchangeRate(fromCountryCurrencySign, toCountryCurrencySign));
            } catch (e) {
                setError(e.message);
            }
        }
        getK();
    }, [fromCountryCurrencySign, toCountryCurrencySign]);
    
    const getToCountryCurrencySign = async function(cca2) {
        const country = await CountriesService.fetchCountryByCca2(cca2);
        setToCountryCurrencySign(Object.keys(country.currencies)[0]);
    }

    return (
        <div className="currency-exchange">
            <h1>Currency Exchange</h1>
            <select onChange={(e) => getToCountryCurrencySign(e.target.value)}>
                <option value="">Select a country</option>
                {props.countries
                    .sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .map((country, index) => (
                        <option
                            key={index}
                            className="dropdown-menu"
                            value={country.cca2}
                            href={`#${country.name.common}`}
                        >
                            {country.name.common}
                        </option>
                    ))}
            </select>
            {error ? error : <form>
                <label>
                    {fromCountryCurrencySign}:
                    <input onChange={(e) => setAmount(e.target.value)} value={amount} type="number" name="name" />
                </label>
                <br></br>
                <label>
                    {toCountryCurrencySign}:
                    <div>{Number(amount * k).toFixed(2)}</div>
                </label>
            </form>}
        </div>
    )
}

export default CurrencyExchange;
