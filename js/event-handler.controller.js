'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

//general
function onImgSelect() {
    const id = this.dataset.id
    loadMeme(id, event)
    renderEditor(this)
}

function onLoadSaved() {
    const id = this.dataset.id
    const meme = getSavedById(id)
    updateMeme(meme)
    toEditing()
    drawImg(meme.selectedImg.url)
}

function onFilter(ev) {
    const val = ev.target.value.toLowerCase()
    if (getCat().includes(val) || val === '') setFilter(val)
    renderGallery()
}

function chooseRandom() {
    const img = getRandomImg()
    const elImg = document.querySelector(`.gallery .item[data-id="${img.id}"]`)
    loadMeme(img.id)
    setRandomLines()
    renderEditor(elImg)
}

function loadMeme(id, ev = []) {
    if (gTouchEvs.includes(ev.type)) {
        return
    }
    const img = getImgById(id)
    setMeme(img)
    toEditing()
}

function onTxtInput(val) {
    setLineTxt(val)
    reRenderCanvas()
}


function downloadCanvas() {
    const meme = getMeme()
    meme.isExport = true
    reRenderCanvas()

    const elLink = this
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Meme.jpg'
    meme.isExport = false
    reRenderCanvas()
}

//font
function onFontSize(ev) {
    const val = ev.currentTarget.value
    const currMeme = getMeme()
    setFontSize(val)
    drawImg(currMeme.selectedImg.url)
}

function onFontClr() {
    setColor(this.value)
    reRenderCanvas()
}

function onFontOutline() {
    setOutline(this.value)
    reRenderCanvas()
}

function onFontSelect() {
    setFontType(this.value)
    reRenderCanvas()
}

//lines
function onMoveLine(ev) {
    const val = ev.currentTarget.value
    const url = getMeme().selectedImg.url
    moveLine(val)
    reRenderCanvas()
}

function onSwitchLine() {
    reRenderCanvas()
}

function onAddLine() {
    let txt = document.querySelector('.input-txt').value
    if (!txt) txt = 'Text'
    makeLine(txt)
    reRenderCanvas()
}

function onEmoji() {
    const emoji = this.value
    makeLine(emoji)
    reRenderCanvas()
}

function onDeleteLine() {
    deleteLine()
    reRenderCanvas()
}

//paging
function toEditing() {
    clearClassesBody()
    document.body.classList.add('editing')
    document.querySelector('.tools .input-txt').value = ''
}

function toGallery() {
    clearClassesBody()
}

function toMemes() {
    clearClassesBody()
    document.body.classList.add('memes')
    renderSaved()
    addSavedListeners()
}

function toAbout() {
    clearClassesBody()
    document.body.classList.add('about')
}

function clearClassesBody() {
    document.body.classList.remove('editing', 'about', 'memes', 'nav-open')
}

function openNavMenu() {
    document.body.classList.add('nav-open')
}

function closeNavMenu() {
    document.body.classList.remove('nav-open')
}

function openModal() {
    document.body.classList.add('modal1-open')
}

function closeModal() {
    document.body.classList.remove('modal1-open')
}

//canvas interaction
function onMove(ev) {
    let line = getMemeLine();
    if (!line) return
    if (!line.isHeld) return
    let pos = getEvPos(ev)
    let dx = pos.x - line.x

    let dy = pos.y - line.y
    moveLine(pos.x, pos.y)
    reRenderCanvas()

}

function onDown(ev) {
    const pos = getEvPos(ev)
    getMeme().lines.forEach((line, idx) => {
        const metrics = gCtx.measureText(line.txt)
        const txtPos = { x: line.x, y: line.y }
        if (isTxtClicked(metrics, pos, txtPos)) selectLine(idx)
    })
    reRenderCanvas()
}
function onUp(ev) {
    releaseLine()
}
