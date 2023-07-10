const fs = require ('fs')
const path = require ('path')

class ProductManager {
    constructor (filename){

        this.filename = filename
        this.filepath = path.join(__dirname, '../data', this.filename) 
        this.products = []
    }

    getProducts = async ()=>{
        if (fs.existsSync(this.filepath)){
            const data = await fs.promises.readFile(this.filepath, 'utf-8');
            this.products = JSON.parse (data);
            return this.products;
        }
        else{
            return [];
        }
    }
    getProductsById = async (id)=>{
        
        const data = await fs.promises.readFile(this.filepath, 'utf-8');
        const productos = JSON.parse (data)
        const productoEncontrado = productos.find((producto)=>producto.id===id);
        if (productoEncontrado){
            return productoEncontrado;
        }
        else{
            console.log ("id no encontrado!!");
            return null;
        }        
    }
    addProducts = async (producto)=>{
        
        const nuevoProducto = await this.getProducts ();
        if (nuevoProducto.length===0){
            producto.id = 1;
        }        
        else {
                producto.id = nuevoProducto [nuevoProducto.length - 1] .id +1
        }

        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock){
            console.error ("Faltan completar campos obligatorios del producto!")
            return
        }  
        const codeRepeat = nuevoProducto.find ((p) => p.code === producto.code);
        if (codeRepeat){
            console.error("No se puede agregar el producto por que ya existe!")
            return
        }
        
        nuevoProducto.push (producto);
        await fs.promises.writeFile(this.filepath, JSON.stringify(nuevoProducto, null, 2))
        return nuevoProducto;

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

module.exports = ProductManager
