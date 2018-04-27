import React, {Component} from 'react'
import {connect} from 'react-redux'

class Leaderboard extends Component {

	render() {
		const {users} = this.props
		let sortedUsers = Object.keys(users).map(id => {
			let answersLength = Object.keys(users[id].answers).length

			let user = {
				id,
				name: users[id].name,
				avatarURL: users[id].avatarURL,
				questions: users[id].questions.length,
				answer: answersLength,
				total: users[id].questions.length + answersLength
			}
			return user
		}).sort((a, b) => b.total - a.total)

		return (
			<div className='container'>
				<br/>
				<div className='row'>
					<div className='col-12'>
						<ul className="list-group list-group-flush">
							{sortedUsers.map(user => (
								<li className="list-group-item d-flex justify-content-between align-items-center" key={user.id}>
									<img className='col-4 img-responsive' alt='avatar' src={user.avatarURL}/>
									<h3>{user.name}</h3>
									<span className="badge badge-primary">
										TOTAL {user.total}<br/>
										<small>Ask {user.questions}<br/>
										Answer {user.answer}</small>
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps({users}) {
	return {
		users
	}
}

export default connect(mapStateToProps)(Leaderboard)