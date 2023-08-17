const NodeCache = require('node-cache')
const myCache = new NodeCache()

const getJwtToken = () => {
    if (!myCache.get('jwtToken')) {
        return fetch('http://20.244.56.144/train/auth', {method: 'POST', body: JSON.stringify({
            companyName: "KMIT",
            clientID: "cf0b5ab0-4e02-40fd-a4a5-3964fe28b621",
            ownerName: "Anusree",
            ownerEmail: "placements@kmit.in",
            rollNo: "245320733128",
            clientSecret: "yWbspgheqXXumwla"
        })
        })
        .then(response => response.json())
        .then(response => {
            myCache.set('jwtToken', response.access_token, response.expires_in)
            return myCache.get('jwtToken')
        })
    }
}

module.exports = getJwtToken