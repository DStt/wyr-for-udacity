import React, {Component, Fragment} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import LoadingBar from 'react-redux-loading'
import {handleSetAuthedUser} from "../actions/authedUser"

class Nav extends Component {

	logout = () => {
		const {dispatch} = this.props
		localStorage.setItem('AuthedUser', '')
		dispatch(handleSetAuthedUser(''))
	}

	render() {
		const {authedUser, users} = this.props

		return (
			<Fragment>
				<nav className='navbar navbar-expand-md navbar-dark bg-dark'>
					<div className='container'>
						<NavLink className='navbar-brand' to='/' exact>
							Home
						</NavLink>
						<ul className="navbar-nav mr-auto">
							<li className='nav-item'>
								<NavLink className='nav-link' to='/add' activeClassName='active'>
									New Question
								</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink className='nav-link' to='/leaderboard' activeClassName='active'>
									Leaderboard
								</NavLink>
							</li>
						</ul>
						<div className="pull-right">
							<h3 className="nav-username">{users[authedUser] ? users[authedUser].name : ''}</h3>
							{authedUser ?
								<button className="btn btn-outline-success" onClick={this.logout}>
									LOGOUT
								</button>
								:
								<NavLink to='/login' className="btn btn-outline-success">
									LOGIN
								</NavLink>
							}
						</div>
					</div>
				</nav>
				<LoadingBar/>
			</Fragment>
		)
	}
}

function mapStateToProps({authedUser, users}) {
	return {
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Nav)