let mongoDBUtil         = require('./mongoDBUtil')
let http                = require('http')
let recursosEstaticos   = require('./RecursosEstaticos')
let negocioProductos    = require('./NegocioProductos')
let negocioAlmacen    = require('./NegocioAlmacen')
let restUtil            = require('./RESTUtil')

mongoDBUtil.conectarBBDD(arrancarServidor)
let conexion = null


function arrancarServidor(){
    console.log('Arrancando servicio REST')
    conexion = mongoDBUtil.obtenerConexion()
    http.createServer(procesarPeticion)
    .listen(4000)
    console.log('Esperando peticiones')
}


function procesarPeticion(request, response){
/* 
    GET     productos
    GET     productos/id
    POST    productos
    PUT     productos/id
    DELETE  productos/id
 */
    console.log('==============================')
    console.log('Petición recibida')
    let metodo  = request.method.toUpperCase()
    let url     = request.url
    console.log('Método: '+metodo)
    console.log('url: ' + url)

    if( metodo=='GET' && url=='/productos' ){
        listarProductos(request, response)
    }else if( metodo=='GET' && url.match('^/productos/[0-9a-zA-Z]+$') ){
        console.log("Id de producto", url.split('/')[2])
        listarProductoPorId(request, response)
    }else if( metodo=='POST' && url=='/productos' ){
        insertarProducto(request, response)
    }else if( metodo=='PUT' && url.match('^/productos/[0-9a-z]+$') ){
        modificarProducto(request, response)
    }else if( metodo=='DELETE' && url.match('^/productos/[0-9a-z]+$') ){
        borrarProducto(request, response)
    }else if( metodo=='GET' && url.match('^/almacenes/[0-9a-z]+$') ){
        listarAlmacen(request, response)
    }else{
        console.log('Objeto JS')
        console.log(recursosEstaticos)
        recursosEstaticos.leerRecurso(request, response)
    }
}

function listarProductos(request, response){

    negocioProductos.listarProductos()
    .then( arrayProductos => {
        console.log('arrayProductos',JSON.stringify(arrayProductos))
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify(arrayProductos))
    })
    .catch( error => { 
        console.log(error)
        response.statusCode = 500
        response.end(JSON.stringify(restUtil.crearObjetoError(500, 'Ha explotado la BBDD')))
    })
    
}

function listarProductoPorId(request, response){
    negocioProductos.buscarProducto(request.url.split('/')[2])
    .then( producto => {
        
        if(producto){
            console.log("Existe.", producto)
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(producto))
        }else{
            console.log("No existe.", producto)
            response.statusCode = 404
            response.end(JSON.stringify(restUtil.crearObjetoError(404, 'Ha explotado la BBDD')))
        }
        
    })
    .catch( (error) => {
        console.log(error)
        response.statusCode = 500
        response.end(JSON.stringify(restUtil.crearObjetoError(500, 'Ha explotado la BBDD')))
    })
}

function insertarProducto(request, response){
    console.log("insertarProducto");

    request.on('data', function(body) {
        var json = JSON.parse(body.toString())
        almacen = {}
        almacen.existencias = json.existencias
        delete json.existencias
        negocioProductos.insertProducto(json)
        .then( retornoProducto => {
            almacen.idProducto  = retornoProducto.insertedId
            return negocioAlmacen.insertAlmacen(almacen)
        })
        .then( retornoAlmacen => {
            console.log('RetornoAlmacen')
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(retornoAlmacen))
        })
        .catch( error => {
            console.log(error)
            response.statusCode = 500
            response.end(JSON.stringify(restUtil.crearObjetoError(500, 'Ha explotado la BBDD')))
        })
    });
}

function modificarProducto(request, response){
    request.on('data', function(body) {
        var json = JSON.parse(body.toString())
        negocioProductos.modifProducto(JSON.parse(body.toString()))
        .then( retornoProducto => {
            console.log("insertedId", retornoProducto.insertedId)
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(retornoProducto))
        })
        .catch( error => {
            console.log(error)
            response.statusCode = 500
            response.end(JSON.stringify(restUtil.crearObjetoError(500, 'Ha explotado la BBDD')))
        })
    });
}

function borrarProducto(request, response){
    negocioProductos.deleteProducto(request.url.split('/')[2])
    .then( retorno => {
        response.setHeader('Content-Type', 'application/json; charset=utf-8')
        response.end(JSON.stringify(retorno))
    })
    .catch( error => {
        console.log(error)
        response.statusCode = 500
        response.end(JSON.stringify(restUtil.crearObjetoError(500, 'Ha explotado la BBDD')))
    })
   
}

function listarAlmacen(request, response){
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
}