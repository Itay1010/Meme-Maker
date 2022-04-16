'use strict'

const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

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

function chooseRandom() {
    const img = getRandomImg()
    console.log('img', img)
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
    const elLink = this
    const data = gElCanvas.toDataURL()
    getMeme().isExport = true
    reRenderCanvas()
    elLink.href = data
    elLink.download = 'Meme.jpg'
    setTimeout(() => {
        getMeme().isExport = false
    }, 1000);
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
    makeLine()
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
