import React,{ Component } from 'react';
import {Link} from 'react-router-dom'
import firebase from '../../../firebase'
import './Register.css';
import { Button,Message } from 'semantic-ui-react';
import md5 from 'md5';

import Logo from '../Logo';



class register extends Component {
	constructor(){
		super()
		this.state = {
			username:'',
			email: '',
			password:'',
			phnumber: "",
			address : '',
			passwordConfirmation:'',
			errors: [],
			loading:false,
			status:"Register",
			userRef: firebase.database().ref('users')
		}  // defining state for registration form
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
			errors: []
		}) // clering errors and store event value
	} // method to handle change in the feilds

	componentWillUnmount(){
		firebase.auth().signOut();
		
	} // signing out user beacuase user is going o automatically signed in once it is registered (resulting in issues while loading the user in global state)
	// executes when another component mounts 
	// re-unmouting happens when history.push is encountered

	handleSubmit = (event) => {
		event.preventDefault();
		if (this.isFormValid()) {

			this.setState({
				loading: true,
				errors: []
			}) // starting loading and clearing previous errors

			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password) // registering user && also automatically signining in user
				.then(createdUser => {
					
					this.setState({
						loading:false,
						status:"Registered Successully",
						password:'',
						passwordConfirmation:''
					}) // stop loading changing the status and clearing out password related fields
					
					createdUser.user.updateProfile({
							displayName: this.state.username,
							photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
						}) // updating the registered user profile
						.then(
							() => {
								const currentUser= createdUser
								this.saveUser(currentUser)
								.catch(err => console.log(0))
							}
						)
				})
				.catch(err => {
					this.setState({
						errors: this.state.errors.concat(err),
						loading: false
					}) // stop loading and concat registration errors
				})
		}
	} // method to handle the submit event

	saveUser = (createdUser) => {
			return (
				this.state.userRef.child(createdUser.user.uid).set({
					name: createdUser.user.displayName,
					avatar: createdUser.user.photoURL,
					address: this.state.address,
					phnumber: this.state.phnumber
				})
			)
	}// saving extra info about users in realtime database


	isFormValid = () => {
		let errors = []
		let error
		if (this.isFormEmpty(this.state)) {
			error = {
				message: "Fill in all fields"
			}
			this.setState({
				errors: errors.concat(error)
			})
			return false;
		} else if (!this.isPasswordValid(this.state)) {
			error = {
				message: "Password not confirmed"
			}
			this.setState({
				errors: errors.concat(error)
			})
			return false
		} else {
			return true
		}
	} // method to check if form is valid

	isFormEmpty = ({username,email,password,passwordConfirmation , phnumber, address}) =>{
		return(
		!username.length || !email.length || !password.length || !passwordConfirmation.length || !address.length||!phnumber.length
	)} // method to check if form is empty

	isPasswordValid = ({password , passwordConfirmation}) => {
		if (password !== passwordConfirmation){
			return false;
		}else{
			return true;
		}
	} // method to check if password is confirmed

	displayError =(errors) => errors.map((error,i) => <p key ={i}>{error.message}</p> ); // Generates <p> tags based on errors

	handleEnter = (event) =>{
		if (event.keyCode === 13){
			(this.handleSubmit(event))
		}
	} // checks if ENTER key is pressed



	render(){
		document.body.className = 'reg-back'; // change the background when routed to register component

		const {
			username,
			email,
			password,
			passwordConfirmation,
			loading,
			errors,
			phnumber,
			address,
			status
		} = this.state;
		const {
			handleChange,
			handleEnter,
			handleSubmit,
			displayError,
		} = this

		return(
			<div id="register">
				<Logo Link = {Link}/>
				<div className="form-cont"  onKeyDown={handleEnter}>

					<div className="form-header">
						Register Yourself
					</div>

					<div className="field">
						<div className="name">
							Username
						</div>

						<input 
						className="form" 
						name="username" 
						type="text" 
						onChange={handleChange}
						value = {username}
						/>
					</div>

					<div className="field">
						<div className="name">
							Address
						</div>

						<input 
						className="form" 
						name="address" 
						type="text" 
						onChange={handleChange}
						value = {address}
						/>
					</div>

					<div className="field">
						<div className="name">
							Phone Number
						</div>

						<input 
						className="form" 
						name="phnumber" 
						type="text" 
						onChange={handleChange}
						value = {phnumber}
						/>
					</div>

					<div className="field">
						<div className="name">
							Email
						</div>

						<input 
						className="form" 
						name="email" 
						type="email" 
						onChange ={handleChange} 	
						value= {email}
						/>
					</div>

					<div className="field">
						<div className="name">
							Password
						</div>

						<input 
						className="form" 
						name="password" 
						type="password" 
						onChange={handleChange}
						value = {password}
						/>
					</div>

					<div className="field">
						<div className="name">
							Confirm Password
						</div>

						<input 
						className="form" 
						name="passwordConfirmation" 
						value= {passwordConfirmation}
						type="password" 
						onChange={handleChange}
						/>
					</div>

					<Button 
					id="btn-register" 
					onClick={handleSubmit} 
					className={loading ? 'loading' : ''} 
					disabled={loading}
					> 
						{status}
					</Button>
						
					{
						errors.length > 0 && (
						<Message 
						error 
						className="error-prompt" 
						id="register"
						>
							{displayError(errors)}
						</Message>
						)
					}
					
					<p id="suggestion">
						Already a user ? 
						<Link 
						to="/login" 
						className="authLink" 
						id="register"
						>
							{" Login"}
						</Link> 
					</p>

				</div>
			</div>
		)
	}
}


export default register;