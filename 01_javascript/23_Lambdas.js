/*
Funciones flecha
*/
let f1 = function(){
    console.log("Hola")
}

let f1Bis = () => {
    console.log("Hola 2")
}



let coche = {
    marca       : 'Peugeot'
    ,modelo     : '306 XND'
    ,arrancar   : function(){
        //this dentro de una lambda tiene el mismo valor que this en la función que la contiene
        let f = () => console.log("Soy el peaso de carro " + this.marca + this.modelo)
        f()
    }
}

