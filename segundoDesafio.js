const fs = require ('fs')
const path = require ('path')

class ProductManager {
    constructor (path){
        this.path= path;
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
        await fs.promises.writeFile(this.path, JSON.stringify(nuevoProducto, null, 2))
        return nuevoProducto;

    }

    getProducts = async ()=>{
        if (fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const nuevoProducto = JSON.parse (data);
            return nuevoProducto;
        }
        else{
            return [];
        }
    }

    getProductsById = async (id)=>{
        
        const data = await fs.promises.readFile(this.path, 'utf-8');
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
    
    updateProduct = async (id, nuevosValores) =>{

        const data = await fs.promises.readFile(this.path, 'utf-8');
        const productos = JSON.parse (data)  
        const productoActualizado = productos.findIndex((producto)=>producto.id===id);
        if (productoActualizado!== -1){  
            productos [productoActualizado] = {...productos[productoActualizado], ...nuevosValores}
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
        console.log (`Producto con el Id ${id} actualizado correctamente`)
    }
    else{
        console.log(`No se encuentra el producto con el Id ${id} requerido..`)
        }
    }

    deleteProduct = async (id)=>{
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const productos = JSON.parse (data);
        const productoEncontrado = productos.findIndex((producto)=>producto.id===id);
        if (productoEncontrado!== -1){
            productos.splice (productoEncontrado, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, 2));
        }   else{
            console.log(`No se encontró un producto con ID ${id}.`);
        }
    }
}

const item = new ProductManager(path.join (__dirname, 'archivoDeProductos.json'))

const listado = async ()=>{

    let prod = {

            title: "Tatin",
            description: "Alfajor de Chocolate",
            price: 20.00,
            thumbnail: "Sin Imagen",
            code:"001", 
            stock: 50,  
    }
    let prod2 ={
            title: "Pico Dulce",
            description: "Chupetin Frutal",
            price: 10.00,
            thumbnail: "Sin Imagen",
            code:"002", 
            stock: 100,  
    }
    let prod3 ={
        title: "Bon o Bon",
        description: "Bombom de Chocolate",
        price: 30.00,
        thumbnail: "Sin Imagen",
        code:"003",
        stock: 150,  
}
    let prod4 ={
        title: "Oreo",
        description: "Galleta Chocolate",
        price: 60.00,
        thumbnail: "Sin Imagen",
        code:"003", //   Se repite código para verificar funcionamiento de validación con el producto 3
        stock: 200,  
    }
    let prod5 ={
        title: "Mogul",
        description: "Gomitas azucaradas",
        price: 25.00,
        thumbnail: "", // Se dejan campos incompletos para verificar validaciones
        code:"",
        stock: 40,  
    }

    let resultado = await item.addProducts(prod);
    let resultado2 = await item.addProducts(prod2);
    let resultado3 = await item.addProducts(prod3);
    let resultado4 = await item.addProducts(prod4);
    let resultado5 = await item.addProducts(prod5);
    console.log (resultado, resultado2, resultado3,resultado4,resultado5);

    console.log ( await item.getProducts());
    console.log ( await item.getProductsById(2));
    console.log ( await item.getProductsById(5));

    item.updateProduct(1, {title: "Coca Cola", description:"Gaseosa", price:200, thumbnail: "sin imagen", code:"006", stock:90} )
    .then (()=>{console.log("Producto actualizado correctamente")})
    .catch (()=>{console.log("No se pudo actualizar el Producto")})

    item.deleteProduct(3)
    .then (()=>{console.log(`Producto con ID ${3} eliminado.`)})
    .catch ((error)=> {
        console.log('No se pudo eliminar el Producto', error)
    })

}
listado ();
