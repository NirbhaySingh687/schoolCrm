import React, { Component } from "react"
import {get,map} from "lodash"


class StudentData extends Component{
    constructor(props) {
        super(props);
        this.state={
            teacherData : this.props.data,
            data : []
        }
    }
    componentDidMount =async()=>{
        await this.fetchData()
    }

    fetchData =async ()=>{
        const url  = `http://localhost:5000/user/data/department/:department`.replace(':department',get(this.state.teacherData,'departments',''))
        await fetch(url,{
            method : 'GET',
            headers : {"Content-Type": "application/json"},
        }).then(response => response.json())
            .then(data => {
                this.setState({data: [data]})
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render() {
        let i=1
        return(
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">email</th>
                        <th scope="col">Departments</th>
                    </tr>
                    </thead>
                    {
                        map(this.state.data,(students,index)=>{
                            return <tbody key={index}>
                            <tr>
                                <th scope="row">{i++}</th>
                                <td>{get(students,'first_name','Nirbhay')}</td>
                                <td>{get(students,'last_name','Singh')}</td>
                                <td>{get(students,'email','nirbhays058@gmail.com')}</td>
                                <td>{get(students,'departments','Technology Team')}</td>
                            </tr>
                            </tbody>
                        })
                    }
                </table>
            </div>
        )
    }
}

export default StudentData
