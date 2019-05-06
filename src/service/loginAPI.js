const getUserInfo = (mail, password) => {
    return this.$http.get('/user', {
      params: {
        'mail': mail,
        'password': password
      }
    })
  }

  const isFinished = mail => {
  return this.$http.get('user', {
    params: {
      'mail': mail
    }
  })
}

export default {
  login (mail, password) {
    try {
      const getUserInfoPromise = getUserInfo(mail, password)
      const isFinishedPromise = isFinished(mail) // Promise.all의 예시를 위해 집어넣음
      const [userInfoResponse, isFinishedResponse] = Promise.all([getUserInfoPromise, isFinishedPromise])
      if (userInfoResponse.data.length === 0) return 'noAuth' // 로그인 결과에 따른 분기 처리를 해준다
      if (isFinishedResponse.data[0].CNT > 0) return 'done'
      return userInfoResponse
    } catch (err) {
      console.error(err)
    }
  }
}