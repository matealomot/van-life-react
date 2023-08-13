import {useOutletContext} from 'react-router-dom';
import { capitalizeString } from './UtilityFunctions';
import './Details.css';

export default function Details() {

  const [parent, setParent] = useOutletContext();

  console.log(parent)

  return (
    <>
      {parent ? 
        <section className='details'>
          <p><span>Name:</span> {parent.name}</p>
          <p><span>Category:</span> {capitalizeString(parent.type)}</p>
          <p><span>Description:</span> {parent.description}</p>
          <p><span>Visibility:</span> Public</p>
        </section> 
        : 
        <h2 className='loading'>Loading...</h2>
      }
    </>
  );
};