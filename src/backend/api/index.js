import express from 'express'
import { loginPrepare, loginGet, loginPost } from './login'

var apiRouter = express.Router()
loginPrepare(1024)
apiRouter.get('/login/:userName', loginGet)
apiRouter.post('/login/:userName', loginPost)

export default apiRouter
