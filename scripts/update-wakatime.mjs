// On importe 'fs' pour écrire des fichiers
import { writeFile } from 'fs/promises';

// --- Configuration ---
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const API_URL = 'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days';
const OUTPUT_FILE = 'wakatime.json'; // Fichier de sortie (à la racine)
// ---------------------

if (!WAKATIME_API_KEY) {
  console.error('Erreur : La variable WAKATIME_API_KEY est manquante.');
  process.exit(1);
}

console.log(`Clé reçue (4 premiers chars) : ${WAKATIME_API_KEY.substring(0, 4)}`);

async function fetchWakaTimeStats() {
  console.log('Appel à l\'API WakaTime...');
  
  // On encode la clé pour l'authentification
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
    
    // V V V V V CORRECTION ICI V V V V V
    // On prend data.grand_total (le total cumulé)
    // et non data.data (la liste par jour)
    const totalTime = data.grand_total.text;
    // ^ ^ ^ ^ ^ CORRECTION ICI ^ ^ ^ ^ ^

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