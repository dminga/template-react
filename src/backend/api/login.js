import crypto from 'crypto'

let server = {
  dh: null,
  prime: null,
}
let local = {
  dh: null,
  pubKey: null,
  secret: null,
  decipher: null
}

export const loginPrepare = (size) => {
  server.dh = crypto.createDiffieHellman(size)
  server.prime = server.dh.getPrime()
  console.log('Server prime: ', server.prime);

  local.dh = crypto.createDiffieHellman(server.prime)
  local.dh.generateKeys()
  local.pubKey = local.dh.getPublicKey()

  console.log('Local crypto prepared with public key: ', local.pubKey);
}

export const loginGet = (req, res) => {
  var user = req.params.userName

  console.log('User [', user, '] request access');

  /* Send prime & public to client */
  res.json({
    user: user,
    prime: server.prime,
    pubKey: local.pubKey
  })
}

export const loginPost = (req, res) => {
  console.log('backend got POST');
  /* Check input fields */
  //do here
  // local.secret = local.dh.computeSecret(pubKeyFromReq)
  // local.decipher = crypto.createDecipher('aes192', local.secret)
  // var passDec = local.decipher.update(passFromReq, 'utf8', 'base64') + local.decipher.final('base64')
  /* Check password */
  /* Reply */
  res.json({
    msg: 'lol'
  })
}
