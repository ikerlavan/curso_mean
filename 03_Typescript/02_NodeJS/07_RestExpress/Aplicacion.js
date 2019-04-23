let mongoDBUtil         = require('./MongoDBUtil')
let negocioProductos    = require('./NegocioProductos')
/* let negocioAlmacen    = require('./NegocioAlmacen') */
let restUtil            = require('./RESTUtil')


let express = require('express')




mongoDBUtil.conectarBBDD(arrancarServidor)
let conexion = null


function arrancarServidor(){
    console.log('Arrancando servicio REST')
    conexion = mongoDBUtil.obtenerConexion()
    
    let app = express()

    app.listen(6001, () => {
        console.log('Esperando peticiones ...')
    })

    let bodyParser = require('body-parser')
    app.use(bodyParser.json())
    app.use(express.static('./recursos'))

    app.get('/', (request, response)=>{
        let path = require('path')
        response.sendFile(path.join(__dirname, 'recursos/listadoProductos.html'))
    })

    app.get('/productos', listarProductos)
    app.get('/productos/:idProducto', listarProductoPorId)
    app.post('/productos', insertarProducto)
    app.put('/productos/:idProducto', modificarProducto)
    app.delete('/productos/:idProducto', borrarProducto)
}




function listarProductos(request, response){

    negocioProductos.listarProductos()
    .then( arrayProductos => {
        console.log('arrayProductos',JSON.stringify(arrayProductos))
        response.json(arrayProductos)
    })
    .catch( error => { 
        console.log(error)
        response.statusCode = 500
        response.json(restUtil.crearObjetoError(500, 'Ha explotado la BBDD'))
    })
    
}

function listarProductoPorId(request, response){
    let idProducto = request.params.idProducto

    negocioProductos.buscarProducto(idProducto)
    .then( producto => {
        
        if(producto){
            console.log("Existe.", producto)
            response.json(producto)
        }else{
            console.log("No existe.", producto)
            response.json(restUtil.crearObjetoError(404, 'Ha explotado la BBDD'))
        }
        
    })
    .catch( (error) => {
        console.log(error)
        response.statusCode = 500
        response.json(restUtil.crearObjetoError(500, 'Ha explotado la BBDD'))
    })
}

function insertarProducto(request, response){
    console.log("insertarProducto");
    let body = request.body
    
    let almacen = {}
    almacen.existencias = body.existencias
    delete body.existencias

    negocioProductos.insertProducto(body)
    .then( retornoProducto => {
        almacen.idProducto  = retornoProducto.insertedId
        response.json(retornoAlmacen)
        return negocioAlmacen.insertAlmacen(almacen)
    })
    .then( retornoAlmacen => {
        console.log('RetornoAlmacen')
        response.json(retornoAlmacen)
    })
    .catch( error => {
        console.log(error)
        response.statusCode = 500
        response.json(restUtil.crearObjetoError(500, 'Ha explotado la BBDD'))
    })
}

function modificarProducto(request, response){
    let idProducto = request.params.idProducto
    
        negocioProductos.modifProducto(idProducto)
        .then( retornoProducto => {
            console.log("insertedId", retornoProducto.insertedId)
            response.json(retornoProducto)
        })
        .catch( error => {
            console.log(error)
            response.statusCode = 500
            response.json(restUtil.crearObjetoError(500, 'Ha explotado la BBDD'))
        })
}

function borrarProducto(request, response){
    let idProducto = request.params.idProducto
    
    negocioProductos.deleteProducto(idProducto)
    .then( retorno => {
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.json(retorno)
    })
    .catch( error => {
        console.log(error)
        response.statusCode = 500
        response.json(restUtil.crearObjetoError(500, 'Ha explotado la BBDD'))
    })
   
}

/* function listarAlmacen(request, response, idProducto){
    negocioAlmacen.listarAlmacen()
    .then( almacenes => {
        console.log('almacenes',JSON.stringify(almacenes))
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify(almacenes))
    } )
    .catch( error => {
        console.log(error)
        response.statusCode = 500
        response.end(JSON.stringify(restUtil.crearObjetoError(500, 'Ha explotado la BBDD')))
    })
} */