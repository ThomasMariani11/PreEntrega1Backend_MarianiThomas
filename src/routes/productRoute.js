import { Router } from "express"
import { ProductManager } from '../dao/ProductManager.js'
import { procesaErrores } from "../utils.js"
export const router = Router()

ProductManager.setPath('./src/data/products.json')

router.get('/', async (req, res) => {
    let products = await ProductManager.getProducts()
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
    res.setHeader('Content-type','text/plain')
})


router.get('/:pid', async (req, res) => {
    let products = await ProductManager.getProducts()

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
router.post('/', async (req, res) => {
    let {titulo,descripcion,codigo,precio,stock,categoria,...thumbnails} = req.body
    if(!titulo || !descripcion || !codigo || !precio || !stock || !categoria){
        res.setHeader('Content-Type','aplication/json')
        return res.status(400).json({error:'le esta faltando alguna propiedad por ingresar'})
    }
    precio = Number(precio)
    stock = Number(stock)
    if(isNaN(precio) || isNaN(stock)){
        res.setHeader('Content-Type','aplication/json')
        return res.status(400).json({error:'precio y stock deben ser numericos'})
    }
    try{   
        let products = await ProductManager.getProducts()
        let existe = products.find(p => p.titulo  === titulo)
        if(existe){
            console.log(existe) 
            res.setHeader('Content-Type','aplication/json')
            return res.status(400).json({error:'ya existe el producto'})
        }else{
            
            let nuevoProduct = await ProductManager.addProduct({titulo,descripcion,codigo,precio,stock,categoria,...thumbnails})
            
            
            res.setHeader('Content-Type','aplication/json')
            return res.status(200).json({nuevoProduct})
        }
    }catch(error){
        procesaErrores(res, error)
        
    }
})
router.put('/:pid', async (req, res) => {
    let products = await ProductManager.getProducts()

    let {pid,...cambio} = req.params
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