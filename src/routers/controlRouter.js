import { Router } from 'express'
import { logger } from '../util/logger.js'


const controlRouter = new Router()


controlRouter.get('/', (req, res) => {
    // coletar informações de acesso
    //logger.info(req)
    res.render('home', {
        wifi_nets: [],
        connect_func: {}
    })
})


export { controlRouter }