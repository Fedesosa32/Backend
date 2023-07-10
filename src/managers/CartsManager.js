const fs = require ('fs')
const path = require ('path')

class CartsManager {
    constructor (filename){

        this.filename = filename
        this.filepath = path.join(__dirname, '../data', this.filename) 
        this.carts = []
    }

    getCarts = async ()=>{
        if (fs.existsSync(this.filepath)){
            const data = await fs.promises.readFile(this.filepath, 'utf-8');
            this.carts = JSON.parse (data);
            return this.carts;
        }
        else{
            return [];
        }
    }
    getCartsById = async (id)=>{
        
        const data = await fs.promises.readFile(this.filepath, 'utf-8');
        const carritos = JSON.parse (data)
        const CarritoEncontrado = carritos.find((carrito)=>carrito.id===id);
        if (CarritoEncontrado){
            return CarritoEncontrado;
        }
        else{
            console.log ("id no encontrado!!");
            return null;
        }        
    }
    addCarts = async (carrito)=>{
        
        const nuevoCarrito = await this.getCarts ();
        if (nuevoCarrito.length===0){
            carrito.id = 1;
        }        
        else {
                carrito.id = nuevoCarrito [nuevoCarrito.length - 1] .id +1
        }

        // if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock){
        //     console.error ("Faltan completar campos obligatorios del producto!")
        //     return
        // }  
        // const codeRepeat = nuevoProducto.find ((p) => p.code === producto.code);
        // if (codeRepeat){
        //     console.error("No se puede agregar el producto por que ya existe!")
        //     return
        // }
        const carritoFinal={
            id: carrito.id,
            products: []
        }        
        nuevoCarrito.push (carritoFinal);
        await fs.promises.writeFile(this.filepath, JSON.stringify(nuevoCarrito, null, 2))
        return nuevoCarrito;

    }

    updateProduct = async (id, nuevosValores) =>{

        const data = await fs.promises.readFile(this.filepath, 'utf-8');
        const productos = JSON.parse (data)  
        const productoActualizado = productos.findIndex((producto)=>producto.id===id);
        if (productoActualizado!== -1){  
            productos [productoActualizado] = {...productos[productoActualizado], ...nuevosValores}
        await fs.promises.writeFile(this.filepath, JSON.stringify(productos, null, 2));
        console.log (`Producto con el Id ${id} actualizado correctamente`)
    }
    else{
        console.log(`No se encuentra el producto con el Id ${id} requerido..`)
        }
    }

    deleteProduct = async (id)=>{
        const data = await fs.promises.readFile(this.filepath, 'utf-8');
        const productos = JSON.parse (data);
        const productoEncontrado = productos.findIndex((producto)=>producto.id===id);
        if (productoEncontrado!== -1){
            productos.splice (productoEncontrado, 1)
            await fs.promises.writeFile(this.filepath, JSON.stringify(productos, null, 2));
        }   else{
            console.log(`No se encontró un producto con ID ${id}.`);
        }
    }
}

module.exports = CartsManager