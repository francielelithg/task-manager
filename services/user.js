import axios from 'axios'

const url = 'http://localhost:8080/user'

export default {
  getAllUsers() {
    return new Promise((resolve, reject) => {
      axios.get(url)
        .then(result => {
          resolve(result.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  createUser(data) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(result => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`)
        .then(result => {
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }
}
