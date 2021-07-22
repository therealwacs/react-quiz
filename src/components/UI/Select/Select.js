import React from 'react'
import classes from './Select.module.css'

const Select = props => {
  const htmlFor = Math.random()

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>Выберите правильный ответ</label>
      <select
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.map((option, index) => {
          return (
            <option
              key={option.value + index}
              value={option.value}>
              {option.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select