import { ADD_DOG,
    DELETE_DOG,
    GET_BYNAME,
    GET_DOGS,
    GET_TEMPERAMENTS,
    PAGINATE,
    FILTER,
    ORDER} from "../actionTypes/actionTypes";
import axios from "axios";

const URL = 'http://localhost:3003/';
    
export const getDogs = () => {
    return async (dispatch) => {
      try {
            const dogs=(await axios(`${URL}dogs`)).data;
            return dispatch({
               type: GET_DOGS,
               payload: [...dogs],
            });     
      } catch (error) {
         throw Error(error.message)
      }
    };
}
export const addDog = (newDog) => {
    return async (dispatch) => {
      try {
            await axios.post(`${URL}dogs`, newDog)
            return dispatch({
               type: ADD_DOG,
               payload: newDog,
            });     
      } catch (error) {
         throw Error(error.message)
      }
    };
}
export const getByName = (name) => {
    return async (dispatch) => {
        try {
           const dogs=(await axios(`${URL}dogs?name=${name}`)).data;
           return dispatch({
                 type: GET_BYNAME,
                 payload: [...dogs],
           });     
        } catch (error) {
           throw Error(error.message)
        }
      }; 
}
export const deleteDog = (id) => {
    return async (dispatch) => {
        try {
           const dogs=(await axios.delete(`${URL}dogs/${id}`)).data;
           return dispatch({
                 type: DELETE_DOG,
                 payload: dogs,
           });     
        } catch (error) {
           throw Error(error.message)
        }
      }; 
}
export const getTemperaments = () => {
    return async (dispatch) => {
      try {
            const temp = (await axios(`${URL}temperaments`)).data
            return dispatch({
               type: GET_TEMPERAMENTS,
               payload: temp,
            });     
      } catch (error) {
         throw Error(error.message)
      }
    };
}
    export const paginate=(page)=>{
        return { 
            type: PAGINATE, 
            payload: page
            }
}
    export const filter=(cond)=>{
        return { 
            type: FILTER, 
            payload: cond
            }
}
    export const order=(order)=>{
        return { 
            type: ORDER, 
            payload: order
            }
}


    