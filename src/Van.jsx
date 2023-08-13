import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {checkType, capitalizeString} from './UtilityFunctions';
import './Van.css';

export default function Van() {

    const params = useParams(); // fetches whatever comes after the /van/ part of the path; in my case it will be the id of the van I clicked on
    // NOT hoisted to the top; needs to be declared before everything else that might need it

    const [van, setVan] = useState(JSON.parse(localStorage.getItem(`vanDetails${params.id}`)) || null);

    useEffect(() => {
        if(!van) {
            fetch(`/api/vans/${params.id}`)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(`vanDetails${params.id}`, JSON.stringify(data));
                setVan(JSON.parse(localStorage.getItem(`vanDetails${params.id}`)));
            })
            .catch(err => console.log(err));
        }
    }, [params.id]); // since the params captures the id of every van I click on, I should use it as a dependency so that every time the id changes the useEffect runs and I get new data for the new respective id

    function handleRentClick() {
        if (!van) {
            console.error('Van data not available yet.');
            return;
        }
        else {
            fetch(`/api/vans/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    rented: true,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .catch(err => console.log(err))
        }
    };

    return (
        <div>
            {
                van ? 
                <div className='van--page'>
            
                    <div className='link--back'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                            <path d="M13.0223 6.28131C13.4036 6.28131 13.7128 5.97217 13.7128 5.59082C13.7128 5.20947 13.4036 4.90033 13.0223 4.90033V6.28131ZM0.574363 5.10257C0.304709 5.37222 0.304709 5.80942 0.574363 6.07907L4.96862 10.4733C5.23828 10.743 5.67547 10.743 5.94513 10.4733C6.21478 10.2037 6.21478 9.76648 5.94513 9.49683L2.03912 5.59082L5.94513 1.68481C6.21478 1.41516 6.21478 0.977962 5.94513 0.708308C5.67547 0.438654 5.23828 0.438654 4.96862 0.708308L0.574363 5.10257ZM13.0223 4.90033L1.06261 4.90033V6.28131L13.0223 6.28131V4.90033Z" fill="#858585"/>
                        </svg>
                        <Link className="link-button" to="/vans">Back to all vans</Link>
                    </div>
                    <img src={van.vans.imageUrl} alt='image of a van'></img>
                    <div className='van--details'>
                        <p className='type' style={checkType(van.vans.type)}>{capitalizeString(van.vans.type)}</p>
                        <h2>{van.vans.name}</h2>
                        <p className='price'><span>${van.vans.price}</span>/day</p>
                        <p className='description'>{van.vans.description}</p>
                        <button onClick={handleRentClick}>Rent this van</button>
                    </div>
                </div> 
                : 
                <h1 className='loading'>Loading...</h1>
            }
        </div>
    );
};