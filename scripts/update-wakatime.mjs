// On importe 'fs' pour écrire des fichiers
import { writeFile } from 'fs/promises';

// --- Configuration ---
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
// On garde 'last_7_days' car on sait qu'il marche
const API_URL = 'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days'; 
const OUTPUT_FILE = 'wakatime.json';
// ---------------------

if (!WAKATIME_API_KEY) {
  console.error('Erreur : La variable WAKATIME_API_KEY est manquante.');
  process.exit(1);
}

console.log(`Clé reçue (4 premiers chars) : ${WAKATIME_API_KEY.substring(0, 4)}`);

async function fetchWakaTimeStats() {
  console.log('Appel à l\'API WakaTime (/summaries)...');
  
  const encodedKey = btoa(WAKATIME_API_KEY);

  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Basic ${encodedKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Réponse API non OK : ${response.statusText}`);
    }

    const data = await response.json();
    
    // V V V V V LA CORRECTION FINALE V V V V V
    // Le log a montré que le total est dans "cumulative_total"
    const totalTime = data.cumulative_total.text;
    // ^ ^ ^ ^ ^ LA CORRECTION FINALE ^ ^ ^ ^ ^

    if (totalTime) {
      console.log(`Temps récupéré : ${totalTime}`);
      
      // On prépare le JSON de sortie
      const outputData = JSON.stringify({ totalTime: totalTime });
      
      // On écrit le fichier à la racine du projet
      await writeFile(OUTPUT_FILE, outputData);
      
      console.log(`Fichier ${OUTPUT_FILE} mis à jour.`);
    } else {
      console.error('Impossible de trouver le temps total dans la réponse API.');
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des stats:', error);
    process.exit(1);
  }
}

fetchWakaTimeStats();