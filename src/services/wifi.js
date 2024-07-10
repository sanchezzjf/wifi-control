import wifi from "node-wifi"
import { logger } from "../util/logger.js"
import { removeDedup } from "../util/rmdedup.js"
import { filterSsid } from "../util/filterSsid.js";


class WifiService {

    constructor(){
        wifi.init({ iface: 'wlo1' });
    }

    scan(){
        return new Promise((resolve, reject) => {
      
            wifi.scan((err, networks) => {
              if (err) {
                logger.error(`WifiService(scan): ${err}`);
                reject(err);
              } else {
                let wifi_nets = removeDedup(networks);
                resolve(wifi_nets);
              }
            });
          });
        }

    connect(ssid, passwd) {
        return new Promise((resolve, reject) => {
            wifi.connect({ ssid: ssid, password: passwd }, (err) => {
                if(!ssid) resolve(logger.info('WifiService(connect): No SSID provided'))
                if (err){
                    logger.error(err)
                    reject( err)
                }else{ resolve(logger.info(`WifiService(connect): Connected to ${ssid}`)) } 
            })

        })
    }

    checkConnection(){
        return new Promise((resolve, reject) => {
            wifi.getCurrentConnections((err, currentConnection) => {
                if(err){
                    logger.error(err)
                    reject(err)
                } else{
                    //console.log(currentConnection)
                    const currentConnectionSsid = filterSsid(currentConnection)
                    //console.log(`checkConnection: ${currentConnectionSsid}`)
                    resolve(currentConnectionSsid) 
                }
            })
        })
    }

}

export const { scan, connect, checkConnection } = new WifiService()



