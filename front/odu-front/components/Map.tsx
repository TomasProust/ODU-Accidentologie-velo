import { useEffect, useState } from "react";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Map() {
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [Map, setMap] = useState();
  
    useEffect(() => {
      setPageIsMounted(true);
  
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ3VhY2Ftb2xsYXJkIiwiYSI6ImNsZDhxY3o1MjAxaTYzcGxpeGthbTBiOXAifQ.YW3ytIQi4710aCidT9lNCQ";
  
      let map = new mapboxgl.Map({
        container: "my-map",
        style: 'mapbox://styles/mapbox/light-v11',
        center: [2.347469, 48.854550],
        zoom: 12
      });
  
      map.on('load', () => {
        // Add the vector tileset as a source.
        map.addSource('accidents', {
          type: 'vector',
          url: 'mapbox://guacamollard.2fvx6bs1'
        });
        map.addLayer(
          {
            'id': 'bicycle-accidents',
            'type': 'circle',
            'source': 'accidents',
            'source-layer': 'bicycle_vae_electricScooter_a-cd20tt',
            'paint': {
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
                1,//indèmnes
                '#ffd700',
                2,//Tués
                '#000000',
                3,//bléssé hospitalisé
                '#ff0000',
                4,//bléssé léger
                '#ff8c00',
                /* other */ '#ccc'
                ]
            }
          },
        );
      });
      setMap(map);
    }, []);
  
    return (
      <div>
        <main>
          <div id="my-map" style={{ height: 540, width: 980 }} />
          <nav id="filter-group" className="filter-group"></nav>
        </main>
      </div>
    )
}

