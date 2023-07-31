const {Router} = require ('express')
const ProductManager = require ("../../managers/ProductManager")
const productManager = new ProductManager('productos.json')

const router = Router()

router.get('/', async (req, res) =>{
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

router.get('/:id', async (req, res) =>{
    const {id} = req.params
    const producto = await productManager.getProductsById(+id)
    
    if (producto) {
        res.send(producto);
    } else {
        res.send('Producto no encontrado');
    }
    
})

router.post('/', async (req, res) =>{
    const {body} = req
    const producto = await productManager.addProducts(body)
    const productosActualizados = await productManager.getProducts()
    req.io.emit ('productoActualizado', productosActualizados) 
    res.status(201).send(producto)
    
})

router.put('/:id', async (req, res) =>{
    const {id} = req.params
    const {body} = req
    
    try{
    await productManager.updateProduct(+id, body)
    res.status(202)}
    catch{
        res.sendStatus(404)
    }
    
})

router.delete('/:id', async (req, res) =>{
    const {id} = req.params
    
    await productManager.deleteProduct(+id)
    const productosActualizados = await productManager.getProducts()
    req.io.emit ('productoActualizado', productosActualizados) 
    res.sendStatus(200)
    
})

module.exports = router