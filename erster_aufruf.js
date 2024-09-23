"use strict"

// Mit diesem Aufruf werden die ersten umgedrehten Karten simuliert.

function erster_aufruf(arg, g_oder_s){
    document.querySelector("#neustart-btn").disabled = true;
    arg.forEach(e => {
        let split = e.split("-");
        let gesplitet_2 = split[1];
        gesplitet_2 = Number(gesplitet_2);

        let div_g_o_s_karten = document.querySelector(g_oder_s);
        let karte = document.createElement("div");
        karte.setAttribute("class", `card w-12 h-16 text-white bg-blue-600 border-2 border-gray-500 rounded-lg relative flex justify-center items-center text-base font-bold`);
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