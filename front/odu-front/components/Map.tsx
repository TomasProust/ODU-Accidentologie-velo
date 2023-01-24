import { useEffect, useState } from "react";

const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

export default function Map() {
    const [pageIsMounted, setPageIsMounted] = useState(false);
    const [Map, setMap] = useState();
  
    useEffect(() => {
      setPageIsMounted(true);
  
      mapboxgl.accessToken =
        "pk.eyJ1Ijoib2R1LXZlbG8iLCJhIjoiY2xjajl4MGh2MGc5ajN1cWg5anRnbnA3bCJ9.A1vMA06W6lyvtb3KDZW-Kg";
  
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
          url: 'mapbox://odu-velo.6t8qftax'
        });
        map.addLayer(
          {
            'id': 'bicycle-accidents',
            'type': 'circle',
            'source': 'accidents',
            'source-layer': 'bicycle_accidents-3jko3r',
            'paint': {
              'circle-radius': {
                'base': 1.75,
                'stops': [
                  [12, 2],
                  [22, 180]
                ]
              },
              'circle-color': '#d40404'
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

