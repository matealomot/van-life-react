import { Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {checkType, capitalizeString} from '../../utilities/UtilityFunctions';
import PageNotFound from '../../not_found/PageNotFound';
import '../../css/Van.css';

export default function Van() {

    const params = useParams();

    const location = useLocation();

    const locationState = location.state ? 
    location.state.search 
        ? location.state.search 
        : null 
    : null;

    const vanType = location.state ? 
    location.state.type ? 
        location.state.type 
        : null 
    : null;
    
    const [van, setVan] = useState(JSON.parse(localStorage.getItem(`vanDetails${params.id}`)) || null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!van) {
            setLoading(true)
            fetch(`/api/vans/${params.id}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Request failed with status: " + response.status);
                }
                else {
                    return response.json();
                };
            })
            .then(data => {
                if(data && data.vans) {
                    localStorage.setItem(`vanDetails${params.id}`, JSON.stringify(data));
                    setVan(JSON.parse(localStorage.getItem(`vanDetails${params.id}`)));
                };
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [params.id]);

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
    }

    return (
        <div>
            {
                error 
                ?
                <h1 className='loading'>{`${error}`}</h1>
                :
                loading 
                    ?
                    <h1 className='loading'>Loading...</h1>
                    :
                    van 
                    ? 
                    <div className='van--page'>
                
                        <div className='link--back'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                                <path d="M13.0223 6.28131C13.4036 6.28131 13.7128 5.97217 13.7128 5.59082C13.7128 5.20947 13.4036 4.90033 13.0223 4.90033V6.28131ZM0.574363 5.10257C0.304709 5.37222 0.304709 5.80942 0.574363 6.07907L4.96862 10.4733C5.23828 10.743 5.67547 10.743 5.94513 10.4733C6.21478 10.2037 6.21478 9.76648 5.94513 9.49683L2.03912 5.59082L5.94513 1.68481C6.21478 1.41516 6.21478 0.977962 5.94513 0.708308C5.67547 0.438654 5.23828 0.438654 4.96862 0.708308L0.574363 5.10257ZM13.0223 4.90033L1.06261 4.90033V6.28131L13.0223 6.28131V4.90033Z" fill="#858585"/>
                            </svg>
                            <Link className="link-button" to={locationState ? `..?${locationState}` : '..'} relative='path'>{locationState ? `Back to ${vanType} vans` : 'Back to all vans'}</Link>
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
                    <PageNotFound />
            }
        </div>
    );
};
