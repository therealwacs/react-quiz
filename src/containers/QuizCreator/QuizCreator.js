import React, {Component, Fragment} from 'react'
import classes from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, validate, validateForm} from '../../form/formFramework'
import Select from '../../components/UI/Select/Select'
import axios from 'axios'

function createOptionControl(number) {
  return createControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number
      }, {required: true})
}

function createFormControls() {
  return {
      question: createControl({
        label: 'Введите вопрос',
        errorMessage: 'Вопрос не может быть пустым'
      }, {required: true}),
      option1: createOptionControl(1),
      option2: createOptionControl(2),
      option3: createOptionControl(3),
      option4:createOptionControl(4)
    }
}



class QuizCreator extends Component {
  state = {
    isFormValid: false,
    quiz: [],
    rightAnswerId: 1,
    formControls: createFormControls()
  }

  onSubmitHandler = event => {
    event.preventDefault()
  }

  addQuestionHandler = event => {
    event.preventDefault()

    const {question, option1, option2, option3, option4} = this.state.formControls

    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1
    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    })
  }

  createQuizHandler = async event => {
    event.preventDefault()
    try {
      await axios.post('https://wax-react-quiz-default-rtdb.europe-west1.firebasedatabase.app/quizes.json', this.state.quiz)

      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
      })

    } catch (e) {
      console.log(e)
    }
  }

  inputChangeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = {...formControls[controlName]}

    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control


    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  }

  renderControls = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
        const control = this.state.formControls[controlName]

        return (
          <Fragment key={controlName + index}>
            <Input
              label={control.label}
              value={control.value}
              valid={control.valid}
              shouldValidate={!!control.validation}
              touched={control.touched}
              errorMessage={control.errorMessage}
              onChange={event => this.inputChangeHandler(event.target.value, controlName)}
            />
            {index === 0 ? <hr /> : null}
          </ Fragment>
        )
      })
  }

  render() {
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {
          text: 1,
          value: 1
        },
        {
          text: 2,
          value: 2
        },
        {
          text: 3,
          value: 3
        },
        {
          text: 4,
          value: 4
        }
      ]}
    />

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Созданние тестов</h1>

          <form onSubmit={this.onSubmitHandler}>

            {this.renderControls()}

            <h1 style={{
              color: 'black'
            }}>
              {this.state.isFormValid ? 'Валидна' : 'Невалидна' }
            </h1>

            {select}
            
            <Button
              onClick={this.addQuestionHandler}
              type="primary"
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              onClick={this.createQuizHandler}
              type="success"
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

export default QuizCreator