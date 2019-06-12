import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveUser,
	_saveQuestionAnswer,
} from './_DATA'

export function getInitialData() {
	return Promise.all([
		_getUsers(),
		_getQuestions(),
	]).then(([users, questions]) => ({
		users,
		questions,
	}))
}

export function getUsers() {
	return _getUsers()
}

export function getQuestions() {
	return _getQuestions()
}

export function saveQuestion(question) {
	return _saveQuestion(question)
}

export function saveUser(user) {
	return _saveUser(user)
}

export function saveQuestionAnswer(authedUser, id, answer) {
	return _saveQuestionAnswer(authedUser, id, answer)
}