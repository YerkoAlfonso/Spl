
var dbLocal = new PouchDB("pilotos_bd");

var Keybd= 'acenlynedleaterilusursee'
var Passwordbd= 'f3b731a39b07348a6a4b94ef65284084b19da085'
  var dbRemote = new PouchDB("https://"+Keybd+":"+Passwordbd+"@yerkoalfonso.cloudant.com/pilotos_bd");

var datosDBLocal=[];
var datosDBRemoto=[];

dbLocal.sync(dbRemote, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});
dbRemote.sync(dbLocal, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});




angular.module('app.controllers', [])
  
.controller('vueloOrdinarioCtrl',
function ($scope, $filter,$ionicHistory) {



var bd_dianoche ="";

var bd_pilotos =0;

var  bd_n ="";
var bd_origen = "";
var bd_destino = "";
 var bd_fecha ="";
 var bd_vuelo ="";
 var bd_ipsv ="";
 var bd_tpsu ="";
 var bd_psv ="";
 var bd_pd ="";
 var bd_pps ="";
 var bd_alerta ="Sin Alerta";
 var n_pilotos =0;

$scope.lista = [{"id": 0 , "texto":"2 pilotos"}];


$scope.cantidadPilotos = function(id){

if(id.id == 0){

  n_pilotos =2;
}
/*if(id.id  ==1 ){
  n_pilotos = 3;
}

if(id.id = 2){
  n_pilotos = 4;
}
*/
}


 
$scope.calcularHorasServicio = function(cxt){

//Inicio de Funcion calcular

var dianoche2 = "";

if(n_pilotos ==0 ){

  n_pilotos=2;
}

//sE DEFINIIO LA VARIABLE DIANOCHE
if(cxt.dia_noche){

  dianoche2 = "Noche";
}
else
{
  dianoche2 = "Dia"
}




console.log("N" + n_pilotos) ;
bd_pilotos = n_pilotos;




$scope.transcurridoHoras =0;

var horaipsv = $filter('date')(cxt.ipsv, 'HH:mm','UTC')
console.log(horaipsv);


var horatpsu = $filter('date')(cxt.tpsu, 'HH:mm','UTC')
console.log(horatpsu);

var horai= " ";
var horafin ="";


horai = horaipsv.substr(0,2);



 horafin = horatpsu.substr(0,2);


console.log(horai);

console.log(horafin);




//Hora
  var inicioHoras = parseInt(horai);
   var finHoras = parseInt(horafin);
var finHoras2 = parseInt(horafin);

  //Minutos

var inicioMinutos = parseInt(horaipsv.substr(3,2));
  var finMinutos = parseInt(horatpsu.substr(3,2));
var transcurridoMinutos = finMinutos - inicioMinutos;
if(finHoras<inicioHoras){

  finHoras = finHoras + 24;
}


var timetrans = finHoras - inicioHoras;



if(transcurridoMinutos < 0){


transcurridoMinutos = transcurridoMinutos + 60;
timetrans --;
}



var horasdif =  finHoras - inicioHoras;

  if(horasdif<0){

    horasdif = horasdif * -1;
  }


var stringtiempotrans ="";
var strinminutos ="";

if(timetrans<0){

timetrans = timetrans *-1;

}

if(timetrans<10){

  stringtiempotrans = "0"+ timetrans.toString();
}
  else
  {
stringtiempotrans = timetrans.toString();

  }

  if(transcurridoMinutos <10){

    strinminutos = "0" + transcurridoMinutos.toString();

  }
  else
  {

strinminutos = transcurridoMinutos.toString();


  }
  $scope.transcurridoHoras =  stringtiempotrans +":" +  strinminutos;



// Comparativa para PD

var horasdesc =0;
if(horasdif < 8){

horasdesc =10;

}
if(horasdif == 8){

horasdesc =12;

}
if(horasdif == 9){

horasdesc =13;

}
if(horasdif == 10){

horasdesc =14;

}
if(horasdif == 11){

horasdesc =15;

}
if(horasdif == 12){

horasdesc =15;

}
if(horasdif == 13){

horasdesc =16;

}
if(horasdif == 14){

horasdesc =17;

}
if(horasdif == 15){

horasdesc =17;

}
if(horasdif == 16){

horasdesc =18;

}
if(horasdif == 17){

horasdesc =19;

}
if(horasdif == 18){

horasdesc =20;

}
if(horasdif == 19){

horasdesc =22;

}
if(horasdif >= 20){

horasdesc =24;

}

var horaspps2 =horasdesc + finHoras2;
console.log("Fin" + finHoras2);
console.log("des" +  horasdesc);
console.log(horaspps2);

if(horaspps2 > 23){

  horaspps2 = horaspps2 -24;
  console.log(horaspps2);

}

var hpps = horaspps2 -3
if(hpps < 0){

hpps = hpps * -1;

}
var stringhppps = "";
if(hpps <10){
stringhppps = "0"+ hpps.toString();

}
else
{

stringhppps = hpps.toString();;

}

var strinfinmin ="";

if(finMinutos<10){

strinfinmin = "0"+ finMinutos.toString();

}
else
{

strinfinmin = finMinutos.toString();;


}
$scope.horaspps = stringhppps +":"+ strinfinmin ;
$scope.horaspd = horasdesc;

var exce =0;
var alerta ="";
if(n_pilotos == 2 ){
  if(cxt.dia_noche){
    if(timetrans > 12){
      exce = timetrans -12;
      alerta = "Se ha excedido en " + exce + " horas";
    }
   
    } else
    {
      if(timetrans>14){
console.log("aqui"+timetrans);
           exce = timetrans -14;
      alerta = "Se ha excedido en " + exce +" horas";

      }

  }


}

if(n_pilotos == 3 & timetrans > 18){
    exce = timetrans -18;
      alerta = "Se ha excedido en " + exce + " horas";
}

if(n_pilotos == 4 & timetrans > 20){
     exce = timetrans -20;
      alerta = "Se ha excedido en " + exce + " horas";
}

$scope.alerta_h = alerta;

// conversion a chile

var horacl = inicioHoras -3;
var horafincl = finHoras2 -3;

var minucero ="";
var minfincero ="";
var stringhoral = "";
var stringhoraclfin ="";
if(horacl <10){

  stringhoral = "0" + horacl.toString();

}
else
{
stringhoral = horacl.toString();

}
if(horafincl <10)
{
stringhoraclfin = "0" + horafincl.toString();

}
else
{

stringhoraclfin = horafincl.toString();

}

if(inicioMinutos<10){
minucero = "0" + inicioMinutos.toString();

}else
{

minucero = inicioMinutos;

}

if(finMinutos <10){

  minfincero = "0" + finMinutos.toString();
}else{

  minfincero = finMinutos.toString();
}



{}


//variables para BD
bd_dianoche = dianoche2;
bd_pilotos = n_pilotos;
bd_n = cxt.n;
bd_origen = cxt.origen;
bd_destino = cxt.destino;
bd_fecha = $filter('date')(cxt.fecha, 'dd/MM/yyyy','UTC');
bd_vuelo = cxt.vuelo;
bd_ipsv = stringhoral.toString()+":" + minucero;
bd_tpsu = stringhoraclfin.toString() + ":" + minfincero ;
bd_psv = stringtiempotrans.toString() + ":00";
bd_pd =  horasdesc ;
bd_pps = stringhppps +":"+ strinfinmin ;
bd_alerta = alerta;
 

console.log(bd_dianoche + "-" + bd_pilotos + "-" + bd_n + "-" +bd_fecha + "-" +bd_vuelo + "-" +bd_ipsv + "-" +bd_tpsu+ "-" + bd_psv + "-" + bd_pd + "-" + bd_pps);

}

var userBd = localStorage.getItem("username");
$scope.GuardarDatos = function(){


var datefr = new Date();
var id =$filter('date')(datefr, 'ddMMyyyyHHmmsss','UTC')

        var tipo = "Narrow Body";
var vp = {

"_id":"vuelo_ordenado_"+userBd+"_"+id,
"tipo_vuelo_ep": tipo,
"tipo_vuelo_dn":bd_dianoche  ,
"cant_pilo" :bd_pilotos ,
"n" :bd_n ,
"origen" : bd_origen,
"destino": bd_destino,
"fecha" :bd_fecha ,
"vuelo":bd_vuelo ,
"ipsv" :bd_ipsv ,
"tpsu" :bd_tpsu ,
"psv" :bd_psv ,
"pd" :bd_pd ,
"pps" :bd_pps ,
"alerta": bd_alerta

};

dbLocal.put(vp, function(err, result){
      if(!err){

        console.log("Se inserto en bd local");
        console.log(result);
        $ionicHistory.goBack();
      }
    })


/*dbLocal.sync(dbRemote, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});*/
}



})



   
.controller('vueloEspecialCtrl',
function ($scope,$filter,$ionicHistory) {
var bd_dianoche ="";

var bd_pilotos =0;

var  bd_n ="";
var bd_origen = "";
var bd_destino = "";
 var bd_fecha ="";
 var bd_vuelo ="";
 var bd_ipsv ="";
 var bd_tpsu ="";
 var bd_psv ="";
 var bd_pd ="";
 var bd_pps ="";
 var bd_alerta ="";
 var n_pilotos =0;

$scope.lista = [{"id": 0 , "texto":"2 pilotos"},{"id" : 1 , "texto": "3 pilotos"},{"id" : 2 , "texto": "4 pilotos"}];


$scope.cantidadPilotos = function(id){

if(id.id == 0){

  n_pilotos =2;
}
if(id.id  ==1 ){
  n_pilotos = 3;
}

if(id.id = 2){
  n_pilotos = 4;
}

}


 
$scope.calcularHorasServicio = function(cxt){

//Inicio de Funcion calcular

var dianoche2 = "";

if(n_pilotos ==0 ){

  n_pilotos=2;
}

//sE DEFINIIO LA VARIABLE DIANOCHE
if(cxt.dia_noche){

  dianoche2 = "Noche";
}
else
{
  dianoche2 = "Dia"
}




console.log("N" + n_pilotos) ;
bd_pilotos = n_pilotos;




$scope.transcurridoHoras =0;

var horaipsv = $filter('date')(cxt.ipsv, 'HH:mm','UTC')
console.log(horaipsv);


var horatpsu = $filter('date')(cxt.tpsu, 'HH:mm','UTC')
console.log(horatpsu);

var horai= " ";
var horafin ="";
var validHorai = horaipsv.substr(1,1);
var validHoraFin = horatpsu.substr(1,1);
 console.log(validHorai);
console.log(validHoraFin);

/*if(angular.usuariusu(validHorai,":")){

horai = horaipsv.substr(0,1);
}
else
{*/

horai = horaipsv.substr(0,2);

/*}


if(angular.equals(validHoraFin,":")){

  horafin = horatpsu.substr(0,1);
}
else
{*/

 horafin = horatpsu.substr(0,2);

//}

console.log(horai);

console.log(horafin);




//Hora
  var inicioHoras = parseInt(horai);
   var finHoras = parseInt(horafin);
var finHoras2 = parseInt(horafin);

  //Minutos

var inicioMinutos = parseInt(horaipsv.substr(3,2));
  var finMinutos = parseInt(horatpsu.substr(3,2));
var transcurridoMinutos = finMinutos - inicioMinutos;
if(finHoras<inicioHoras){

  finHoras = finHoras + 24;
}


var timetrans = finHoras - inicioHoras;

if(transcurridoMinutos < 0){


transcurridoMinutos = transcurridoMinutos + 60;
timetrans --;
}



var horasdif =  finHoras - inicioHoras;

  


var stringtiempotrans ="";
var strinminutos ="";

if(timetrans<10){

  stringtiempotrans = "0"+ timetrans.toString();
}
  else
  {
stringtiempotrans = timetrans.toString();

  }

  if(transcurridoMinutos <10){

    strinminutos = "0" + transcurridoMinutos.toString();

  }
  else
  {

strinminutos = transcurridoMinutos.toString();


  }
  $scope.transcurridoHoras =  stringtiempotrans +":" +  strinminutos;



// Comparativa para PD

var horasdesc =0;
if(horasdif < 8){

horasdesc =10;

}
if(horasdif == 8){

horasdesc =12;

}
if(horasdif == 9){

horasdesc =13;

}
if(horasdif == 10){

horasdesc =14;

}
if(horasdif == 11){

horasdesc =15;

}
if(horasdif == 12){

horasdesc =15;

}
if(horasdif == 13){

horasdesc =16;

}
if(horasdif == 14){

horasdesc =17;

}
if(horasdif == 15){

horasdesc =17;

}
if(horasdif == 16){

horasdesc =18;

}
if(horasdif == 17){

horasdesc =19;

}
if(horasdif == 18){

horasdesc =20;

}
if(horasdif == 19){

horasdesc =22;

}
if(horasdif >= 20){

horasdesc =24;

}

var horaspps2 =horasdesc + finHoras2;
console.log("Fin" + finHoras2);
console.log("des" +  horasdesc);
console.log(horaspps2);

if(horaspps2 > 23){

  horaspps2 = horaspps2 -24;
  console.log(horaspps2);

}

var hpps = horaspps2 -3
if(hpps < 0){

hpps = hpps * -1;

}
var stringhppps = "";
if(hpps <10){
stringhppps = "0"+ hpps.toString();

}
else
{

stringhppps = hpps.toString();;

}

var strinfinmin ="";

if(finMinutos<10){

strinfinmin = "0"+ finMinutos.toString();

}
else
{

strinfinmin = finMinutos.toString();;


}
$scope.horaspps = stringhppps +":"+ strinfinmin ;
$scope.horaspd = horasdesc;

var exce =0;
var alerta ="";
if(n_pilotos == 2 ){
  if(cxt.dia_noche){
    if(timetrans > 12){
      exce = timetrans -12;
      alerta = "Se ha excedido en " + exce + "horas";
    }
   
    } else
    {
      if(timetrans>14){
console.log("aqui"+timetrans);
           exce = timetrans -14;
      alerta = "Se ha excedido en " + exce +"horas";

      }

  }


}

if(n_pilotos == 3 & timetrans > 18){
    exce = timetrans -18;
      alerta = "Se ha excedido en " + exce + "horas";
}

if(n_pilotos == 4 & timetrans > 20){
     exce = timetrans -20;
      alerta = "Se ha excedido en " + exce + "horas";
}

$scope.alerta_h = alerta;

// conversion a chile

var horacl = inicioHoras -3;
var horafincl = finHoras2 -3;

var minucero ="";
var minfincero ="";
var stringhoral = "";
var stringhoraclfin ="";
if(horacl <10){

  stringhoral = "0" + horacl.toString();

}
else
{
stringhoral = horacl.toString();

}
if(horafincl <10)
{
stringhoraclfin = "0" + horafincl.toString();

}
else
{

stringhoraclfin = horafincl.toString();

}

if(inicioMinutos<10){
minucero = "0" + inicioMinutos.toString();

}else
{

minucero = inicioMinutos;

}

if(finMinutos <10){

  minfincero = "0" + finMinutos.toString();
}else{

  minfincero = finMinutos.toString();
}



{}
//variables para BD
bd_dianoche = dianoche2;
bd_pilotos = n_pilotos;
bd_n = cxt.n;
bd_origen = cxt.origen;
bd_destino = cxt.destino;
bd_fecha = $filter('date')(cxt.fecha, 'dd/MM/yyyy','UTC');
bd_vuelo = cxt.vuelo;
bd_ipsv = stringhoral.toString()+":" + minucero;
bd_tpsu = stringhoraclfin.toString() + ":" + minfincero ;
bd_psv = stringtiempotrans.toString() + ":00";
bd_pd =  horasdesc ;
bd_pps = stringhppps +":"+ strinfinmin ;
bd_alerta = alerta;
 

console.log(bd_dianoche + "-" + bd_pilotos + "-" + bd_n + "-" +bd_fecha + "-" +bd_vuelo + "-" +bd_ipsv + "-" +bd_tpsu+ "-" + bd_psv + "-" + bd_pd + "-" + bd_pps);

}
var userBd = localStorage.getItem("username");

$scope.GuardarDatos = function(){




var datefr = new Date();
var id =$filter('date')(datefr, 'ddMMyyyyHHmmsss','UTC')

     var tipo = "Wait Body";
var vp = {

"_id":"vuelo_ordenado_"+userBd+"_"+id,
"tipo_vuelo_ep": tipo,
"tipo_vuelo_dn":bd_dianoche  ,
"cant_pilo" :bd_pilotos ,
"n" :bd_n ,
"origen": bd_origen,
"destino": bd_destino,
"fecha" :bd_fecha ,
"vuelo":bd_vuelo ,
"ipsv" :bd_ipsv ,
"tpsu" :bd_tpsu ,
"psv" :bd_psv ,
"pd" :bd_pd ,
"pps" :bd_pps ,
"alerta": bd_alerta

};

dbLocal.put(vp, function(err, result){
      if(!err){

        console.log("Se inserto en bd local");
        console.log(result);
         $ionicHistory.goBack();
      }
    })


/*dbLocal.sync(dbRemote, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});*/
}

})
   
