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
import { getDogs, getByName, paginate } from "./redux/actions/actions";



const App = ()=> {

  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.paginatedDogs);
  const allDogs = useSelector((state) => state.allDogs);
  const backUpDogs = useSelector((state) => state.backUpDogs);
  const totalPages = useSelector((state) => state.pages);

  const [page, setPage] = useState(1);
  const [temperaments, setTemperaments] = useState([]);

// get temperaments when page is loaded ***************
  const uploadTemperaments = async () => {
    const URL = "http://localhost:3003/temperaments";
    try {
      await setTemperaments((await axios(URL)).data)

    } catch (error) {
        throw Error(error.message)
    }
  }

// get dogs when page is loaded ***************
  // const uploadDogs = async () => {
  //   const URL = "http://localhost:3003/dogs";
  //   try {
  //     const response = await axios(URL);
  //     await setAllDogs(response.data);
  //     dispatch(paginate(page, response.data));
  //   } catch (error) {
  //       throw Error(error.message)
  //   }
  // }



//Search by name******************************
  const onSearch = (name)=>{
    setPage(1);
    dispatch(getByName(name));
    dispatch(paginate(page, allDogs))
    console.log(dogs);
  }

  useEffect(()=>{
    if(backUpDogs.length===0) {
      dispatch(getDogs());
      uploadTemperaments();
    };
    dispatch(paginate(page, allDogs))
  },[page, allDogs])
  
  const handlePage = async(event)=>{
      let moveTo = page + event;
      if (moveTo && moveTo<=totalPages) setPage(moveTo);
      await dispatch(paginate(page, allDogs))
  };

  const {pathname} = useLocation();
  const navigate = useNavigate();

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