import * as Generic from "./RegisterType"

const initialState ={
    loading: false,
    register : [],
    error: ''
}


const registerReducer =(state=initialState,action)=>{
    console.log(`>>>>>>loginReducer>>>>>>>${JSON.stringify(action)}`)
    switch (action.type){
        case Generic.FETCH_USER_REGISTRATION_REQUEST:
            return{
                ...state,
                loading: true
            }
        case Generic.FETCH_USER_REGISTRATION_SUCCESS:
            return {
                loading: false,
                register: action.payload,
                error: ''
            }
        case Generic.FETCH_USER_REGISTRATION_FAILURE:
            return {
                loading: false,
                register: [],
                error: action.payload
            }
        default: return state
    }
}

export default registerReducer
