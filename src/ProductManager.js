const fs = require ('fs')
const path = require ('path')

class ProductManager {
    constructor (filename){

        this.filename = filename
        this.filepath = path.join(__dirname, this.filename) 
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
}

module.exports = ProductManager
