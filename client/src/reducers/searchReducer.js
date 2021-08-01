export const searchReducer = (state = { text: ""},action) =>{
    switch(action.type){
        case "SEARCH_QUERY"://type
         return {...state, ...action.payload};

        default:
        return state;
    }
}