import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const ANSWERED = 'ANSWERED'
const NOT_ANSWERED = 'NOT_ANSWERED'

class Dashboard extends Component {

	state = {
		questions: [],
		view: null
	}

	componentDidMount() {
		this.setView(NOT_ANSWERED)
	}

	setView(view) {
		this.setState({
			view: view
		})
	}

	render() {
		const {view} = this.state
		const {questions, users, authedUser} = this.props

		return (
			<div className='container'>
				<br/>
				<div className='row'>
					<div className='col-12 text-center'>
						<div className='btn-group btn-group-lg'>
							<button className={(this.state.view === ANSWERED && 'bg-success') + ' btn btn-info'}
							        onClick={() => this.setView(ANSWERED)}>
								ANSWERED
							</button>
							<button className={(this.state.view === NOT_ANSWERED && 'bg-success') + ' btn btn-info'}
							        onClick={() => this.setView(NOT_ANSWERED)}>
								NOT ANSWERED
							</button>
						</div>
					</div>
				</div>
				<br/>
				<div className='row'>
					{Object.keys(questions).filter(id => (
							(
								(users[authedUser] && view === ANSWERED && users[authedUser].answers[id]) ||
								(
									(!users[authedUser] && view === NOT_ANSWERED) ||
									(view === NOT_ANSWERED && !users[authedUser].answers[id]))
							)
						)
					).sort((a, b) => questions[b].timestamp - questions[a].timestamp).map(id => (
							<div className='col-12' key={id}>
								<div className='card'>
									<div className="card-header">
										Would You Rather..
									</div>
									<ul className="list-group list-group-flush">
										<li className="list-group-item">{questions[id].optionOne.text}</li>
										<li className="list-group-item">{questions[id].optionTwo.text}</li>
									</ul>

									<div className="card-footer text-center">
										<Link className='btn btn-primary' to={'/question/' + id}>
											<i className='fa fa-fw fa-question'/>
										</Link>
									</div>
								</div>
								<br/>
							</div>
						)
					)}
				</div>
			</div>
		)
	}
}

function mapStateToProps({questions, authedUser, users}) {
	return {
		questions,
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Dashboard)