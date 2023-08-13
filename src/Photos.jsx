import {useOutletContext} from 'react-router-dom';

export default function Photos() {

  const [photos, setPhotos] = useOutletContext();


  return (
    <>
      {photos ? <img src={photos.imageUrl} alt="van image"></img> : <h2 className='loading'>Loading...</h2>}
    </>
  );
};