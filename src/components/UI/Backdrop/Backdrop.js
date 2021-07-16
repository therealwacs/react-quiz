import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = props => <div className={classes.Backdrop} onClick={props.onClick} />

// const Backdrop = props => {
//
//   return (
//     <div className={classes.Backdrop}>
//       This is the Backdrop
//     </div>
//   )
// }

export default Backdrop
