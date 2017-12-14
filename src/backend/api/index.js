import express from 'express'
import { loginGet, loginPost } from './login'

var apiRouter = express.Router();
apiRouter.get('/login/:userName', loginGet)
apiRouter.post('/login/:userName', loginPost)
// apiRouter.use('/login/:userName', loginRouter);

export default apiRouter
