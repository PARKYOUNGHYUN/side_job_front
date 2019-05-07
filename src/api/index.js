import loginService from './loginService'

export default {
  async login (mail, password) {
    try {
      const loginResponse = await loginService.login(mail, password)
      return loginResponse
    } catch (err) {
      console.error(err)
    }
  }
}