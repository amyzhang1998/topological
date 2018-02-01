import {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onWheel,
    onKeyUp
} from "../logic/dragLogic";
class DragController {
    constructor() {
        this.target = document.querySelector("svg");
    }
    addLayerEventListener() {
        console.log(23, onKeyUp);
        let { target } = this;
        target.addEventListener("mousedown", onMouseDown, false);
        target.addEventListener("mousemove", onMouseMove, false);
        target.addEventListener("mouseup", onMouseUp, false);
        target.addEventListener("wheel", onWheel, false);
        document.addEventListener("keyup", onKeyUp, false);
        document.addEventListener("keydown", onKeyUp, false);
    }
}
export default new DragController();
