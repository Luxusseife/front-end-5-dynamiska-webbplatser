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

        // Filtrerar ut kurser/program.
        const courses = data.filter(item => item.type === "Kurs");
        const programs = data.filter(item => item.type === "Program");

        // Sorterar kurser/program efter totalt antal sökanden.
        const sortedCourses = courses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        const sortedPrograms = programs.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        // Plockar ut ett specifikt antal kurser/program med högst värden.
        const slicedCourses = sortedCourses.slice(0, 6);
        const slicedPrograms = sortedPrograms.slice(0, 5);

        // Skapar nya arrayer från kurser/program jag plockat ut, med kursnamn.
        const courseNames = slicedCourses.map(item => item.name);
        const programNames = slicedPrograms.map(item => item.name);

        // Skapar nya arrayer från kurser/program jag plockat ut, med antal sökande.
        const courseApplicantsTotal = slicedCourses.map(item => item.applicantsTotal);
        const programApplicantsTotal = slicedPrograms.map(item => item.applicantsTotal);

        // Hämtar in canvas.
        const ctx = document.getElementById('myChartBar');
        const ctx2 = document.getElementById('myChartPie');

        // Skapar nytt stapel-diagram.
        new Chart(ctx, {
            // Sätter type som bar för stapeldiagram.
            type: 'bar',
            data: {
                labels: courseNames,
                datasets: [{
                    label: ' Antal sökande',
                    data: courseApplicantsTotal,
                    borderWidth: 3,
                    // Byter färg på staplarna.
                    backgroundColor: ['#72af96', '#5c8e79']
                }]
            },
            options: {
                // Gömmer kursnamn på y-axeln.
                scales: {
                    y: {
                        display: false,
                        beginAtZero: true
                    }
                },
                // Vänder stapeldiagrammet till liggande.
                indexAxis: "y",
                // Gömmer legend, dvs. info om vad staplarna representerar.
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Skapar nytt cirkel-diagram.
        new Chart(ctx2, {
            // Sätter type som pie för cirkeldiagram.
            type: 'pie',
            data: {
                labels: programNames,
                datasets: [{
                    label: ' Antal sökande',
                    data: programApplicantsTotal,
                    borderWidth: 3,
                    // Byter färg på "pajbitarna".
                    backgroundColor: [
                        'darkgray',
                        '#72af96',
                        'lightpink',
                        'beige',
                        'salmon'
                      ],
                }]
            },
            options: {
                // Gömmer legend, dvs. info om vilken färg som hör till vilket program.
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Felmeddelande.
        } catch (error) {
            document.getElementByClassName("container-charts").innerHTML = "<p>Något gick fel, försök igen!</p>";
            console.error("Kunde inte fetcha, följande felmeddelande skapades:", error);
        }
} 

// Anropar funktionen.
init();