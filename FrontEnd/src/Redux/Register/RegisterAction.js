import * as Generic from './RegisterType'
import {isEmpty} from "lodash"

export const fetchRegistrationRequest =()=>{
    return{
        type: Generic.FETCH_USER_REGISTRATION_REQUEST
    }
}

export const fetchRegistrationSuccess =(data)=>{
    return{
        type: Generic.FETCH_USER_REGISTRATION_SUCCESS,
        payload: data
    }
}

export const fetchRegistrationFailure =(error)=>{
    return{
        type: Generic.FETCH_USER_REGISTRATION_FAILURE,
        payload: error
    }
}

export const fetchUserRegisterData=(body)=>{
    return async (dispatch)=>{
        dispatch(fetchRegistrationRequest())
        const response = await fetch('http://localhost:5000/auth/register',{
            method : 'POST',
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(body)
        })

        const parseRes = await response.json()
        if(!isEmpty(parseRes)){
            dispatch(fetchRegistrationSuccess(parseRes))
        }else {
            const errorMsg = parseRes.message
            dispatch(fetchRegistrationFailure(errorMsg))
        }
    }
}
