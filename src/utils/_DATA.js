import {formatQuestion, formatUser} from './helpers'

let users = {
	sarahedo: {
		id: 'sarahedo',
		name: 'Sarah Edo',
		avatarURL: 'https://api.adorable.io/avatars/sarahedo',
		answers: {
			"8xf0y6ziyjabvozdd253nd": 'optionOne',
			"6ni6ok3ym7mf1p33lnez": 'optionOne',
			"am8ehyc8byjqgar0jgpub9": 'optionTwo',
			"loxhs1bqm25b708cmbf3g": 'optionTwo'
		},
		questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
	},
	tylermcginnis: {
		id: 'tylermcginnis',
		name: 'Tyler McGinnis',
		avatarURL: 'https://api.adorable.io/avatars/tylermcginnis',
		answers: {
			"vthrdm985a262al8qx3do": 'optionOne',
			"xj352vofupe1dqz9emx13r": 'optionTwo',
		},
		questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
	},
	johndoe: {
		id: 'johndoe',
		name: 'John Doe',
		avatarURL: 'https://api.adorable.io/avatars/johndoe',
		answers: {
			"xj352vofupe1dqz9emx13r": 'optionOne',
			"vthrdm985a262al8qx3do": 'optionTwo',
			"6ni6ok3ym7mf1p33lnez": 'optionOne'
		},
		questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
	}
}

let questions = {
	"8xf0y6ziyjabvozdd253nd": {
		id: '8xf0y6ziyjabvozdd253nd',
		author: 'sarahedo',
		timestamp: 1467166872634,
		optionOne: {
			votes: ['sarahedo'],
			text: 'have horrible short term memory',
		},
		optionTwo: {
			votes: [],
			text: 'have horrible long term memory'
		}
	},
	"6ni6ok3ym7mf1p33lnez": {
		id: '6ni6ok3ym7mf1p33lnez',
		author: 'johndoe',
		timestamp: 1468479767190,
		optionOne: {
			votes: [],
			text: 'become a superhero',
		},
		optionTwo: {
			votes: ['johndoe', 'sarahedo'],
			text: 'become a supervillian'
		}
	},
	"am8ehyc8byjqgar0jgpub9": {
		id: 'am8ehyc8byjqgar0jgpub9',
		author: 'sarahedo',
		timestamp: 1488579767190,
		optionOne: {
			votes: [],
			text: 'be telekinetic',
		},
		optionTwo: {
			votes: ['sarahedo'],
			text: 'be telepathic'
		}
	},
	"loxhs1bqm25b708cmbf3g": {
		id: 'loxhs1bqm25b708cmbf3g',
		author: 'tylermcginnis',
		timestamp: 1482579767190,
		optionOne: {
			votes: [],
			text: 'be a front-end developer',
		},
		optionTwo: {
			votes: ['sarahedo'],
			text: 'be a back-end developer'
		}
	},
	"vthrdm985a262al8qx3do": {
		id: 'vthrdm985a262al8qx3do',
		author: 'tylermcginnis',
		timestamp: 1489579767190,
		optionOne: {
			votes: ['tylermcginnis'],
			text: 'find $50 yourself',
		},
		optionTwo: {
			votes: ['johndoe'],
			text: 'have your best friend find $500'
		}
	},
	"xj352vofupe1dqz9emx13r": {
		id: 'xj352vofupe1dqz9emx13r',
		author: 'johndoe',
		timestamp: 1493579767190,
		optionOne: {
			votes: ['johndoe'],
			text: 'write JavaScript',
		},
		optionTwo: {
			votes: ['tylermcginnis'],
			text: 'write Swift'
		}
	},
}

export function _getUsers() {
	return new Promise((res, rej) => {
		let localStorageQuestions = JSON.parse(localStorage.getItem('users'))
		if (localStorageQuestions) {
			users = localStorageQuestions
		}
		setTimeout(() => res({...users}), 1000)
	})
}

export function _getQuestions() {
	return new Promise((res, rej) => {
		let localStorageQuestions = JSON.parse(localStorage.getItem('questions'))
		if (localStorageQuestions) {
			questions = localStorageQuestions
		}
		setTimeout(() => res({...questions}), 1000)
	})
}

export function _saveQuestion(question) {
	return new Promise((res, rej) => {
		const formattedQuestion = formatQuestion(question)

		setTimeout(() => {
			questions = {
				...questions,
				[formattedQuestion.id]: formattedQuestion
			}
			localStorage.setItem('questions', JSON.stringify(questions))

			res(formattedQuestion)
		}, 1000)
	})
}

export function _saveUser(user) {
	return new Promise((res, rej) => {
		const formattedUser = formatUser(user)

		setTimeout(() => {
			users = {
				...users,
				[formattedUser.id]: formattedUser
			}
			localStorage.setItem('users', JSON.stringify(users))

			res(formattedUser)
		}, 1000)
	})
}

export function _saveQuestionAnswer(authedUser, id, answer) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			users = {
				...users,
				[authedUser]: {
					...users[authedUser],
					answers: {
						...users[authedUser].answers,
						[id]: answer
					}
				}
			}

			questions = {
				...questions,
				[id]: {
					...questions[id],
					[answer]: {
						...questions[id][answer],
						votes: questions[id][answer].votes.concat([authedUser])
					}
				}
			}
			localStorage.setItem('questions', JSON.stringify(questions))
			localStorage.setItem('users', JSON.stringify(users))

			res()
		}, 500)
	})
}