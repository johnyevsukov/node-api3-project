// require your server and launch it
const server = require('./api/server')

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log('sever running on 5000')
})