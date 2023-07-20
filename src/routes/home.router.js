const {Router} = require('express')
const path = require ('path')
const ProductManager = require ('../managers/ProductManager')
const productManager = new ProductManager ('productos.json')
//const multer = require ('multer')

//COnfiguración para Implementar Multer. Posterior a eso hay que crear el middleware
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, path.join(__dirname,'../public/uploads'))
//     },
//     filename: (req, file, cb)=>{
//         cb(null, `${file.fieldname}-${date.now()}`)
//     },
// })

//const upload = multer ({storage})
const router = Router ()

router.get('/', async (req, res)=>{
//res.sendFile(path.join (__dirname, '../public/index.html'))
const products = await productManager.getProducts()
console.log (products)
res.render('home',{
    title: 'Home',
    products: products [0]
})
})

router.get('/carrito', (req, res)=> {
//res.sendFile(path.join (__dirname, '../public/carrito.html'))
res.render('carrito',{
    title: 'Carrito'
})
})

//Middleware para Multer // Despues desde Postman se crea un POST - Multipart, se agrega nombre del archivo y se carga el mismo en value.
// router.post('/upload', upload.single('img'), (req, res)=>{
//     if (req.file){
//         console.log("Tenemos un File")
//     }
//     console.log (JSON.stringify(req.body, null, 2))
//     res.send("OK")
// } )

module.exports = router