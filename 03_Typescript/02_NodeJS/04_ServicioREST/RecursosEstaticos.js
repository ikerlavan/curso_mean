let fs = require("fs")

exports.leerRecurso = leerRecurso

function leerRecurso(request, response){

    let ext = request.url.split('.')[1]
    console.log(request.url.split('.')[1])
    let extension = ext
    if(ext.indexOf('?')!=-1){
        extension = ext.split('?')[0]
    }

    console.log( extension )

    let mimeTypes = {
        html : {type:'text/html',folder:'recursos'}
        ,css : {type:'text/css',folder:'estilos'}
        ,js : {type:'application/js',folder:'js'}
    }

    switch( extension ){
        case 'ico' : 
            break
        case 'css' : 
            ofrecerRecurso(request, response, mimeTypes[extension])
            break
        case 'js' :
            ofrecerRecurso(request, response, mimeTypes[extension])
            break
        default :
            ofrecerRecurso(request, response, mimeTypes[extension])
            break
    }
}

function montarError(codigo, texto, response){
    let html = 
        `<html>
            <head>

            </head>
            <body>
                <h1>Error ${codigo}</h1>
                <p>${texto}</p>
            </body>
        </html>`

    response.writeHead(codigo, {
        'Content-Type':'text/html; charset=utf-8'
    })
    response.end(html)

}

function ofrecerRecurso(request, response, extension){
    console.log('URL ' + request.url)
    console.log('Folder ' + extension.folder)
    console.log('IndexOf ' + request.url.indexOf(extension.folder))
    let ruta = request.url.indexOf(extension.folder)<0?extension.folder+request.url:request.url.substring(1,request.url.length)
    
    if(ruta.indexOf('?')!=-1){
        let array = ruta.split('?')
        console.log(array)
        ruta = array[0]
    }
    console.log('La ruta es ' + ruta + '.')
    fs.readFile(ruta, function(err, data){
        if(err){
            console.log("Error", err)
            montarError(404, err, response)
            return
        }
        response.writeHead(200, {
            'Content-Type': extension.type + '; charset=utf-8'
        })
        response.end(data)
    })
}