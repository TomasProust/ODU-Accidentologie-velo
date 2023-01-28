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

function formatFilters(filters: any, keyword: string): any[] {
    if (!filters) {
        return [keyword];
    } else if (filters[0] != keyword) {
        return [keyword].concat(filters);
    } else {
        return filters
    }
}

export function allFormatFilters(filters: any): any[] {
    return formatFilters(filters, 'all');
}

export function anyFormatFilters(filters: any): any[] {
    return formatFilters(filters, 'any');
}

export function hasFilter(filters: any, category: string, value: any): Boolean {
    for (let i = 1; filters[i]; i++) {
        const filterCategory = filters[i][1][1];
        const filterValue = filters[i][2];

        if (filterCategory == category && filterValue == value) {
            return true;
        }
    }
    return false;
}

export function pushFilter(filters: any, filter: any[]): any {
    const category = filter[1][1];
    const value = filter[2];

    if (hasFilter(filters, category, value)) {
        return filters;
    }

    filters.push(filter);
    return filters;
}

export function removeFilter(filters: any, filter: any[]): any {
    const category = filter[1][1];
    const value = filter[2];

    for (let i = 1; filters[i]; i++) {
        const currCategory = filters[i][1][1];
        const currValue = filters[i][2];

        if (currCategory == category && currValue == value) {
            filters.splice(i, 1);
        }
    }
    return filters;
}