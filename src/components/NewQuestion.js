import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {handleAddQuestion} from '../actions/questions'
import {handleUserAddQuestion} from '../actions/users'
import {showLoading,hideLoading} from "react-redux-loading"

class NewQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: ''
	}

	handleChange = (e, option) => {
		const text = e.target.value

		this.setState(() => ({
			['option' + option + 'Text']: text
		}))
	}

	saveQuestion = () => {
		const {optionOneText, optionTwoText} = this.state
		const {dispatch, authedUser, history} = this.props

		dispatch(showLoading())
		dispatch(handleAddQuestion(optionOneText, optionTwoText, (question) => {
			dispatch(handleUserAddQuestion(authedUser, question.id, () => {
				history.push('/question/' + question.id)
				dispatch(hideLoading())
			}))
		}))
	}

	render() {
		const {optionOneText, optionTwoText} = this.state
		const {authedUser} = this.props

		if (!authedUser) {
			return (
				<div className='container text-center'>
					<br/>
					<div className='row'>
						<div className='col-12'>
							<h3 className='col-12'>You need to be logged to compose a new question</h3>

							<Link className='btn btn-primary' to='/login'>
								LOGIN
							</Link>
						</div>
					</div>
				</div>
			)
		}

		return (
			<div className='container text-center'>
				<br/>
				<div className='row'>
					<h3 className='col-12'>Compose new Question</h3>
					<div className='col-6'>
						<div className="form-group">
							<textarea
								className="form-control"
								placeholder="Option One"
								value={optionOneText}
								onChange={(e) => this.handleChange(e, 'One')}
							/>
						</div>
					</div>
					<div className='col-6 text-center'>
						<div className="form-group">
							<textarea
								className="form-control"
								placeholder="Option Two"
								value={optionTwoText}
								onChange={(e) => this.handleChange(e, 'Two')}
							/>
						</div>
					</div>
					<div className='col-12'>
						<button
							onClick={this.saveQuestion}
							className='btn btn-primary'
							disabled={optionOneText === '' || optionTwoText === ''}>
							SAVE
						</button>
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps({authedUser}) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(NewQuestion)