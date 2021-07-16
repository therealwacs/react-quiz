import React, {Component, Fragment} from 'react'
import classes from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
  1, 2, 3
]

class Drawer extends Component {
  renderLinks(links) {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <a href={link}>
            Link {link}
          </a>
        </li>
      )
    })
  }

  backdropClickHandler() {
    alert('Backdrop clicked')
  }

  render() {
    const cls = [
      classes.Drawer
    ]

    if (!this.props.isOpen) {
      cls.push(classes.close)
    }

    return (
      <>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
      </>
    )
  }
}
export default Drawer
