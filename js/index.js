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
  
  const API_URL = 'http://192.168.1.111:3001/api/strava';

  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('La réponse du backend est mauvaise');
      }
      return response.json();
    })
    .then(stats => {
      const totalRunDistance = stats.all_run_totals.distance / 1000;
      
      const totalRideDistance = stats.all_ride_totals.distance / 1000;

      const runElement = document.getElementById('strava-run-km');
      if (runElement) {
        runElement.textContent = Math.round(totalRunDistance);
      }
      const rideElement = document.getElementById('strava-ride-km');
      if (rideElement) {
        rideElement.textContent = Math.round(totalRideDistance);
      }
    })
    .catch(error => {
      console.error("Impossible de charger les stats Strava:", error);
      const stravaSection = document.getElementById('strava-section');
      if (stravaSection) {
        stravaSection.style.display = 'none';
      }
    });
});



document.addEventListener('DOMContentLoaded', () => {
  
  const API_URL = 'https://api.thomasdenoyelle.dev/api/strava';
  
  // --- TES CIBLES ---
  // (Tu as déjà cette ligne)
  const runKmElement = document.getElementById('strava-run-km');
  // (AJOUTE CELLE-CI)
  const runTimeElement = document.getElementById('strava-run-time'); 

  // (On modifie un peu la condition pour tout vérifier)
  if (runKmElement || runTimeElement) {
    
    fetch(API_URL)
      .then(response => response.json())
      .then(stats => {
        
        // --- Kilomètres (ton code existant) ---
        if (runKmElement) {
          const totalRunDistance = stats.all_run_totals.distance;
          runKmElement.textContent = Math.round(totalRunDistance / 1000);
        }

        // --- HEURES (LA NOUVELLE PARTIE) ---
        if (runTimeElement) {
          // 1. Récupère le temps en SECONDES
          const totalSeconds = stats.all_run_totals.moving_time;
          
          // 2. Convertit les secondes en heures (Secondes / 3600)
          const totalHours = Math.round(totalSeconds / 3600);
          
          // 3. Affiche-le !
          runTimeElement.textContent = totalHours;
        }
      })
      .catch(error => {
        console.error("Erreur chargement Strava:", error);
        // On met "N/A" partout en cas d'erreur
        if (runKmElement) runKmElement.textContent = "N/A";
        if (runTimeElement) runTimeElement.textContent = "N/A"; // <-- AJOUTE ÇA
      });
  }
});