import React, {useState, useEffect} from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import {checkType, filterType, capitalizeString} from '../../utilities/UtilityFunctions';
import '../../css/Vanlist.css';

export default function VansList() {

    const [searchParams, setSearchParams] = useSearchParams();
    const filterVans = searchParams.get('type');

    const [vans, setVans] = useState(JSON.parse(localStorage.getItem('vans')) || null);
    
    useEffect(() => {
      if(!vans) {
          fetch("/api/vans")
          .then((response) => response.json())
          .then((data) => {
              localStorage.setItem('vans', JSON.stringify(data.vans));
              setVans(JSON.parse(localStorage.getItem('vans')));    
            })
            .catch((error) => console.error("Error fetching data:", error));
        } 
    }, []);
 
    const filter = filterVans ? vans.filter(van => van.type.toLowerCase() === filterVans) : vans;
       
    const filteredVans = filter.map((van, index) => {
        return  <div key={index} className='van'>
                    <NavLink  to={`${van.id}`} state={{search: searchParams.toString(), type: filterVans}}> 
                        <img src={van.imageUrl} alt={van.name}></img>
                        <div className='van--info'>
                            <div>
                                <h3>{van.name}</h3>
                                <p>${van.price}/day</p>
                            </div>
                            <p className='type' style={checkType(van.type)}>{capitalizeString(van.type)}</p>
                        </div>
                    </NavLink>
                </div>
    });

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    return (
        <div className="list--body">
            <h1>Explore your van options</h1>
            <nav>
                <div className='filters'>
                    <button className={`filter simple ${filterVans === "simple" ? 'selected' : ''}`} onClick={() => handleFilterChange("type", "simple")}>
                        Simple
                    </button>
                    <button className={`filter luxury ${filterVans === "luxury" ? 'selected' : ''}`} onClick={() => handleFilterChange("type", "luxury")}>
                        Luxury
                    </button>
                    <button className={`filter rugged ${filterVans === "rugged" ? 'selected' : ''}`} onClick={() => handleFilterChange("type", "rugged")}>
                        Rugged
                    </button>
                </div>
                {filterVans && <button className='no--filter' onClick={() => handleFilterChange("type", null)}>Clear filters</button>}
            </nav>
            <div className="van--list">
                {vans ? filteredVans : <h1 className='loading'>Loading...</h1>}
            </div>
        </div>
    );
};
