import {useOutletContext} from 'react-router-dom';

export default function Details() {

  const [parent, setParent] = useOutletContext();

  return (
    <>
      {parent ? 
        <section className='details'>
          <p><span>Name:</span> {parent.name}</p>
          <p><span>Category:</span> {parent.type}</p>
          <p><span>Description:</span> {parent.description}</p>
        </section> 
        : 
        <h2 className='loading'>Loading...</h2>
      }
    </>
  );
};