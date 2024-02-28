"use strict";
import Chart from "chart.js/auto";

// MOBILMENY PÅ SAMTLIGA SIDOR.

// Hämtar in meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

// Händelsehanterare
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Togglar fram navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    // Hämtar in CSS för menyn
    let style = window.getComputedStyle(navMenuEl);

    // Kollar om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}

// DIAGRAM PÅ UNDERSIDAN DIAGRAM.

// Funktion som körs vid sidladdning.
window.onload = init;

// Hämtar data från API och skriver ut i två olika diagram.
async function init() {
    // Deklarerar variabler.
    const url = "https://studenter.miun.se/~mallar/dt211g/";

    try {
        // Fetch-anrop.
        const response = await fetch(url);
        const data = await response.json();

        // Filtrerar och sorterar ut de 6 mest sökta kurserna från datan.
        // Filtrerar ut kurser.
        const courses = data.filter(item => item.type === "Kurs");
        // Sorterar kurserna efter totalt antal sökanden.
        const sortedCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        // Plockar ut de 6 kurser med högst värden.
        const slicedCourses = sortedCourses.slice(0, 6);
        // Skapar en ny array från de 6 kurser jag plockat ut, med kursnamn.
        const courseNames = slicedCourses.map(item => item.name);
        // Skapar en ny array från de 6 kurser jag plockat ut, med antal sökande för kurs.
        const courseApplicantsTotal = slicedCourses.map(item => item.applicantsTotal);

        // Hämtar in canvas.
        const ctx = document.getElementById('myChartBar');

        // Skapar nytt diagram.
        new Chart(ctx, {
            // Sätter type som bar för stapeldiagram.
            type: 'bar',
            data: {
                labels: courseNames,
                datasets: [{
                    label: 'Mest sökta kurserna, totalt antal sökanden',
                    data: courseApplicantsTotal,
                    borderWidth: 3,
                    // Byter färg på staplarna.
                    backgroundColor: ['#72af96', '#5c8e79']
                }]
            },
            options: {
                // Tar bort kursnamn på y-axeln.
                scales: {
                    y: {
                        display: false,
                        beginAtZero: true
                    }
                },
                // Vänder stapeldiagrammet till liggande.
                indexAxis: "y",
            }
        });
    } catch {
        document.getElementsByClassName("chart-container").innerHTML = "<p>Diagrammet kunde inte laddas...</p>"
    }
} 

// Anropar funktionen.
init();