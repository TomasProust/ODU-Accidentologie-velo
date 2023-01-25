import { useEffect, useState, useRef } from 'react';
import styles from '../styles/map.module.css';
import filters from './Filters';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VhY2Ftb2xsYXJkIiwiYSI6ImNsZDhxY3o1MjAxaTYzcGxpeGthbTBiOXAifQ.YW3ytIQi4710aCidT9lNCQ';

const parisLocation = [2.347469, 48.854550];
const parisScopedZoom = 11;
const accidentsVectorTileSets = 'mapbox://guacamollard.2fvx6bs1'
const sourceID = 'accidents-source'
const layerID = 'accidents-layer';
const sourceLayerID= 'bicycle_vae_electricScooter_a-cd20tt';

export default function Map() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  
  // Initialize the Map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: parisLocation,
      zoom: parisScopedZoom
    });
    const filterGroup = document.getElementById('filter-group');

      map.on('load', () => {
        // Add the vector tileset as a source.
        map.addSource(sourceID, {
          type: 'vector',
          url: accidentsVectorTileSets
        });

        // From source add the layer of accidents as circle points
        map.addLayer({
          'id': layerID,
          'type': 'circle',
          'source': sourceID,
          'source-layer': sourceLayerID,
          'paint': {
            // Make circles larger as the user zooms from z12 to z22.
            'circle-radius': {
              'base': 1.75,
              'stops': [
                [12, 2],
                [22, 180]
              ]
            },
            'circle-color': [
              'match',
              ['get', 'grav'],
              1,//indemnes
              '#ffd700',
              2,//Tués
              '#000000',
              3,//blessés hospitalisés
              '#ff0000',
              4,//blessés léger
              '#ff8c00',
              /* other */ '#ccc'
            ]
          }
        }
      );
        if (filterGroup) {
          filters.map(({name, catName, value}) => {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = layerID;
            input.checked = true;
            filterGroup.appendChild(input);
            
            const label = document.createElement('label');
            label.setAttribute('for', layerID);
            label.textContent = name;
            filterGroup.appendChild(label);
            
            // When the checkbox changes, update the visibility of the layer.
            input.addEventListener('change', (e) => {
              const buttonFilter = ["!=", ["get", catName], value]; 
              const oldFilters = map.getFilter(layerID);
              let newFilters;

              if (!oldFilters) {
                if (!e.target.checked) {
                  map.setFilter(layerID, ['any', buttonFilter]);
                }
                return;
              }

              if (!e.target.checked) {
                map.setFilter(layerID, oldFilters.concat(buttonFilter));
              } else {
                for (let i = 1; i < oldFilters.length; i++) {
                  if (oldFilters[i][2] == value) {
                    map.setFilter(layerID, oldFilters.slice(i, 1));
                    return;
                  }
                }
              }
            });
        });
      }
      setMap(map);
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div>
      <main>
        <div ref={mapContainer} className={styles.mapContainer} />
        <nav id="filter-group" className={styles.filterGroup}></nav>
      </main>
    </div>
  );
}
