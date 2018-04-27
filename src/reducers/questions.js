import {RECEIVE_QUESTIONS, ADD_QUESTION, VOTE_QUESTION_ANSWER} from '../actions/questions'

export default function questions(state = {}, action) {
	switch (action.type) {
		case RECEIVE_QUESTIONS :
			return {
				...state,
				...action.questions
			}
		case ADD_QUESTION:
			const question = action.question
			return {
				...state,
				[question.id]: question,
			}
		case VOTE_QUESTION_ANSWER:
			const {authedUser, id, answer} = action

			return {
				...state,
				[id]: {
					...state[id],
					[answer]: {
						...state[id][answer],
						votes: state[id][answer].votes.concat(authedUser)
					}
				},
			}
		default :
			return state
	}
}