let idEle = document.getElementById("id");
let rollEle = document.getElementById("roll");
let colorEle = document.getElementById("color");
function changeParam(info) {
    let id = idEle.value;
    let r = parseInt(rollEle.value);
    let color = rollEle.value;
    if (!id) return;
    let changeNode = info.find(item => item.id == id);
    if (changeNode) {
        if (r) {
            info.forEach(element => {
                if (element.id == id) {
                    element.r = r;
                }
            });
        }
        if (color) {
            info.forEach(element => {
                if (element.id == id) {
                    element.color = color;
                }
            });
        }
    }
    return { data: info, id };
}
export { changeParam };
