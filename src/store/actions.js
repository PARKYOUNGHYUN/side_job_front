import { USER_NO, IS_AUTH, ERROR_STATE } from './mutation_types'
import api from '@/api'

let setUserNo = ({ commit }, data) => {
  commit(USER_NO, data)
}

let setErrorState = ({ commit }, data) => {
  commit(ERROR_STATE, data)
}

let setIsAuth = ({ commit }, data) => {
  commit(IS_AUTH, data)
}

let processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'ログインできません。')
      setIsAuth(store, false)
      break
    default:
      setUserNo(store, loginResponse.userNo)
      setErrorState(store, '')
      setIsAuth(store, true)
  }
}

export default {
  async login (store, { mail, password }) {
    let loginResponse = await api.login(mail, password)
    processResponse(store, loginResponse)
    return store.getters.getIsAuth
  },
  logout (store) {
    setIsAuth(store, false)
    setUserNo(store, '')
  }
}
