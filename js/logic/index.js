// let r = 30;
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
    let otherEnd = item.nextIds.map(i => data.find(arg => arg.id == i.id));
    item.pointAxis = [];
    otherEnd.forEach(arg => {
        let axis = arg.axis;
        let pointR = arg.r;
        let pointId = arg.id;
        item.pointAxis.push({ axis, pointR, pointId });
    });
}
function formatLineData(data) {
    return removeNull(data.map(item => countLine(item, data)));
}
function m(arg, data) {
    return data.filter(item => arg.id == item.prev).map(item => {
        return {
            id: item.id,
            r: item.r
        };
    });
}
function formatGraphyData(info) {
    let data = JSON.parse(info);
    let result = data.map(item => {
        item.nextIds = m(item, data);
        return item;
    });
    return result;
}
function formatLineNode(axis, pointAxis, r, pointR) {
    const { x, y } = pointAxis;
    const xVal = x - axis.x;
    const yVal = y - axis.y;
    const constVal = Math.sqrt(2) / 2 * r;
    const points = [r, r * 2, xVal + pointR, yVal].join();
    return points;
}
function formatTextAxis(data, r) {
    const aVal = data.split(",");
    const y = +aVal.pop() + r;
    const x = +aVal.pop() + r;
    return { x: x / 2, y: y / 2 };
}

export { formatGraphyData, formatLineNode, formatTextAxis, formatLineData };
