import React, { useState, useEffect, useCallback } from "react";
import Dropdown from "./components/Dropdown";
import SelectedCountry from "./components/SelectedCountry";
import CurrencyExchange from "./components/CurrencyExchange";
import Airports from "./components/Airports";
import { COUNTRIES_API, COUNTRY_API } from "./config";
import { Link, Route, Routes, useNavigate, useSearchParams } from "react-router-dom";

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const navigate = useNavigate();
    const params = useSearchParams();
    
    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await fetch(COUNTRIES_API);
                if (!response.ok) {
                    throw new Error("Failed to fetch countries data");
                }
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCountries();
    }, []);

    const handleCountrySelect = useCallback(async (countryName) => {
        try {
            const response = await fetch(`${COUNTRY_API}${countryName}`);
            if (!response.ok) {
                throw new Error("Failed to fetch country data");
            }
            const countryData = await response.json();
            setSelectedCountry(countryData[0]);
            navigate(countryData[0].cca2);
        } catch (error) {
            console.error(error);
        }
    }, [navigate]);

    useEffect(() => {
        if(params.cca2) handleCountrySelect(params.cca2);
        console.log(params);
    }, [handleCountrySelect, params.cca2]);
    
    if(selectedCountry) console.log(selectedCountry.currencies[Object.keys(selectedCountry.currencies)]);
    
    // let activeComponent = <CurrencyExchange country={selectedCountry} countries={countries} />;

    return (
        <div className="app">
            <h1>Countries App</h1>
            <Dropdown countries={countries} onSelect={handleCountrySelect} />
            <Routes>
                <Route element={<SelectedCountry countries={countries} country={selectedCountry} />} path={`:cca2`}>

                </Route>
                    
            </Routes>
                
            

        </div>
    );
};

export default App;
