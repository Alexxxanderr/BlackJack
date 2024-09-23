"use strict"

// Hiermit wird der Einsatz selektiert und als Zahlenwert gespeichert.

let punkte = 0;
let punktestand = 2000;


document.querySelectorAll('.chip').forEach(chip => {

    chip.addEventListener('click', function () {

        document.querySelectorAll('.chip').forEach(c => {
            c.classList.remove('chip-selected');
        });
    
        this.classList.add('chip-selected');

        let einsatz = this.getAttribute('data-punkte');
        einsatz = Number(einsatz);
        if(spieler_karten.length <= 2){
            punkte = einsatz;
        }
            
    });
});