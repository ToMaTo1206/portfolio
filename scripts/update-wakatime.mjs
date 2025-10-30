import { writeFile } from 'fs/promises';

// --- Configuration ---
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
// NOUVEAU POINT D'API pour tester l'authentification
const API_URL = 'https://wakatime.com/api/v1/users/current';
const OUTPUT_FILE = 'wakatime.json';
// ---------------------

if (!WAKATIME_API_KEY) {
  console.error('Erreur : La variable WAKATIME_API_KEY est manquante.');
  process.exit(1);
}

// Ligne de débogage (on la garde)
console.log(`Clé reçue (4 premiers chars) : ${WAKATIME_API_KEY.substring(0, 4)}`);

async function testAuthentication() {
  console.log('Appel à l\'API WakaTime (test /users/current)...');
  
  const encodedKey = btoa(WAKATIME_API_KEY);

  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Basic ${encodedKey}`
      }
    });

    if (!response.ok) {
      // Si on a encore un BAD REQUEST, la clé est VRAIMENT le problème
      throw new Error(`Réponse API non OK : ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Si ça marche, on affiche votre email (visible dans les logs)
    if (data.data.email) {
      console.log(`Authentification RÉUSSIE. Email : ${data.data.email}`);
      
      // On ne va pas encore écrire de fichier, on veut juste tester.
      console.log('Test réussi. Vous pouvez maintenant remettre l_ancien script.');
      
      // On va créer un fichier bidon pour que l'étape "commit" fonctionne
      await writeFile(OUTPUT_FILE, JSON.stringify({ test: "ok" }));

    } else {
      console.error('Réponse API étrange, "data.email" non trouvé.');
    }

  } catch (error) {
    console.error('Erreur lors du test d\'authentification:', error);
    process.exit(1);
  }
}

testAuthentication();