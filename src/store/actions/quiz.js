import axios from '../../axios/axios-quiz'

import {
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_ERROR,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from './actionTypes'

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart())
    try {
      await axios.get('/quizes.json')
        .then(response => {
          const quizes = []

          Object.keys(response.data)
            .forEach((key, index) => {
              quizes.push({
                id: key,
                name: `Тест № ${index + 1}`
              })
            })

          dispatch(fetchQuizesSuccess(quizes))
        })
    } catch (e) {
     dispatch(fetchQuizesError(e))
    }
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizStart())
    try {
      const response = await axios.get(`/quizes/${quizId}.json`)
      const quiz = response.data

      console.log('quiz: ', quiz)

      dispatch(fetchQuizSuccess(quiz))
    } catch (e) {
      dispatch(fetchQuizError(e))
    }
  }
}

export function fetchQuizStart() {
  return {
    type: FETCH_QUIZ_START,
    loading: true
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
    loading: false
  }
}

export function fetchQuizError(error) {
  return {
    type: FETCH_QUIZ_ERROR,
    error,
    loading: false
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(activeQuestion) {
  return {
    type: QUIZ_NEXT_QUESTION,
    activeQuestion: activeQuestion,
    answerState: null
  }
}

// Next function need to ReLearning
export function quizAnswerClick(answerId) {

  return (dispatch, getState) => {
    const state = getState().quiz

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if (state.answerState[key] === 'success') {
        return
      }
    }

    const question = state.quiz[state.activeQuestion]
    const results = state.results

    if (question.rightAnswerId === answerId) {
     if (!results[question.id]) {
       results[question.id] = 'success'
     }

     dispatch(quizSetState(
       {[answerId]: 'success'},
       results
     ))

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
          // For example:
          // this.setState({
          //   activeQuestion: this.state.activeQuestion + 1,
          //   answerState: null
          // })
        }

        window.clearTimeout(timeout)
      }, 300)

    } else {
      results[question.id] = 'error'

      dispatch(quizSetState(
        {[answerId]: 'error'},
        results
      ))
      // For example:
      // this.setState({
      //   answerState: {[answerId]: 'error'},
      //   results
      // })
    }
  }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
  }

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
    results: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false
  }
}