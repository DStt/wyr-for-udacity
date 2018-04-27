export function formatQuestion({optionOneText, optionTwoText, author}) {
	return {
		id: generateUID(),
		timestamp: Date.now(),
		author,
		optionOne: {
			votes: [],
			text: optionOneText,
		},
		optionTwo: {
			votes: [],
			text: optionTwoText,
		}
	}
}

export function formatUser(name) {
	const id = generateUID()
	return {
		id: id,
		name: name,
		avatarURL: 'https://api.adorable.io/avatars/' + id,
		answers: {},
		questions: []
	}
}

export function generateUID() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}