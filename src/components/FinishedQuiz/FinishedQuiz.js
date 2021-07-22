import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck, faSync } from '@fortawesome/free-solid-svg-icons'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'
// import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)

  const defaultClickHandler = () => {
    alert('It is an example: How to do Handler in a functionality component')
  }

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const icon = props.results[quizItem.id] === 'error' ? faTimes : faCheck
          const iconClass = props.results[quizItem.id] === 'error' ? classes.error : classes.success

          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <FontAwesomeIcon icon={icon} size={'xs'} className={iconClass}  />
            </li>
          )
        }) }
      </ul>

      <p>Правильно {successCount} из {props.quiz.length}</p>

      <div>
        <Button
          onClick={props.onRetry}
          type={'primary'}
        >
          Повторить
          <FontAwesomeIcon icon={faSync} size={'xs'} />
        </Button>

        <Link to={'/'}>
          <Button type={'success'}>
            Перейти в список тестов
          </Button>
        </Link>

          <button onClick={defaultClickHandler}>
            Default button
          </button>
      </div>
    </div>
  )
}

export default FinishedQuiz
