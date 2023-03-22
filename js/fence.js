let options;
let currentPos;
let currentPoint;
let currentDistance;
let pointCount = 0;
let searchRadius = 0.02;
let hasStarted = false;
let wakeLock = null;
let wakeLockSupported = false;
let changeCount = 0;
let playCount = 0;

//Position Array 
//mit Positions Name / Latitude, Longitude / Video, Bild Link
const posArray =   
[
 {
    name: ['Reihe1'],
    coord: "0,0"
  },
  {
    name: ['01_Die_Ortsansaessigen'],
    coord: "48.688112,15.852433"
  },
  {
    name: ['07_Die_Einfahrt'],
    coord: "48.688011,15.852956"
  },
  {
    name: ['03_Verladestation'],
    coord: "48.687832,15.853423"
  },
  {
    name: ['04_Die_Verladerampe'],
    coord: "48.687839,15.853981"
  },
  {
    name: ['Reihe2'],
    coord: "0,0"
  },
  {
    name: ['08_Die_Wirtschaft'],
    coord: "48.687754,15.852430"
  },
  {
    name: ['05_Die_Ortschaften'],
    coord: "48.687644,15.852956"
  },
  {
    name: ['11_Der_Baron','28_Die_Schotterwerbung'],
    coord: "48.687434,15.853374"
  },
  {
    name: ['13_Das_Ziegelwerk','27_Denunziert_und_deportiert'],
    coord: "48.687487,15.853916"
  },
  {
    name: ['Reihe9bis11'],
    coord: "0,0"
  },
  {
    name: ['33_Der_Landschaftsgarten','34_Die_Passionsspiele'],
    coord: "48.687339,15.854404"
  },
  {
    name: ['30_Der_Badeteich_und_das_Steinbrecherhaus'],
    coord: "48.687120,15.853970"
  },
  {
    name: ['15_Das_Steinbrecherhaus_Betrieb','16_Das_Steinbrecherhaus_Stilllegung'],
    coord: "48.687077,15.853421"
  },
  {
    name: ['Reihe4'],
    coord: "0,0"
  },
  {
    name: ['04_Das_Lager','14_Das_Waechterhaus'],
    coord: "48.686724,15.853362 "
  },
  {
    name: ['12_Die_Betriebsbaracke','18_Der_Gefolgschaftsraum'],
    coord: "48.686369,15.853397"
  },
  {
    name: ['20_Der_Betriebsfuehrer','21_Der_Nahrungsmangel'],
    coord: "48.686014,15.853445"
  },
  {
    name: ['23_Der_Aufseher','26_Tag_der_Befreiung'],
    coord: "48.685660,15.853467"
  },
  {
    name: ['35_Die_Wehrsportuebungen','36_Rechtsradikale_Umtriebe'],
    coord: "48.685348,15.853703"
  },
  {
    name: ['Reihe3'],
    coord: "0,0"
  },
  {
    name: ['29_Der_Badeteich','31_Der_Badeunfall'],
    coord: "48.687012,15.854614"
  },
  {
    name: ['32_Die_Austrocknung_des_Teichs'],
    coord: "48.686785,15.855027"
  },
  {
    name: ['09_Die_Kollegen','10_Das_Spalten'],
    coord: "48.686426,15.855102"
  },
  {
    name: ['22_Der_Kellerausbau','19_Die_Zwangsarbeit'],
    coord: "48.686072,15.855005"
  },
  {
    name: ['17_Das_NS-Arbeitsbuch_des_Steinbrucharbeiters','24_Das_Lager_im_Westen'],
    coord: "48.685856,15.854571"
  }
]

navigator.geolocation.watchPosition(succesCallback, errorCallback, options);

//Get the current position
function succesCallback(pos)
{

  currentPos = pos.coords;
  UpdateHtmlText();
  if(hasStarted)
  {
    console.log("Successs");
    SearchTriggerPos();
  }
}

//Called if an error appears
function errorCallback(error)
{
  console.log(error);
}

options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function SearchTriggerPos()
{
  changeCount++;
  let currentPointTemp;

  //Geht durch das posArray
  for (let index = 0; index < posArray.length; index++) {
    const element = posArray[index];
    const posSplit = element.coord.split(',');
    //Berechnet die Distanz von der aktuellen Position zum Array Punkt
    distance = calculateDistance(currentPos.latitude, currentPos.longitude,parseFloat(posSplit[0]), parseFloat(posSplit[1]));
    
    if(distance <= searchRadius && element.name[0] != currentPoint)
    {
      console.log(currentPoint + " / " + element.name);
      currentPointTemp = element;
      pointCount++;
      console.log(currentPos);
      console.log(currentPointTemp);
    }
  }

  if(pointCount < 2 && pointCount != 0 && audio.paused)
  {
    currentPoint = currentPointTemp.name[0];
    const currentPosSplit = currentPointTemp.coord.split(',');
    currentDistance = calculateDistance(currentPos.latitude, currentPos.longitude,parseFloat(currentPosSplit[0]), parseFloat(currentPosSplit[1]));

    console.log(currentPointTemp.name.length);
    if(currentPointTemp.name.length < 2)
    {
      console.log("One");
      $.getScript("player.js",loadPosition(currentPointTemp.name[0]));
    } else
    {
      console.log("Multi");
      $.getScript("player.js",loadPosition(currentPointTemp.name[0]));
      
      audio.onended = function() {
        console.log("Eeeeend");
        if(playCount < currentPointTemp.name.length-1)
        {
          playCount++;
          $.getScript("player.js",loadPosition(currentPointTemp.name[playCount]));
        } else
        {
          playCount = 0;
          audio.onended = null;
        }
      };
    }
    document.getElementById("pointCountText").innerHTML = "Point Count: " + pointCount + "Change Count: " + changeCount;
  }
  else
  {
    document.getElementById("pointCountText").innerHTML = "Point Count: " + pointCount + "Change Count: " + changeCount;
  }

  pointCount = 0;
}

//Aktualisiert den Html Text
function UpdateHtmlText(){
      $("#currentLat").text(currentPos.latitude);
      $("#currentLon").text(currentPos.longitude);
      $("#accuracyText").text(currentPos.accuracy);
      $("#distance").text(currentDistance);
}

// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2)
{
  var R = 6371; // km
  var dLat = (lat2-lat1).toRad();
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d;
}

Number.prototype.toRad = function()
{
  return this * Math.PI / 180;
}

function ToggleDebug() {
  var x = document.getElementById("debug");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

if('wakeLock' in navigator)
{
  wakeLockSupported = true;
  document.getElementById("wakeText").innerHTML = wakeLockSupported;
}
else
{
  wakeLockSupported = false;
}

async function acquireLock(){
  wakeLock = await navigator.wakeLock.request("screen");
}

function releaseLock(){

}

function isPlaying(audelem) {
  return!audelem.paused;
}



