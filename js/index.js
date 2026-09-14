$(function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
      }
    });
});


const ajax = new XMLHttpRequest();
var input = "Roma";
var my = [];

//ajax.responseType = "json";
ajax.open("POST", "/gitproject/cap.php",true);
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
ajax.send("comune="+input);
ajax.onload = function() {
    const object = JSON.parse(this.responseText);

    for(var item in object) {
      $("#ajax").append(
        $("<tr>").append(
          $("<td>").text(object[item].comune),
          $("<td>").text(object[item].cap),
          $("<td>").text(object[item].provincia),
          $("<td>").text(object[item].regione)
        )
      );
    }
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
        $("#ajax").append(
          $("<tr>").append(
            $("<td>").text(object[item].comune),
            $("<td>").text(object[item].cap),
            $("<td>").text(object[item].provincia),
            $("<td>").text(object[item].regione)
          )
        );
      } else if(input!=""){
        alert(`Errore: il comune ${input} non presente nel database`);
      } 
    }
  }

  dataset.open("POST", "/gitproject/cap.php",true);
  dataset.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  dataset.send("comune="+input);
}

$(function(){
  $("#reset").on("click",()=>{
    $("#ajax").html("");
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
