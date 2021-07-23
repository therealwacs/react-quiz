import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'

class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  // loginHandler = async () => {
  //   const authData = {
  //     email: this.state.formControls.email.value,
  //     password: this.state.formControls.email.value,
  //     returnSecureToken: true
  //   }
  //   try {
  //     const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAeL0nz4PNvmJtVfMM8lMR_zSvu4xP6XI`, authData)
  //
  //     console.log(response.data)
  //   } catch(e) {
  //     console.log(e)
  //   }
  // }


  registerHandler = async (event) => {
    event.preventDefault()

    const payload = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAeL0nz4PNvmJtVfMM8lMR_zSvu4xP6XI', payload)
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  loginHandler = async (event) => {
    event.preventDefault()

    const payload = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }

    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAeL0nz4PNvmJtVfMM8lMR_zSvu4xP6XI', payload)
      console.log(response.data)

    } catch (e) {
      console.log(e)
    }
  }




  submitHandler = event => {
    event.preventDefault()
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    if (validation.minLength) {
        isValid = value.trim().length >= validation.minLength && isValid
    }

    console.log('validating ... ')
    return isValid
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true
    control.valid = this.validateControl(control.value, control.validation)

    formControls[controlName] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({formControls, isFormValid})
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <Input
          key={controlName + index}
          label={control.label}
          type={control.type}
          errorMessage={control.errorMessage}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
          onChange={event => this.onChangeHandler(event, controlName)}
        />
        )
    })
  }


  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            {this.renderInputs()}

            <Button
              type={'success'}
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >Войти</Button>

            <Button
              type={'primary'}
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth