import { ADD_DOG,
    DELETE_DOG,
    GET_BYNAME,
    GET_DOGS,
    PAGINATE,
    FILTER,
    ORDER,
    GET_TEMPERAMENTS} from "../actionTypes/actionTypes";


const initialState = {
        backUpDogs: [],
        allDogs: [],
        paginatedDogs: [],
        pages:1,
        temperaments:[]
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
            return {
                ...state,
                backUpDogs: [...state.backUpDogs, action.payload],
                allDogs: [...state.allDogs, action.payload],
            }
        case DELETE_DOG:
            return {
                ...state,
                backUpDogs: [...action.payload],
                allDogs: [...action.payload],
            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: [...action.payload]
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

            if(action.payload.name!==''){
                filtered = filtered.filter((dog)=>{
                    return dog.name?.toLowerCase().includes(action.payload.name)
                })
            }
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

            const ascSort = (a, b) => {
                // Split the weight string into start and end variables
                const [startA, endA] = a.weight.split(' - ').map(Number);
                const [startB, endB] = b.weight.split(' - ').map(Number);
                // Compare by variable1 (start) first
                if (startA < startB) {
                  return -1;
                }
                if (startA > startB) {
                  return 1;
                }
                // If variable1 is the same, compare by variable2 (end)
                if (endA < endB) {
                  return -1;
                }
                if (endA > endB) {
                  return 1;
                }
                return 0;
              };
            const descSort = (a, b) => {
                // Split the weight string into start and end variables
                const [startA, endA] = a.weight.split(' - ').map(Number);
                const [startB, endB] = b.weight.split(' - ').map(Number);
                // Compare by variable1 (start) first
                if (startA < startB) {
                  return 1;
                }
                if (startA > startB) {
                  return -1;
                }
                // If variable1 is the same, compare by variable2 (end)
                if (endA < endB) {
                  return 1;
                }
                if (endA > endB) {
                  return -1;
                }
                return 0;
              };

            if(action.payload ==='weightAsc'){
                orderedDogs.sort(ascSort) 
            }
            if(action.payload ==='weightDesc'){
                orderedDogs.sort(descSort) 
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