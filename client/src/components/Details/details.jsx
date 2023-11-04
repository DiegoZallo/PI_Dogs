import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./details.css"; 

const Details = () => {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [error, setError] = useState();

  useEffect(() => {
    axios(`http://localhost:3003/dogs/${id}`)
      .then(({ data }) => {
        setDog(data);
      })
      .catch((error) => setError(error));

    return () => setDog({});
  }, [id]);

  return (
    <div className="detail">
      {!error ? ( 
        <div>
          <div className="det_id">Id: {dog?.id}</div>
          <div className="det_name">Breed: {dog.name}</div>
          <div className="box">
            <div className="side back">
              <img src={dog.image} alt={dog.name} />
            </div>
            <div className="side left">
              <img src={dog.image} alt={dog.name} />
            </div>
            <div className="side rigth">
              <img src={dog.image} alt={dog.name} />
            </div>
            <div className="side front">
              <img src={dog.image} alt={dog.name} />
            </div>
          </div>
          <div className="otherDetails">
            <div className="det_weight">Weight: {dog.weight} kgs</div>
            <div className="det_height">Height: {dog.height} cms</div>
            <div className="det_life_span">Life span: {dog.life_span}</div>
            <div className="det_temperament">Temperament: {dog.temperament?.join(", ")}</div>            
          </div>
        </div>
      ) : (
        <div className="notFound">
          <img src="https://www.sniffspace.com.au/templates/front/images/error_404.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default Details;
