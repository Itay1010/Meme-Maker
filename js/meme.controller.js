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
    document.querySelectorAll('.gallery .item').forEach((el) => {
        el.addEventListener('click', onImgSelect)
    })
    // window.addEventListener('resize', () => {
    //     let elImg = getElImgById(getMeme().selectedImg.id)
    //     resizeCanvas(elImg.width, elImg.height)
    // })
}


function getElImgById(id) {
    return document.querySelector(`.gallery .item[data-id="${id}"]`)
}