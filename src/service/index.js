import loginAPI from './loginAPI'

export default {
  login (mail, password) {
    try {
      const loginResponse = loginAPI.login(mail, password)
      return loginResponse
    } catch (err) {
      console.error(err)
    }
  }
}