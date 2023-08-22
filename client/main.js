mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const bounds = [
  [75.312182, 3.983108], // southwestern corner of the bounds
  [84.714728, 12.572659], // northeastern corner of the bounds
];

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/dwoshada/cllgq36y8016m01qp6gu69id9', // style URL
  center: [80.738662, 7.840042], // starting position [lng, lat]
  zoom: 7,
  // maxBounds: bounds,
});

async function getData() {
  const response = await fetch('https://ceyloninfo.site/api/locations');

  return response.json();
}

async function getLocations() {
  const response = await fetch('https://ceyloninfo.site/api/geojson');

  return response.json();
}

getLocations().then((locations) => {
  map.on('load', () => {
    // Add an image to use as a custom marker
    for (let i = 0; i < locations.length; i++) {
      // console.log([locations[i].longitude, locations[i].id]);
      map.loadImage(`${locations[i].icon}`, (error, image) => {
        if (error) throw error;
        map.addImage(`custom-marker${i}`, image);
        // Add a GeoJSON source with 2 points
        map.addSource(`points${i}`, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: locations[i].geojson,
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
            'text-font': ['Overpass SemiBold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.7],
            'text-size': 12,
            'text-letter-spacing': 0.02,
            'text-anchor': 'top',
          },
        });
      });

      const x = map.on('click', `points${i}`, (e) => {
        let locs = e.features[0].properties.title;
        getData().then((data) => {
          for (let y = 0; y < data.length; y++) {
            if (data[y].name == locs) {
              map.flyTo({
                center: [data[y].longitude, data[y].latitude],
                zoom: 14,
                essenstial: true,
              });
              const infoTitle = document.querySelector('.info-title');
              infoTitle.innerHTML = data[y].name;
              const div = document.querySelector('.location-info');
              div.style.visibility = 'visible';
              // document.querySelector('.location-info').style.display = 'flex';
            }
          }
        });
      });
    }
  });
});
