import React, {useEffect, useState} from "react";
import { AirportsService } from "../api/AirportsService";

function Airports(props) {
    const country = props.country;
    console.log(country);

    const [countryAirports, setCountryAirports] = useState([]);
    const [name, setName] = useState('');
    const [error, setError] = useState();

    useEffect(() =>  {
        async function fetchAirportData() {
            try {
                setCountryAirports(await AirportsService.getAirports(country.cca2, name));
                setError('');
            } catch (error) {
                setError(error.message);
            };
        };
        
        const timeout = setTimeout(fetchAirportData, 500);
        
        return () => clearTimeout(timeout);

    }, [country.cca2, name]);

    return(
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)}></input>

            {error ? error : 
            <ul className="airports-list">
                {countryAirports.map(airport => <li key={airport.iata} >{airport.iata} - {airport.name}</li>)}
            </ul>}
            
        </div>
    );
};


export default Airports;

