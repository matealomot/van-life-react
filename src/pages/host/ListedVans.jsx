import {Link, useLoaderData, defer, Await} from 'react-router-dom';
import { Suspense } from 'react';
import {capitalizeString, checkType, getListedVans, requireAuth} from '../../utilities/UtilityFunctions';
import '../../css/ListedVans.css';

export async function loader({request}) {
  await requireAuth(request)
  return defer({data: getListedVans()})
};

export default function ListedVans() {

  const listedVans = useLoaderData();

  return (
    <>
      <h1 className='listings--title'>Your listed vans</h1>

      <Suspense fallback={<h1 className='loading'>🌀 Loading...</h1>}>
        <Await resolve={listedVans.data}>
          {listedVans => {
            const vans = listedVans ?
            listedVans.length > 0 ?
              listedVans.map((van, index) => {
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
              : <h1 className='loading'>No vans available</h1>
            : null;

            return (
              <div className="rented--van--list">
                {vans}
              </div>
            )
          }}
        </Await>
      </Suspense>
    </>
  );
};