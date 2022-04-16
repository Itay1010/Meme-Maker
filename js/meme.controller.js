'use strict'

let gElCanvas
let gCtx

function init() {
    gElCanvas = document.querySelector('#canvas1')
    gCtx = gElCanvas.getContext('2d')
    makeImgs()
    renderGallery()
    renderCatList()
    addListeners()
}

function addListeners() {
    
    //Images
    addGalleryListeners()

    //general
    document.querySelector('.btn-gallery').addEventListener('click', toGallery)
    document.querySelector('.random-btn').addEventListener('click', chooseRandom)
    document.querySelector('.search').addEventListener('input', onFilter)
    document.querySelectorAll('.category-btn').forEach((el) => {
        el.addEventListener('click', onFilter)
    })

    //exports

    // paging
    addPagingListeners()

    //editor
    addEditorListeners()

    //interaction
    addMouseListeners()
    addTouchListeners()
}

function addEditorListeners() {
    document.querySelector('.manipulation-tools .add-line').addEventListener('click', onAddLine)
    document.querySelector('.tools .btn.delete').addEventListener('click', onDeleteLine)

    document.querySelector('.text-tools .font-size-add').addEventListener('click', onFontSize)
    document.querySelector('.text-tools .font-size-subtract').addEventListener('click', onFontSize)
    document.querySelector('.text-tools .font-color').addEventListener('input', onFontClr)
    document.querySelector('.outline-color').addEventListener('input', onFontOutline)
    document.querySelector('.font-select').addEventListener('change', onFontSelect)
    document.querySelectorAll('.carousel>* button').forEach((li) => {
        li.addEventListener('click', onEmoji)
    })

    document.querySelector('.btn-save').addEventListener('click', saveMeme)
    document.querySelector('.download').addEventListener('click', downloadCanvas)
    document.querySelector('.btn-share').addEventListener('click', uploadImg)
    document.querySelector('.close-modal1').addEventListener('click', closeModal)

    window.addEventListener('resize', () => {
        if (document.body.classList.length === 0 || !document.body.classList.contains('editing')) return
        let elImg = getElImgById(getMeme().selectedImg.id)
        resizeCanvas(elImg.width, elImg.height)
        reRenderCanvas()
    })
}

function addGalleryListeners() {
    document.querySelectorAll('.gallery .item').forEach((el) => {
        el.addEventListener('click', onImgSelect)
        el.addEventListener('touchend', onImgSelect)
    })
}

function addPagingListeners() {
    document.querySelector('.logo').addEventListener('click', toGallery)
    document.querySelector('.btn-memes').addEventListener('click', toMemes)
    document.querySelector('.btn-about').addEventListener('click', toAbout)

    document.querySelector('.btn-open-menu').addEventListener('click', openNavMenu)
    document.querySelector('.screen1').addEventListener('click', closeNavMenu)

}
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function addSavedListeners() {
    document.querySelectorAll('.saved-meme').forEach((el) => {
        el.addEventListener('click', onLoadSaved)
        el.addEventListener('touchend', onLoadSaved)
    })
}

function getElImgById(id) {
    return document.querySelector(`.gallery .item[data-id="${id}"]`)
}