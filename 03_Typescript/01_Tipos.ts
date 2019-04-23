import {Saludador, Calculadora} from './04_Exports'

// instalar transpilador para convertir TypeScript en javascript
// npm install -g typescript

let numero: number = 5
let texto: string = 'hola'
let activo: boolean = true


let noSe: any
noSe = 5
noSe = '4'

//Array tipados
let numeros1: [] //Array no tipado, sin inicializar
let numeros2: [] = [] //Array no tipado e inicializado
let numeros3 = [] //guardamos un array en esta variable
let numeros4: number[] = []
numeros4[0] = 1


/*
FUNCIONES
*/
function sumar(s1: number, s2: number): number {
    return s1 + s2
}

console.log(sumar(10, 12))
/**
 * No hay parámetros variables en typescript
 */
//console.log(sumar(10,12,12)) 

function saludar(nombre: string) {
    console.log('Hola ' + nombre)
}

Calculadora.saludar('Mateo')


