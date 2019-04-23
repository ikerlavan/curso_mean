let mongo = require('mongodb')

//Conectando con la bbdd
let urlMongo = 'mongodb://localhost:27017'

let con = null
/* exports.conectarBBDD = function(funcion){
    mongo.connect(urlMongo
                  ,{ useNewUrlParser: true }
                  ,function(error, con){
                        if(error){
                            console.log("Error al conectar", error)
                            process.exit(1)
                        }
                        conexion = con.db('bbdd')
                        funcion()
                  })
} */

exports.conectarBBDD = function(funcion){
    console.log('Conectando con la BBDD')
    mongo.connect(urlMongo, { useNewUrlParser: true })
    .then( (conexion) => {
        console.log('Conexión establecida')
        con = conexion.db('bbdd')
        funcion()
    })
    .catch( (error) => {
        console.log("Error al conectar", error)
        process.exit(1)
    })
}

/**
 * @returns connect
 */
exports.obtenerConexion = function(){
    return con 
}