//Axios
import axios from 'axios';

//Styles
import './App.css';

// Hooks
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";

// Componnents to render
import Cards from './components/Cards/cards'
import Details from './components/Details/details';
import Landing from './components/Landing/landing';
import Form from './components/Form/form';
import Nav from './components/Nav/nav';

//Redux
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "./redux/actions/actions";



const App = ()=> {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.paginatedDogs);
  const allDogs = useSelector((state) => state.allDogs);
  const totalPages = useSelector((state) => state.pages);

// get temperaments when page is loaded ***************
  const [temperaments, setTemperaments] = useState([]);
  
  const uploadTemperaments = async () => {
    const URL = "http://localhost:3003/temperaments";
    try {
      await setTemperaments((await axios(URL)).data)

    } catch (error) {
        throw Error(error.message)
    }

  }
//**************************************************** */

  const onSearch = (breed)=>{
    alert('you clicked on search breed');
  }

  const [page, setPage] = useState(1);

  useEffect(()=>{
    dispatch(getDogs(page, allDogs));
    if(allDogs.length===0) uploadTemperaments();
  },[page])

  const handlePage =async (event)=>{
      let moveTo = page + event;
      if (moveTo && moveTo<=totalPages) await setPage(moveTo);
  };


  const {pathname} = useLocation();

  return (
    <div className="App">
      {(pathname !== '/') && <Nav onSearch={onSearch} temperaments={temperaments}/>}
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" element={<Cards dogs={dogs} handlePage={handlePage} page={page} />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/form" element={<Form temperaments={temperaments}/>} />

        {/*  Any page that does not exist go here */}
        {/* {(pathname !== '*' && pathname !== '/') && <Route path='*' element={<NotFound />} />} */}
      </Routes>
    </div>
  );
}

export default App;