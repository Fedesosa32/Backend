const express = require ("express")
const {api, home} = require ('./routes')
const path = require ('path')


const app = express ()

const port = 3000
app.listen(port, ()=> {
    console.log(`Express Server Listening at http://localhost:${port}`)
} )

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', api)
app.use('/', home)
app.use('/static', express.static(path.join(__dirname, 'public')))





// {
//     "title": "Milka",
//     "description": "Chocolate Aireado",
//     "price": 200,
//     "thumbnail": "Sin Imagen",
//     "code": "006",
//     "stock": 50,
//     "id": 6
// }