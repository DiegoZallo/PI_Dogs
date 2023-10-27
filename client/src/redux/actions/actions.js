import { ADD_DOG,
    REMOVE_DOG,
    GET_TEMPERAMENTS,
    GET_DOGS,
    PAG_DOGS,
    FILTER,
    ORDER } from "../actionTypes/actionTypes";
import axios from "axios";

const URL = 'http://localhost:3003/dogs/';
    
export const getDogs = (page, dogs) => {
    return async (dispatch) => {
      try {
         dogs?.length!=0?dogs=[...dogs]:dogs=(await axios(URL)).data;

            return dispatch({
               type: GET_DOGS,
               payload: {dogs, page},
            });     
      } catch (error) {
         throw Error(error.message)
      }
    };
}
export const pagDogs = (page) => {
            return {
               type: PAG_DOGS,
               payload: page,
            };     
}

// export const removeFav = (id) => {
//     return async (dispatch) => {
//       try {
//          const {data} = await axios.delete(URL + id)
//          return dispatch({
//             type: REMOVE_DOG,
//             payload: data,
//          });         
//       } catch (error) {
//          throw Error(error.message)
//       }
//     };
// }
// export const filterCards = (gender) => {
//     return { 
//         type: FILTER, 
//         payload: gender }
// }
// export const orderCards = (orden) => {
//     return { 
//         type: ORDER, 
//         payload: orden }
// }


    