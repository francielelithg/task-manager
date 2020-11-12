import axios from 'axios'

const url = `${process.env.URL_API}/task`

export default {

  createTask(data) {
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

  updateTask(data) {
    return new Promise((resolve, reject) => {
      axios.put(`${url}/${data.id}`, data)
        .then(result => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  deleteTask(id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${url}/${id}`)
        .then(result => {
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

}