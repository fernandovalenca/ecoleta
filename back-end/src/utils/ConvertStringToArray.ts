export default function ConvertStringToArray(string: String) {
    return string.split(',').map(item => Number(item.trim()));
};
