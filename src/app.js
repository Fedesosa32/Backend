const express = require ("express")
const path = require ('path')
const handlebars = require ('express-handlebars')
const Routes = require ('./routes/index.js')


const app = express ()

app.engine('handlebars', handlebars.engine()) // Registramos Handlebars como motor de plantilla
app.set('views', path.join(__dirname, '/views')) // 
app.set('view engine', 'handlebars') // setear handlebars como motor

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname + 'public')))

app.use('/', Routes.home)
app.use('/api', Routes.api)



const port = 3000
app.listen(port, ()=> {
    console.log(`Express Server Listening at http://localhost:${port}`)
} )