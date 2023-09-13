// Set the Mapbox API access token
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Define geographical bounds for the map
const bounds = [
  [78.016975, 3.544604], // southwestern corner of the bounds
  [83.096048, 11.467576], // northeastern corner of the bounds
];

// Create a new Mapbox instance
const map = new mapboxgl.Map({
  container: 'map', // HTML element id where the map will be rendered
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/dwoshada/clmhy36ro006k01pd7mbvfhj5', // style URL
  center: [80.738662, 7.840042], // starting position [lng, lat]
  zoom: 3,
  maxBounds: bounds,
});

// fetches GeoJSON data from the database
async function getGeojson() {
  const response = await fetch('https://ceyloninfo.site/api/geojson').then(
    (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      return response.json();
    }
  );
  return response;
}

//  fetching location information from the backend or session storage
async function getAllLocationsInfo() {
  // Check if locations are already in session storage
  if (!sessionStorage.getItem('locations')) {
    // Fetch locations from the backend
    const response = await fetch('https://ceyloninfo.site/api/locations').then(
      (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      }
    );
    sessionStorage.setItem('locations', JSON.stringify(response));
    return response;
  } else {
    // Return locations from session storage
    return JSON.parse(sessionStorage.getItem('locations'));
  }
}

// Finds location details based on the location name
async function findLocationDetails(name) {
  const result = await getAllLocationsInfo().then((response) => {
    return response.find((item) => item.name == name);
  });
  return result;
}

// DOM element queries for displaying location details
const infoTitle = document.querySelector('.info-title');
const infoCity = document.querySelector('.info-city');
const infoDes = document.querySelector('.info-des');
const gmapsLink = document.querySelector('.gmaps-link');
const div = document.querySelector('.location-info');

// Displays location details in the DOM
function showLocationDetails(location) {
  infoTitle.innerHTML = location.name;
  infoCity.innerHTML = `${location.city}, ${location.province} Province`;
  infoDes.innerHTML = location.description;
  gmapsLink.href = location.googlemaps;
  div.style.display = 'flex';
}

// Adds marker and layer to the map for a given location
function addMarkerAndLayer(map, location, i) {
  // Load custom marker image
  map.loadImage(`${location.icon}`, (error, image) => {
    if (error) throw error;
    map.addImage(`custom-marker${i}`, image);
    // Add a GeoJSON source with points for the location
    map.addSource(`points${i}`, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: location.geojson,
      },
    });
    // Add a symbol layer
    map.addLayer({
      id: `points${i}`,
      type: 'symbol',
      source: `points${i}`,
      layout: {
        'icon-image': `custom-marker${i}`,
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-font': ['Londrina Solid Regular', 'Arial Unicode MS Bold'],
        'text-offset': [0, 1.7],
        'text-size': 14,
        'text-letter-spacing': 0.05,
        'text-anchor': 'top',
      },
      Paint: {
        "line-color": "#ffff00",
        'text-color': "#E63946",
      }
    });
  });

  // Click event handler for the marker
  map.on('click', `points${i}`, async (e) => {
    const markerName = e.features[0].properties.title;
    const locationDetails = await findLocationDetails(markerName);
    map.flyTo({
      center: [locationDetails.longitude, locationDetails.latitude],
      zoom: 14,
      essential: true,
    });

    // Show location details on the DOM
    showLocationDetails(locationDetails);
  });
}

// Fetch GeoJSON data and add markers and layers to the map
getGeojson().then((response) => {
  map.on('load', () => {
    map.resize();
    // Iterate through locations and add markers and layers
    response.forEach((location, i) => {
      addMarkerAndLayer(map, location, i);
    });
  });
});
