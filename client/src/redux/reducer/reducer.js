import { ADD_DOG,
    REMOVE_DOG,
    GET_BYNAME,
    GET_DOGS,
    PAGINATE,
    FILTER,
    ORDER } from "../actionTypes/actionTypes";


const initialState = {
    backUpDogs: [],
    allDogs: [],
    paginatedDogs: [],
    pages:1
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            return {
                ...state,
                backUpDogs: [...action.payload],
                allDogs: [...action.payload],
            }
        case GET_BYNAME:
            return {
                ...state,
                allDogs: action.payload
            }
        
        case PAGINATE:
            //pagination
            let showDogs = [];
            let pos = (action.payload.page - 1)*8;
            let end = 0;
            let totalPages = Math.ceil(state.allDogs.length/8)
            //calculates the end of the array to show
            if(pos+8 < state.allDogs.length){
                end = pos+8;
            }else{
                end = state.allDogs.length;
            }
            while(pos<end){
                showDogs.push(state.allDogs[pos]);
                pos++;
            }
            return {
                ...state,
                paginatedDogs: showDogs, 
                pages: totalPages
            }                

        default:
            return {...state}
    }
}

export default reducer;