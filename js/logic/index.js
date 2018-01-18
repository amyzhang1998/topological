let r = 30;
// function flatten(data) {
//     return (
//         data &&
//         data.reduce(
//             (arr, { id, prev, axis, nexts = [] }) => {
//                 let nextIds = nexts && nexts.map(n => n.id);
//                 return arr.concat(
//                     [{ id, prev, axis, nextIds }],
//                     nexts && flatten(nexts)
//                 );
//             },

//             []
//         )
//     );
// }
function removeNull(data) {
    let results = [];
    data.forEach(item => item && results.push(item));
    return results;
}
function countLine(item, data) {
    if (!item.nextIds.length) return null;
    let otherEnd = item.nextIds.map(i => data.find(arg => arg.id == i));
    item.pointAxis = [];
    otherEnd.forEach(arg => {
        item.pointAxis.push(arg.axis);
    });
}
function formatLineData(data) {
    return removeNull(data.map(item => countLine(item, data)));
}
function m(arg, data) {
    return data.filter(item => arg.id == item.prev).map(item => item.id);
}
function formatGraphyData(info) {
    let data = JSON.parse(info);
    let result = data.map(item => {
        item.nextIds = m(item, data);
        return item;
    });
    return result;
}
function formatLineNode(axis, pointAxis) {
    const { x, y } = pointAxis;
    const xVal = x - axis.x;
    const yVal = y - axis.y;
    const constVal = Math.sqrt(2) / 2 * r;
    const points = [r, r, xVal + r, yVal + r].join();
    return points;
}
function formatTextAxis(data) {
    const aVal = data.split(",");
    const y = +aVal.pop() + 30;
    const x = +aVal.pop() + 30;
    return { x: x / 2, y: y / 2 };
}

export { formatGraphyData, formatLineNode, formatTextAxis, formatLineData };
