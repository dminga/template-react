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
        if (doneMsg.error !== undefined) {
          console.log("server send error: ", doneMsg)
          reject({error: 'Server rejected'})
        }
        /* Parse doneMsg */
        resolve({
          server: server,
          local: local
        })
      })
    })
    .catch((error) => {
      console.log('Error on login')
      reject({error: error})
    })
  })
}

export const logoutApi = (local) => {
  var restDir = '/api/logout/' + local.user
  return new Promise((resolve, reject) => {
    var userEnc = local.cipher.update(local.user, 'utf8', 'base64') + local.cipher.final('base64')
    fetch(restDir, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        data: userEnc
      })
    })
    .then((resPost) => resPost.json())
    .then((result)=>{
      if (result.error === undefined)
      console.log('Logout successfully');
    })
    .catch((error)=>{
      console.log('Logout error: ', error);
    })
  })
}
