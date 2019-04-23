//FileSystem. Viene con Node
let fs = require("fs")

//////////////////////////////////
//lectura síncrona de un fichero//
//////////////////////////////////
let f1 = fs.readFileSync("recursos/fichero1.txt")
let f2 = fs.readFileSync("recursos/fichero2.txt")
let f3 = fs.readFileSync("recursos/fichero3.txt")

let contenido = f1.toString() + f2.toString() + f3.toString()

let todosFicheros = fs.writeFileSync("recursos/ficheroCompleto.txt", f1 + f2 + f3)



///////////////////////////////////
//lectura asíncrona de un fichero//
///////////////////////////////////
function ficheroLeido(err, data){

}

fs.readFile("recursos/fichero1.txt", function(err1, data1){
    if(err1){
        console.log("Error", err1)
        return
    }
    fs.readFile("recursos/fichero2.txt", function(err2, data2){
        if(err2){
            console.log("Error", err2)
            return
        }
        fs.readFile("recursos/fichero3.txt", function(err3, data3){
            if(err3){
                console.log("Error", err3)
                return
            }
            console.log(data1.toString() + data2.toString()+data3.toString())
            fs.writeFile("recursos/ficheroCompletoAsync.txt", data1+data2+data3 , function(error){
                if(error){
                    console.log(error)
                    return
                }
            })
        })
    })
})