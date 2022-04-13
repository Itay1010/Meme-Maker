'use strict'


function renderMemes() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()
    let injectionTxt = imgs.map((img) => {
        return `<img class="item" data-id="${img.id}" src="${img.url}" alt="">`
    })
    elGallery.innerHTML = injectionTxt.join('')
}

function resizeCanvas(img) {
    let iHeight = img.height
    let iWidth = img.width
    const elContainer = document.querySelector('.editor')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = (iHeight * elContainer.offsetWidth) / iWidth
}

function renderEditor(el) {
    const elContainer = document.querySelector('.editor')
    let injectionTxt = ``
    drawImg(el.src)
}

function drawImg(url) {
    var img = new Image();
    img.src = url;
    resizeCanvas(img)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    };
}