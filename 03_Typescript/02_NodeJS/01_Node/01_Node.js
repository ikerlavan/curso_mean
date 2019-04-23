let http = require('http')

console.log('=============================================')
console.log('Node JS')

let servidor = http.createServer(function (request, response) {
    let html =
        "<html>"
        + "<head>"
        + "<title>Ejemplo NodeJS</title>"
        + "</head>"
        + "<body>"
            + "<marquee>"
                + "<h1>Presentaci&oacute;n con NodeJS</h1>"
                + "<p>Encantado de conocerte</p>"
            + "</marquee>"
        + "</body>"
        + "</html>"

    switch (request.url){
        case '/series' : 
            console.log(request.url)
            response.writeHead(200, {
                'Content-Type':'application/json; charset=utf-8'
            })
            response.end(JSON.stringify(listarSeries()))
            break
        case '/seriesHTML' : 
            console.log(request.url)
            response.writeHead(200, {
                'Content-Type':'text/html; charset=utf-8'
            })
            response.end(listarSeriesHTML())
            break
        case '/' :
            console.log(request.url)
            response.writeHead(200, {
                'Content-Type':'text/html; charset=utf-8'
            })
            response.end(html)
            break
    }
    
    //response.end(JSON.stringify(listarSeries()))
    //response.write(JSON.stringify(listarSeries()));

})
servidor.listen(2000)

function listarSeries(){
    return[
        'The Wire'
        ,'Black mirror'
        ,'Terminator'
        ,'The A Team'
        /*,''
        ,''*/
    ]
}

function getHTML(){
    return
    "<html>"
    + "<head>"
    + "<title>Ejemplo NodeJS</title>"
    + "</head>"
    + "<body>"
        + "<marquee>"
        + "<h1>Presentaci&oacute;n con NodeJS</h1>"
        + "<p>Encantado de conocerte</p>"
        + "</marquee>"
    + "</body>"
    + "</html>"
}

function listarSeriesHTML(){
    let html = "<html>"
        + "<head>"
        + "<title>Ejemplo NodeJS</title>"
        + "</head>"
        + "<body>"
            + "<marquee direction='down'>"
            + "<h1>Presentaci&oacute;n con NodeJS</h1>"
            + "<p>Encantado de conocerte</p>"
            + "</marquee>"
            + "<table border='1' align='center'><thead><tr><th>Series</th></tr>"

    for(serie of listarSeries()){
        html = html + "<tr><td>" + serie + "</td></tr>"
    }

    html = html + "</table></body>"
            + "</html>"
    return html
}
