var coordinates =
  [
    {
      name: ['Reihe1'],
      coord: "0,0"
    },
    {
      name: ['01_Die_Ortsansaessigen'],
      coord: "48.688178,15.852417"
    },
    {
      name: ['07_Die_Einfahrt'],
      coord: "48.688121,15.852941"
    },
    {
      name: ['03_Verladestation'],
      coord: "48.687997,15.853439"
    },
    {
      name: ['04_Die_Verladerampe'],
      coord: "48.687936,15.853981"
    },
    {
      name: ['Reihe2'],
      coord: "0,0"
    },
    {
      name: ['08_Die_Wirtschaft'],
      coord: "48.687835,15.852429"
    },
    {
      name: ['05_Die_Ortschaften'],
      coord: "48.687775,15.852960"
    },
    {
      name: ['11_Der_Baron','28_Die_Schotterwerbung'],
      coord: "48.687626,15.853462"
    },
    {
      name: ['13_Das_Ziegelwerk','27_Denunziert_und_deportiert'],
      coord: "48.687592,15.854011"
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
      name: ['23_Der_Aufseher','14_Das_Waechterhaus'],
      coord: "48.686724,15.853362 "
    },
    {
      name: ['20_Der_Betriebsfuehrer','18_Der_Gefolgschaftsraum'],
      coord: "48.686369,15.853397"
    },
    {
      name: ['12_Die_Betriebsbaracke','21_Der_Nahrungsmangel'],
      coord: "48.686014,15.853445"
    },
    {
      name: ['26_Tag_der_Befreiung'],
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

let coordinateList = document.getElementById("coordinateList");

coordinates.forEach(function (pos) {
  let li = document.createElement("li");

  if(pos && pos.name) {
    li.textContent = pos.name;
    coordinateList.appendChild(li);
  }
});
