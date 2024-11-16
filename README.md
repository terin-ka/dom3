# AIStaging-client
AI Staging React client

Toast
https://fkhadra.github.io/react-toastify

Image carousel
https://www.npmjs.com/package/react-responsive-carousel
https://cloudinary.com/blog/add-a-responsive-image-carousel-to-your-react-app

## Deployment do Azure přes extension Azure

1. Založíme AppService na portálu Azure
 
2.
Provedeme npm run build
Aplikace se zkompiluje do složky build

3.
webová aplikace aistagingclient

aplikace běží na IIS serveru který je nutno strávně konfigurovat ve web.config
problémy s routingem, nutno přesměrovat všechny požadavky na index.html tj. vstupní stranu aplikace
podstata je v tom, že React aplikace ovládá routing sama tj. bez toho nastavení pokus zadat v url aistaging.net/prices skončí chybou - strana neexistuje

https://stackoverflow.com/questions/50753669/azure-app-service-not-working-with-custom-routing-in-react-redux-web-app-need

nutno správně nastavit rule v web.config

4. aplikace načítá  soubor manifest.json 
   v konfiguraci web.config je nutno povolit načtení tohoto typu souboru, jinak server soubor nevidí a vypisuje chybu na konzoli

5.

Pozor.- obsah souboru .env se zakompiluje do konfigurace je přístupný přes process.env
nestačí nastavit v ApplicationSettings App Services v proměnné prostředí
nutno nastavit před deploy přímo do .env souboru

používáme ho k uložení url backendu
REACT_APP_BACKEND_API_URL=https://aistaging.azurewebsites.net

