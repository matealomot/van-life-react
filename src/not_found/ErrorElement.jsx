import { useRouteError } from 'react-router';
import '../css/PageNotFound.css';

export default function ErrorElement() {
  const errorData = useRouteError();

  return(
    <div className='not--found'>
      <h1>{`${errorData.status} - ${errorData.statusText}: ${errorData.message}`}</h1>
    </div>
  );
};
