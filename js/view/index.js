// let r = 30;
let fontSize = 15;
let svg = document.querySelector("svg");
let gElement = document.getElementsByClassName("layer")[0];
function GNode(axis, id, flag) {
    let { x, y } = axis;
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${x},${y})`);
    if (id) {
        g.setAttribute("class", id);
    }
    if (flag) {
        g.setAttribute("class", `${id} ${flag}`);
    }
    return g;
}
function TextNode(node, content, flag) {
    let textContent = (content && content) || "XXXX";
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let textNode = document.createTextNode(textContent);
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);
    if (flag) {
        text.setAttribute("class", flag);
    }
    text.style.setProperty("font-family", "simsun"); //字体为宋体
    text.style.setProperty("font-size", fontSize);
    text.appendChild(textNode);
    return text;
}
class CircleView {
    draw(node) {
        const { axis, id, r } = node;
        let g = GNode(axis, id, "circle");
        let text = TextNode({ x: r, y: r + fontSize / 2 }, node.text);
        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", r);
        circle.setAttribute("cy", r);
        circle.setAttribute("r", r);
        circle.setAttribute("id", id);
        circle.setAttribute("fill", "#4082e6");
        circle.setAttribute("stroke", "#4082e6");
        g.appendChild(circle);
        g.appendChild(text);
        gElement.appendChild(g);
        svg.appendChild(gElement);

        // svg.appendChild(g);
    }
}
class LineView {
    draw(axis, points, textAxis, id, pointId) {
        let gCls = "";
        if (id || pointId) {
            gCls = `${id} p-${pointId}`;
        }
        let g = GNode(axis, gCls);
        let text = TextNode(textAxis, "", "lineText");
        let polyline = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );
        polyline.setAttribute("points", points);
        polyline.setAttribute("stroke", "black");
        polyline.setAttribute("stroke-width", 1);
        polyline.setAttribute("class", "line");
        g.appendChild(polyline);
        g.appendChild(text);
        gElement.appendChild(g);
        svg.appendChild(gElement);
    }
}
class TextView {
    draw(node) {
        const { axis, id } = node;
        let text = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        );
        let textNode = document.createTextNode("X");
        text.setAttribute("x", axis.x);
        text.setAttribute("y", axis.y + 4.5);
        text.style.setProperty("font-family", "simsun"); //字体为宋体
        text.style.setProperty("font-size", "15");
        text.appendChild(textNode);
        gElement.appendChild(text);
        svg.appendChild(gElement);
    }
}

const Circle = new CircleView();
const Line = new LineView();
const Text = new TextView();
export { Circle, Line, Text };
