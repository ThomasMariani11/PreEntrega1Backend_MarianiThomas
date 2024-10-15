import express from 'express'
import { ProductManager } from './dao/ProductManager.js'

const PORT = 8080
const app = express()

const rutaArchivo = './src/data/products.json'
const productManager = new ProductManager(rutaArchivo)



app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', async (req, res) => {
    res.setHeader('Content-type','text/plain')
    res.status(200).send('bienvenido a mi pre entrega 1')
})
app.get('/api/products', async (req, res) =>{
    let products = await productManager.getProducts()
    let {limit, skip} = req.query
    let respuesta = products

    if(!limit){
        limit = products.length
    }else{
        limit = Number(limit)
        if(isNaN(limit)){
            return res.send('limit debe ser numerico')
        
        }
    }
    if(!skip){
        skip = 0
    }else{
        skip = Number(skip)
        if(isNaN(skip)){
            return res.send('skip debe ser numerico')
        
        }
    }
    respuesta = respuesta.slice(skip, limit + skip)

    res.status(200).send(respuesta)

})

app.get('/api/products/:pid', async (req, res) => {
    let products = await productManager.getProducts()
    if(Math.random() >.5){
        return res.status(500).send('error de servidor')
    }

    let {pid} = req.params
    pid = Number(pid)

    if(isNaN(pid)){
        return res.status(400).send('error, el id debe ser numerico')
    }
    let product = products.find( p => p.id === pid)
    if(!product){
        return res.status(404).send(`no existe el producto con id ${pid}`)
    }
    res.status(200).send(product)

})


const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en puerto ${PORT}`);
    
})