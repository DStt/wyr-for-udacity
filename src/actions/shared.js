import {getInitialData} from '../utils/api'
import {handleSetAuthedUser} from '../actions/authedUser'
import {handleReceiveUsers} from '../actions/users'
import {handleReceiveQuestions} from '../actions/questions'
import {showLoading, hideLoading} from 'react-redux-loading'

export function handleInitialData() {
	return (dispatch) => {
		dispatch(showLoading())
		return getInitialData()
			.then(({users, questions}) => {
				dispatch(handleReceiveUsers(users))
				dispatch(handleReceiveQuestions(questions))
				dispatch(handleSetAuthedUser(localStorage.getItem('AuthedUser') || ''))
				dispatch(hideLoading())
			})
	}
}