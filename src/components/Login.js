import React, {Component} from 'react'
import {connect} from 'react-redux'
import {showLoading, hideLoading} from 'react-redux-loading'
import {handleSetAuthedUser} from "../actions/authedUser"
import {handleAddUser} from "../actions/users"

class Login extends Component {

	state = {
		newUser: ''
	}

	login = (e) => {
		const {dispatch} = this.props
		let AuthedUser = e.target.value
		localStorage.setItem('AuthedUser', AuthedUser)
		dispatch(handleSetAuthedUser(AuthedUser))
		this.props.history.push('/')
	}

	addUser = () => {
		const {dispatch, history} = this.props
		dispatch(showLoading())
		dispatch(handleAddUser(this.state.newUser, result => {
			dispatch(handleSetAuthedUser(result.user.id, () => {
				dispatch(hideLoading())
				history.push('/')
			}))
		}))
	}

	handleChange = (e) => {
		this.setState({
			newUser: e.target.value
		})
	}

	render() {
		const {authedUser, users} = this.props

		return (
			<div className='container text-center'>
				<br/>
				<div className='row'>
					<div className='col-12'>
						<div className="form-group">
							<label>Select a user to login</label>
							<select className="form-control" value={authedUser} onChange={this.login}>
								{Object.keys(users).map(id => (
									<option key={id} value={id}>{users[id].name}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label>Or create a new one</label>
							<input className="form-control" onChange={this.handleChange} value={this.state.newUser}/>
						</div>
						<button className='btn btn-primary' onClick={this.addUser}>Add new user</button>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({authedUser, users}) {
	return {
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Login)