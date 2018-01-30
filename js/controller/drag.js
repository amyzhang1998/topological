import {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel
} from "../logic/dragLogic";
class DragController {
    constructor() {
        this.target = document.querySelector("svg");
    }
    addLayerEventListener() {
        let { target } = this;
        target.addEventListener("mousedown", onMouseDown, false);
        target.addEventListener("mousemove", onMouseMove, false);
        target.addEventListener("mouseup", onMouseUp, false);
        target.addEventListener("wheel", onWheel, false);
    }
    onMouseMove(e) {
        e.stopPropagation();
        if (!this.move) return;
        let moveAxis = {};
        moveAxis.x = e.clientX;
        moveAxis.y = e.clientY;
        return;
    }
    onMouseDown(e) {
        e.stopPropagation();
        this.move = {};
        this.move.x = e.clientX;
        this.move.y = e.clientY;
    }
    onMouseUp(e) {
        e.stopPropagation();
    }
    addElementEventListener() {
        let { element } = this;
        let elements = document.querySelectorAll("#svgContainer .circle");
        [].forEach.call(elements, ele => {
            ele.addEventListener("mousedown", this.onMouseDown, false);
            ele.addEventListener("mousemove", this.onMouseMove, false);
            ele.addEventListener("mouseup", this.onMouseUp, false);
        });
    }
}
export default new DragController();
