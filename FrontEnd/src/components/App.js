import React, {Component} from "react"
import {connect} from "react-redux"
import {isEmpty} from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
//toast
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"
//router
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Header from "./layout/Header"
import Footer from "./layout/Footer"


class App extends Component{
    render() {
        const {users} = this.props.login
        const {register} = this.props.register
        return(
            <Router>
                <ToastContainer />
                <Header />
                <Switch>
                    <Route exact path='/home'  component={isEmpty(users)|| isEmpty(register) ? SignIn : Home}/>
                    <Route exact path='/signin' component={!isEmpty(users) || !isEmpty(register) ? Home : SignIn}/>
                    <Route exact path='/signup' component={!isEmpty(users) || !isEmpty(register)? Home : SignUp}/>
                </Switch>
                <Footer />
            </Router>
        )
    }
}

const mapStateToProps= (state)=>{
    return{
        login: state.login,
        register: state.register
    }
}

export default connect(mapStateToProps,null)(App)

