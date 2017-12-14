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
  /* Check input fields */
  if ((req.body.user === undefined) ||
      (req.body.password === undefined) ||
      (req.body.pubKey.data === undefined)) {
        res.json({error: "Bad data"})
      }
  var user = req.body.user
  var passEnc = req.body.password
  var pubKey = new Buffer(req.body.pubKey.data)

  console.log('User [', user, '] posts password', passEnc);

  /* Decrypt password */
  local.secret = local.dh.computeSecret(pubKey)
  local.decipher = crypto.createDecipher('aes192', local.secret)
  var passDec = local.decipher.update(passEnc, 'base64', 'utf8') + local.decipher.final('utf8')

  /* Check password */
  console.log('User pass: ', passDec);

  /* Reply */
  res.json({
    msg: 'access granted'
    //TODO: add temp token
  })
}
