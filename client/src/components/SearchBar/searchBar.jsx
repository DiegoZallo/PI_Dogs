import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filter, order } from "../../redux/actions/actions"; 


const SearchBar = ({onSearch, temperaments, setPage})=>{
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [filterCond, setFilterCond] = useState({temp:'all', addedBy:'all', order:'ascendent'})
   
    useEffect(()=>{
      dispatch(order(filterCond.order));
      setPage(1)
    },[filterCond.order])

    const handleSrchChange = (event)=> {
       setName(event.target.value)
    }
    
    const handleOpChange = async (event)=>{
      event.target.name === 'temperaments' && setFilterCond({...filterCond, temp: event.target.value});
      event.target.name === 'addedBy' && setFilterCond({...filterCond, addedBy: event.target.value});
      event.target.name === 'order' &&  setFilterCond({...filterCond, order: event.target.value});
   }    

   const handleFilter=()=>{
      dispatch(filter(filterCond))
      dispatch(order(filterCond.order))
      setPage(1)
   }
    
    return (
       <div className="search-bar">
         <input type='search' onChange={handleSrchChange} value={name} id='search'/>
         <button className="nav-button" onClick={()=> onSearch(name)}>Search Breed</button>
         
         <div>Filters: <br />
            <label htmlFor="temperaments">Temperaments</label>
            <select name="temperaments" id="temperaments" onChange={handleOpChange}>
               <option key='all' value='all'>All</option>
               {temperaments.map((temp)=>{
                  return <option key={temp.id} value={temp.name}>{temp.name}</option>
               })}
            </select>
            <label htmlFor="addedBy">Added by</label>
            <select name="addedBy" id="addedBy" onChange={handleOpChange}>
               <option value="all">All</option>
               <option value="me">Me</option>
               <option value="others">Others</option>
            </select>
            <button onClick={handleFilter}>Filter</button>
         </div>
         <br />
         <div>
            <label htmlFor="order">Order</label>
            <select name="order" id="order" onChange={handleOpChange}>
               <option value="ascendent">Breed 🡱</option>
               <option value="descendent">Breed 🡳</option>
               <option value="weightAsc">Weight 🡱</option>
               <option value="weightDesc">Weight 🡳</option>
            </select>
         </div>

       </div>
    )
}

export default SearchBar