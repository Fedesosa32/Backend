const {Router} = require ('express')
const CartsManager = require ('../../managers/CartsManager')

const router = Router()
const cartsManager = new CartsManager('carts.json')

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
const carritoId = req.params.cid
const productId = req.params.pid

const carritosActuales = await cartsManager.getCarts()
const carritoSeleccionado = carritosActuales.find(carrito => carrito.id===carritoId)

if(!carritoSeleccionado){   
    return res.sendStatus(404).json({error: 'Carrito no Encontrado'})
}

const productosActuales = carritoSeleccionado.products.find(producto=>producto.id===productId)

if(productosActuales){
    productosActuales.quantity++
}
else{
    carritoSeleccionado.products.push({product:productId,quantity:1})

}
res.status(200).json(carritoSeleccionado)

})


module.exports = router