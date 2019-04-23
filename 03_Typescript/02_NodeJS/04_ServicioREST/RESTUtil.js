
exports.crearObjetoError = (codigo, mensaje, descripcion) => {

    if(!codigo || !mensaje){
        return 
    }

    let error =  {
        codigo          : codigo
        ,mensaje        : mensaje
    }

    if(descripcion){
        error.descripcion = descripcion
    }

    return error
}