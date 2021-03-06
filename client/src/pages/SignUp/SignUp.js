import React, { Component } from "react";
import {Input, FormBtn/*, Select*/} from "../../components/Form";
import Nav from "../../components/Nav";
import API from "../../utils/API";
// import { Redirect } from "react-router";

var Style = {
  // width: "100%",
  // height: "700px",
  // backgroundSize: "cover",
  // backgroundPosition: "8%",
  // backgroundImage: "url(https://d1yn1kh78jj1rr.cloudfront.net/image/preview/rDtN98Qoishumwih/karaoke-background_GJWDxYBO_SB_PM.jpg)"
};

class SignUp extends Component {
	state = {
		username: "",
		firstName: "",
		lastName: "",
		nickname: "",
		passwordMatch: "",
		locations: [],
		submitted: false
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	};

	handleSignUp = event => {
		event.preventDefault();

		if (this.state.password === this.state.passwordMatch) { // If the passwords match
			if (this.state.username && this.state.firstName && this.state.lastName && this.state.password && this.state.passwordMatch) {
				
				// Get the user with a username that matches the one tried.
				API.getUser(this.state.username).then(res => {					

					// If anything comes back from the call to get the username than the username is already taken
					if (res.data) {
						alert("Sorry that username is already taken.");
					}else {
						console.log("Creating", this.state.username);
						API.saveUser({
							username: this.state.username,
							firstName: this.state.firstName,
							lastName: this.state.lastName,
							nickname: this.state.nickname,
							password: this.state.password,
							access: "singer"
						})
						.then(response => {
							console.log("saveUser response", response);
							if (response.data === "done") {
								this.props.history.push("/requestSong")
							}
						})
						.catch(err => console.log(err));
					}
				})
			}else {
				alert("All boxes are required except Nickname");
			}
		}else {
			alert("Password retype must match password.");
		}
	};
 
	render() {
		return(
			<div style={ Style }>
				<Nav />
				<h1>Sign Up</h1>
				{/*<span>{this.state.username}</span>*/}
				<form onSubmit={this.handleSignUp}>
				{/*Username*/}
					<Input autoFocus
					placeholder="Username" 
					onChange={this.handleInputChange}
					name="username"
					type="text"
					required
					/>
				{/*first name*/}
					<Input 
					placeholder="First name" 
					onChange={this.handleInputChange}
					name="firstName"
					type="text"
					required
					/>
				{/*last name*/}
					<Input 
					placeholder="Last name"
					onChange={this.handleInputChange}
					name="lastName"
					type="text"
					required
					/>
				{/*nickname*/}
					<Input 
					placeholder="Nickname"
					onChange={this.handleInputChange}
					name="nickname"
					type="text"
					/>
				{/*password*/}
					<Input 
					placeholder="Password"
					onChange={this.handleInputChange}
					name="password"
					type="password"
					required
					/>
				{/*password match*/}
					<Input 
					placeholder="Retype password"
					onChange={this.handleInputChange}
					name="passwordMatch"
					type="password"
					required
					/>{/*
					<Select
					onChange={this.handleInputChange}
					name="location"
					defaultValue="Location"
					children={this.state.locations}
					required
					>						
					</Select>*/}
					<FormBtn type="submit">
						Sign Up
					</FormBtn>
				</form>
				<hr/>
			</div>
		);
	}
}

export default SignUp;