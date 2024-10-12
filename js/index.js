$(function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
      }
    });
});


const ajax = new XMLHttpRequest();
var input = "Roma";
let tag = "";
var my = [];

//ajax.responseType = "json";
ajax.open("POST", "/php/cap.php",true);
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajax.send("comune="+input);
ajax.onload = function() {
    const object = JSON.parse(this.responseText);

    for(var item in object) {
        tag +=
        "<tr>" +
        "<td>" + object[item].comune + "</td>" +
        "<td>" + object[item].cap + "</td>" +
        "<td style='text-align:center;'>" + object[item].provincia + "</td>" +
        "<td>" + object[item].regione + "</td>" +
        "</tr>"
        ;
    }

    document.getElementById("ajax").innerHTML = tag;
}

const button_comune = document.getElementById("button_comune");
button_comune.addEventListener("click",()=>{ run(); });
const inputComune = document.getElementById("comune");

function run() {
  input = inputComune.value;
  const dataset = new XMLHttpRequest();

  dataset.onprogress = function() {
    const object = JSON.parse(this.responseText);

    for(var item in object) {
      if(object[item].Comune!="Errore") {
        tag +=
        "<tr>" +
        "<td>" + object[item].comune + "</td>" +
        "<td>" + object[item].cap + "</td>" +
        "<td style='text-align:center;'>" + object[item].provincia + "</td>" +
        "<td>" + object[item].regione + "</td>" +
        "</tr>"
        ;
      } else if(input!=""){
        alert("Errore: il comune "+input+" non presente nel database");
      } 
    }

    document.getElementById("ajax").innerHTML = tag;
    //$("#ajax").append(tag);
  }

  dataset.open("POST", "/php/cap.php",true);
  dataset.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  dataset.send("comune="+input);
}

$(function(){
  $("#reset").on("click",()=>{
    tag = "";
    $("#ajax").html(tag);
    //$("#cap").find("form").trigger("reset");
    inputComune.value = "";
  });
});

$(function(){
  if(screen.width<=500) {
    $("table").css({"width":"80%","margin":"auto","margin-top":"10px"});
    $("th").css({"width":"22.5%"});
    $("td").css({"width":"22.5%"});
    $("button_comune").css({"margin":"10px"});
  }
});