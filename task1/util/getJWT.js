const NodeCache = require('node-cache')
const myCache = new NodeCache()

const getJwtToken = async () => {
    var cachedToken = myCache.get('jwtToken')

    if (!cachedToken) {
        cachedToken = await fetch('http://20.244.56.144/train/auth', {method: 'POST', body: JSON.stringify({
            companyName: "KMIT",
            clientID: "cf0b5ab0-4e02-40fd-a4a5-3964fe28b621",
            ownerName: "Anusree",
            ownerEmail: "placements@kmit.in",
            rollNo: "245320733128",
            clientSecret: "yWbspgheqXXumwla"
        })})
        
        myCache.set('jwtToken', cachedToken.access_token, cachedToken.expires_in)
    }
    console.log(cachedToken);

    return cachedToken
}

module.exports = getJwtToken