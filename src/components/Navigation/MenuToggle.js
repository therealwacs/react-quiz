import React from 'react'
import classes from './MenuToggle.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'

const MenuToggle = props => {
  let cls = [
    classes.MenuToggle,
  ]
  let icon

  if (props.isOpen) {
    icon = faTimes
    cls.push(classes.open)
  } else {
    icon = faBars
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      className={cls.join(' ')}
      size={'sm'}
      onClick={props.onToggle}
    />
  )
}

export default MenuToggle