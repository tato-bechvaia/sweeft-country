import React from "react";

function Dropdown(props) {
    const handleSelectChange = (e) => {
        const selectedCountryName = e.target.value;
        props.onSelect(selectedCountryName);
    };

    return (
        <div>
            <select onChange={handleSelectChange} value={props.country?.cca2}>
                <option value="">Select a country</option>
                {props.countries
                    .sort((a, b) => a.name.common.localeCompare(b.name.common))
                    .map((country, index) => (
                        <option
                            key={index}
                            className="dropdown-menu"
                            value={country.cca2}
                        >
                            {country.name.common}
                        </option>
                    ))}
            </select>
        </div>
    );
}

export default Dropdown;
