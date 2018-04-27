import {getUsers, saveUser} from "../utils/api"

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ADD_QUESTION = 'USER_ADD_QUESTION'
export const USER_ADD_ANSWER = 'USER_ADD_ANSWER'
export const ADD_USER = 'ADD_USER'

function receiveUsers(users) {
	return {
		type: RECEIVE_USERS,
		users,
	}
}

export function handleReceiveUsers() {
	return (dispatch) => {
		return getUsers().then(
			user => dispatch(receiveUsers(user))
		)
	}
}

function userAddQuestion(authedUser, question) {
	return {
		type: USER_ADD_QUESTION,
		authedUser,
		question,
	}
}

export function handleUserAddQuestion(authedUser, question, cb) {
	return (dispatch) => {
		return dispatch(userAddQuestion(authedUser, question, cb()))
	}
}

function userAddAnswer(authedUser, id, answer) {
	return {
		type: USER_ADD_ANSWER,
		authedUser,
		id,
		answer
	}
}

export function handleUserAddAnswer(authedUser, id, answer, cb) {
	return (dispatch) => {
		return dispatch(userAddAnswer(authedUser, id, answer, cb()))
	}
}

function addUser(user) {
	return {
		type: ADD_USER,
		user
	}
}

export function handleAddUser(user, cb) {
	return (dispatch) => {

		saveUser(user).then(
			user => dispatch(addUser(user))
		).then(user => cb(user)).catch(err => {
			console.log(err)
			alert('An error occurred. Please try again later')
		})
	}
}
