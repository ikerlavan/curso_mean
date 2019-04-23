
interface Churreria {
    id          : number,
    nombre      : string,
    direccion   : string,
    telefono    : string,
}

let churreria: Churreria
let churreria1: Churreria = {
    id          : 5,
    nombre      : 'La castiza',
    direccion   : '13 rue del percebe',
    telefono    : '666'
}

let json = `{
    "id"          : 5,
    "nombre"     : 'La castiza',
    "direccion"   : '13 rue del percebe',
    "telefono"    : '666'
}`


let ch = JSON.parse(json)
let churreria2:Churreria = ch

console.log(churreria2.nombre)

function imprimirChurreria(churreria:Churreria):void{
    console.log(churreria)
}

imprimirChurreria(churreria2);
