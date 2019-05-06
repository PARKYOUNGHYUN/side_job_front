import * as types from './mutation_types'

export default {
  [types.MAIL] (state, mail) {
    state.mail = mail
  },
  [types.ERROR_STATE] (state, errorState) {
    state.errorState = errorState
  },
  [types.IS_AUTH] (state, isAuth) {
    state.isAuth = isAuth
  }
}