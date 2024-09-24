"use strict"

// In diesem Codeabschnitt läuft die Hauptlogik ab

let karten = [];

karten_generieren();

let einsatz = 0;

let geber_karten = ["★-0"];
let spieler_karten = ["★-0"];
let geber_summe = 0;
let spieler_summe = 0;

// Mit diesem Aufruf werden die ersten umgedrehten Karten simuliert.

erster_aufruf(geber_karten, "#geber-karten");
erster_aufruf(spieler_karten, "#spieler-karten");

// Dieser Code fügt einen "Klick"-Event-Listener zum "Karte"-Button hinzu, überprüft, 
// ob der Einsatz gesetzt wurde, gibt dann Karten aus, aktualisiert den Spielstatus 
// (ob gewonnen oder verloren), und deaktiviert Buttons sowie Chips basierend auf dem aktuellen Zustand des Spiels.

document.querySelector("#karte-btn").addEventListener("click", e => {

    if(punkte === 0){
        document.querySelector("#game-message").innerHTML = "Du musst erst dein Einsatz wählen.";
    } else {
        if (spieler_karten.length !== 0) {
            document.querySelectorAll('.chip').forEach(chip => {
                chip.classList.add('disabled'); 
            });
        }
        document.querySelector("#game-message").innerHTML = "";
        if (spieler_karten.length === 1){
            karten_ausgabe(spieler_karten, "#spieler-karten", false);
            karten_ausgabe(geber_karten, "#geber-karten", true);  
        }
        karten_ausgabe(spieler_karten, "#spieler-karten", false);
        
        if(spieler_summe > 21){
            document.querySelector("#game-message").innerHTML = "Schade, du hast verloren.";
            document.querySelector("#stand-btn").disabled = true;
            document.querySelector("#karte-btn").disabled = true;
            document.querySelector("#neustart-btn").disabled = false;
            punktestand -= punkte;
            document.querySelector(".punktestand").innerHTML = punktestand;
        }
    
        if(spieler_summe === 21 && spieler_karten.length === 2){
            document.querySelector("#game-message").innerHTML =  "Black Jack! Du hast gewonnen.";
            document.querySelector("#karte-btn").disabled = true;
            document.querySelector("#stand-btn").disabled = true;
            document.querySelector("#neustart-btn").disabled = false;
            punktestand += (punkte * 2);
            document.querySelector(".punktestand").innerHTML = punktestand;
        }
    }
    if(spieler_karten.length === 0){
        document.querySelectorAll('.chip').forEach(chip => {
            chip.classList.add('disabled');
        });
    }
})

// Dieser Code fügt einen "Klick"-Event-Listener zum "Stand"-Button hinzu, 
// um die Spielrunde zu beenden, den Geber weitere Karten ziehen zu lassen 
// und das Spielergebnis zu prüfen, während entsprechende Buttons deaktiviert werden.

document.querySelector("#stand-btn").addEventListener("click", e => {
 console.log(spieler_karten);
 console.log(spieler_karten.includes("★-0"))
    document.querySelector("#karte-btn").disabled = true;
    document.querySelector("#neustart-btn").disabled = true;
    if(spieler_karten.length < 2){
        document.querySelector("#game-message").innerHTML = "Du musst zuerst Karten geben lassen.";
        document.querySelector("#karte-btn").disabled = false;
    } else if(spieler_karten.includes("★-0") === true){
        document.querySelector("#game-message").innerHTML = "Du musst mindestens 2 Karten geben lassen.";
        document.querySelector("#karte-btn").disabled = false;
    } else {
        const disablen = function(){ return document.querySelector("#neustart-btn").disabled = false;}
        const karte_ziehen = () => {
            if (geber_summe < 17){
                karten_ausgabe(geber_karten, "#geber-karten", true);  
                if(geber_summe >= 17 || geber_summe > 21){
                    clearInterval(interval);
                    setTimeout(pruefe_spielergebnis,1250);
                    setTimeout(disablen,3000);
                }      
            } else {
                setTimeout(pruefe_spielergebnis,1250);
                setTimeout(disablen,3000);
                clearInterval(interval);
            }
        }


        let interval = setInterval(karte_ziehen, 1000);
        const pruefe_spielergebnis = () => {
            if(geber_summe > 21){
                document.querySelector("#game-message").innerHTML = "Ich gratuliere dir, du hast gewonnen.";
                punktestand += (punkte * 2);
                document.querySelector(".punktestand").innerHTML = punktestand;
            } else if (geber_summe === 21 && geber_karten.length === 2){
                document.querySelector("#game-message").innerHTML ="Black Jack für Geber! Du hast verloren.";
                punktestand -= punkte;
                document.querySelector(".punktestand").innerHTML = punktestand;
            } else if (geber_summe === spieler_summe){
                document.querySelector("#game-message").innerHTML = "Unentschieden.";
                punktestand = punktestand;
                document.querySelector(".punktestand").innerHTML = punktestand;
            } else if (geber_summe > spieler_summe){
                document.querySelector("#game-message").innerHTML = "Schade, du hast verloren.";
                document.querySelector("#stand-btn").disabled = true;
                punktestand -= punkte;
                document.querySelector(".punktestand").innerHTML = punktestand;
            } else if (geber_summe < spieler_summe){
                document.querySelector("#game-message").innerHTML = "Ich gratuliere dir, du hast gewonnen.";
                document.querySelector("#stand-btn").disabled = true;
                punktestand += (punkte * 2);
                document.querySelector(".punktestand").innerHTML = punktestand;
            }
        }
    }
;})

// Dieser Code fügt einen "Klick"-Event-Listener zum "Neustart"-Button hinzu, 
// der das Spiel zurücksetzt, indem Chips aktiviert, Karten zurückgesetzt und 
// neue Karten für den Spieler und den Geber generiert werden.

document.querySelector("#neustart-btn").addEventListener("click", e => {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.classList.remove('disabled'); 
    });
    document.querySelectorAll('.chip').forEach(c => {
        c.classList.remove('chip-selected');
    });
    punkte = 0;
    karten = [];
    karten_generieren();
    document.querySelector("#geber-punkte").innerHTML = "Punkte: 0";
    document.querySelector("#spieler-punkte").innerHTML = "Punkte: 0";
    document.querySelector("#game-message").innerHTML = "";
    neu_starten("#geber-karten");
    neu_starten("#spieler-karten");
    document.querySelector("#karte-btn").disabled = false;
    document.querySelector("#stand-btn").disabled = false;
    geber_karten =  ["★-0"];
    spieler_karten =  ["★-0"];
    spieler_summe = 0;
    geber_summe = 0;
    karten_ausgabe(spieler_karten, "#spieler-karten", false);
    karten_ausgabe(geber_karten, "#geber-karten", true);
    document.querySelector("#neustart-btn").disabled = true; 
    console.log(karten);
})

// Diese Funktion entfernt alle Karten-Div-Elemente innerhalb eines angegebenen 
// Bereichs (für den Geber oder den Spieler), um das Spielfeld zurückzusetzen.

function neu_starten(g_oder_s){
    let divs = document.querySelectorAll(g_oder_s + " .card");

    divs.forEach( e => {
        e.remove();
    })
}

// Dieser Code fragt den Benutzer mittels einer Bestätigungsabfrage, 
// ob er den Punktestand auf 2000 zurücksetzen möchte, und lädt die Seite neu, wenn die Bestätigung erfolgt.

document.querySelector("#auf_null-btn").addEventListener("click", e => {
    if (confirm("Bist du sicher, dass du auf auffüllen möchtest?") == true) {
        location.reload();;
    } 
})