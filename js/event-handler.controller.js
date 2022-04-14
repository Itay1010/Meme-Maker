'use strict'


function onImgSelect() {
    const id = this.dataset.id
    const img = getImgById(id)
    setMeme(img)
    toEditing()
    renderEditor(this)
}

function onTxtInput(val) {
    setLineTxt(val)
    reRenderCanvas()
}

//font
function onFontSize(ev) {
    const val = ev.currentTarget.value
    const currMeme = getMeme()
    setFontSize(val)
    drawImg(currMeme.selectedImg.url)
}

function onFontClr(){
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
    nextLine()
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
    document.body.classList.add('editing')
    document.querySelector('.tools .input-txt').value = ''
}

function toGallery() {
    document.body.classList.remove('editing', 'about', 'memes')
}