.controller('cloudCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state) {
if(window.localStorage.getItem("username")!== undefined ){
  localStorage.removeItem("username");
$state.go('login');
}
$state.go('login');
}])


//Visualizador PDF


.controller('pdf1Ctrl',
function ($scope) {


})

.controller('pdf2Ctrl', 
function ($scope) {


})

.controller('pdf3Ctrl',
function ($scope) {


})



   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('tiempoDeVueloCtrl',
function ($scope, $filter,$ionicPopup) {


var bd_fechat ="";
var bd_vuelot ="";
var bd_iniovuelo ="";
var bd_finvuelo="";
var bd_tiempoV = "";
$scope.calcularTiempoVuelo = function(cxt){


 $scope.transcurridoHoras =0;


var horainicioV = $filter('date')(cxt.inicio, 'HH:mm','UTC')
console.log(horainicioV);


var horaterminoV = $filter('date')(cxt.termino, 'HH:mm','UTC')
console.log(horaterminoV);

var horaiv= " ";
var horafinv ="";


horaiv = horainicioV.substr(0,2);

horafinv = horaterminoV.substr(0,2);

 var horaivcl = horaiv -3;
 var horafinvcl = horafinv -3;
var horapbdinicio ="";
var horapbdfin="";





console.log(horaiv);

console.log(horafinv);




//Hora
  var inicioHorasv = parseInt(horaiv);
   var finHorasv = parseInt(horafinv);


  //Minutos

var inicioMinutosv = parseInt(horainicioV.substr(3,2));
  var finMinutosv = parseInt(horaterminoV.substr(3,2));
var transcurridoMinutosv = finMinutosv - inicioMinutosv;
if(finHorasv<inicioHorasv){

  finHorasv = finHorasv + 24;
}


var timetransv = finHorasv - inicioHorasv;
console.log(timetransv);
console.log(transcurridoMinutosv);

if(transcurridoMinutosv < 0){


transcurridoMinutosv = transcurridoMinutosv + 60;
timetransv --;
}
console.log(timetransv);
console.log(transcurridoMinutosv);


//Formato variables BDS

if(horafinvcl<10){

horapbdinicio = "0" + horaivcl.toString();

}
else{

horapbdinicio =  horaivcl.toString();

}

if(horafinvcl<10){

horapbdfin = "0" + horafinvcl.toString();

}
else{

horapbdfin =  horafinvcl.toString();

}


var timetransvString ="";

if(timetransv <0 ){
  timetransv = timetransv *-1;
}

if(timetransv<10){

timetransvString = "0"+timetransv.toString();
}else{


  timetransvString = timetransv.toString();

}
var transcurridoMinutosvString = "";
if(transcurridoMinutosv <10){
transcurridoMinutosvString = "0"+transcurridoMinutosv.toString();
}
else
{
  transcurridoMinutosvString = transcurridoMinutosv.toString();

}


$scope.tiempovueloform = timetransvString+":"+transcurridoMinutosvString;

var strininiciominutos =";"
if(inicioMinutosv <10){
strininiciominutos = "0" + inicioMinutosv.toString();

}else
{
strininiciominutos = inicioMinutosv.toString();
  
}

var stringfinminutos="";
if(finMinutosv<10){

stringfinminutos = "0"+ finMinutosv.toString();

}else
{

stringfinminutos = finMinutosv.toString();

}

//variables bd
bd_fechat =$filter('date')(cxt.fechav, 'dd/MM/yyyy');
bd_vuelot = cxt.vuelov;
 bd_iniovuelo = horapbdinicio+":"+strininiciominutos;
 bd_finvuelo=horapbdfin+":"+stringfinminutos;
 bd_tiempoV = timetransvString+":"+transcurridoMinutosvString;


 console.log(bd_fechat+"-"+bd_vuelot+"-"+bd_iniovuelo+""+bd_finvuelo+"-"+bd_tiempoV);
}
 var userBd = localStorage.getItem("username");
 $scope.GuardarDatosTV = function(){

var datefr = new Date();
var id =$filter('date')(datefr, 'ddMMyyyyHHmmsss','UTC')

var tiempoVueloDB ={

"_id":"tiempo_vuelo_"+userBd+"_"+ id,
"fecha": bd_fechat,
"vuelo" : bd_vuelot,
"iniciovuelo": bd_iniovuelo,
"finvuelo" :bd_finvuelo,
"tiempoVuelo" :bd_tiempoV




}
dbLocal.put(tiempoVueloDB, function(err, result){
      if(!err){

        console.log("Se inserto en bd local");
        console.log(result);
var alertPopUp = $ionicPopup.alert ({
  title: 'Guardado ',
  template:  'Tiempo de vuelo Guardado'
});

      }
    })


dbLocal.sync(dbRemote, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});
}





})
   
