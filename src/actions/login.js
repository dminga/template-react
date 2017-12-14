import crypto from 'crypto'

export const loginApi = (user, pass) => {
  var restDir = '/api/login/' + user
  var server = {
    prime: null,
    pubKey: null
  }
  var local = {
    user: '',
    dh: null,
    pubKey: null,
    secret: null,
    cipher: null
  }
  return new Promise((resolve, reject) => {
    fetch(restDir, {method: 'GET'})
    .then((resGet) => resGet.json())
    .then((provisionMsg) => {
      server.prime = new Buffer(provisionMsg.prime.data)
      server.pubKey = new Buffer(provisionMsg.pubKey.data)
      local.user = provisionMsg.user
      local.dh = crypto.createDiffieHellman(server.prime)
      local.dh.generateKeys()
      local.pubKey = local.dh.getPublicKey()
      local.secret = local.dh.computeSecret(server.pubKey)
      local.cipher = crypto.createCipher('aes192', local.secret)
      var passEnc = local.cipher.update(pass, 'utf8', 'base64') + local.cipher.final('base64')
      fetch(restDir, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: local.user,
          password: passEnc,
          pubKey: local.pubKey
        })
      })
      .then((resPost) => resPost.json())
      .then((doneMsg) => {
          /* Parse doneMsg */
          resolve({
          done: true,
          server: server,
          local: local
        })
      })
    })
    .catch((error) => {
      console.log('Error on login');
      reject(error)
    })
  })
}
