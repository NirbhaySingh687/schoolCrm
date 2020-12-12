import React, { Component } from "react"
import {connect} from "react-redux"
import {fetchUserRegisterData} from "../Redux";
import {
    Container,
    Form,
    Button,
    FormGroup,
    Label,
    Col,
    Input,
    Row,
    Card,
    CardBody,
    CardFooter,
    CardHeader
} from "reactstrap"
import {SelectField,MenuItem} from "material-ui"
import {toast} from "react-toastify"
import {keys} from "lodash";

const TYPE = {
	TEACHER: 'TEACHER',
	STUDENT : 'STUDENT'
}

const DEPARTMENT ={
	MATH : 'MATH',
	SCIENCE: 'SCIENCE'
}

class SignUp extends Component{
	constructor(props) {
		super(props);
		this.state={
			name: '',
			email: '',
			password :'',
			department : '',
			profile : ''
		}
	}
	handleFormSubmit = async(e) => {
		e.preventDefault();

		try {
			const body = {
				name: this.state.name,
				email: this.state.email,
				password :this.state.password,
				department: this.state.department,
				profile : this.state.profile
			}
			const parseRes = this.props.registrationData(body)
			if (parseRes.length !== 0) {
				toast('Succesfully Register', {type: 'info'})
			} else {
				toast('Incorrect User and Password', {type: 'error'})
			}
		} catch (error) {
			console.error(error.message)
			toast(error.message, {type: 'error'})
		}
	}

	handleChange=(key,e)=>{
		this.setState({
			[key]: e.target.value
		})
	}
	handleDepartmentChange = (key, value) => {
		this.setState({[key]: value});
	}
	render() {
		return (
			<Container className='text-center'>
				<Row>
					<Col lg={6} className='offset-lg-3 mt-5'>
						<Card>
							<Form onSubmit={this.handleFormSubmit}>
								<CardHeader className=''>Register here</CardHeader>
								<CardBody>
									<FormGroup row>
										<Label for='Name' sm={3}>
											Name
										</Label>
										<Col sm={9}>
											<Input
												type='name'
												name='name'
												id='name'
												placeholder='provide your name'
												value={this.state.name}
												onChange={e => this.handleChange('name',e)}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for='email' sm={3}>
											Email
										</Label>
										<Col sm={9}>
											<Input
												type='email'
												name='email'
												id='email'
												placeholder='provide your email'
												value={this.state.email}
												onChange={e => this.handleChange('email',e)}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for='password' sm={3}>
											Password
										</Label>
										<Col sm={9}>
											<Input
												type='password'
												name='password'
												id='password'
												placeholder='your password here'
												value={this.state.password}
												onChange={e => this.handleChange('password',e)}
											/>
										</Col>
									</FormGroup>
									<FormGroup row>
										<Label for='Department'>Department</Label>
									</FormGroup>
									<Col sm={9}>
										<SelectField floatingLabelText="profile*"
													 value={this.state.profile}
													 onChange={(event, index, value) => this.handleDepartmentChange('profile', value)}
													 floatingLabelFixed={true} >
											{
												keys(TYPE).map((key, index)=>{
													return <MenuItem value={TYPE[key]} primaryText={TYPE[key]} key={index} />
												})
											}
										</SelectField>
									</Col>
									<Col sm={9}>
										<SelectField floatingLabelText="Department*"
													 value={this.state.department}
													 onChange={(event, index, value) => this.handleDepartmentChange('department', value)}
													 floatingLabelFixed={true} >
											{
												keys(DEPARTMENT).map((key, index)=>{
													return <MenuItem value={DEPARTMENT[key]} primaryText={DEPARTMENT[key]} key={index} />
												})
											}
										</SelectField>
									</Col>
								</CardBody>
								<CardFooter>
									<Button type='submit' block color='primary'>
										Sign In
									</Button>
								</CardFooter>
							</Form>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}
const mapStateToProps= (state)=>{
	return{
		login: state.login
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		registrationData :(body)=> dispatch(fetchUserRegisterData(body))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(SignUp)
