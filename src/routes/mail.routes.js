import {Router} from 'express'
import mailController from '../controllers/mailController.js'

const routerMailing = Router()

routerMailing.get('/', mailController.sendEmail)

export default routerMailing