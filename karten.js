"use strict"

// Hiermit werden die notwendigen 52 Karten generiert und gemischt.

// Die Werte 2 bis 10 bedeuten die Karten 2 bis 10.
// 11 steht für Bube, 12 für Dame, 13 für König und 14 für Ass. 
// Das KA seht für Karo, KR für Kreuz, PI für Pick und HE für Herz.
// Beispiel "KA-12" bedeutet Karo König.

const karten_generieren = function () {


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
}