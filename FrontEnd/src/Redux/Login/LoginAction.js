import * as Generic from './LoginType'
import {isEmpty} from "lodash"

export const fetchLoginRequest =()=>{
    return{
        type: Generic.FETCH_USER_REQUEST
    }
}

export const fetchLoginSuccess =(data)=>{
    return{
        type: Generic.FETCH_USER_SUCCESS,
        payload: data
    }
}

export const fetchLoginFailure =(error)=>{
    return{
        type: Generic.FETCH_USER_FAILURE,
        payload: error
    }
}

export const fetchUserLoginData=(body)=>{
    return async (dispatch)=>{
        dispatch(fetchLoginRequest)
        const response = await fetch('http://localhost:5000/auth/login',{
            method : 'POST',
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(body)
        })

        const parseRes = await response.json()
        if(!isEmpty(parseRes)){
            dispatch(fetchLoginSuccess(parseRes))
        }else {
            const errorMsg = parseRes.message
            dispatch(fetchLoginFailure(errorMsg))
        }
    }
}

