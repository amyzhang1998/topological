import Circle from "./model/Circle";
let db = new Map();
let svg = document.querySelector("svg");
class Main {
    /**
     * 创建新的圆，可以写如的参数有
     * @param cx:中心点x坐标
     * @param cy:中心点y坐标
     * @param r:
     *
     */
    static draw(node) {
        db.set(node.id, node);
        const { cx, cy, r, fill, id } = node;
        let circle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        circle.setAttribute("cx", cx);
        circle.setAttribute("cy", cy);
        circle.setAttribute("r", r);
        circle.setAttribute("id", id);
        circle.setAttribute("stroke", "black");
        circle.setAttribute("fill", `${fill}`);
        svg.appendChild(circle);
    }
    static check(x) {
        if (!x) {
            return false;
        }
        if (typeof x != "number") {
            console.warn("请输入合法数字");
            return true;
        }
        if (x < 0 || x > 500) {
            console.warn("超出边界值");
            return true;
        }
        return false;
    }
    create(cx, cy, r, fillColor) {
        if (Main.check(cx) || Main.check(cy) || Main.check(r)) {
            return;
        }
        const node = new Circle(cx, cy, r, fillColor);
        Main.draw(node);
    }
    update(id, params) {
        let node = db.get(id);
        if (!node) return;
        for (let i in params) {
            if (!(i == "fill")) {
                if (Main.check(params[i])) return;
            }
            node[i] = params[i];
        }
        this.delete(id);
        Main.draw(node);
    }
    delete(id) {
        if (id) {
            db.delete(id);
            const removeNode = document.getElementById(id);
            svg.removeChild(removeNode);
            return;
        }
        db.clear();
        svg.innerHTML = "";
    }
    read(id) {
        if (id) {
            return db.get(id);
        }
        let result = [];
        db.forEach((value, key) => {
            result.push(value);
        });
        return result;
    }
}
window.TP = new Main();
