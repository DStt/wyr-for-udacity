import {RECEIVE_USERS, USER_ADD_QUESTION, USER_ADD_ANSWER, ADD_USER} from '../actions/users'

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS :
			return {
				...state,
				...action.users
			}
		case USER_ADD_QUESTION :
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					questions: state[action.authedUser].questions.concat(action.question)
				}
			}
		case USER_ADD_ANSWER :
			return {
				...state,
				[action.authedUser]: {
					...state[action.authedUser],
					answers: {
						...state[action.authedUser].answers,
						[action.id]: action.answer
					}
				}
			}
		case ADD_USER :
			return {
				...state,
				[action.user.id]: action.user
			}
		default :
			return state
	}
}