import React, { Component } from "react"
import {connect} from "react-redux";
import {get} from "lodash"
import StudentData from "./StudentData";
import CreateStaff from "./CreateStaff"

class Home extends Component{
    render(){
        const user = this.props.login
        return(
            <div>
                {
                    get(user,'users.profile','') === 'TEACHER' ? (
                        <StudentData data={get(user,'users',{})}/>
                    ) : (
                        <CreateStaff />
                    )
                }
            </div>
        )
    }
}


const mapStateToProps= (state)=>{
    return{
        login: state.login,
        register: state.register
    }
}

export default connect(mapStateToProps,null)(Home)
