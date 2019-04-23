var primerBlanco = /^ /;
var ultimoBlanco = / $/;
var variosBlancos = /[ ]+/g;
var blancosHtml = /(&nbsp;)+/g;

(function ($) {
    var last, diff, ini;


    $('#init').click(function (event) {

        ini = event.timeStamp;

    });

    $('#end').click(function (event) {
        var tiempoTranscurrido = (event.timeStamp - ini) / 1000 / 60;
        var palabras = contar();
        // Si en x minutos has leído x palabras, en un minuto cuántas palabras lees?
        console.log(tiempoTranscurrido + " minutos");
        console.log(palabras + " palabras");
        var palabrasTiempo = Math.round(palabras / tiempoTranscurrido);
        console.log(palabrasTiempo + " palabras por minuto");
        
        //Hay que colocarlo y maquetarlo
        $(this).parent().parent().append($("<div>").text(palabrasTiempo + " palabras por minuto"));
        


    });

    function contar() {
        return limpiaTexto($("#texto").text()).split(" ").length;
    };

    function limpiaTexto(texto) {
        return texto.replace(variosBlancos, " ").replace(blancosHtml, " ").replace(primerBlanco, "").replace(ultimoBlanco, "").replace("\n", "").replace("\t", "");
    }

})(jQuery);



var html = "<p><b>LA VERDADERA JUSTICIA</b></p>"+
"Hubo una vez un califa en Bagdad que deseaba sobre todas las cosas ser un soberano justo."+
"Indag&oacute; entre los cortesanos y sus s&uacute;bditos"+
"y todos aseguraron que no exist&iacute;a califa m&aacute;s justo que &eacute;l.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -&iquest;Se expresar&aacute;n as&iacute; por temor? -se"+
"pregunt&oacute; el califa.<br />"+
"Entonces se dedic&oacute; a recorrer las ciudades disfrazado de pastor y jam&aacute;s"+
"escuch&oacute; la menor murmuraci&oacute;n contra &eacute;l.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Y sucedi&oacute; que tambi&eacute;n el califa de Ranchipur"+
"sent&iacute;a los mismos temores y realiz&oacute; las mismas"+
"averiguaciones, sin encontrar a nadie que criticase su justicia.<br />"+
"-Puede que me alaben por temor -se dijo-. Tendr&eacute; que indagar lejos de mi"+
"reino.<br /><br />"+
""+
"Quiso el destino que los lujosos carruajes de ambos califas fueran a encontrarse en un estrecho"+
"camino.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -&iexcl;Paso al califa de Bagdad!"+
"-pidi&oacute; el visir de &eacute;ste.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -&iexcl;Paso al califa de"+
"Ranchipur! .-exigi&oacute; el del segundo.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Como ninguno quisiera ceder,"+
"los visires de los dos soberanos trataron de encontrar una f&oacute;rmula para salir del"+
"paso.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -Demos preferencia al de m&aacute;s edad"+
"&ndash;acordaron.<br />"+
"Pero los califas ten&iacute;an los mismos a&ntilde;os, igual amplitud de posesiones e"+
"id&eacute;nticos ej&eacute;rcitos. Para zanjar la cuesti&oacute;n, el visir del califa de Bagdad"+
"pregunt&oacute; al otro:<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -&iquest;C&oacute;mo es de justo tu amo?<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -Con los buenos es bondadoso -replic&oacute; el visir de"+
"Ranchipur-, justo con los que aman la justicia e inflexible con los duros de"+
"coraz&oacute;n.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -Pues mi amo es suave con los inflexibles, bondadoso con"+
"los malos, con los injustos es justo, y con los buenos a&uacute;n m&aacute;s bondadoso"+
"-replic&oacute; el otro visir.<br />"+
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Oyendo esto el califa de"+
"Ranchipur, orden&oacute; a su cochero apartarse humildemente, porque el de Bagdad era m&aacute;s"+
"digno de cruzar el primero, especialmente por la lecci&oacute;n que le hab&iacute;a dado de lo"+
"que era la verdadera justicia."+
"</p>";