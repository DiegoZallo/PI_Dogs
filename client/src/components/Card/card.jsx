
import './card.css'
import { Link } from 'react-router-dom';

const Card = ({ id, name, weight, height, temperament, image }) => {

    return (
      <Link to={`/detail/${id}`}>
      <div className='card-container'>
        <div className='card'>
          <div className='name'>Breed: {name}</div>
          <div className='weight'>Weight: {weight}</div>
          <div className='height'>Height: {height}</div>
          {temperament && <div className='temperament'>Temperament: {temperament.join(', ')}</div>}
          <div className='image'><img src={image} alt={name} /></div>

        </div>
      </div>
      </Link>  
    );
  };

  export default Card

