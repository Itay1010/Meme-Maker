'use strict'


function getTextDIM(metrics, line) {
    const { x, y } = { x: line.x, y: line.y }
    const startX = x - metrics.actualBoundingBoxLeft
    const startY = y - metrics.actualBoundingBoxAscent
    const racW = metrics.width
    const racH = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 1
    return [startX, startY, racW, racH]
}


function calcNewPos(elContainer, newH) {
    let { oldW, oldH } = { oldW: gElCanvas.width, oldH: gElCanvas.height }
    let diffW = elContainer.offsetWidth - oldW
    let diffH = newH - oldH
    getMeme().lines.forEach((line) => {
        if (line.x !== null) {
            line.x += diffW
            line.y += diffH / 2
        }
    })
}


function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function isTxtClicked(metrics, pos, txtPos) {
    const w = metrics.width
    const h = (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent)
    if (
        ((pos.x >= txtPos.x - metrics.actualBoundingBoxLeft) && (pos.x <= txtPos.x + metrics.actualBoundingBoxRight)) &&
        ((pos.y <= txtPos.y + metrics.actualBoundingBoxAscent) && (pos.y >= txtPos.y - metrics.actualBoundingBoxDescent))) {
        return true
    }
    return false
}


function makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}