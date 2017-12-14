import crypto from 'crypto'

export const loginApi = (user, pass) => {
  var restDir = '/api/login/' + user
  return new Promise((resolve, reject) => {
    fetch(restDir, {method: 'GET'})
    .then((provisionMsg) => {
      var pubKeyStr = provisionMsg.pubKey
      console.log('Client got pubkey: ', pubKeyStr);
      var passwordEnc = crypto.publicEncrypt(pubKeyStr, pass)
      fetch(restDir, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({password: passwordEnc})
      })
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
