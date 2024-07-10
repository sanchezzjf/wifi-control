
export const organizeNet = (arr, currentConnection) => {


    const connected = arr.find(net => net.ssid === currentConnection)
    const wifi_nets = arr.filter(net => net.ssid !== currentConnection)

    if(connected){
   
        wifi_nets.unshift(connected)
        return wifi_nets

    }
    
    return wifi_nets
}

