mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const bounds = [
  [75.312182, 3.983108], // southwestern corner of the bounds
  [84.714728, 12.572659], // northeastern corner of the bounds
];

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/dwoshada/clkuzu71j001r01pb1pkabp00/draft', // style URL
  center: [80.738662, 7.840042], // starting position [lng, lat]
  zoom: 7,
  maxBounds: bounds,
});

async function getLocations() {
  const response = await fetch('http://ceyloninfo.site/api/locations');

  return response.json();
}

getLocations().then((locations) => {
  map.on('load', () => {
    // Add an image to use as a custom marker
    for (let i = 0; i < locations.length; i++) {
      // console.log([locations[i].longitude, locations[i].id]);
      map.loadImage(
        'https://img.icons8.com/stickers/40/airplane-landing.png',
        (error, image) => {
          if (error) throw error;
          map.addImage(`custom-marker${i}`, image);
          // Add a GeoJSON source with 2 points
          map.addSource(`points${i}`, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  // feature for Mapbox DC
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      locations[i].longitude,
                      locations[i].latitude,
                    ],
                  },
                  properties: {
                    title: locations[i].name,
                  },
                },
              ],
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
              'text-font': ['Poppins Regular', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
        }
      );
      map.on('click', `points${i}`, () => {
        alert(`points${i}`);
      });
    }
  });
});
