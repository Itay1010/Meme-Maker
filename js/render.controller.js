'use strict'


function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()
    let injectionTxt = imgs.map((img) => {
        return `<img class="item" data-id="${img.id}" src="${img.url}" alt="">`
    })
    elGallery.innerHTML = injectionTxt.join('')
}

function resizeCanvas(iHeight, iWidth) {
    const elContainer = document.querySelector('.editor')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (iHeight * elContainer.offsetWidth) / iWidth
}

function renderEditor(el) {
    const line = getMemeLine()
    const elContainer = document.querySelector('.editor')
    let injectionTxt = ``
    drawImg(el.src)
}


function drawImg(url) {
    const lines = getMeme().lines
    let img = new Image();
    img.src = url;
    resizeCanvas(img.height, img.width)
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    lines.forEach((line) => { drawText(line, gElCanvas.width / 2, gElCanvas.height / 2) })
}

function drawText(line, x, y) {
    const txt = line.txt
    // gCtx.font = '48px serif';
    // gCtx.fillText(txt, x, y);
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    // gCtx.lineWidth = 2;
    gCtx.fillStyle = 'blue';
    gCtx.font = `${line.size}px impact`;
    gCtx.fillText(txt, x, y);
    // gCtx.strokeStyle = 'blue';
    // gCtx.strokeText(txt, x, y);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    gCtx.beginPath();
    // gCtx.closePath();
    // gCurrPos = null
}