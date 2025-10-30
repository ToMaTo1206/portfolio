// On importe 'fs' pour écrire des fichiers
import { writeFile } from 'fs/promises';

// --- Configuration ---
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
// On garde 'last_7_days' pour l'instant
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
    
    // V V V V V LA CORRECTION EST ICI V V V V V
    // On lit data.grand_total, et non data.data.grand_total
    const totalTime = data.grand_total.text;
    // ^ ^ ^ ^ ^ LA CORRECTION EST ICI ^ ^ ^ ^ ^

    if (totalTime) {
      console.log(`Temps récupéré : ${totalTime}`);
      
      const outputData = JSON.stringify({ totalTime: totalTime });
      
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