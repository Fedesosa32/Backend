const express = require ("express")
const http = require ('http')
const path = require ('path')
const handlebars = require ('express-handlebars')
const {Server} = require ("socket.io")
const Routes = require ('./routes/index.js')
const socketManager = require ('./webSocket')


const app = express ()
const server = http.createServer(app)
const io = new Server(server)

app.engine('handlebars', handlebars.engine()) // Registramos Handlebars como motor de plantilla
app.set('views', path.join(__dirname, '/views')) // 
app.set('view engine', 'handlebars') // setear handlebars como motor

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/', Routes.home)
app.use('/api', Routes.api)

io.on ('connection', socketManager)


const port = 3000
server.listen(port, ()=> {
    console.log(`Express Server Listening at http://localhost:${port}`)
} )