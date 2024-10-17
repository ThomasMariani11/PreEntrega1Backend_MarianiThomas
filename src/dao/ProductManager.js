import fs from 'fs'


export class ProductManager{
    static #path = ''

    static setPath(rutaArchivo=''){
        this.#path = rutaArchivo
    }
    static async getProducts(){
        if(fs.existsSync(this.#path)){
            return JSON.parse(await fs.promises.readFile(this.#path, {encoding:'utf-8'}))
        }else{
            return []
        }
    }
    static async #grabaArchivos(datos=''){
        if(typeof datos != 'string'){
            throw new Error('error metodo de grabadi - argumento invalido')
        }
        await fs.promises.writeFile(this.#path, datos)
    }
    static async addProduct(producto={}){
        let products = await this.getProducts()
        let id = 1
        if(products.length > 0){
            id = Math.max(...products.map(d => d.id)) + 1
        }
        let nuevoProduct = {
            id,
            status:true,
            ...producto
        }
        products.push(nuevoProduct)
        await this.#grabaArchivos(JSON.stringify(products, null, '\t'))
        return nuevoProduct
    }
}