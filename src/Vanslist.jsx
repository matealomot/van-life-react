import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {checkType, filterType, capitalizeString} from './UtilityFunctions';
import './Vanlist.css';

export default function VansList() {

    const [vans, setVans] = useState(JSON.parse(localStorage.getItem('vans')) || null);
    const [type, setType] = useState('');

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


    const vansList = () => {
        if(type == '') {
            return vans.map((van, index) => {
                return  <div key={index} className='van'>
                            <Link  to={`/vans/${van.id}`}>
                                <img src={van.imageUrl} alt={van.name}></img>
                                <div className='van--info'>
                                    <div>
                                        <h3>{van.name}</h3>
                                        <p>${van.price}/day</p>
                                    </div>
                                    <p className='type' style={checkType(van.type)}>{capitalizeString(van.type)}</p>
                                </div>
                            </Link>
                        </div>
            });
        }
        else {
            return vans.filter(van => van.type === type).map((van, index) => {
                return  <div key={index} className='van'>
                            <Link  to={`/vans/${van.id}`}>
                                <img src={van.imageUrl} alt={van.name}></img>
                                <div className='van--info'>
                                    <div>
                                        <h3>{van.name}</h3>
                                        <p>${van.price}/day</p>
                                    </div>
                                    <p className='type' style={checkType(van.type)}>{capitalizeString(van.type)}</p>
                                </div>
                            </Link>
                        </div>
            });
        };
     };

    return (
        <div className="list--body">
            <h1>Explore your van options</h1>
            <nav>
                <div className='filters'>
                    <button className='filter' onClick={() => {filterType(setType, 'simple')}}>Simple</button>
                    <button className='filter' onClick={() => {filterType(setType, 'luxury')}}>Luxury</button>
                    <button className='filter' onClick={() => {filterType(setType, 'rugged')}}>Rugged</button>
                </div>
                <button className='no--filter' onClick={() => {filterType(setType, '')}}>Clear filters</button>
            </nav>
            <div className="van--list">
                {vans ? vansList() : <h1 className='loading'>Loading...</h1>}
            </div>
        </div>
    );
};