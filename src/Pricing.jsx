import {useOutletContext} from 'react-router-dom';

export default function Pricing() {

  const [pricing, setPricing] = useOutletContext();

  return (
    <>
      {pricing ? <p><span>${pricing.price}</span>/day</p> : <h2 className='loading'>Loading...</h2>}
    </>
  );
};