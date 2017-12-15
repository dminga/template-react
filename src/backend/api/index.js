import express from 'express'
import { loginPrepare, loginGet, loginPost, logoutPost } from './authentication'

var apiRouter = express.Router()
loginPrepare(1024)
apiRouter.get('/login/:userName', loginGet)
apiRouter.post('/login/:userName', loginPost)
apiRouter.post('/logout/:userName', logoutPost)

export default apiRouter
