interface Filter {
    name: string;
    catName: string;
    value: any;
}

const filters: Filter[] = [
    {
        name: "Bénin",
        catName: "grav",
        value: 1
    },
    {
        name: "Blessures",
        catName: "grav",
        value: 4
    },
    {
        name: "Hospitalisation",
        catName: "grav",
        value: 3
    },
    {
        name: "Mortel",
        catName: "grav",
        value: 2
    },
]

export default filters;