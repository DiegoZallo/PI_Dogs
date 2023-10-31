import { ADD_DOG,
    REMOVE_DOG,
    GET_BYNAME,
    GET_DOGS,
    PAGINATE,
    FILTER,
    ORDER} from "../actionTypes/actionTypes";


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
        case ADD_DOG:
            console.log(action.payload);
            return {
                ...state,
                backUpDogs: [...state.backUpDogs, action.payload],
                allDogs: [...state.allDogs, action.payload],
            }
        case GET_BYNAME:
            return {
                ...state,
                allDogs: action.payload
            }
        
        case PAGINATE:
            //pagination
            let showDogs = [];
            let pos = (action.payload - 1)*8;
            let totalPages = Math.ceil(state.allDogs.length/8)
            
            let end = 0;
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
        case FILTER:
            let filtered= [...state.backUpDogs];
            if(action.payload.temp !=='all'){
                filtered = filtered.filter((dog)=>{
                    return dog.temperament?.includes(action.payload.temp)
                })
            }
            if(action.payload.addedBy ==='me'){
                filtered = filtered.filter((dog)=>{
                    return isNaN(Number(dog.id))
                })
            }
            if(action.payload.addedBy ==='others'){
                filtered = filtered.filter((dog)=>{
                    return Number(dog.id)
                })
            }
            return {
                ...state,
                allDogs: [...filtered],
            }
        case ORDER:
            let orderedDogs = [...state.allDogs];
        
            if(action.payload ==='ascendent'){
                orderedDogs.sort((a, b) => a.name.localeCompare(b.name)) 
            }
            if(action.payload ==='descendent'){
                orderedDogs.sort((a, b) => b.name.localeCompare(a.name)) 
            }
            if(action.payload ==='weightAsc'){
                orderedDogs.sort((a, b) => (a.weight.split(' - ')[0]) - b.weight.split(' - ')[0]) 
            }
            if(action.payload ==='weightDesc'){
                orderedDogs.sort((a, b) => b.weight.split(' - ')[0] - a.weight.split(' - ')[0]) 
            }
            return {
                ...state,
                allDogs: [...orderedDogs],
            }
        default:
            return {...state}
    }
}

export default reducer;