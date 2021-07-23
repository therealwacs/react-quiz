import axios from 'axios'

export default axios.create({
  baseURL: 'https://wax-react-quiz-default-rtdb.europe-west1.firebasedatabase.app'
})
