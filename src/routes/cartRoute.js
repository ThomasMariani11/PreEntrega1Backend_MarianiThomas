import { Router } from "express"
import { procesaErrores } from "../utils.js"
import { CartManager } from "../dao/CartManager.js"
export const router = Router()

CartManager.setPath('./src/data/cart.json')

router.get('/:cid', async (req, res) => {
    let cartProducts = await CartManager.getCarts()
    let {cid} = req.query
    cid = Number(cid)
    if(isNaN(cid)){
        res.setHeader('Content-Type','aplication/json')
        return res.send('limit debe ser numerico')
    }

    respuesta = respuesta.slice(skip, limit + skip)

    res.setHeader('Content-type','text/plain')
    res.status(200).send(respuesta)
})



router.post('/', async (req, res) => {
    try{   
            let nuevoCart = await CartManager.addCart()
            res.setHeader('Content-Type','aplication/json')
            return res.status(200).json({nuevoCart})
    }catch(error){
        procesaErrores(res, error)
        
    }
})