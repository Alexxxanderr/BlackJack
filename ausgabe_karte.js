"use strict"

// In diesem Code wird eine Karte mit HTML und Tailwind CSS Klassen generiert.

const karten_ausgabe = function(karten_array, g_oder_s, ist_geber) {
    // Setze die Summe basierend auf dem Typ (Geber oder Spieler)
    let summe = 0;
    let divs = document.querySelectorAll(g_oder_s + " .card");
    divs.forEach(e => {
        e.remove();
    });

    // Füge eine neue Karte vom Kartenstapel hinzu
   
    karten_array.unshift(karten.pop());

    // Entferne Platzhalterkarte "★-0" wenn notwendig
    if (karten_array.includes("★-0") && karten_array.length > 2) {
        let index = karten_array.indexOf("★-0");
        karten_array.splice(index, 1);
        karten_array.reverse();
    }

    // Generiere die HTML-Repräsentation der Karten
    karten_array.forEach(e => {
        let split = e.split("-");
        let gesplitet_1 = split[0];
        let gesplitet_2 = Number(split[1]);
        let farbe;
        let bg_farbe = "bg-white";
        if (gesplitet_1.includes("HE") || gesplitet_1.includes("KA")) {
            farbe = "text-red-600";
        } else if (gesplitet_1.includes("KR") || gesplitet_1.includes("PI")) {
            farbe = "text-black";
        } else if (gesplitet_1.includes("★")) {
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
            case 0:
                zeichen = "";
                break;
            default:
                break;
        }

        let leer_zeichen = `${zeichen} ${typ}`;
        if(gesplitet_2 === 0){ leer_zeichen = ""}
        

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

    // Funktion zur Berechnung des Wertes der Karten
    const wert = function(e) {
        let split = e.split("-");
        let value = Number(split[1]);
    
        if (value >= 11 && value <= 13) {
            return 10;
        } else if (value === 14) {
            return 11;
        } else {
            return value;
        }
    };

    let anzahlAsse = 0;

    karten_array.forEach(e => {
        let wert_e = wert(e);
        if (wert_e === 11) {
            anzahlAsse++;
        }
        summe += wert_e;
    });

    // Ass-Anpassung, falls die Summe zu groß ist
    while (summe > 21 && anzahlAsse > 0) {
        summe -= 10;
        anzahlAsse--;
    }

    // Aktualisiere die Summe auf dem Bildschirm
    if (ist_geber) {
        geber_summe = summe;
        document.querySelector("#geber-punkte").innerHTML = "Punkte: " + geber_summe;
    } else {
        spieler_summe = summe;
        document.querySelector("#spieler-punkte").innerHTML = "Punkte: " + spieler_summe;
    }
};