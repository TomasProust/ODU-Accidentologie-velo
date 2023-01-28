import { getCircleColors } from './commons';

type Gravity = {
    name: string;
    description: string;
    value: number;
    color: string;
};

type GravityDesc = {
    name: string;
    category: string;
    description: string;
    filters: Gravity[];
};

const desc: GravityDesc = {
    name: 'Gravité',
    category: 'grav',
    description: 'Gravité de blessure de l\'usager, les usagers accidentés sont classés en trois catégories de victimes plus les indemnes',
    filters: [
        {
            name: 'Bénin',
            description: 'un accident n\'ayant conduit à aucun dommage physique',
            value: 1,
            color: '#ffd700'
        },
        {
            name: 'Blessures',
            description: 'un accident ayant occasionné au moins un blessé non hospitalisé ou hospitalisé moins de 24h',
            value: 4,
            color: '#ff8c00'
        },
        {
            name: 'Hospitalisation',
            description: 'un accident ayant occasionné au moins un blessé hospitalisé de plus de 24h',
            value: 3,
            color: '#ff0000',
        },
        {
            name: 'Mortel',
            description: 'un accident ayant occasionné la mort d\'une personne ou plus',
            value: 2,
            color: '#000000',
        },
    ],
};

export function addGravityVision(map: any, sourceID: string, sourceLayerID: string, layerID: string) {
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
            'circle-color': getCircleColors(desc),
        }
    });
    return map;
}

export function addGravityFilters(map: any, layerID: string) {
    const filterGroup = document.getElementById('filter-group');

    if (filterGroup) {
        desc.filters.map(({ name, value }) => {
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = name;
            input.checked = true;
            filterGroup.appendChild(input);

            const label = document.createElement('label');
            label.setAttribute('for', name);
            label.textContent = name;
            filterGroup.appendChild(label);

            // When the checkbox changes, update the visibility of the layer.
            input.addEventListener('change', (e) => {
                console.log(`Button clicked for ${name} of value ${value}`);
            });
        });
    }
    return map;
}