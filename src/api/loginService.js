import axios from 'axios'

const getUserInfo = (mail, password) => {
  return axios.get('http://localhost:8080/api/user', {
    params: {
      'mail': mail,
      'password': password
    }
  })
}

export default {
  async login (mail, password) {
    try {
      const userInfo = await getUserInfo(mail, password)
      if (userInfo.data == null) return 'noAuth'
      return userInfo.data
    } catch (err) {
      console.error(err)
    }
  }
}
