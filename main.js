"use strict"

let karten = [];

for (let y = 2; y < 15; y++){
    karten.push("KA-0" + y);
}
for (let y = 2; y < 15; y++){
    karten.push("KR-0" + y);
}
for (let y = 2; y < 15; y++){
    karten.push("PI-0" + y);
}
for (let y = 2; y < 15; y++){
    karten.push("HE-0" + y);
}

function randomize (arr) 

{
    for (let i = arr.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1)); 
        [arr[i], arr[j]] = [arr[j], arr[i]];
    } 
} 
randomize (karten); 

console.log(karten);

let geber_karten = ["★-0"];
let spieler_karten = ["★-0"];
let geber_summe = 0;

const karten_ausgabe_geber = function(arg, g_oder_s){

    geber_summe = 0;
    let divs = document.querySelectorAll("#geber-karten .card");
    divs.forEach( e => {
        e.remove();
    })

    geber_karten.unshift(karten.pop());

    if(arg.includes("★-0") && arg.length > 2){
        let index = arg.indexOf("★-0");
        arg.splice(index,1);
        geber_karten.reverse();
    }

    arg.forEach(e => {
        let split = e.split("-");
        let gesplitet_1 = split[0];
        let gesplitet_2 = split[1];
        gesplitet_2 = Number(gesplitet_2);
        let farbe;
        let bg_farbe = "bg-white";
        if(gesplitet_1.includes("HE") || gesplitet_1.includes("KA")){
            farbe = "text-red-600";
        } else if (gesplitet_1.includes("KR") || gesplitet_1.includes("PI")){
            farbe = "text-black";
        } else if (gesplitet_1.includes("★")){
            bg_farbe = "bg-blue-600";
        }
        let typ;
        switch (gesplitet_1) {
            case "HE":
                typ = "♥";
                break;
            case "PI":
                typ = "♠";
                break;
            case "KR":
                typ = "♣";
                break;
            case "KA":
                typ = "♦";
                break;
            case "★":
                typ = "★";
                break;
            default:
                break;
        }
    
        let zeichen = gesplitet_2;
        switch (gesplitet_2) {
            case 11:
                zeichen = "B";
                break;
            case 12:
                zeichen = "D";
                break;
            case 13:
                zeichen = "K";
                break;
            case 14:
                zeichen = "A";
                break;
            case "★":
                typ = "★";
                break;
            default:
                break;
        }

        let leer_zeichen;
        if(gesplitet_2 !== 0) 
            { leer_zeichen = `${zeichen} ${typ}`}
        else {
            leer_zeichen = ``;
        };

        let div_g_o_s_karten = document.querySelector(g_oder_s);
        let karte = document.createElement("div");
        karte.setAttribute("class", `card w-12 h-16 ${farbe} ${bg_farbe} border-2 border-gray-500 rounded-lg relative flex justify-center items-center text-base font-bold`);
        karte.innerHTML = typ;
        let div_1 = document.createElement("div");
        div_1.setAttribute("class", "absolute top-1 left-1 text-sm");
        div_1.innerHTML = leer_zeichen;
        let div_2 = document.createElement("div");
        div_2.setAttribute("class", "absolute bottom-1 right-1 text-sm rotate-180");
        div_2.innerHTML = leer_zeichen;
        karte.insertAdjacentElement("afterbegin", div_1);
        karte.insertAdjacentElement("beforeend", div_2);
        div_g_o_s_karten.insertAdjacentElement("afterbegin", karte);
    });

    const wert = function(e){
        let split = e.split("-");
        let value = Number(split[1]);
    
        if (value >= 11 && value <= 13) {
            return 10;
        } 
        else if (value === 14) {
            return 11;
        } 
        else {
            return value;
        }
    }

    let anzahlAsse = 0;

    arg.forEach( e => {

        let wert_e = wert(e);
        if (wert_e === 11) {
            anzahlAsse++;
        }
        geber_summe += wert_e;  
    })

    while (geber_summe > 21 && anzahlAsse > 0) {
        geber_summe -= 10; 
        anzahlAsse--;
    }
    document.querySelector("#geber-punkte").innerHTML = geber_summe;
}

let spieler_summe = 0;

