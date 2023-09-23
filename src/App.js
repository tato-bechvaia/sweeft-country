import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Dropdown from "./components/Dropdown";
import SelectedCountry from "./components/SelectedCountry";
import Airports from './components/Airports';
import CurrencyExchange from './components/CurrencyExchange';
import { CountriesService } from './api/CountriesService';
import { LocationService } from './api/LocationService';

function App() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const navigate = useNavigate();

    const handleCountrySelect = useCallback(async (cca2) => {
        navigate(`/${cca2}`);
    }, [navigate]);

    const autoSetLocation = useCallback(() => {
        if(selectedCountry) return;

        navigator.geolocation.getCurrentPosition(async (position) => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            try {
                const cca2 = await LocationService.getCurrLocationCountryCca2(lat, long);
                handleCountrySelect(cca2);
            } catch (e) {
                setError(e.message);
            }
        });
    }, [handleCountrySelect, selectedCountry]);
    
    useEffect(() => {
        async function fetchCountries() {
            try {
                setCountries(await CountriesService.fetchAllCountries());
                autoSetLocation();
                setError('');
            } catch (error) {
                navigate('/');
                setError(error.message);
            }
        }
        fetchCountries();
    }, [navigate, autoSetLocation]);

    const handleParamChange = useCallback(async (cca2) => {
        if (cca2 === selectedCountry?.cca2) return;
        try {
            setSelectedCountry(await CountriesService.fetchCountryByCca2(cca2));
            setError('');
        } catch (error) {
            navigate('/');
            setError(error.message);
        }
    }, [navigate, selectedCountry?.cca2]);

    return (
        <div className="app">
            <h1>Countries App</h1>
            <Dropdown countries={countries} country={selectedCountry} onSelect={handleCountrySelect} />
            <Routes>
                <Route 
                    element={
                        <SelectedCountry
                            country={selectedCountry}
                            onParamChange={handleParamChange} />
                    }
                    path={`/:cca2`}>
                    <Route path="airports" element={<Airports country={selectedCountry} />}></Route>
                    <Route path="" element={<CurrencyExchange country={selectedCountry} countries={countries} />}></Route>
                </Route>
            </Routes>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default App;
