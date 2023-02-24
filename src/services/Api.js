import axios from 'axios'
import server from  '../services/server.config'

export default () => {
 return axios.create({
    baseURL: server.URL,
    // timeout:15000
  })
}
