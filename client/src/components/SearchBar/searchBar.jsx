import { useState } from "react";

const SearchBar = ({onSearch, temperaments})=>{
    const [name, setName] = useState('');

    const handleSrchChange = (event)=> {
       setName(event.target.value)
    }
    
    return (
       <div className="search-bar">
          <input type='search' onChange={handleSrchChange} value={name} name='search'/>
          <button className="nav-button" onClick={()=> onSearch(name)}>Search Breed</button>
          <label htmlFor="temperaments">Temperaments</label>
          <select id="temperaments"  >
                    <option key='all' value='all'>All</option>
                {temperaments.map((temp)=>{
                    return <option key={temp.id} value={temp.id}>{temp.name}</option>
                })}
          </select>
       </div>
    )
}

export default SearchBar