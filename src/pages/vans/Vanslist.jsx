import { NavLink, Link, useSearchParams, useLoaderData } from 'react-router-dom';
import {checkType, capitalizeString, getVans} from '../../utilities/UtilityFunctions';
import '../../css/Vanlist.css';

export function loader() {
    return getVans()
};

export default function VansList() {
    const data = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const filterVans = searchParams.get('type');

    const filterData = filterVans ? data.filter(van => van.type.toLowerCase() === filterVans) : data;

    const filteredVans = filterData ? 
    filterData.length > 0 ? 
        filterData.map((van, index) => (
            <div key={index} className='van'>
                <NavLink to={`${van.id > filterData.length ? filterData.length : van.id}`} state={{ search: searchParams.toString(), type: filterVans }}>
                    <img src={van.imageUrl} alt={van.name} />
                    <div className='van--info'>
                        <div>
                            <h3>{van.name}</h3>
                            <p>${van.price}/day</p>
                        </div>
                        <p className='type' style={checkType(van.type)}>
                            {capitalizeString(van.type)}
                        </p>
                    </div>
                </NavLink>
            </div>
        ))
        : 
        <h1>No data available</h1>
    : <h1>Something went wrong</h1>;


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
                {filteredVans}
            </div>
        </div>
    );
};
