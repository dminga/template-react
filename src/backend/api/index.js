import express from 'express'
import loginRouter from './login'

var apiRouter = express.Router();
apiRouter.use('/login/:userName', loginRouter);

export default apiRouter
