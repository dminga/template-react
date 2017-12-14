import crypto from 'crypto'

var keyPair = null;

export function loginGet(req, res) {
  var user = req.params.userName

  console.log('User [', user, '] request access');

  /* Server generates keypair and send Public to client */
  keyPair = crypto.createDiffieHellman(1024)
  keyPair.generateKeys()
  console.log('PRIVATE: ', keyPair.getPrivateKey('base64'))
  console.log('PUBLIC: ', keyPair.getPublicKey('base64'))

  res.json({
    user: user,
    pubKey: keyPair.getPublicKey('base64')
  })
}

export function loginPost(req, res) {
  console.log('backend got POST');
  var user = req.params.userName
  var passwordEnc
  if (req.body.password !== 'undefined') {
     passwordEnc = req.body.password
  } else {
    return res.json({
      error: "No password provided"
    })
  }
  if (keyPair === null) {
    return res.json({
      error: "No public key requested"
    })
  }

  console.log('User [', user, '] posts encrypted password');
  var passwordDec = keyPair.privateDecrypt(keyPair.getPrivateKey('base64'), passwordEnc)
  console.log('User password is ', passwordDec);

  res.json({
    msg: 'lol'
  })

  /* Client encrypt password by public key and send back */
  // var password = 'SomethingUndone'
  // var pubKey = ursa.createPublicKey(keyPair.toPublicPem('utf8'), 'utf8')
  // var encrypted = pubKey.encrypt(password, 'utf8', 'base64')
  // console.log('ENCRYPTED: ', encrypted)
}
