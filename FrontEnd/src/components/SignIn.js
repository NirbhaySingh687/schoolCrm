import React, {Component} from "react"
import {connect} from "react-redux"
import {fetchUserLoginData} from "../Redux"
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
import {toast} from "react-toastify"

class SignIn extends Component{
	constructor(props) {
		super(props);
		this.state={
			email: '',
			password: ''
		}
	}
	handleFormSubmit = async(e) =>{
		e.preventDefault();

		try {
			const body = {email : this.state.email,password: this.state.password}
			const parseRes = await this.props.loginData(body)
			console.log(`>>>>>>parseRes>>>>>>>>>${JSON.stringify(parseRes)}`)
			if(parseRes !== 0){
				toast('Succesfully Login',{type:'info'})
			}else{
				toast('Incorrect User and Password',{type:'info'})
			}
		} catch (error) {
			console.error(error.message)
			toast(error.message,{type:'error'})
		}
	}

	handleChange = (key,e)=>{
		this.setState({
			[key] : e.target.value
		})
	}
	render() {
		return (
			<Container className='text-center'>
				<Row>
					<Col lg={6} className='offset-lg-3 mt-5'>
						<Card>
							<Form onSubmit={this.handleFormSubmit}>
								<CardHeader className=''>Login here</CardHeader>
								<CardBody>
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
		loginData :(body)=> dispatch(fetchUserLoginData(body))
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn)

