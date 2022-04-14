'use strict'

//canvas rendering
function resizeCanvas(iHeight, iWidth) {
    const elContainer = document.querySelector('.canvas-container')
    const line = getMemeLine()
    if(line && (line.x || line.y)) calcNewPos(elContainer, (iHeight * elContainer.offsetWidth) / iWidth)
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (iHeight * elContainer.offsetWidth) / iWidth
}

function reRenderCanvas() {
    const url = getMeme().selectedImg.url
    clearCanvas()
    drawImg(url)
    drewLines()
}

//area rendering
function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()
    let injectionTxt = imgs.map((img) => {
        return `<img class="item" data-id="${img.id}" src="${img.url}" alt="">`
    })
    elGallery.innerHTML = injectionTxt.join('')
}

function renderEditor(el) {
    const line = getMemeLine()
    const elContainer = document.querySelector('.editor')
    let injectionTxt = ``
    drawImg(el.src)
}

//draw on canvas
function drewLines() {
    const meme = getMeme()
    const lines = meme.lines
    lines.forEach((line, idx) => {
        if (line.x === null || line.y === null) {
            line.x = gElCanvas.width / 2
            switch (idx) {
                case 0:
                    line.y = line.size / 2
                    break;
                case 1:
                    line.y = gElCanvas.height - line.size / 2
                    break;
                default:
                    line.y = gElCanvas.height / 2
                    break;
            }
        }
        drawText(line, idx === meme.selectedLineIdx)
    })
}

function drawImg(url) {
    let img = new Image();
    img.src = url;
    resizeCanvas(img.height, img.width)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    drewLines()
}

function drawText(line, isFocus = false) {
    const txt = line.txt
    const x = line.x
    const y = line.y
    const color = line.color
    const font = line.font
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.fillStyle = color;
    gCtx.font = `${line.size}px ${font}`;
    gCtx.fillText(txt, x, y);
    if (isFocus) {
        const txtMetrics = gCtx.measureText(txt)
        const formatted = formatMetrics(txtMetrics, line)
        drawRect(...formatted)
    }
}

function drawRect(x, y, w, h) {
    gCtx.rect(x, y, w, h);
    // gCtx.fillStyle = 'green';
    // gCtx.fillRect(x, y, 200, 200);
    gCtx.strokeStyle = 'red';
    gCtx.stroke();
}

//clear canvas
function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.beginPath();
}
