let a = [
    {
        id: 1,
        prev: null,
        r: 30,
        text: "1",
        axis: { x: 500, y: 130 }
    },
    {
        id: 2,
        prev: 1,
        r: 30,

        text: "2",
        axis: { x: 100, y: 270 }
    },
    {
        id: 3,
        prev: 2,
        r: 30,

        axis: { x: 20, y: 400 },
        text: "3"
    },
    {
        id: 4,
        r: 30,

        prev: 2,
        text: "4",
        axis: { x: 130, y: 400 }
    },
    {
        id: 5,
        prev: 2,
        r: 30,

        text: "5",
        axis: { x: 250, y: 400 }
    },
    {
        id: 6,
        prev: 1,
        r: 30,

        text: "6",
        axis: { x: 500, y: 270 }
    },
    {
        id: 7,
        prev: 6,
        r: 30,

        axis: { x: 370, y: 400 },
        text: "7"
    },
    {
        id: 8,
        prev: 6,
        r: 30,

        axis: { x: 480, y: 400 },
        text: "8"
    },
    {
        id: 9,
        prev: 6,
        r: 30,

        axis: { x: 590, y: 400 },
        text: "9"
    },
    {
        id: 10,
        prev: 1,
        text: "10",
        r: 30,

        axis: { x: 800, y: 270 }
    },
    {
        id: 11,
        prev: 10,
        r: 30,
        axis: { x: 680, y: 400 },
        text: "11"
    },
    {
        id: 12,
        prev: 10,
        r: 30,
        axis: { x: 800, y: 400 },
        text: "12"
    },
    {
        id: 13,
        prev: 10,
        r: 30,
        text: "13",
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
import { changeParam } from "../logic/paramLogic";

import dragController from "./drag";
let db = new Map();
db.set("init", JSON.stringify(a));
class Polography {
    static drawLine(axis, pointAxis, r, id, pointR, pointId) {
        const lineAxis = formatLineNode(axis, pointAxis, r, pointR);
        const textAxis = formatTextAxis(lineAxis, r);
        Line.draw(axis, lineAxis, textAxis, id, pointId);
    }
    draw(data) {
        data.forEach(item => {
            let { pointAxis, axis, r, id, pointR } = item;
            if (this.judgeExit(item)) {
                this.deleteEle(item.id);
            }
            (pointAxis &&
                pointAxis.length &&
                pointAxis.map(arg =>
                    Polography.drawLine(
                        axis,
                        arg.axis,
                        r,
                        id,
                        arg.pointR,
                        arg.pointId
                    )
                )) ||
                null;
            Circle.draw(item);
        });
    }
    judgeExit(item) {
        const { id } = item;
        let nodes = document.getElementsByClassName(`${id}`);
        if (nodes.length) {
            return true;
        }
        return false;
    }
    init(info) {
        if (info && db.get("init")) {
            this.updateDB("init", info);
        }
        let data = (info && info) || db.get("init");
        this.clear();
        const formatData = formatGraphyData(data);
        db.set("format", formatData);
        formatLineData(formatData);
        //绘制图形
        this.draw(formatData);
    }
    setTranslate(node, obj) {
        let { x, y } = obj;
        node.setAttribute("transform", `translate(${x},${y})`);
    }

    getInfo() {
        return db.get("init");
    }
    clear() {
        document.querySelector("svg").innerHTML = "";
    }

    updateDB(name, data) {
        db.delete(name);
        db.set(name, data);
    }
    deleteEle(id) {
        let parent = document.getElementById("layer");
        let nodes = document.getElementsByClassName(`${id}`);
        let arr = [];
        for (let i = 0; i < nodes.length; i++) {
            arr.push(nodes[i]);
        }
        for (let i = 0; i < arr.length; i++) {
            parent.removeChild(arr[i]);
        }
    }
    update() {
        let info = db.get("format");
        let { data, id } = changeParam(info);
        this.updateDB("format", data);
        formatLineData(data);
        this.updateDB("init", JSON.stringify(data));
        //删除原来的节点
        this.deleteEle(id);
        //绘制新的节点
        this.draw(data);
    }
    // onKeyUp(e) {
    //     console.log(12, e.keyup);
    // }
    // addElementEventListener() {
    //     let nodes = document.getElementsByClassName("circle");
    //     console.log(124, nodes);
    //     for (let i = 0; i < nodes.length; i++) {
    //         nodes[i].addEventListener("keyup", this.onKeyUp, false);
    //     }
    // }
}
dragController.addLayerEventListener();

window.TP = new Polography();
TP.init();
