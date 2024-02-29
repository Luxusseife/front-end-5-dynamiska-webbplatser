"use strict";

// Deklarerar variabler.
let searchButtonEl = document.getElementById("search-button");

// Initierar kartan och ställer in vy efter valda koordinater (Bjärnum, min hemort).
let map = L.map('map').setView([56.294167, 13.711111], 12);

// Lägger till ett bricklager från Open Street Map.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // Ställer in start-zoom.
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

// Lägger till en markör på kartan utifrån valda koordinater.
let marker = L.marker([56.294167, 13.711111]).addTo(map);

// Händelselyssnare.
searchButtonEl.addEventListener("click", getInput);

// Funktion som hämtar input från sökfältet och anropar fetch-funktionen.
function getInput() {
    const searchInput = document.getElementById("search-input").value;
    // Skickar med inputen. 
    getData(searchInput);
};

// Hämtar data från OpenStreetMap med värdet från sökfältet.
async function getData(searchInput) {
    try {
        const response = await fetch("https://nominatim.openstreetmap.org/search?addressdetails=1&q=" + searchInput + "&format=jsonv2&limit=1");
        let data = await response.json();

       // Anropar kartvisningsfunktion.
       showMap(data);

        // Felmeddelande
        } catch (error) {
            console.error("Kunde inte fetcha, följande felmeddelande skapades:", error);
          }
}

// Kartvisnings-funktion.
function showMap(data) {
    // Lagrar latitud och longitud i variabler. Hittar lat/long i index 0.
    let latitude = data[0].lat;
    let longitude = data[0].lon;

    // Ställer om markören utifrån sökresultatet.
    marker.setLatLng([latitude, longitude]);

    // Ställer om kartan utifrån sökresultatet.
    map.setView([latitude, longitude], 12);
}