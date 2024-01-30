// Création d'une instance de la carte Leaflet avec vue initiale centrée sur les coordonnées [0, 0] (monde) et un zoom de niveau 2
var map = L.map('map').setView([0, 0], 2);

// Ajout d'une couche de "tuiles" OpenStreetMap à la carte avec une attribution
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Utilise l'API Fetch pour récupérer les données depuis un fichier JSON, les convertit en format JSON, puis les utilise pour créer des marqueurs sur la carte.
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Parcourt chaque point dans les données JSON et crée un marqueur pour chaque point sur la carte.
        data.forEach(point => {
            // Utilisation d'une fonction getIconUrl pour obtenir l'URL de l'icône en fonction du type de point (ex : type1 => JSON).
            var iconUrl = getIconUrl(point.type);
           // Création d'une icône personnalisée pour le marqueur avec des propriétés spécifiques telles que l'URL de l'icône, sa taille, son point d'ancrage, etc.
            var customIcon = L.icon({
                iconUrl: iconUrl,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });
            // Création d'un marqueur à partir des coordonnées du point avec l'icône personnalisée et l'ajoute à la carte.
            var marker = L.marker([point.latitude, point.longitude], { icon: customIcon }).addTo(map);
            // ajoute un popup au marqueur, affichant le nom du point lorsque le marqueur est cliqué.
            marker.bindPopup(point.name);
        });
    });

//  Fonction qui prend le type de point en argument, les compare et si les types sont égaux, renvoie l'URL de l'icône correspondante.
function getIconUrl(type) {
    switch (type) {
        case 'type1':
            return 'marker1.png'; 
        case 'type2':
            return 'marker2.png';  
        case 'type3':
            return 'marker3.png'; 
    }
}
