let mongoDBUtil = require('./MongoDBUtil')
let ObjectId = require('mongodb').ObjectId

exports.listarProductos = ( ( ) => {

    return mongoDBUtil.obtenerConexion().collection('productos').aggregate([
        {
          $lookup:
          {
            from: 'almacen',
            localField: '_id',
            foreignField: 'idProducto',
            as: 'almacen_data'
          }
       }
     ]).toArray()

    /* console.log('Entro en listarProductos')
    return mongoDBUtil.obtenerConexion()
                    .collection('productos')
                    .find().toArray() */
})

exports.buscarProducto = ( ( id ) => {
    console.log("Entro en buscarProductos con id: ", id)
    console.log(typeof id)

    return mongoDBUtil.obtenerConexion().collection('productos').aggregate([
        {
          $lookup:
          {
            from: 'almacen',
            localField: '_id',
            foreignField: 'idProducto',
            as: 'almacen_data'
          }
       },{
           $match : 
            { _id : new ObjectId(id) }
        }
     ]).toArray()
})

exports.insertProducto = ( (producto ) => {
    console.log("Negocio", producto)
    return mongoDBUtil.obtenerConexion().collection('productos').insertOne(producto)
})

exports.modifProducto = ( (producto ) => {
    return mongoDBUtil.obtenerConexion().collection('productos').find(producto)
})

exports.deleteProducto = ( (producto ) => {
    return mongoDBUtil.obtenerConexion().collection('productos').insertOne(producto)
})