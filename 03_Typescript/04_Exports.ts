exports class Calculadora{
    sumar(s1: number, s2: number): number {
        return s1 + s2
    }
}


exports class Saludador{
    saludar(nombre: string) {
        console.log('Hola ' + nombre)
    }
}



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

saludar('Mateo')


