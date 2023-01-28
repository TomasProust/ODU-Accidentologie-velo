import { cursorTo } from "readline";

interface FilterColor {
    value: any;
    color: string
}

interface FilterColorDesc {
    category: string;
    filters: FilterColor[];
}

export function getCircleColors(desc: FilterColorDesc): any[] {
    let circleColors = ['match', ['get', desc.category]];

    desc.filters.map(({value, color}) => circleColors.push(value, color))

    // default color
    circleColors.push('#ccc')

    return circleColors
}