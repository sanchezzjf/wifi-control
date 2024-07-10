import { Router } from 'express'
import { logger } from '../util/logger.js'
import { scan, connect, checkConnection } from '../services/wifi.js'
import { interfaceAddress } from '../util/interfaceAddress.js'
import { organizeNet } from '../util/organizeNet.js'


const frontRouter = new Router()


frontRouter.use('/', async (req, res, next) => {

    const wifi_nets = await scan()
    const currentConnection = await checkConnection()
    const wifiAddress = interfaceAddress()
    

     req.wifi_nets = organizeNet(wifi_nets, currentConnection)
     req.currentConnection = currentConnection 
     req.wifiAddress = wifiAddress

/*      console.log(organizeNet(wifi_nets, currentConnection))
     console.log(req.wifi_nets) */

    next()
})

frontRouter.get('/', (req, res) => {
    // coletar informações de acesso

    logger.info(`ROUTER(/): Received ${req.method}`)

    res.render('home', {
        wifi_nets: req.wifi_nets,
        currentConnection: req.currentConnection,
        wifiAddress: req.wifiAddress
    })

})

frontRouter.post('/connect', async (req, res) => {

    //const currentConnection = await checkConnection()

    const { ssid, passwd } = req.body

    /* if(ssid === currentConnection){
        logger.info(`ROUTER(/connect): Already connected to ${currentConnection}`)
        res.json({message: `Already connected to ${currentConnection}`})
    } else { */
        connect(ssid, passwd)
            .then(() => {
                logger.info(`ROUTER(/connect): Sent message with the ssid`)
                res.json({message: `Connected to ${ssid}`})
            })
            .catch(err => {
                logger.error(`ROUTER(/connect): ${err}`)
                res.json({message: `${err}`})
            })
    //} 

})



export { frontRouter }