.controller('loginCtrl', ['$scope', '$stateParams','$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$state,$location) {

//alert(window.localStorage.getItem("username"));
if(window.localStorage.getItem("username")!== null || window.localStorage.getItem("username")!= undefined ){
$state.go('menu.seleccioneTipoVuelo');
}
else
{



}

$scope.login = function (FromData){

  var n_usu = FromData.nom_usuario;
  var passok = FromData.password;
  var valipas ="";
  var valiuser="";
  var alertaLo ="";
if(angular.equals(n_usu,"") && angular.equals(passok," "))
{
 $scope.alerta_lo = " Sin usuario y/o Contraseña";
}

 // alert(n_usu);
//  alert(passok);
dbLocal.allDocs({startkey : 'usuario_nuevo_registro_us_'+n_usu+'\uffff',endkey: 'tiempo_vuelo',descending:true,include_docs:true}, function callback (err,usuario_login){
for(var i=0; i<usuario_login.rows.length;i++){
valipas =  usuario_login.rows[i].doc.contrasena;
valiuser = usuario_login.rows[i].doc.usuario;
//alert(valipas);
if(angular.equals(passok,valipas) && angular.equals(n_usu,valiuser)){
  if(typeof(Storage) != "undefined"){
    localStorage.setItem("username", n_usu);
    var mens = localStorage.getItem("username");
    
  }
if(window.localStorage.getItem("username")!== undefined ){
$state.go('menu.seleccioneTipoVuelo');
}

}
else
{
$scope.alerta_lo = "Usuario y/o contraseña incorrecta";

}

}

})

}

}])
   
