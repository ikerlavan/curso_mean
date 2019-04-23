function crearObjeto(id){
    let formulario = document.getElementById(id)||getUnicoFormulario();
    //let arr = formulario.getElementsByTagName('input');
    let obj = {};
    for(item of formulario.elements){
        if('button' === item.type){
            continue;
        }
        obj[item.name] = item.value;
    }
    console.log('Biblioteca');
    console.log(obj);
    return obj;
}

function vaciarFormulario(id){
    let formulario = document.getElementById(id)||getUnicoFormulario();
    for(item of formulario.elements){
        //console.log(item.type);
        if('button' === item.type){
            continue;
        }
        item.value = '';
    }
}

function getUnicoFormulario(){
    return document.getElementsByTagName('form')[0];
}


function validarFormulario(id){
    let formulario = document.getElementById(id)||getUnicoFormulario();
    let ok = true;
    for(item of formulario.elements){
        if('button' === item.type){
            continue;
        }
        if(item.value.trim() === ''){
            ok = false;
        }
    }
    return ok;
}

function rellenarFormulario(obj, id){
    let formulario = document.getElementById(id)||getUnicoFormulario();
    for(campo of formulario.elements){
        campo.value = obj[campo.id];
    }
}

 /* let params = {
    objetos         : arr
    ,columnas       : [
        {type : 'hidden', nombre : '#', index : 'id'}
        ,{nombre : 'Nombre', index : 'nombre'}
        ,{nombre : 'Dirección', index : 'direccion'}
        ,{nombre : 'Teléfono', index : 'telefono'}
        ,{nombre : 'Correo E', index : 'email'}
    ]
    ,idContenedor   : 'containerTabla'
    ,id             : {
        tabla : 'tabla'
    }
    ,estilos        : {
        tabla       : 'table .table-striped'
        ,cabecera   : ''
        ,filasPares : 'background-color:rgba(0,0,0,.05)'
    }
} */

function crearTabla(params){

    let contactos            = params.objetos
        ,columnas            = params.columnas
        ,estilo              = params.estilos
        ,idContenedor        = params.idContenedor
        ,ids                 = params.id
        ,evento              = params&&params.evento&&params.evento.click;
    
    let arr                  = [];
    
    let contenedor          = document.getElementById(idContenedor);
    let tabla               = document.createElement('table');
    let cabecera            = document.createElement('thead');
    let fila                = document.createElement('tr');
    let celda               = null;
    let tablaBody           = document.createElement('tbody');



    tabla.setAttribute('class', estilo?estilo.tabla:'table');
    tabla.setAttribute('id', ids?ids.tabla:'tabla');
    
    function setColumna(fila, nombre){
        celda   = document.createElement('th');
        celda.setAttribute('scope','col');
        celda.appendChild(document.createTextNode(getValorConLetraCapital(nombre+"")));
        fila.appendChild(celda);
    }
    
    if(!columnas){
        for(let col in contactos[0]){
            arr.push(col);
            setColumna(fila, col);
        }
    }else{
        for(let a=0; a<columnas.length;a++){
            let col = columnas[a];
            arr[a]  = col.index;
            setColumna(fila, col.nombre);
        }
    }
    cabecera.appendChild(fila);
    tabla.appendChild(cabecera);
    
    //Hasta aquí estamos rellenando la cabecera
    for(let a=0; a<contactos.length;a++){
        let filaC   = document.createElement('tr');
        let obj     = contactos[a];
        if(a%2===0){
            filaC.setAttribute('style',estilo?estilo.filasPares:'');
        }
        for(indice of arr){
            let ff = null;
            if(typeof obj[indice] === 'function'){
                continue;
            }
            ff = document.createElement("td");
            ff.appendChild(document.createTextNode(obj[indice]));
            filaC.appendChild(ff);
            /* Gestión de eventos */
            if(evento){
                filaC.onclick = function(){evento(obj)};
            }
            
        }
        tablaBody.appendChild(filaC);
    }
    tabla.appendChild(tablaBody);

    if(contenedor){
        contenedor.innerHTML    = '';
        contenedor.appendChild(tabla);
    }else{
        return tabla;
    }
    
}

function getValorConLetraCapital(cadena){
    let capital = cadena.charAt(0).toUpperCase();
    capital = capital + cadena.substring(1,cadena.length);
    return capital;
}

function peticionAjaxGenerica(parametros){
    let url     = parametros.url;
    let metodo  = parametros.metodo?parametros.metodo:'GET';

    if(parametros.asincrono == null || typeof parametros.asincrono == 'undefined'){
        parametros.asincrono = true;
    }
    let asincrono = parametros.asincrono?parametros.asincrono:true;
    
    let contentType = parametros.contentType?parametros.contentType:null
    let body = parametros.body
    let exito = parametros.success?parametros.success:''
    let error = parametros.error?parametros.error:''

//console.log(parametros.success());

    let ajax = new XMLHttpRequest();

    ajax.open(metodo
              ,url
              ,asincrono);

    ajax.onload     = parametros.success;
    ajax.onerror    = error;
    if(contentType){
        ajax.setRequestHeader('Content-type', contentType);
    }
    if(body){
        console.log(body);
        ajax.send(body);
    }
    
}