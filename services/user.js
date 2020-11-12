import axios from 'axios'

const url = `${process.env.NEXT_PUBLIC_URL_API}/user`

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

  getUserById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`)
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

  updateUser(data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/${data.id}`, data)
        .then(result => {
          resolve()
        })
        .catch(error => {
          console.log(error)
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