.controller('signupCtrl', 
  function ($scope, $stateParams,$ionicHistory,$ionicPopup) {

$scope.registrar = function(cxt){
 var pass = cxt.contra;
 var confpass = cxt.conficontra;
 var id= String(new Date().getTime());
if(angular.equals(pass,confpass)){

var usuario = {
"_id" : "usuario_nuevo_registro_us_"+ cxt.usuario+" " +id,
"nombre" : cxt.nombre,
"usuario" : cxt.usuario,
"correo" : cxt.correo,
"contrasena" : cxt.contra


                                                                                                                                                                             
};

  dbLocal.put(usuario, function(err, result){
      if(!err){

        console.log("Se inserto en bd local");
        console.log(result);
        var alertPopUp = $ionicPopup.alert ({
  title: 'Registrado ',
  template:  'Ahora puedo acceder a spl'
});

                $ionicHistory.goBack();

      }
    })


 /* var key = 'tteetweellyingerawericat';
    var pass = 'e0e05006fc061982981c680d3d3a868d2978f33d';
    var remote = 'https://'+key+':'+pass+'@yerkoalfonso.cloudant.com/pilotos_bd';
    
    dbLocal.replicate.from(remote,{live:true,retry:true});*/
/*dbLocal.sync(dbRemote, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});*/


}


}

})
   
