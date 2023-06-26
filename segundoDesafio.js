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
            console.log ("id no encontrado");
            return null;
        }        
    }    

    // deleteProduct = async (id)=>{
    //     const data = await fs.promises.readFile(this.path, 'utf-8');
    //     const productos = JSON.parse (data);
    //     const productoEncontrado = productos.filter((producto)=>producto.id!==id);
    //     await fs.promises.writeFile(this.path, JSON.stringify(productoEncontrado));
    //     console.log(`Producto con ID ${id} eliminado.`);
    //     return `Producto con ID ${id} eliminado.`;
    // }
}

const item = new ProductManager(path.join (__dirname, 'archivoDeProductos.json'))


//item.deleteProduct(2).then ((u)=>{console.log(u)})

const listado = async ()=>{

    let prod = {

            title: "Tatin",
            description: "Alfajor de Chocolate",
            price: 20.00,
            thumbnail: "Sin Imagen",
            code:"001", //   code:1
            stock: 50,  
    }
    let prod2 ={
            title: "Pico Dulce",
            description: "Chupetin Frutal",
            price: 10.00,
            thumbnail: "Sin Imagen",
            code:"002", //   code:1
            stock: 100,  
    }
    let prod3 ={
        title: "Bon o Bon",
        description: "Bombom de Chocolate",
        price: 30.00,
        thumbnail: "Sin Imagen",
        code:"003", //   code:1
        stock: 150,  
}

    let resultado = await item.addProducts(prod);
    let resultado2 = await item.addProducts(prod2);
    let resultado3 = await item.addProducts(prod3);
    console.log (resultado, resultado2, resultado3);

    console.log ( await item.getProducts());
    console.log ( await item.getProductsById(2));
    console.log ( await item.getProductsById(5));
}
listado ();
