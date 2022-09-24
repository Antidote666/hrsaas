import axios from 'axios'

const service = axios.create({
  baseURL: '/dev',
  itmeout: 5000
})

export default service

