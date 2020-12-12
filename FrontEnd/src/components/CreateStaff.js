import React from "react";
import {Button,TextField,Grid,Paper,AppBar,Typography} from "@material-ui/core";
import {toast} from "react-toastify";
import {isEmpty,get} from "lodash"
import {connect} from "react-redux";
import StudentData from "./StudentData";


class createStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameErr: '',
            name: '',
            lastNameErr:'',
            lastName:'',
            mobileError:'',
            mobile:'',
            emailError:'',
            email:'',
            departmentErr:'',
            department:'',
            designationErr:'',
            designation:'',
            active: true,
            data: []
        }
    }
    componentDidMount =async()=>{
        const url  = `http://localhost:5000/user/data/id/:id`.replace(':id',get(this.props.login,'id',''))
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
    handleChange(event,key) {
        this.setState({
            [key] : event.target.value
        })
    }

    validate=()=>{
        let validateFlag= true
        if(isEmpty(this.state.department) && ((this.state.department !== 'MATH') || (this.state.department !== 'SCIENCE'))){
            validateFlag = false
            this.setState({
                nameErr : "DEPARTMENT SHOULD ALWAYS BY MATH OR SCIENCE"
            })
        }else {
            validateFlag = true
            this.setState({
                nameErr: ''
            })
        }
        return validateFlag
    }
    handleSubmit =async (event) =>{
        event.preventDefault();
        if(this.validate()) {
            try {
                const body = {
                    first_name: this.state.name,
                    last_name : this.state.lastName,
                    email: this.state.email,
                    is_active : this.state.active,
                    department: this.state.department
                }
                await fetch('http://localhost:5000/user/insert_new_student', {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                }).then(result=>{
                    console.log(`Result`,JSON.stringify(result))
                    if(result.status === 200){
                        toast('SuccessFully Created', {type: 'info'})
                    }
               }).catch(err=>{
                   console.log(`err`,err)
                   if(err){
                       toast('Something Went Wrong', {type: 'error'})
                   }
               })
            } catch (error) {
                console.error(error.message)
                toast(error.message, {type: 'error'})
            }
        }

    }
    render() {
        return (
            <div>
                {
                    isEmpty(this.state.data) ? <div>
                        <AppBar position="static" alignitems="center" color="primary">
                        </AppBar>

                        <Grid container  justify="center" direction='row' >
                            <Grid item>
                                <Grid container direction="column" justify="center" spacing={2} style={{justifyContent: 'center',minHeight: '90vh'}}>
                                    <Paper variant="elevation" elevation={2} style={{justifyContent: 'center',minHeight: '30vh',padding: '50px'}}>
                                        <Grid item>
                                            <Typography component="h1" variant="h5">
                                                New Student
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <form onSubmit={(e)=>this.handleSubmit(e)}>
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item>
                                                        <TextField type="text"
                                                                   placeholder="First Name"
                                                                   fullWidth
                                                                   name="name"
                                                                   variant="outlined"
                                                                   value={this.state.name}
                                                                   onChange={(event) => this.handleChange(event,'name')}
                                                                   required
                                                                   autoFocus/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField type="text"
                                                                   placeholder="Last Name"
                                                                   fullWidth
                                                                   name="lastName"
                                                                   variant="outlined"
                                                                   value={this.state.lastName}
                                                                   onChange={(event) => this.handleChange(event,'lastName')}
                                                                   autoFocus/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField type="number"
                                                                   placeholder="Mobile"
                                                                   fullWidth
                                                                   name="mobile"
                                                                   variant="outlined"
                                                                   value={this.state.mobile}
                                                                   onChange={(event) => this.handleChange(event,'mobile')}
                                                                   autoFocus/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField type="email"
                                                                   placeholder="Email"
                                                                   fullWidth
                                                                   name="username"
                                                                   variant="outlined"
                                                                   value={this.state.email}
                                                                   onChange={(event) => this.handleChange(event,'email')}
                                                                   autoFocus/>
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField type="text"
                                                                   placeholder="Department"
                                                                   fullWidth
                                                                   name="department"
                                                                   variant="outlined"
                                                                   value={this.state.department}
                                                                   helperText={this.state.nameErr}
                                                                   onChange={(event) => this.handleChange(event,'department')}
                                                                   autoFocus/>
                                                    </Grid>
                                                    <Grid item>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            type="submit"
                                                            style={{width:'100%'}}
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </form>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div> : <StudentData data={this.state.data}/>
                }
            </div>
        );
    }
}

const mapStateToProps= (state)=>{
    return{
        login: state.login,
    }
}

export default connect(mapStateToProps,null)(createStaff)

