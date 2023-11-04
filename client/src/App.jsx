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
import { getDogs, getTemperaments, getByName, paginate } from "./redux/actions/actions";



const App = ()=> {

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.paginatedDogs);
  const allDogs = useSelector((state) => state.allDogs);
  const temperaments = useSelector((state) => state.temperaments);
  const backUpDogs = useSelector((state) => state.backUpDogs);
  const totalPages = useSelector((state) => state.pages);

  const [page, setPage] = useState(1);
    
  // first time charges dogs and temperaments then paginate if allDogs change
  useEffect(()=>{
    if(backUpDogs.length===0) {
      dispatch(getDogs());
      dispatch(getTemperaments());
    };
    dispatch(paginate(page))
  },[page, allDogs])


  const onSearch = (name)=>{
    setPage(1);
    dispatch(getByName(name));
  }

 //Controls page changes and paginates 
  const handlePage = (event)=>{
    if(event >= 1 && event <= totalPages){
        setPage(event)
    };
  }

  const {pathname} = useLocation();

  return (
    <div className="App">
      {(pathname !== '/') && <Nav onSearch={onSearch} temperaments={temperaments} setPage={setPage} />}
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/home" element={<Cards dogs={dogs} handlePage={handlePage} page={page} totalPages={totalPages}/>} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/form" element={<Form temperaments={temperaments} dogsNames={backUpDogs}/>} />

        {/*  Any page that does not exist go here */}
        {/* {(pathname !== '*' && pathname !== '/') && <Route path='*' element={<NotFound />} />} */}
      </Routes>
    </div>
  );
}

export default App;