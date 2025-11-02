const btn = document.getElementById("btn-mode");
const mark = document.getElementById("mark");
const iconMode = document.getElementById('icon-mode');

function textContent(){
    if (document.body.classList.contains("jour")) {
        iconMode.alt = "Passer au mode nuit";
        iconMode.src = "img/sun.svg";
        document.body.classList.remove("jour");
        document.body.classList.toggle("nuit");
        mark.classList.remove("surligne-jour");
        mark.classList.toggle("surligne-nuit");
    } else if (document.body.classList.contains("nuit")) {
        iconMode.alt = "Passer au mode jour";
        iconMode.src = "img/moon.svg";
        document.body.classList.remove("nuit");
        document.body.classList.toggle("jour");
        mark.classList.remove("surligne-nuit");
        mark.classList.toggle("surligne-jour");
};
}


btn.addEventListener("click", () => {
    textContent();
});

/* Effet pour les projets */

document.addEventListener("DOMContentLoaded", function() {
    const elementsToAnimate = document.querySelectorAll(".hidden-left, .hidden-right, .hidden-middle");
    const observer = new IntersectionObserver((entries) => {
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

});



document.addEventListener('DOMContentLoaded', () => {
  
  const API_URL = 'https://api.thomasdenoyelle.dev/api/strava';
  const totalKmEl = document.getElementById('strava-total-km');
  const totalTimeEl = document.getElementById('strava-total-time');
  
  const runKmEl = document.getElementById('strava-run-km');
  const runTimeEl = document.getElementById('strava-run-time');
  
  const rideKmEl = document.getElementById('strava-ride-km');
  const rideTimeEl = document.getElementById('strava-ride-time');
  const rideElevationEl = document.getElementById('strava-ride-elevation');


  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .then(stats => {

      const runDistance = stats.all_run_totals.distance;
      const runTime = stats.all_run_totals.moving_time;
      
      const rideDistance = stats.all_ride_totals.distance;
      const rideTime = stats.all_ride_totals.moving_time;
      const rideElevation = stats.all_ride_totals.elevation_gain;
      
      const swimDistance = stats.all_swim_totals.distance;
      const swimTime = stats.all_swim_totals.moving_time;

      // Course à pied
      if (runKmEl) {
        runKmEl.textContent = Math.round(runDistance / 1000);
      }
      if (runTimeEl) {
        runTimeEl.textContent = Math.round(runTime / 3600);
      }

      // Vélo
      if (rideKmEl) {
        rideKmEl.textContent = Math.round(rideDistance / 1000);
      }
      if (rideTimeEl) {
        rideTimeEl.textContent = Math.round(rideTime / 3600);
      }
      if (rideElevationEl) {
        rideElevationEl.textContent = Math.round(rideElevation);
      }

      // Totaux (tous sports)
      if (totalKmEl) {
        const totalKm = (runDistance + rideDistance + swimDistance) / 1000;
        totalKmEl.textContent = Math.round(totalKm);
      }
      if (totalTimeEl) {
        const totalTime = (runTime + rideTime + swimTime) / 3600;
        totalTimeEl.textContent = Math.round(totalTime);
      }
    })
    .catch(error => {

      console.error("Erreur lors du chargement des stats Strava:", error);
      
      const allElements = [totalKmEl, totalTimeEl, runKmEl, runTimeEl, rideKmEl, rideTimeEl,rideElevationEl];
      
      allElements.forEach(element => {
        if (element) {
          element.textContent = "N/A";
        }
      });
    });
});