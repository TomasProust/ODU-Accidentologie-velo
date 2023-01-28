import { getCircleColors } from './commons';

type Vehicule = {
    name: string;
    description: string;
    value: number;
    color: string;
};

type VehiculeDesc = {
    name: string;
    category: string;
    description: string;
    filters: Vehicule[];
};

const desc: VehiculeDesc = {
    name: 'Véhicules',
    category: 'catv',
    description: 'categorie des véhicules impliqués dans les accidents',
    filters: [
        {
            name: 'Bicyclette',
            description: 'Vélo, VTT...',
            value: 1,
            color: '#48cf3c'
        },
        {
            name: 'VAE',
            description: 'Vélo à Assistance Electrique',
            value: 80,
            color: '#3c7ccf'
        },
        {
            name: 'EDP à moteur',
            description: 'Engin de Déplacement Personnel (il s\'agit des trotinettes electriques notamment)',
            value: 50,
            color: '#9c3ccf',
        },
    ],
};

export function addVehiculeVision(map: any, layerID: string) {
    const visionGroup = document.getElementById('vision-group');

    if (!visionGroup) return;
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = desc.name;
    input.checked = false;
    visionGroup.appendChild(input);

    const label = document.createElement('label');
    label.setAttribute('for', desc.name);
    label.textContent = desc.name;
    visionGroup.appendChild(label);
    const gravityColors = getCircleColors(desc);
    
    // When the checkbox changes, update the color mode of the layer.
    input.addEventListener('change', (e) => {
        const boxChecked = e.target.checked;
        
        if (boxChecked) {
            map.setPaintProperty(layerID, 'circle-color', gravityColors);
        } else {
            map.setPaintProperty(layerID, 'circle-color', '#FF0000');
        }
    });

    return map;
}
