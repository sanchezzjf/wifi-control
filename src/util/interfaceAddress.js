import { networkInterfaces } from 'node:os'



export const interfaceAddress = () => {

    const interfaces = networkInterfaces()

    const interfaceAddress = Object.keys(interfaces)
        .filter(interfaceName => interfaceName.startsWith('wl'))
        .reduce((result, interfaceName) => {
            const addresses = interfaces[interfaceName]
            .filter(entry => entry.family === 'IPv4')  // Filtra apenas endereços IPv4
            .map(entry => entry.address);  // Extrai os endereços IP
            result[interfaceName] = addresses;
    return result;
  }, {});
    
    return interfaceAddress
}
