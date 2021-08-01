import {
  FETCH_QUIZ_START,
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZ_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from '../actions/actionTypes'

const initialState = {
    quizes: [],
    loading: false,
    error: null,

    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    // Quiz-List
    case FETCH_QUIZES_START:
      return {
        ...state, // возвращаем клонированный State (не забываем!)
        loading: true
      }
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.quizes
      }
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }

    // Quiz
    case FETCH_QUIZ_START:
      return {
        ...state,
        loading: action.loading
      }
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: action.loading,
        quiz: action.quiz
      }
    case FETCH_QUIZ_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      }
    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      }
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: action.answerState
      }
    case QUIZ_RETRY:
      return {
        ...state,
        type: action.type,
        results: action.results,
        activeQuestion: action.activeQuestion,
        answerState: action.answerState,
        isFinished: action.isFinished
      }

    default:
      return state
  }
}



