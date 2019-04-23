/* Clases */
var Avion = /** @class */ (function () {
    function Avion() {
    }
    Avion.prototype.toString = function () {
        return this.fabricante + ", " + this.modelo + ", " + this.year;
    };
    return Avion;
}());
var avion1 = new Avion();
var avion2 = new Avion();
avion2.modelo = 'Concorde';
avion2.fabricante = 'Uno desconocido';
avion2.year = 1234;
console.log(avion2.toString());
var Informe = /** @class */ (function () {
    function Informe() {
    }
    return Informe;
}());
/**
 * Modificadores de acceso a los atributos de las clases
 *
 * public
 * protected
 * private
  */
var GestorInformes = /** @class */ (function () {
    function GestorInformes() {
        this.conexion = null;
    }
    GestorInformes.prototype.generarInforme = function (parametros) {
        this.ejecutarConsultas(parametros);
        this.realizarCalculos(parametros);
        return this.crearInforme();
    };
    GestorInformes.prototype.ejecutarConsultas = function (parametros) {
    };
    GestorInformes.prototype.realizarCalculos = function (parametros) {
    };
    GestorInformes.prototype.crearInforme = function () {
        return new Informe();
    };
    return GestorInformes;
}());
var gestorInformes = new GestorInformes();
console.log(gestorInformes.generarInforme('param'));
/* CONSTRUCTORES */
var Disco = /** @class */ (function () {
    function Disco(titulo, grupo, year) {
        this.titulo = titulo;
        this.grupo = grupo;
        this.year = year;
    }
    return Disco;
}());
var disco1 = new Disco('Made in Japan', 'Deep Purple', 1975);
//Atajo de asignacion de atributos en la clase
/* CONSTRUCTORES */
var Pelicula = /** @class */ (function () {
    function Pelicula(titulo, director, id, year, genero) {
        this.titulo = titulo;
        this.director = director;
        this.id = id;
        this.year = year;
        this.genero = genero;
    }
    Pelicula.prototype.toString = function () {
        return this.titulo + ", " + this.director + ", " + this.id + ", " + this.year + ", " + this.genero;
    };
    return Pelicula;
}());
var pelicula = new Pelicula('', '', null, null, '');
console.log(pelicula);
console.log(pelicula.toString());
