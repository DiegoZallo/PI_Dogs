import './form.css';

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { addDog, getDogs } from "../../redux/actions/actions";
import validation from './validation';

const Form = ({temperaments, dogsNames})=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [dogsData, setDogsData] = useState({ name: '', 
                                               minWeight: 0,
                                               maxWeight: 0,
                                               minHeight: 0,
                                               maxHeight: 0,
                                               life_span_min: 0,
                                               life_span_max: 0,
                                               temperaments:'',
                                               image:''
                                                });

    const handleChange = async(event) => {
        setDogsData({
          ...dogsData,
          [event.target.name]: event.target.value
        });
        if (dogsData.name !== '' || 
            dogsData.minWeight !== 0 ||
            dogsData.maxWeight !== 0 ||
            dogsData.minHeight !== 0 ||
            dogsData.maxHeight !== 0 ||
            dogsData.life_span_min !== 0 ||
            dogsData.life_span_max !== 0 ||
            dogsData.image !== '' ||
            dogsData.temperaments == ''          
            ) {
          setErrors(validation(dogsData, dogsNames));
        }
      }

      useEffect(() => {
        if (dogsData.name !== '' || 
            dogsData.minWeight !== 0 ||
            dogsData.maxWeight !== 0 ||
            dogsData.minHeight !== 0 ||
            dogsData.maxHeight !== 0 ||
            dogsData.life_span_min !== 0 ||
            dogsData.life_span_max !== 0 ||
            dogsData.image !== ''        
            ) {
          setErrors(validation(dogsData, dogsNames));
        }
    }, [dogsData]);

    const handleKeyDown = (event) => {
        // Prevent keyboard input while allowing the increment/decrement controls
        event.preventDefault();
    };
    

    const handleSubmit = async(event) => {
        event.preventDefault();
        const selectedTemperaments = Array.from(event.target.temperaments.selectedOptions).map(option => option.value);
        const newDog = {
                name: dogsData.name.charAt(0).toUpperCase()+dogsData.name.slice(1).toLowerCase(), 
                image: dogsData.image, 
                height: [Number(dogsData.minHeight), Number(dogsData.maxHeight)].join(' - '), 
                weight: [Number(dogsData.minWeight), Number(dogsData.maxWeight)].join(' - '), 
                life_span: [Number(dogsData.life_span_min), Number(dogsData.life_span_max)].join(' - ') + ' years', 
                temperament: selectedTemperaments
            };
        dispatch(addDog(newDog));
        dispatch(getDogs());

        setDogsData({ name: '', 
                      minWeight: 0,
                      maxWeight: 0,
                      minHeight: 0,
                      maxHeight: 0,
                      life_span_min: 0,
                      life_span_max: 0,
                      temperaments:'',
                      image:''})
        await window.location.reload();
      }

      
    return (
    <div className="container">
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="name">Breed</label>
            <input  type="text"
                    name="name"
                    id="name"
                    value={dogsData.name}
                    onChange={handleChange}/>
            {errors.name !== '' && <span className="error-message">{errors.name}</span>}
            <br />
            <div>Weight: <br />
                <label htmlFor="minWeight"> Min</label>
                <input  type="number" min="1" max="100" 
                        name="minWeight"
                        id="minWeight"
                        value={dogsData.minWeight}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}/>
                <label htmlFor="maxWeight"> Max</label>
                <input  type="number" min="1" max="100" 
                        name="maxWeight"
                        id="maxWeight"
                        value={dogsData.maxWeight}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}/>
                {errors.minWeight !== '' && <span className="error-message">{errors.minWeight}</span>}
                {errors.maxWeight !== '' && <span className="error-message">{errors.maxWeight}</span>}
            </div>
            <br />
            <div>Height: <br />
                <label htmlFor="minHeight"> Min</label>
                <input  type="number" min="1" max="100" 
                        name="minHeight"
                        id="minHeight"
                        value={dogsData.minHeight}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}/>
                <label htmlFor="maxHeight"> Max</label>
                <input  type="number" min="1" max="100" 
                        name="maxHeight"
                        id="maxHeight"
                        value={dogsData.maxHeight}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}/>
                {errors.minHeight !== '' && <span className="error-message">{errors.minHeight}</span>}
                {errors.maxHeight !== '' && <span className="error-message">{errors.maxHeight}</span>}
            </div>
            <br />
            <div>Life Span: <br />
                <label htmlFor="life_span_min"> Min</label>
                <input  type="number" min="1" max="50" 
                        name="life_span_min"
                        id="life_span_min"
                        value={dogsData.life_span_min}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}/>
                <label htmlFor="life_span_max"> Max</label>
                <input  type="number" min="1" max="25" 
                        name="life_span_max"
                        id="life_span_max"
                        value={dogsData.life_span_max}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}/>
                {errors.life_span_min !== '' && <span className="error-message">{errors.life_span_min}</span>}
                {errors.life_span_max !== '' && <span className="error-message">{errors.life_span_max}</span>}

            </div>
            <br />
            <label htmlFor="image">Image URL</label>
            <input type="text"
                   name="image"
                   id="image"
                   value={dogsData.image}
                   onChange={handleChange}/>
               {errors.image !== '' && <span className="error-message">{errors.image}</span>}
            <br />
            <label htmlFor="temperaments">Temperaments</label>
            <select id="temperaments" name="temperaments" multiple onChange={handleChange}>
                {temperaments.map((temp)=>{
                    return <option key={temp.id} value={temp.id}>{temp.name}</option>
                })}
            </select>
            {errors.temperaments !== '' && <span className="error-message">{errors.temperaments}</span>}
            <br />

            <button type="submit" disabled={Object.keys(errors).length > 0 || dogsData.name===''}>Create Dog</button>
        </form>
    </div>
    )
}

export default Form