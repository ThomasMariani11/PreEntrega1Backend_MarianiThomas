import express from 'express'
import {router as productRoute} from './routes/productRoute.js'
import { router as cartRoute } from './routes/cartRoute.js'

const PORT = 8080
const app = express()

const rutaArchivo = './src/data/products.json'
const rutaArchivoCart = './src/data/cart.json'



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)



const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
    
})