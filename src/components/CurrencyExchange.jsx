import React, { useState } from "react";

function CurrecyExchage(props){

    console.log(props.country);

    const fromCountryCurrencySign = Object.keys(props.country.currencies)[0];

    console.log(fromCountryCurrencySign);

    const [toCountry, setToCountry] = useState('');
    const [amount, setAmount] = useState(0);
    const [k, setK] =  useState(1);
    const [toCountryCurrencySign, setToCountryCurrencySign] = useState();
    
    console.log(+amount)
    console.log(toCountry);

    const getK = async function() {
        const response = await fetch(`https://api.exchangerate.host/convert?from=${fromCountryCurrencySign}&to=${toCountryCurrencySign}`);
        const data = await response.json();
        setK(data.result);
    }
    
    const getToCountryCurrencySign = async function(country) {
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await response.json();
        setToCountryCurrencySign(Object.keys(data[0].currencies)[0]);
    }

    console.log(toCountryCurrencySign);
    getK();

    return (
        <div className="currency-exchange">
            <h1>Currency Exchange</h1>
            <select onChange={(e) => {
                    setToCountry(e.target.value);
                    getToCountryCurrencySign(e.target.value);
                }}>
                <option value="">Select a country</option>
                {props.countries
                    .sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .map((country, index) => (
                        <option
                            key={index}
                            className="dropdown-menu"
                            value={country.name.common}
                            href={`#${country.name.common}`}
                        >
                            {country.name.common}
                        </option>
                    ))}
            </select>
            <form>
                <label>
                    {fromCountryCurrencySign}:
                    <input onChange={(e) => setAmount(e.target.value)} value={amount} type="number" name="name" />
                </label>
                <br></br>
                <label>
                    {toCountryCurrencySign}:
                    <div>{Number(amount * k).toFixed(2)}</div>
                </label>
            </form>
        </div>
    )
}

export default CurrecyExchage;
