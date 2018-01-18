import uuid from "uuid";

/**
 * {id:''}
 */
export default class Circle {
    constructor(cx, cy, r, fillColor, text) {
        this.cx = cx || 50;
        this.cy = cy || 50;
        this.r = r || 30;
        this.fill = fillColor || "none";
        this.id = uuid.v4();
        this.text = text;
    }
}
