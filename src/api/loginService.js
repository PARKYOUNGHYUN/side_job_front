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
      const getUserInfoPromise = await getUserInfo(mail, password)
      const userInfoResponse = await Promise.all([getUserInfoPromise])
      if (userInfoResponse[0].data.length === 0) return 'noAuth'
      return userInfoResponse
    } catch (err) {
      console.error(err)
    }
  }
}
