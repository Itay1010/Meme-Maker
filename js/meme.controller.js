'use strict'

let gElCanvas
let gCtx

function init() {
    gElCanvas = document.querySelector('#canvas1')
    gCtx = gElCanvas.getContext('2d')
    makeImgs()
    renderGallery()
    addListeners()
}

function addListeners() {
    gElCanvas.addEventListener('click', () => { console.log(event.offsetX, event.offsetY) })
    document.querySelector('.btn-gallery').addEventListener('click', toGallery)
    document.querySelectorAll('.gallery .item').forEach((el) => {
        el.addEventListener('click', onImgSelect)
    })


    document.querySelector('.logo').addEventListener('click', toGallery)

    //editor
    document.querySelector('.manipulation-tools button.move-up').addEventListener('click', onMoveLine)
    document.querySelector('.manipulation-tools button.move-down').addEventListener('click', onMoveLine)
    document.querySelector('.manipulation-tools .btn.switch').addEventListener('click', onSwitchLine)
    document.querySelector('.manipulation-tools .add-line').addEventListener('click', onAddLine)
    document.querySelector('.tools .btn.delete').addEventListener('click', onDeleteLine)

    document.querySelector('.text-tools .font-size-add').addEventListener('click', onFontSize)
    document.querySelector('.text-tools .font-size-subtract').addEventListener('click', onFontSize)
    document.querySelector('.text-tools .font-color').addEventListener('input', onFontClr)
    window.addEventListener('resize', () => {
        let elImg = getElImgById(getMeme().selectedImg.id)
        resizeCanvas(elImg.width, elImg.height)
        reRenderCanvas()
    })
}


function getElImgById(id) {
    return document.querySelector(`.gallery .item[data-id="${id}"]`)
}