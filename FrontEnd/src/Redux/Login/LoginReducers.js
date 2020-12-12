import * as Generic from "./LoginType"

const initialState ={
    loading: false,
    users : [],
    error: ''
}


const loginReducer =(state=initialState,action)=>{
    console.log(`>>>>>>loginReducer>>>>>>>${JSON.stringify(action)}`)
    switch (action.type){
        case Generic.FETCH_USER_REQUEST:
            return{
                ...state,
                loading: true
            }
        case Generic.FETCH_USER_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case Generic.FETCH_USER_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default: return state
    }
}

export default loginReducer
