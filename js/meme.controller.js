'use strict'


let gElCanvas
let gCtx

function init() {
    gElCanvas = document.querySelector('#canvas1')
    gCtx = gElCanvas.getContext('2d')
    makeMemes()
    renderMemes()
    addListeners()
    resizeCanvas()

}

function addListeners() {
    document.querySelectorAll('.gallery .item').forEach((el) => {
        el.addEventListener('click', onMeme)
    })
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}
function onMeme() {
    renderEditor()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.editor')
    gElCanvas.width = elContainer.offsetWidth / 2
    gElCanvas.height = elContainer.offsetHeight
}