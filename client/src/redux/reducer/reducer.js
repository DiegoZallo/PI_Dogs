import { ADD_DOG,
    REMOVE_DOG,
    GET_TEMPERAMENTS,
    GET_DOGS,
    FILTER,
    ORDER } from "../actionTypes/actionTypes";


const initialState = {
    allDogs: [],
    filteredDogs: [],
    paginatedDogs: [],
    pages:0
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_DOGS:
            //pagination
            let showDogs = [];
            let pos = (action.payload.page - 1)*8;
            let end = 0;
            let totalPages = Math.ceil(action.payload.dogs.length/8)
            //calculates the end of the array to show
            if(pos+8 < action.payload.dogs.length){
                end = pos+8;
            }else{
                end = action.payload.dogs.length;
            }
            while(pos<end){
                showDogs.push(action.payload.dogs[pos]);
                pos++;
            }
            return {
                ...state,
                allDogs: [...action.payload.dogs],
                paginatedDogs: showDogs, 
                pages: totalPages
            }
        
        case 2:
            return {
                ...state,
                allCharacters: action.payload,
                myFavorites: action.payload
            }
        case 3:
            let resultFilter = [...state.allCharacters];
            if(action.payload !== 'All'){
                resultFilter = resultFilter.filter((character)=>{
                    return character.gender === action.payload
                })
            }
                return {
                    ...state,    
                    myFavorites: resultFilter
            }


        case 4:
                let orderedFav = [...state.myFavorites];

                action.payload==='A'?
                    orderedFav.sort((a, b) => a.id - b.id)
                    :
                    orderedFav.sort((a, b) => b.id - a.id);

            return {
                ...state,    // pude que genere error por como estamos haciendo la copia !!!!!!!!  EJERCICIO 2.3
                myFavorites: orderedFav
            }        

        default:
            return {...state}
    }
}

export default reducer;