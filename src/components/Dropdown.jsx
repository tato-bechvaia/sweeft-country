import React, { useState } from "react";

function Dropdown(props) {
    const [currentCountry, setCurrentCountry] = useState("");
    console.log(currentCountry);
        
    const handleSelectChange = (e) => {
        const selectedCountryName = e.target.value;
        setCurrentCountry(selectedCountryName);
        props.onSelect(selectedCountryName);
    };

    return (
        <div>
            <select onChange={handleSelectChange}>
                <option value="">Select a country</option>
                {props.countries
                    .sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .map((country, index) => (
                        <option
                            key={index}
                            className="dropdown-menu"
                            value={country.name.cca2}
                        >
                            {country.name.common}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default Dropdown;
