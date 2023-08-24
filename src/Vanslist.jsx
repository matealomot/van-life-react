import React, {useState, useEffect} from 'react';
import { NavLink, Link, useSearchParams } from 'react-router-dom';
import {checkType, filterType, capitalizeString} from './UtilityFunctions';
import './Vanlist.css';

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
 
    const [type, setType] = useState('');

    const vansList = type == '' ?
            vans.map((van, index) => {
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
            })
            : 
            vans.filter(van => van.type === type).map((van, index) => {
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
                {vans ? filteredVans : <h1 className='loading'>Loading...</h1>}
            </div>
        </div>
    );
};

// 'state' is a router prop that can be passed to links; it allows to pass some additional information to the page we are linking to (we are passing and catching state to another page); tl;dr = it lets you save all the query strings when moving between pages;

//ex. using the state prop we can send a piece of the url with our link, then on the next page, another link will catch that and be able to add that url part to it's own to='url path'. This would allow us to essentially save a previous path so we can easily go back to it. Useful if you wish to preserve filtered content from the previous page rather than going back to its default content

// I could also pass a URL path to the setSearchParans funtion 
// ex. setSearchParams('?type=simple')

// How I did it originally without using useSearchParams