.controller('pageCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('seleccioneTipoVueloCtrl', ['$scope', '$stateParams', '$filter',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$filter) {
var datefr = new Date();
var timeid =$filter('date')(datefr, 'ddMMyyyyHHmmsss','UTC')
//alert(timeid);
$scope.customStyle7 = {};
$scope.customStyle10 = {};
 datosDBLocal=[]

var userBd = localStorage.getItem("username");
dbLocal.allDocs({startkey : 'vuelo_ordenado_'+userBd+'\uffff',endkey: 'vuelo_ordenado_'+userBd+'',descending:true,include_docs:true}, function callback (err,response3){
console.log(response3);
var hora = "";
var min = "";
var horastr ="";
var minstrs ="";
var horaint = 0;
var minint =0;
var total =0;
var siete =0;
var diez =0;
for(var i=0; i<response3.rows.length;i++){
//datosDBLocal[i] = response.rows[i].doc;
//console.log(response.rows[i].doc.n);

//horai = horaipsv.substr(0,2);
//var inicioMinutos = parseInt(horaipsv.substr(3,2));
hora = response3.rows[i].doc.psv;

horastr=hora.substr(0,2);
//alert(horastr);
min = response3.rows[i].doc.psv;
minstrs=min.substr(3,2);

horaint = (parseInt(horastr)*60) + horaint; 
minint =parseInt( minstrs ) + minint;
total = (horaint + minint)/60;
//alert(total);
if(i<7){

  siete = (horaint + minint)/60;
  if(siete>34){

$scope.customStyle7.style = {"color":"red"}

  }
  else{
 $scope.customStyle7.style = {"color":"green"}

}
}
if(i<10){
diez = (horaint + minint)/60;
if(diez > 68){

  $scope.customStyle10.style = {"color":"red"}
}
else{
 $scope.customStyle10.style = {"color":"green"}

}

}
}
//alert(total);

$scope.sietedias = siete;
$scope.diezdia = diez;
})


 $scope.groups2 = datosDBLocal;
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }*/ 

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup2 = function(group) {
    if ($scope.isGroupShown2(group)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = group;
    }
  };
  $scope.isGroupShown2 = function(group) {
    return $scope.shownGroup2 === group;
  };


}])
   
