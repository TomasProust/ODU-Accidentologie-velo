import { useEffect, useState, useRef } from 'react';
import styles from '../styles/map.module.css';
import { addGravityVision, addGravityFilters } from './filters/gravity';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VhY2Ftb2xsYXJkIiwiYSI6ImNsZDhxY3o1MjAxaTYzcGxpeGthbTBiOXAifQ.YW3ytIQi4710aCidT9lNCQ';

const mapboxGLStyle = 'mapbox://styles/mapbox/light-v11';
const parisLocation = [2.347469, 48.854550];
const parisScopedZoom = 11;

const accidentsVectorTileSets = 'mapbox://guacamollard.2fvx6bs1'
const acc_sourceID = 'accidents-source'
const acc_sourceLayerID = 'bicycle_vae_electricScooter_a-cd20tt';
const acc_layerID = 'accidents-layer';

export default function Map() {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  // Initialize the Map
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapboxGLStyle,
        center: parisLocation,
        zoom: parisScopedZoom
    });
    map.on('load', () => {
      // Add the vector tileset as a source.
      map.addSource(acc_sourceID, {
        type: 'vector',
        url: accidentsVectorTileSets
      });
      addGravityVision(map, acc_sourceID, acc_sourceLayerID, acc_layerID);
      addGravityFilters(map, acc_layerID);
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
