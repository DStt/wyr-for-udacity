import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleVoteQuestionAnswer} from '../actions/questions'
import {handleUserAddAnswer} from '../actions/users'

const optionOne = 'optionOne'
const optionTwo = 'optionTwo'

class Question extends Component {

	vote = (id, answer) => {
		const {dispatch, authedUser, history} = this.props
		if (authedUser) {
			dispatch(handleVoteQuestionAnswer(id, answer, () => {
				dispatch(handleUserAddAnswer(authedUser, id, answer, () => {
				}))
			}))
		} else {
			history.push('/login')
		}
	}

	render() {
		const {question, users, authedUser} = this.props
		let totalVotes = null
		let answers = null
		let voted = null

		if (question) {
			totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length

			answers = {
				optionOne: {
					voted: question.optionOne.votes.indexOf(authedUser) > -1,
					totals: question.optionOne.votes.length,
					percentage: (question.optionOne.votes.length / totalVotes * 100).toFixed(0)
				},
				optionTwo: {
					voted: question.optionTwo.votes.indexOf(authedUser) > -1,
					totals: question.optionTwo.votes.length,
					percentage: (question.optionTwo.votes.length / totalVotes * 100).toFixed(0)
				}
			}

			voted = answers.optionOne.voted || answers.optionTwo.voted
			return (
				<div className='container'>
					<br/>
					<div className='row'>
						<div className='col-2 text-center'>
							<img className='col-12' alt='avatar' src={users[question.author].avatarURL}/>
							by <strong>{users[question.author].name}</strong>
						</div>

						<div className='col-10'>
							<div className='row'>
								<div className='col-12'>
									<h3 className='text-center'>Would You Rather...</h3>
								</div>
								<div className='col-6 text-center'>
									<h3 className='text-center'>
										{question.optionOne.text}
									</h3>
									{voted ?
										<p>
											{answers.optionOne.voted &&
											<i className='fa fa-fw fa-thumbs-up text-success'/>}
											Votes: {answers.optionOne.totals} ({answers.optionOne.percentage}%)
										</p>
										:
										<button className='btn btn-primary'
										        onClick={(e) => this.vote(question.id, optionOne)}>
											<i className='fa fa-fw fa-thumbs-up'/>
										</button>
									}
								</div>
								<div className='col-6 text-center'>
									<h3 className='text-center'>
										{answers.optionTwo.voted && <i className='fa fa-fw fa-thumbs-up text-success'/>}
										{question.optionTwo.text}
									</h3>
									{voted ?
										<span>
											Votes: {answers.optionTwo.totals} ({answers.optionTwo.percentage}%)
										</span>
										:
										<button className='btn btn-primary'
										        onClick={(e) => this.vote(question.id, optionTwo)}>
											<i className='fa fa-fw fa-thumbs-up'/>
										</button>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		} else {
			return <h3>404</h3>
		}
	}
}

function mapStateToProps({questions, users, authedUser}, props) {
	const {question_id} = props.match.params

	return {
		question: questions[question_id],
		users,
		authedUser
	}
}

export default connect(mapStateToProps)(Question)