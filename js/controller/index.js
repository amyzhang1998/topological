let a = [
    {
        id: 1,
        prev: null,
        level: 0,
        axis: { x: 500, y: 130 }
    },
    {
        id: 2,
        prev: 1,
        level: 1,
        axis: { x: 100, y: 270 }
    },
    {
        id: 3,
        prev: 2,
        axis: { x: 20, y: 400 },
        level: 2
    },
    {
        id: 4,
        prev: 2,
        level: 2,
        axis: { x: 130, y: 400 }
    },
    {
        id: 5,
        prev: 2,
        level: 2,
        axis: { x: 250, y: 400 }
    },
    {
        id: 6,
        prev: 1,
        level: 1,
        axis: { x: 500, y: 270 }
    },
    {
        id: 7,
        prev: 6,
        axis: { x: 370, y: 400 },
        level: 2
    },
    {
        id: 8,
        prev: 6,
        axis: { x: 480, y: 400 },
        level: 2
    },
    {
        id: 9,
        prev: 6,
        axis: { x: 590, y: 400 },
        level: 2
    },
    {
        id: 10,
        prev: 1,
        level: 1,
        axis: { x: 800, y: 270 }
    },
    {
        id: 11,
        prev: 10,
        axis: { x: 680, y: 400 },
        level: 2
    },
    {
        id: 12,
        prev: 10,
        axis: { x: 800, y: 400 },
        level: 2
    },
    {
        id: 13,
        prev: 10,
        level: 2,
        axis: { x: 930, y: 400 }
    }
];
import {
    formatGraphyData,
    formatLineNode,
    formatTextAxis,
    formatLineData
} from "../logic/index.js";
import { Text, Line, Circle } from "../view/index.js";
let db = new Map();
db.set("init", JSON.stringify(a));
class Polography {
    static drawLine(axis, pointAxis) {
        const lineAxis = formatLineNode(axis, pointAxis);
        const textAxis = formatTextAxis(lineAxis);
        Line.draw(axis, lineAxis, textAxis);
    }
    static draw(data) {
        data.forEach(item => {
            let { pointAxis, axis } = item;
            (pointAxis &&
                pointAxis.map(arg => Polography.drawLine(axis, arg))) ||
                null;
            Circle.draw(item);
        });
    }
    init(info) {
        if (db.get("init")) {
            db.delete("init");
        }
        db.set("init", info);
        this.clear();
        const formatData = formatGraphyData(info);
        db.set("format", formatData);

        //绘制图形
        Polography.draw(formatData);
    }

    getInfo() {
        return db.get("init");
    }
    clear() {
        document.querySelector("svg").innerHTML = "";
    }
    move(id, axis) {
        let info = db.get("format");
        info.forEach(item => {
            if (item.id == id) {
                item.axis = axis;
            }
        });
        formatLineData(info);
        db.delete("init");
        db.set("init", JSON.stringify(info));
        this.clear();
        Polography.draw(info);
    }
}
window.TP = new Polography();
