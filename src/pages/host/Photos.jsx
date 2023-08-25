import {useOutletContext} from 'react-router-dom';
import '../../css/Photos.css';

export default function Photos() {

  const [photos, setPhotos] = useOutletContext();


  return (
    <div className='listing--album'>
      <div className='image'>{photos ? <img src={photos.imageUrl} alt="van image"></img> : <h2 className='loading'>Loading...</h2>}</div>
      <div className='image'>{photos ? <img src={photos.imageUrl} alt="van image"></img> : <h2 className='loading'>Loading...</h2>}</div>
      <div className='image'>{photos ? <img src={photos.imageUrl} alt="van image"></img> : <h2 className='loading'>Loading...</h2>}</div>
      <div className='image'>{photos ? <img src={photos.imageUrl} alt="van image"></img> : <h2 className='loading'>Loading...</h2>}</div>
      <div className='image'>{photos ? <img src={photos.imageUrl} alt="van image"></img> : <h2 className='loading'>Loading...</h2>}</div>
    </div>
  );
};