.controller('calendarioTvCtrol',function($scope){

 datosDBLocal=[]
var userBd = localStorage.getItem("username");
dbLocal.allDocs({startkey : 'tiempo_vuelo_'+userBd+'\uffff',endkey: 'tiempo_vuelo_'+userBd+'',descending:true,include_docs:true}, function callback (err,response2){

console.log(response2);
for(var i=0; i<response2.rows.length;i++){
//datosDBLocal[i] = response.rows[i].doc;
//console.log(response.rows[i].doc.n);
datosDBLocal[i] = {


fecha:"fecha : " + response2.rows[i].doc.fecha,
vuelo:"vuelo : " + response2.rows[i].doc.vuelo,
inicioVuelo :"Inicio vuelo : " + response2.rows[i].doc.iniciovuelo,
TerminoVuelo :"Termino vuelo : " + response2.rows[i].doc.finvuelo,
TiempoVuelo:"Tiempo de vuelo  : " +  response2.rows[i].doc.tiempoVuelo


};

}


})


 $scope.groups2 = datosDBLocal;
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }*/ 

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup2 = function(group) {
    if ($scope.isGroupShown2(group)) {
      $scope.shownGroup2 = null;
    } else {
      $scope.shownGroup2 = group;
    }
  };
  $scope.isGroupShown2 = function(group) {
    return $scope.shownGroup2 === group;
  };


})
   
