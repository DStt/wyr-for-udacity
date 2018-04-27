import {getQuestions, saveQuestion, saveQuestionAnswer} from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const VOTE_QUESTION_ANSWER = 'VOTE_QUESTION_ANSWER'

function receiveQuestions(questions) {
	return {
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

export function handleReceiveQuestions() {
	return (dispatch) => {
		return getQuestions().then(
			questions => dispatch(receiveQuestions(questions))
		)
	}
}

function addQuestion(question) {
	return {
		type: ADD_QUESTION,
		question,
	}
}

export function handleAddQuestion(optionOneText, optionTwoText, cb) {
	return (dispatch, getState) => {
		const {authedUser} = getState()

		return saveQuestion({
			author: authedUser,
			optionOneText,
			optionTwoText
		}).then(
			(question) => dispatch(addQuestion(question))
		).then(result => cb(result.question)
		).catch(err => {
			console.log(err)
			alert('An error occurred. Please try again later')
		})
	}
}

function voteQuestionAnswer(authedUser, id, answer) {
	return {
		type: VOTE_QUESTION_ANSWER,
		authedUser,
		id,
		answer
	}
}

export function handleVoteQuestionAnswer(id, answer, cb) {
	return (dispatch, getState) => {
		const {authedUser} = getState()
		dispatch(voteQuestionAnswer(authedUser, id, answer))

		return saveQuestionAnswer(
			authedUser,
			id,
			answer
		).then(result => cb(result)
		).catch(err => {
			console.log(err)
			alert('An error occurred. Please try again later')
		})
	}
}