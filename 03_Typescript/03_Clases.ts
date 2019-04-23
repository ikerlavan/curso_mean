/* Clases */

class Avion {
    modelo: string
    fabricante: string
    year: number

    toString(): string {
        return this.fabricante + ", " + this.modelo + ", " + this.year
    }
}

let avion1 = new Avion()
let avion2: Avion = new Avion()

avion2.modelo = 'Concorde'
avion2.fabricante = 'Uno desconocido'
avion2.year = 1234

console.log(avion2.toString())

class Informe {

}

/**
 * Modificadores de acceso a los atributos de las clases
 * 
 * public
 * protected
 * private
  */

class GestorInformes {

    private conexion = null

    public generarInforme(parametros): Informe {

        this.ejecutarConsultas(parametros)

        this.realizarCalculos(parametros)

        return this.crearInforme()
    }

    private ejecutarConsultas(parametros) {

    }

    private realizarCalculos(parametros) {

    }

    private crearInforme(): Informe {

        return new Informe()
    }

}

let gestorInformes: GestorInformes = new GestorInformes()
console.log(gestorInformes.generarInforme('param'))

/* CONSTRUCTORES */
class Disco {

    public titulo: string
    public grupo: string
    public year: number

    public constructor(titulo: string, grupo: string, year: number) {
        this.titulo = titulo
        this.grupo = grupo
        this.year = year

    }

}

let disco1: Disco = new Disco('Made in Japan', 'Deep Purple', 1975)

//Atajo de asignacion de atributos en la clase

/* CONSTRUCTORES */
class Pelicula {

    public constructor(
                        public titulo       : string
                        ,public director    : string
                        ,public id          : number
                        ,public year        : number
                        ,public genero      : string) {


    }

    toString():string{

        return this.titulo + ", " + this.director + ", " + this.id + ", " + this.year + ", " + this.genero
    }

}

let pelicula:Pelicula = new Pelicula('','',null,null,'')
console.log(pelicula)
console.log(pelicula.toString())


/* CONSTRUCTORES */
class Ciudad {
    public constructor(
                        public nombre       : string = ''
                        ,public habitantes  : number = 0
                        ,public id          : number = null) {
    }
}

let getafe:Ciudad = new Ciudad('Getafe', 180000, 1)

let ciudad:Ciudad = new Ciudad()


/* Herencia */
