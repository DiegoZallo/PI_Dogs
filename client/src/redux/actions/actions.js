import { ADD_DOG,
    REMOVE_DOG,
    GET_BYNAME,
    GET_DOGS,
    PAGINATE,
    FILTER,
    ORDER } from "../actionTypes/actionTypes";
import axios from "axios";

const URL = 'http://localhost:3003/';
    
export const getDogs = () => {
    return async (dispatch) => {
      try {
            const dogs=(await axios(`${URL}dogs`)).data;
            console.log(dogs);
            return dispatch({
               type: GET_DOGS,
               payload: [...dogs],
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
export const paginate=(page, dogs)=>{
    return { 
        type: PAGINATE, 
        payload: {page, dogs}
}
 

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


    