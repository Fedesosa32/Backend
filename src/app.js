const express = require ("express")
const ProductManager = require ("./ProductManager")


const app = express ()
const productManager = new ProductManager('productos.json')

app.get ('/', (req, res)=> {
    res.send ('Bienvenidos')
})

const port = 3000
app.listen(port, ()=> {
    console.log(`Express Server Listening at http://localhost:${port}`)
} )

app.use(express.urlencoded({extended:true}))

app.get('/productos', async (req, res) =>{
    const {limit} = req.query
    const productos = await productManager.getProducts()

    if (limit){
        const limite = parseInt (limit)
        const plimitados = productos.slice(0,limite)
        res.send (plimitados)
    }
    else{
        res.send(productos)
    }
    
})

app.get('/productos/:id', async (req, res) =>{
    const {id} = req.params
    const productos = await productManager.getProducts() // Aca probe llamar al método del desafío anterior con getProductsByIdgit

    // const productoEncontrado = productos.find((producto)=>producto.id==id);
    //     if (productoEncontrado){
    //         res.send (productoEncontrado);
    //     }
    //     else{
    //         res.send ("id no encontrado!!");
    //     }

    for (const p of productos){
        if (p.id == id)
        res.send(p)
        return
    }
    res.send(productos)
})


