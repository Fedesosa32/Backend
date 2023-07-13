const express = require ("express")
const {api, home} = require ('./routes')
const path = require ('path')
const handlebars = require ('express-handlebars')


const app = express ()

const port = 3000
app.listen(port, ()=> {
    console.log(`Express Server Listening at http://localhost:${port}`)
} )
app.engine('handlebars', handlebars.engine())
//app.set('views', path.join(__dirname, ''))
app.set('view engine', handlebars)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', api)
app.use('/', home)
app.use('/static', express.static(path.join(__dirname, 'public')))