const karten_ausgabe_spieler = function(arg, g_oder_s){

    spieler_summe = 0;
    let divs = document.querySelectorAll("#spieler-karten .card");
    divs.forEach( e => {
        e.remove();
    })

    spieler_karten.unshift(karten.pop());
    let index = arg.indexOf("★-0");
    if(arg.includes("★-0")){
        arg.splice(index,1);
    }

    arg.forEach(e => {
        let split = e.split("-");
        let gesplitet_1 = split[0];
        let gesplitet_2 = split[1];
        gesplitet_2 = Number(gesplitet_2);
        let farbe;
        let bg_farbe = "bg-white";
        if(gesplitet_1.includes("HE") || gesplitet_1.includes("KA")){
            farbe = "text-red-600";
        } else if (gesplitet_1.includes("KR") || gesplitet_1.includes("PI")){
            farbe = "text-black";
        } else if (gesplitet_1.includes("★")){
            bg_farbe = "bg-blue-600";
        }
        let typ;
        switch (gesplitet_1) {
            case "HE":
                typ = "♥";
                break;
            case "PI":
                typ = "♠";
                break;
            case "KR":
                typ = "♣";
                break;
            case "KA":
                typ = "♦";
                break;
            case "★":
                typ = "★";
                break;
            default:
                break;
        }
    
        let zeichen = gesplitet_2;
        switch (gesplitet_2) {
            case 11:
                zeichen = "B";
                break;
            case 12:
                zeichen = "D";
                break;
            case 13:
                zeichen = "K";
                break;
            case 14:
                zeichen = "A";
                break;
            case "★":
                typ = "★";
                break;
            default:
                break;
        }

        let leer_zeichen;
        if(gesplitet_2 !== 0) 
            { leer_zeichen = `${zeichen} ${typ}`}
        else {
            leer_zeichen = ``;
        };

        let div_g_o_s_karten = document.querySelector(g_oder_s);
        let karte = document.createElement("div");
        karte.setAttribute("class", `card w-12 h-16 ${farbe} ${bg_farbe} border-2 border-gray-500 rounded-lg relative flex justify-center items-center text-base font-bold`);
        karte.innerHTML = typ;
        let div_1 = document.createElement("div");
        div_1.setAttribute("class", "absolute top-1 left-1 text-sm");
        div_1.innerHTML = leer_zeichen;
        let div_2 = document.createElement("div");
        div_2.setAttribute("class", "absolute bottom-1 right-1 text-sm rotate-180");
        div_2.innerHTML = leer_zeichen;
        karte.insertAdjacentElement("afterbegin", div_1);
        karte.insertAdjacentElement("beforeend", div_2);
        div_g_o_s_karten.insertAdjacentElement("afterbegin", karte);
    });

    const wert = function(e){
        let split = e.split("-");
        let value = Number(split[1]);
    
        if (value >= 11 && value <= 13) {
            return 10;
        } 
        else if (value === 14) {
            return 11;
        } 
        else {
            return value;
        }
    }

    let anzahlAsse = 0;

    arg.forEach( e => {

        let wert_e = wert(e);
        if (wert_e === 11) {
            anzahlAsse++;
        }
        spieler_summe += wert_e;  
    })

    while (spieler_summe > 21 && anzahlAsse > 0) {
        spieler_summe -= 10;
        anzahlAsse--;
    }
    document.querySelector("#spieler-punkte").innerHTML = spieler_summe;
}

erster_aufruf(geber_karten, "#geber-karten");
erster_aufruf(spieler_karten, "#spieler-karten");

document.querySelector("#karte-btn").addEventListener("click", e => {

    document.querySelector("#game-message").innerHTML = "";
    if(spieler_summe < 22){
        karten_ausgabe_spieler(spieler_karten, "#spieler-karten");
        if(spieler_summe > 21){
            document.querySelector("#game-message").innerHTML = "Schade, du hast verloren.";
            document.querySelector("#stand-btn").disabled = true;
        }

    }
    if(spieler_karten.length === 1){
        karten_ausgabe_geber(geber_karten, "#geber-karten");
        karten_ausgabe_spieler(spieler_karten, "#spieler-karten");
    }
    if(spieler_summe === 21 && spieler_karten.length === 2){
        document.querySelector("#game-message").innerHTML =  "Black Jack! Du hast gewonnen.";
        document.querySelector("#karte-btn").disabled = true;
    }
})

document.querySelector("#stand-btn").addEventListener("click", e => {
    if(spieler_karten.length < 2){
        document.querySelector("#game-message").innerHTML = "Du musst zuerst Karten geben lassen.";
    }else {
        document.querySelector("#karte-btn").disabled = true;
        if(geber_summe < 22){{
            let i = 0;console.log(i);
            while (geber_summe < 18){
                karten_ausgabe_geber(geber_karten, "#geber-karten"); 
                i++;
                setTimeout(() => {
                      console.log(i);
                }, 1000);              
            }
            if(geber_summe > 21){
                document.querySelector("#game-message").innerHTML = "Ich gratuliere dir, du hast gewonnen.";
            } else if (geber_summe === 21 && geber_karten.length === 2){
                document.querySelector("#game-message").innerHTML ="Black Jack für Geber! Du hast verloren.";
            } else if (geber_summe === spieler_summe){
                document.querySelector("#game-message").innerHTML = "Unentschieden.";
            } else if (geber_summe > spieler_summe){
                document.querySelector("#game-message").innerHTML = "Schade, du hast verloren.";
                document.querySelector("#stand-btn").disabled = true;
            } else if (geber_summe < spieler_summe){
                document.querySelector("#game-message").innerHTML = "Ich gratuliere dir, du hast gewonnen.";
                document.querySelector("#stand-btn").disabled = true;
            }
        }}
    }
;})

document.querySelector("#neustart-btn").addEventListener("click", e => {
    neu_starten();
})



function erster_aufruf(arg, g_oder_s){
    arg.forEach(e => {
        let split = e.split("-");
        let gesplitet_2 = split[1];
        gesplitet_2 = Number(gesplitet_2);

        let div_g_o_s_karten = document.querySelector(g_oder_s);
        let karte = document.createElement("div");
        karte.setAttribute("class", `card w-12 h-16 text-white bg-blue-600 border-2 border-gray-500 rounded-lg relative flex justify-center items-center text-2xl font-bold`);
        karte.innerHTML = "★";
        let div_1 = document.createElement("div");
        div_1.setAttribute("class", "absolute top-1 left-1 text-xs");
        div_1.innerHTML = "";
        let div_2 = document.createElement("div");
        div_2.setAttribute("class", "absolute bottom-1 right-1 text-xs rotate-180");
        div_2.innerHTML = "";
        karte.insertAdjacentElement("afterbegin", div_1);
        karte.insertAdjacentElement("beforeend", div_2);
        div_g_o_s_karten.insertAdjacentElement("afterbegin", karte);
    });
}


function neu_starten(){
    location.reload();
}