import express from 'express'
import ursa from 'ursa'

var loginRouter = express.Router();
var keyPair = null;

loginRouter.get((req, res) => {
  var user = req.params.userName

  console.log('User [', user, '] request access');

  /* Server generates keypair and send Public to client */
  keyPair = ursa.generatePrivateKey()
  console.log('PRIVATE: ', keyPair.toPrivatePem('utf8'))
  console.log('PUBLIC: ', keyPair.toPublicPem('utf8'))

  res.json({
    user: user,
    pubKey: keyPair.toPublicPem('utf8')
  })
})

loginRouter.post((req, res) => {
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
  var passwordDec = keyPair.decrypt(passwordEnc, 'base64', 'utf8')
  console.log('User password is ', passwordDec);

  res.json({
    msg: 'lol'
  })

  /* Client encrypt password by public key and send back */
  // var password = 'SomethingUndone'
  // var pubKey = ursa.createPublicKey(keyPair.toPublicPem('utf8'), 'utf8')
  // var encrypted = pubKey.encrypt(password, 'utf8', 'base64')
  // console.log('ENCRYPTED: ', encrypted)
})

export default loginRouter
