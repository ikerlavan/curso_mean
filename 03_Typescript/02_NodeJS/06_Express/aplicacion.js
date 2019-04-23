let express = require('express')

//Creamos el servidor
let app = express()

let bodyParser = require('body-parser')
let jsonBP = bodyParser.json()
app.use(jsonBP)


//Recursos estáticos
app.use(express.static('./recursos'))

//sirviendo contenido default
app.get('/', (request, response)=>{

    /*     response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(JSON.stringify(coche)) */
    
    let path = require('path')
    console.log(__dirname)

    //Esta linea sustituye a las 2 anteriores
    response.sendFile(path.join(__dirname, 'recursos/agenda.html'))

})

app.get('/coches', (request, response)=>{

    let coche = request.body
    coche._id = 25

    /*     response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.end(JSON.stringify(coche)) */
    
    //Esta linea sustituye a las 2 anteriores
    response.json(coche)

})

app.get('/saludar', (request, response) => {
    //response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    response.end('<h1>Hooooola</h1>')
})

/**
 * @description
 * /sumar?s1=2&s2=65
 */
app.get('/sumar', (request, response) => {
    //response.setHeader('Content-Type', 'text/html; charset=utf-8')
    
    let uno = new Number(request.query.s1) 
    let dos = new Number(request.query.s2)
    let r = uno+dos
    
    response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    response.end(''+r)
})

/*
get /actores/XXX/peliculas/genero/YYY
*/
app.get('/actores/:idActor/peliculas/generos/:idGenero', (request, response) => {
    let idActor = request.params.idActor
    let idGenero = request.params.idGenero

    response.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    response.end(`Las películas de ${idActor} del género ${idGenero}`)
})


app.listen(5000, () => {
    console.log('Esperando peticiones ...')
})



