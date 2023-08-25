import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {capitalizeString, checkType} from '../../utilities/UtilityFunctions';
import '../../css/ListedVans.css';

export default function ListedVans() {

  const [listedVans, setListedVans] = useState([]);

  useEffect(() => {
    fetch("/api/vans")
      .then(res => res.json())
      .then(data => {
        let listedVans = data.vans.filter(van => van.rented === true);
        setListedVans(listedVans.length > 0 ? listedVans : "You have no listed vans");
      })
      .catch(err => console.log(err));
  }, [])

  const vans = () => {
    if(listedVans !== "You have no listed vans") {
      return listedVans.map((van, index) => {
        return <Link  to={`${van.id}`} key={index} className='listed-vans'>
                  <img src={van.imageUrl} alt={van.name}></img>
                  <div className='rented--van--info'>
                      <div>
                          <h1>{van.name}</h1>
                          <p>${van.price}/day</p>
                      </div>
                      <p className="rented-type" style={checkType(van.type)}>{capitalizeString(van.type)}</p>
                  </div>
              </Link>
      })
    }
    else {
      return <h2>You have no listed vans</h2>;
    }
  }

  return (
    <>
      <h1 className='listings--title'>Your listed vans</h1>

      <div className="rented--van--list">
        {listedVans.length > 0 ? vans() : <h2 className='loading'>Loading...</h2>}
      </div>
    </>
  );
};