


let id = 1;
let productoEncontrado="";

class ProductManager {
    constructor (){

    this.products =[];     

    }

    addProducts = (title, description, price, thumbnail, code, stock)=>{

        const nuevoProducto = {
            id: id++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,            
            }   
            
        if (!nuevoProducto.title || !nuevoProducto.description || !nuevoProducto.price || !nuevoProducto.thumbnail || !nuevoProducto.code || !nuevoProducto.stock){
            console.error ("Faltan completar campos obligatorios del producto!")
            return
        }    
    
        const codeRepeat = this.products.find ((p) => p.code === nuevoProducto.code);
        if (codeRepeat){
            console.error("No se puede agregar el producto por que ya existe!")
        }
            else {
                this.products.push (nuevoProducto);
                console.log ("Producto agregado con éxito!");
            }
    }

    getProducts =()=>{
        return this.products;
    }
    getProductById (id){
        productoEncontrado = this.products.find(nuevoProducto=>nuevoProducto.id===id);
        if (productoEncontrado){
            return productoEncontrado;
        }
        else{
            
            console.error ("Not Found")
            return null;
        }
        
    }
        
}

const item = new ProductManager ();

item.addProducts("Tatin", "Alfajor de Chocolate", "$20.00", "Sin imagen", "001", "50");
item.addProducts("Pico Dulce", "Chupetin Frutal", "$10.00", "Sin imagen", "002", "100");
item.addProducts("Bon o Bon", "Bombom de Chocolate", "$30.00", "Sin imagen", "001", "50");
item.addProducts("Oreo", "Galleta de Chocolate", "$80.00", "", "003", "70");

console.log (item.getProducts());

item.getProductById(2);
console.log(productoEncontrado);

item.getProductById(5);
console.log(productoEncontrado);
