module.exports = {
    port: 3000,
    session: {
        secret: 'mytodo',
        key: 'mytodo',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://mytodo:mytodo@ds121898.mlab.com:21898/rouroutodos'
    // mongodb: 'mongodb://localhost:27017/mytodo'
}