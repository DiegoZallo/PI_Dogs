// import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "../actionsTypes/actionTypes"


const initialState = {
    myFavorites: [],
    allCharacters: []
}


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 1:
            return {
                ...state,
                myFavorites: action.payload, 
                allCharacters: action.payload
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