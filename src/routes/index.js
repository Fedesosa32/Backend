const {Router} = require('express')
const ProductRoutes = require('./api/products.router.js')
const CartRoutes = require ('./api/carts.router.js')
const HomeRoutes = require ('./home.router.js')
//const AdminRoutes = require('./admin.router.js')

const api = Router ()

api.use ('/products', ProductRoutes)
api.use('/carts', CartRoutes)

const home = Router ()

home.use('/', HomeRoutes)
//home.use('/admin', AdminRoutes)

module.exports = {
    api,
    home
}