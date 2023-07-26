const ProductManager = require ('../managers/ProductManager')
const productManager = new ProductManager ('productos.json')

function socketManager(socket){

    console.log(`Usuario conectado: ${socket.id}`)

    socket.on ('disconnect', ()=>{
        console.log('Usuario Desconectado')
    })

    socket.on('nuevoProducto', async () => {
        const products = await productManager.getProducts();
        socket.broadcast.emit('productoActualizado', products);
    });

    socket.on('productoEliminado', async () => {
        const products = await productManager.getProducts();
        socket.broadcast.emit('productoActualizado', products);
    });

    setTimeout(()=>{
        socket.emit ('promo', {title: "Mogul", sale: 15})
    }, 500)
}

module.exports = socketManager