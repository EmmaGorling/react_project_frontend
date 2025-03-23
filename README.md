# React-baserad bok-webbappliaktion

Detta är ett React-baserat projekt för att kunna söka efter böcker, samt hantera recensioner av böcker. Projektet består av en frontend utvecklad med React, och en backend som hanterar användare och recensioner. Systemet låter användare skapa, läsa, uppdatera och ta bort recensioner, samt gilla och ogilla recensioner. Användarna kan även logga in och skapa konto.

## Backend
Repo: https://github.com/EmmaGorling/projekt_fordjupad_frontend_API.git


## Funktioner

### Användarhantering
- Användare kan skapa ett konto genom att registrera sig med e-postadress och lösenord.
- Användare kan logga in och logga ut.
- Alla användare kan se sina egna recensioner och gilla/ogilla recensioner.

### Recensioner
- Användare kan skapa recensioner för böcker genom att ange titel, betyg (1-5) och själva recensionstexten.
- Recensioner kan uppdateras och tas bort av den användare som skapat recensionen.
- Användare kan gilla eller ogilla recensioner.
- Användare kan visa recensioner för specifika böcker och även se recensionerna som gett högst betyg.

## Struktur

### Frontend (React)
- Användargränssnittet är byggt med React och använder React Router för navigering.
- Komponenter är organiserade i olika mappar för att separera logik, presentation och styling.

### Backend (Node.js och Express)
- Backend är byggt med Node.js och Hapi.js.
- Mongoose används för att interagera med MongoDB-databasen.
- Backend tillhandahåller REST API-endpoints för att hantera användare och recensioner.

 
