'use strict'


function formatMetrics(metrics, line) {
    const { x, y } = { x: line.x, y: line.y }
    const startX = x - metrics.actualBoundingBoxLeft
    const startY = y - metrics.actualBoundingBoxAscent
    const racW = metrics.width
    const racH = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
    return [startX, startY, racW, racH]
}

function calcNewPos(elContainer, newH) {
    let { oldW, oldH } = { oldW: gElCanvas.width, oldH: gElCanvas.height }
    let diffW = elContainer.offsetWidth - oldW
    let diffH = newH - oldH
    getMeme().lines.forEach((line) => {
        if(line.x !== null) {
            line.x += diffW
            line.y += diffH /2
        }
    })
}

function makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

