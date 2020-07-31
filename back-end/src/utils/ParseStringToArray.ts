export default function parseStringToArray(items: string) {
    return items.split(',').map(item => Number(item.trim()));
};