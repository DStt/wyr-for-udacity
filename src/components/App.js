import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'

import {handleInitialData} from '../actions/shared'

import Nav from './Nav'
import Login from './Login'
import Dashboard from './Dashboard'
import NewQuestion from "./NewQuestion"
import Leaderboard from "./Leaderboard"
import Question from "./Question"

class App extends Component {

	componentDidMount() {
		const {dispatch, loading} = this.props
		if (loading === true) {
			dispatch(handleInitialData())

		}
	}

	render() {
		return (
			<BrowserRouter>
				<Fragment>
					{this.props.loading === true
						? <div>
							<LoadingBar/>
							Loading
						</div>
						:
						<Fragment>
							<Nav />
							<Switch>
								<Route exact path='/' component={Dashboard}/>
								<Route exact path='/login' component={Login}/>
								<Route exact path='/question/:question_id' component={Question}/>
								<Route exact path='/add' component={NewQuestion}/>
								<Route exact path='/leaderboard' component={Leaderboard}/>
							</Switch>
						</Fragment>
					}
				</Fragment>
			</BrowserRouter>
		)
	}
}

function mapStateToProps({authedUser}) {
	return {
		loading: authedUser === null,
		authedUser: authedUser
	}
}

export default connect(mapStateToProps)(App)