let mongoose = require("mongoose")


let urlMongo = 'mongodb://localhost:27017/bbdd'


mongoose.connect(urlMongo, { useNewUrlParser: true })
.then( ok => {
    //pruebas()
    
})
.catch(error => console.error(error))

let clienteSchema = mongoose.Schema({
    nombre : String,
    direccion : String,
    telefono : String,
    correoE : String,
    idioma : String
})
let Cliente = mongoose.model('clientes', clienteSchema);

function pruebas(){

    let clienteSchema = mongoose.Schema({
        nombre : String,
        direccion : String,
        telefono : String,
        correoE : String,
        idioma : String
    })
    
    //Sin let es una variable global
    Cliente = mongoose.model('clientes', clienteSchema);
    
    /* function Cliente(){
        nombre = "",
        direccion = "L.A.",
        telefono = "555",
        correoE = "equipoA@hotmail.com",
        idioma = "EN",
    }
     */
    
    let cliente = new Cliente()
    
    cliente.nombre = "Hannibal Smith"
    cliente.direccion = "L.A."
    cliente.telefono = "555"
    cliente.correoE = "equipoA@hotmail.com"
    cliente.idioma = "EN"
    
    cliente.save()
    .then( clienteInsertado => console.log("Cliente insertado: " + clienteInsertado) )
    .catch( error => { console.error(error) })
    
    
    let cli = {
        nombre : "Groucho Marx",
        direccion : "C/Tal",
        telefono : "555",
        correoE : "groucho@yahoo.com",
        idioma : "EN",
    }
    
    let cliente2 = new Cliente(cli)
    cliente2.save()
    .then( clienteInsertado => { console.log("Cliente insertado: " + clienteInsertado) } )
    .catch( error => { console.error(error) })
    
    
    let cliente3 = new Cliente()
    cliente3.nombre = "BORRAR"
    cliente3.save()
    .then( clienteInsertado => { console.log("Cliente insertado: " + clienteInsertado) } )
    .catch( error => { console.error(error) })
    
    
    

}



function insertarClienteMG(cliente){
    return new Promise(function (resolve, reject) {
        let clienteMG = new Cliente(cliente)
        clienteMG.save()
    })
    
}
console.log(Cliente)
//Buscamos a través del modelo de mongoose
buscarClientePorId('5cc1d49aef8b153bb4358694')
.then( cli => console.log(cli) )
.catch( error => console.error(error) )


function buscarClientePorId(id){
    return new Promise(function (resolve, reject) {
        /* let clienteMG = new Cliente(cliente)
        clienteMG.save() */

        resolve(Cliente.findById(id))
    })
}

borrarClientePorId('5cc1d49aef8b153bb4358694')
.then( cli => console.log(cli) )
.catch( error => console.error(error) )
function borrarClientePorId(id){
    return new Promise(function (resolve, reject) {
        let res = Cliente.findById(id).remove()
        resolve(res)
    })
}