function move(ele, target, attr) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function () {
        if (attr == "opacity") {
            inew = parseInt(getstyle(ele, attr) * 100);
        } else {
            inew = parseInt(getstyle(ele, attr));
        }

        speed = (target - inew) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (target == inew) {
            clearInterval(ele.timer);
        } else {
            if (attr == "opacity") {
                speed = speed / 100;
                ele.style[attr] = inew / 100 + speed;
            } else {
                ele.style[attr] = inew + speed + "px";
            }
        }
    }, 50)
}

function getstyle(ele, attr) {
    if (getComputedStyle) {
        return getComputedStyle(ele)[attr]
    } else {
        return ele.currentStyle[attr]
    }
}
function addclassname(el, classname) {
    var reg = new RegExp("(\\s)?" + classname, "g");
    el.className = el.className.replace(reg, "")
    el.className += " " + classname;
}
function removeclassname(el, classname) {
    var reg = new RegExp("(\\s)?" + classname, "g");
    el.className = el.className.replace(reg, "")
}