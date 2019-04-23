let mongoDBUtil = require('./mongoDBUtil')

exports.listarAlmacen = ( ( ) => {
    console.log('Entro en listarProductos')
    return mongoDBUtil.obtenerConexion()
                    .collection('almacen')
                    .find().toArray()
})

exports.buscarAlmacen = ( ( id ) => {
    console.log("Entro en buscarProductos con id: ",id)
    console.log(typeof id)
    return mongoDBUtil.obtenerConexion()
                    .collection('almacen')
                    .findOne({_id : id})
})

exports.buscarAlmacenPorProducto = ( ( idProducto ) => {
    console.log("Entro en buscarProductos con id: ",idProducto)
    console.log(typeof id)
    return mongoDBUtil.obtenerConexion()
                    .collection('almacen')
                    .findOne({idProducto : idProducto})
})

exports.insertAlmacen = ( almacen => {
    return mongoDBUtil.obtenerConexion().collection('almacen').insertOne(almacen)
})

exports.modifAlmacen = ( (almacen ) => {
    return mongoDBUtil.obtenerConexion().collection('almacen').find(almacen)
})

exports.deleteAlmacen = ( (almacen ) => {
    return mongoDBUtil.obtenerConexion().collection('almacen').insertOne(almacen)
})