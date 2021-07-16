import React from 'react'
import AnswerList from './AnswerItem/AnswerItem'
import classes from './AnswersList.module.css'

const AnswersList = props => (
  <ul className={classes.AnswerList}>
    { props.answers.map((answer, index) => {
      return (
        <AnswerList
          key={index}
          answer={answer}
          onAnswerClick={props.onAnswerClick}
          state={props.state ? props.state[answer.id] : null}
        />
      )
    }) }
  </ul>
)

export default AnswersList
