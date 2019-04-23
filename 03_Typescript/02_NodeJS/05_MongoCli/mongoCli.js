let mongo = require('mongodb')

//Conectando con la bbdd
let urlMongo = 'mongodb://localhost:27017'

/* mongo.connect(urlMongo, { useNewUrlParser: true }, function(error, con){
    if(error){
        console.log(error)
        return
    }
    console.log('Conexión establecida')
    //console.log(con)
    let bbdd = con.db('local')
    //console.log(bbdd)
    bbdd.collections(function(err, collections){
        console.log(collections);
    });
    con.close(function(error){
        console.log('conexión cerrada')
    })

}) */

/* 
let promesaCon = mongo.connect(urlMongo, { useNewUrlParser: true })
promesaCon
    .then(function(con){
        console.log("Then the conection is: " + con)
    })
    .catch(function(error){
        console.log("catch the error: " + error)
    })
 */
/* 
let producto = {
    fabricante  : 'FAB1'
    ,nombre     : 'P1'
    ,precio     : 45
}

let entradaAlamacen = {
    existencias : 50
    ,pasillo    : 37
    ,estanteria : 17
    ,balda      : 3
}

//Insertar doc a la bbdd
mongo.connect(urlMongo, { useNewUrlParser: true }, function(err, con){
    if(err){
        console.log(err)
        return
    }
    let bbdd = con.db('bbdd')
    let coleccionProductos = bbdd.collection('productos')
    
    coleccionProductos.insertOne(producto, function(error, resultadoInsert){
        if(error){
            console.log(error)
            return
        }
        console.log('Producto insertado')
        console.log('Id: ' + resultadoInsert.insertedId)
        
        entradaAlamacen.idProducto = resultadoInsert.insertedId
        let coleccionAlmacen = bbdd.collection('almacen')
        coleccionAlmacen.insertOne(entradaAlamacen, function(er, resultadoAlmacen){
            if(er){
                console.log(er)
                return
            }
            console.log('Almacen insertado')
            console.log('Id: ' + resultadoAlmacen.insertedId)
        }) //Almacen

    }) //Producto

}) //Conexion
 */


/**
 * Descripción 
 * Método 
 * [@method connect]
 */
 

/* Insertar en almacen y productos con promesas */
let producto = {
    _id         : 5
    ,fabricante : 'FAB2'
    ,nombre     : 'P2'
    ,precio     : 21
}

let entradaAlmacen = {
    existencias : 25
    ,pasillo    : 7
    ,estanteria : 10
    ,balda      : 15
}

let bbdd = null

/**
 * @param  {} urlMongo
 * @param  {true}} {useNewUrlParser
 */
mongo.connect(urlMongo, { useNewUrlParser: true })
.then( (con) => {
    bbdd = con.db('bbdd')
    let coleccionProductos = bbdd.collection('productos')
    return coleccionProductos.insertOne(producto)
})
.then( (resultadoInsertProductos) => {
    entradaAlmacen.idProducto = resultadoInsertProductos.insertedId
    let coleccionAlmacen = bbdd.collection('almacen')
    return coleccionAlmacen.insertOne(entradaAlmacen)
})
.then( (resultadoInsertAlmacen) => {
    console.log('Insertado almacen')
    console.log(resultadoInsertAlmacen.insertedId)
})
.catch( (error) => {
    console.log(error)
})
