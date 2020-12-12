import {combineReducers} from "redux"
import loginReducer from "./Login/LoginReducers";
import registerReducer from "./Register/RegisterReducer";

const rootReducer= combineReducers({
    login : loginReducer,
    register: registerReducer
});

export default rootReducer
