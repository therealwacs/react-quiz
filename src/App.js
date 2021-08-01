import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Logout from './components/Logout/Logout'
import {connect} from 'react-redux'
import {autoLogin} from './store/actions/auth'


class App extends Component {
  constructor(props) {
    super(props)
    this.routes = (
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
    )
  }

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    if (this.props.isAuthenticated) {
      this.routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <Layout>
        { this.routes }
      </Layout>
    )
  }
}



function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
