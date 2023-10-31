import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Details = ()=>{
    const {id} = useParams();
    const [dog, setDog] = useState({});

    useEffect(() => {
        axios(`http://localhost:3003/dogs/${id}`)
        .then(({ data }) => {
              setDog(data);
        })
        .catch(()=> console.log(`No dogs found with this ID:${id}`));

        return ()=>setDog({})
     }, [id]);

    return (
        <div>
          <h6 >Id: {dog?.id}</h6>
          <div className='name'>Breed: {dog.name}</div>
          <div className='weight'>Weight: {dog.weight} kgs</div>
          <div className='height'>Height: {dog.height} cms</div>
          <div className='life_span'>Life span: {dog.life_span}</div>
          <div className='temperament'>Temperament: {dog.temperament?.join(', ')}</div>
          <div className='image'><img src={dog.image} alt={dog.name} /></div>
        </div>
    )
}

export default Details