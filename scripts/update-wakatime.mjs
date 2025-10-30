// On importe 'fs' pour écrire des fichiers
import { writeFile } from 'fs/promises';

// --- Configuration ---
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
// On garde l'URL qui fonctionne
const API_URL = 'https://wakatime.com/api/v1/users/current/summaries?range=last_7_days';
const OUTPUT_FILE = 'wakatime.json';
// ---------------------

if (!WAKATIME_API_KEY) {
  console.error('Erreur : La variable WAKATIME_API_KEY est manquante.');
  process.exit(1);
}

console.log(`Clé reçue (4 premiers chars) : ${WAKATIME_API_KEY.substring(0, 4)}`);

async function debugWakaTimeStats() {
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

    // V V V V V SECTION DE DÉBOGAGE V V V V V
    // Affiche le JSON complet de manière lisible
    console.log('--- DÉBUT DE LA RÉPONSE API ---');
    console.log(JSON.stringify(data, null, 2));
    console.log('--- FIN DE LA RÉPONSE API ---');
    // ^ ^ ^ ^ ^ SECTION DE DÉBOGAGE ^ ^ ^ ^ ^
    
    // On écrit un fichier bidon pour que le script se termine avec succès
    const outputData = JSON.stringify({ debug: "ok" });
    await writeFile(OUTPUT_FILE, outputData);
    
    console.log(`Fichier ${OUTPUT_FILE} de débogage mis à jour.`);


  } catch (error) {
    console.error('Erreur lors du débogage:', error);
    process.exit(1);
  }
}

debugWakaTimeStats();