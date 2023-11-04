import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { deleteDog } from "../../redux/actions/actions";
import { useDispatch } from "react-redux";
import "./card.css";

const Card = ({ id, name, height, weight, temperament, image }) => {
  const [deleteImage, setDeleteImage] = useState("https://cdn-icons-png.flaticon.com/128/11255/11255938.png");

  const handleHomeMouseOver = () => {
    setDeleteImage('https://cdn-icons-gif.flaticon.com/11255/11255938.gif');
  };

  const handleHomeMouseOut = () => {
    setDeleteImage("https://cdn-icons-png.flaticon.com/128/11255/11255938.png");
  };

  const dispatch = useDispatch();

  return (

      <div className="card">
          <div className="breedName">{name}</div>
          
          <Link to={`/detail/${id}`}>
            <div className="image">
              <img src={image} alt={name} />
            </div>
          </Link> 

          <div className="height"> 
            <img src="https://cdn-icons-png.flaticon.com/128/7925/7925674.png" alt="" />{height}
          </div>
          
          <div className="weight"> 
            <img src="https://cdn-icons-png.flaticon.com/128/2928/2928937.png" alt="" />
            {weight}
          </div>
          
          <div className="temperament">
            <img src="https://cdn-icons-png.flaticon.com/128/12384/12384369.png" alt="" />
            <div className="temperament-text">{temperament?.join(', ')}</div>
          </div>

          {isNaN(id) &&
          <div className="delete" onMouseOver={handleHomeMouseOver} onMouseOut={handleHomeMouseOut} onClick={()=>dispatch(deleteDog(id))}>
            <img src={deleteImage} alt='remove dogs' />
          </div>
          }
      </div>

  );
};

export default Card;


