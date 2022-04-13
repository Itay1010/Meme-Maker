'use strict'


let gElCanvas
let gCtx

function init() {
    gElCanvas = document.querySelector('#canvas1')
    gCtx = gElCanvas.getContext('2d')
    makeImgs()
    renderMemes()
    addListeners()
}

function addListeners() {
    document.querySelectorAll('.gallery .item').forEach((el) => {
        el.addEventListener('click', onImgSelect)
    })
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}
function onImgSelect() {
    const id = this.dataset.id
    const img = getImgById(id)
    selectMeme(img)
    toEditing()
    renderEditor(this)
}

function toEditing() {
    document.body.classList.add('editing')
}

function toGallery() {
    document.body.classList.remove('editing', 'about', 'memes')

}
