import express from 'express'
import { ProductManager } from './dao/ProductManager.js'
import {router as productRoute} from './routes/productRoute.js'

const PORT = 8080
const app = express()

const rutaArchivo = './src/data/products.json'



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products', productRoute)



const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
    
})