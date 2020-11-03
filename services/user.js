import axios from 'axios'

export default {
  getAllUsers(data) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8080/user')
        .then(result => {
          resolve(result.data)
        })
        .catch(error => {
          reject()
        })
    })
  }
}