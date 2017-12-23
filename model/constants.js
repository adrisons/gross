// TODO: 
// Esto se va a guardar en bbdd
exports.config = {
    // The 'secret' property is used to sign & verify JWT tokens during authentication
    "secret": "THIS IS MY SECRET"
}

exports.twitter = {
    consumerKey: '7tzkiBa91NLuF481vPWd024e4',
    consumerSecret: 'Upra5sxzePcfVy2gNLNlolxrUM9YHsZdTHON8TLmDY4sZ5K8kx',
    callback: 'http://localhost:3000/api/social/tw/callback'
}