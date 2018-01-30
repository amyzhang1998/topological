let move = null;
let node = document.getElementById("layer");
function setTranslate(obj) {
    let { x, y } = obj;
    let value = getValue("scale");
    node.setAttribute("transform", `translate(${x},${y}),scale(${value})`);
}
function zoom(value) {
    let { x, y } = getValue("trans");
    node.setAttribute("transform", `translate(${x},${y}),scale(${value})`);
}
function getValue(param) {
    let ele = node.getAttribute("transform");
    let a = ele.split(",");
    let b = parseFloat(a[0].split("(")[1]);
    let c = parseFloat(a[1]);
    let scaleValue = parseFloat(a[2].split("(")[1]);
    let transObj = {};
    transObj.x = b;
    transObj.y = c;
    if (param == "trans") {
        return transObj;
    }
    return scaleValue;
}

function onMouseDown(e) {
    if (!e) return;
    let parenTargetCls = e.target.parentNode.getAttribute("class");
    let node = null;
    let target = e.target;
    if (target.id == "svg") {
        this.move = {};
        this.move.x = e.clientX;
        this.move.y = e.clientY;
    }
    if (parenTargetCls && parenTargetCls.split(" ")[1] == "circle") {
        this.moveCircle = {};
        this.moveCircle.x = e.clientX;
        this.moveCircle.y = e.clientY;
        setElementActive(e.target.parentNode, parenTargetCls);
    }
}
function setElementActive(node, cls) {
    let haveActive = cls.split(" ").find(name => name == "active");
    if (haveActive) return;
    let newCls = cls + " active";
    node.setAttribute("class", newCls);
}
function removeElementActive(node, cls) {
    let newClsArr = cls.split(" ");
    let newCls = newClsArr.pop();
    node.setAttribute("class", newClsArr.join(" "));
}

function onMouseUp(e) {
    this.move = null;
    this.moveCircle = null;
    let parenTargetCls = e.target.parentNode.getAttribute("class");
    if (parenTargetCls && parenTargetCls.split(" ")[1] == "circle") {
        // removeElementActive(e.target.parentNode, parenTargetCls);
    }
}
function onMouseMove(e) {
    let target = e.target;
    if (target.id == "svg") {
        if (!this.move) return;
        let moveAxis = {};
        moveAxis.x = e.clientX - this.move.x;
        moveAxis.y = e.clientY - this.move.y;
        setTranslate(moveAxis);
    }
    let clsName = target.parentNode.getAttribute("class");
    let parentCls = (clsName && clsName.split(" ")) || "";
    if (target.parentNode.className) {
        if (!this.moveCircle) return;
        if (parentCls[1] == "circle") {
            this.moveCircle.node = target.parentNode;
            if (this.moveCircle.active) {
                let node = e.target.parentNode;
                this.moveMouse = {};
                this.moveMouse.x = e.clientX - this.moveCircle.x;
                this.moveMouse.y = e.clientY - this.moveCircle.y;
                this.moveCircle.x = e.clientX;
                this.moveCircle.y = e.clientY;
                setCircleTranslate(node, this.moveMouse);
            } else {
                appendNodeAndLineToEnd(this.moveCircle.node, parentCls[0]);
                this.moveCircle.active = true;
            }
        }
    }
}
function appendNodeAndLineToEnd(target, cls) {
    let layer = document.getElementById("layer");
    let lineNodes = document.getElementsByClassName(cls);
    let parentlineNodes = document.getElementsByClassName(`p-${cls}`);
    let elemsArr = [];
    for (let i = 0; i < parentlineNodes.length; i++) {
        elemsArr.push(parentlineNodes[i]);
    }
    for (let i = 0; i < lineNodes.length; i++) {
        elemsArr.push(lineNodes[i]);
    }
    elemsArr.push(target);
    for (let i = 0; i < elemsArr.length; i++) {
        layer.appendChild(elemsArr[i]);
    }
}

function setCircleTranslate(node, axis) {
    let pClassName = node.getAttribute("class").split(" ")[0];
    let nodes = document.getElementsByClassName(pClassName);
    let parenLineNode = document.getElementsByClassName(`p-${pClassName}`);
    if (parenLineNode.length) {
        setParentLinePoints(parenLineNode[0], axis);
    }
    for (let i = 0; i < nodes.length; i++) {
        setNodesTranslate(nodes[i], axis);
        let childs = nodes[i].childNodes;
        moveLineAndText(childs, axis);
    }
}
function moveLineAndText(childs, axis, flag) {
    setLinePoints(childs[0], axis, flag);
    setTextPoints(childs[1], axis, flag);
}
function setParentLinePoints(node, axis) {
    let childs = node.childNodes;
    moveLineAndText(childs, axis, "parentLine");
}
function setNodesTranslate(node, axis) {
    let { x, y } = axis;
    let ele = node.getAttribute("transform").split(",");
    let xAxis = parseFloat(ele[0].split("(")[1]) + x;
    let yAxis = parseFloat(ele[1]) + y;
    node.setAttribute("transform", `translate(${xAxis},${yAxis})`);
}
function setTextPoints(node, axis, flag) {
    let { x, y } = axis;
    let cls = node.getAttribute("class");
    if (cls != "lineText") return;
    let oriX = parseFloat(node.getAttribute("x"));
    let oriY = parseFloat(node.getAttribute("y"));
    let targetX = (oriX * 2 - x) / 2;
    let targetY = (oriY * 2 - y) / 2;
    if (flag == "parentLine") {
        targetX = (oriX * 2 + x) / 2;
        targetY = (oriY * 2 + y) / 2;
    }

    node.setAttribute("x", targetX);
    node.setAttribute("y", targetY);
}

function setLinePoints(node, axis, flag) {
    let { x, y } = axis;
    let ele = node.getAttribute("points");
    if (!ele) return;
    let points = ele.split(",");
    let targetX = parseFloat(points[2]) - x;
    let targetY = parseFloat(points[3]) - y;
    if (flag == "parentLine") {
        targetX = parseFloat(points[2]) + x;
        targetY = parseFloat(points[3]) + y;
    }
    let arr = [];
    points.forEach((item, i) => {
        if (i == 2) {
            arr.push(targetX);
            return;
        }
        if (i == 3) {
            arr.push(targetY);
            return;
        }
        arr.push(item);
    });
    node.setAttribute("points", arr.join());
}

function onWheel(e) {
    let index = e.wheelDelta;
    let value = 1;
    let currentValue = getValue("scale");
    if (index > 0) {
        value = currentValue >= 1.5 ? 1.5 : currentValue + 0.01;
    }
    if (index < 0) {
        value = currentValue <= 0.5 ? 0.5 : currentValue - 0.01;
    }
    zoom(value);
}
export { onMouseDown, onMouseMove, onMouseUp, onWheel };
