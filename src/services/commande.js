import axios from 'axios'
const url = 'http://127.0.0.1:5000/getchain'

const create = (newObject) => {
  const request = axios.post(url, newObject)
  return request.then((response) => response.data)
}

export default { create }
