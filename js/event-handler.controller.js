'use strict'


function onImgSelect() {
    const id = this.dataset.id
    const img = getImgById(id)
    setMeme(img)
    toEditing()
    renderEditor(this)
}

function onTxtInput(val) {
    const url = getMeme().selectedImg.url
    clearCanvas()
    setLineTxt(val)
    drawImg(url)
}

function onFontSize(val) {
    const currMeme = getMeme()
    setFontSize(val)
    drawImg(currMeme.selectedImg.url)
}

function toEditing() {
    document.body.classList.add('editing')
}

function toGallery() {
    document.body.classList.remove('editing', 'about', 'memes')

}