const {Router} = require('express')
const path = require ('path')
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

router.get('/', (req, res)=>{
//res.sendFile(path.join (__dirname, '../public/index.html'))
res.render('home',{
    nombre: 'Fede',
    title: 'Home'
})
})

router.get('/carrito', (req, res)=> {
//res.sendFile(path.join (__dirname, '../public/carrito.html'))
res.render('carrito',{
    numItems: 2,
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