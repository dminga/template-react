import ursa from 'ursa'

export const loginApi = (user, pass) => {
  var restDir = '/api/login/' + user
  return new Promise((resolve, reject) => {
    fetch(restDir, {method: 'GET'})
    .then((provisionMsg) => {
      var pubKeyStr = provisionMsg.pubKey
      var pubKey = ursa.createPublicKey(pubKeyStr)
      var passwordEnc = ursa.encryptMsg(pubkey, password, 'format')
      fetch(restDir, {method: 'POST', password: passwordEnc})
      .then((doneMsg) => {
        resolve({
          user: doneMsg.user,
          sessionId: doneMsg.sessionId,
          token: doneMsg.token
        })
      })
      .catch((error) => {
        reject(error)
      })
    })
    .catch((error) => {
      reject(error)
    })
  })
}
