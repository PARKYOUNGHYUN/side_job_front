import * as types from './mutation_types'

export default {
  [types.USER_NO] (state, userNo) {
    state.userNo = userNo
  },
  [types.ERROR_STATE] (state, errorState) {
    state.errorState = errorState
  },
  [types.IS_AUTH] (state, isAuth) {
    state.isAuth = isAuth
  }
}