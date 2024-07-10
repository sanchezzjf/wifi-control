export const removeDedup = (arr) => {

    const filteredNetworks = []
    arr.forEach((item) => {

        if(item.ssid === "" || item.quality < 85) return;

        const existingNetwork = filteredNetworks.find(n => n.ssid === item.ssid);
    
        if (!existingNetwork) {
        // Se não existir, adiciona a rede à lista filtrada
        filteredNetworks.push({
            //index: index,
            ssid: item.ssid,
            quality: item.quality
        });
        } else if (item.quality > existingNetwork.quality) {
        // Se existir e a qualidade da nova rede for melhor, substitui a rede existente
        const index = filteredNetworks.indexOf(existingNetwork);
        filteredNetworks[index] = item;
        }
        
    })
    
    return filteredNetworks
}
