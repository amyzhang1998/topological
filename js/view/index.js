let r = 30;
let fontSize = 15;
let svg = document.querySelector("svg");
function GNode(axis) {
    let { x, y } = axis;
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", `translate(${x},${y})`);
    return g;
}
function TextNode(node) {
    let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    let textNode = document.createTextNode("XXXX");
    text.setAttribute("x", node.x);
    text.setAttribute("y", node.y);
    text.style.setProperty("font-family", "simsun"); //字体为宋体
    text.style.setProperty("font-size", fontSize);
    text.appendChild(textNode);
    return text;
}
class CircleView {
    draw(node) {
        const { axis, id } = node;
        let g = GNode(axis);
        let text = TextNode({ x: r, y: r + fontSize / 2 });
        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", r);
        circle.setAttribute("cy", r);
        circle.setAttribute("r", r);
        circle.setAttribute("id", id);
        circle.setAttribute("fill", "pink");
        circle.setAttribute("stroke", "black");
        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);
    }
}
class LineView {
    draw(axis, points, textAxis) {
        let g = GNode(axis);
        let text = TextNode(textAxis);
        let polyline = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "polyline"
        );
        polyline.setAttribute("points", points);
        polyline.setAttribute("stroke", "black");
        polyline.setAttribute("stroke-width", 1);
        g.appendChild(polyline);
        g.appendChild(text);
        svg.appendChild(g);
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
        svg.appendChild(text);
    }
}

const Circle = new CircleView();
const Line = new LineView();
const Text = new TextView();
export { Circle, Line, Text };
