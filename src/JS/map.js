"use strict";

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



