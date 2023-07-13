const {Router} = require ('express')
const CartsManager = require ('../../managers/CartsManager')
const cartsManager = new CartsManager('carts.json')
const router = Router()

router.get ('/', (req, res)=> {
    res.send ('Carts')
})

router.post('/', async (req, res) =>{
    const {body} = req
    const carrito = await cartsManager.addCarts(body)
    
    res.status(201).send(carrito)
    
})

router.get('/:id', async (req, res) =>{
    const {id} = req.params
    const carrito = await cartsManager.getCartsById(+id)
    
    if (carrito) {
        res.send(carrito);
    } else {
        res.send('Carrito no encontrado');
    }
    
})

router.post('/:cid/product/:pid', async (req, res)=>{
try{
    const cartId = req.params.cid
    const productId = req.params.pid
    const result = await cartsManager.addProductToCart(cartId, productId)
    
    if(result === "Producto No Encontrado"){
        res.status(404).send({status:404, mesagge: "Producto No Encontrado"})
    } else if(result === "Carrito No Encontrado"){
        res.status(404).send({status:404, mesagge: "Carrito No Encontrado"})
    } else {
        res.status(200).send({status:200, mesagge: "Producto Agregado al Carrito"})
    }
} catch (error){
    console.error("Error al agregar el producto al Carrito", error)
    res.status(500).send({status:500, mesagge:"Ha ocurrido un error al agregar el producto al Carrito"})
    }
})

module.exports = router