.controller('calendarioCtrl', 
function ($scope) {
 datosDBLocal=[]
$scope.$on('$ionicView.beforeEnter', function (viewInfo, state) {
        console.log('CTRL - $ionicView.loaded', viewInfo, state);
    });

var userBd = localStorage.getItem("username");


dbRemote.sync(dbLocal, {
  live: true,
  retry: true
}).on('change', function (change) {
  // yo, something changed!
}).on('paused', function (info) {
  // replication was paused, usually because of a lost connection
}).on('active', function (info) {
  // replication was resumed
}).on('error', function (err) {
  // totally unhandled error (shouldn't happen)
});

dbLocal.allDocs({startkey : 'vuelo_ordenado_'+userBd+'\uffff',endkey: 'vuelo_ordenado_'+userBd+'',descending:true,include_docs:true}, function callback (err,response){

console.log(response);
for(var i=0; i<response.rows.length;i++){
//datosDBLocal[i] = response.rows[i].doc;
//console.log(response.rows[i].doc.n);
datosDBLocal[i] = {

tipo : "Tipo vuelo : " +  response.rows[i].doc.tipo_vuelo_ep,
dia_no: "Dia/Noche : " + response.rows[i].doc.tipo_vuelo_dn,
cant_piloto:"Pîlotos : " + response.rows[i].doc.cant_pilo,
n:"F. Log :" + response.rows[i].doc.n,
origen : "Origen :"+ response.rows[i].doc.origen,
destino: "Destino :" +response.rows[i].doc.destino,
fecha:"fecha : " + response.rows[i].doc.fecha,
vuelo:"vuelo : " + response.rows[i].doc.vuelo,
ipsv :"IPSV : " + response.rows[i].doc.ipsv,
tpsu :"TPSV : " + response.rows[i].doc.tpsu,
psv:"PSV : " +  response.rows[i].doc.psv,
pd:"PD : " + response.rows[i].doc.pd,
nips: "NIPS : " + response.rows[i].doc.pps,
alerta :"Alerta : " +  response.rows[i].doc.alerta ,


};

}


})
var lista =[];
for(var j=0; j< datosDBLocal.length;j++){
  for(var k=0;k<10;k++){

    console.log("VEeeme" +datosDBLocal[j][k]);
  }
  
}

 $scope.groups = datosDBLocal;
  /*for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: []
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }*/ 

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
  

})
 