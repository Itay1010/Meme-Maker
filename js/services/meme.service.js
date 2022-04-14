'use strict'

let gImgs
let gMeme

//get
function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getImgById(id) {
    return gImgs.find((img) => img.id === id)
}

function getMemeLine() {
    if (!gMeme) return null
    return gMeme.lines[gMeme.selectedLineIdx]
}

//set
function setMeme(img) {
    gMeme = {
        selectedImg: img,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Top Text',
                font: 'impact',
                size: 50,
                color: 'black',
                x: null,
                y: null
            },
            {
                txt: 'Bottom Text',
                font: 'impact',
                size: 50,
                color: 'black',
                x: null,
                y: null
            }
        ]

    }
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setFontSize(val) {
    const currSize = gMeme.lines[gMeme.selectedLineIdx].size
    const newSize = currSize - Number(val)
    getMemeLine().size = newSize
}

function moveLine(val) {
    const currPos = gMeme.lines[gMeme.selectedLineIdx].y
    const newPos = currPos - Number(val)
    getMemeLine().y = newPos
}

function nextLine() {
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? 0 : ++gMeme.selectedLineIdx
}

function setColor(clr) {
    getMemeLine().color = clr
}

//save
function saveImgs() {
    saveToStorage('memesDB', gImgs)
}

//make
function makeLine() {
    gMeme.lines.push({
        txt: 'Text',
        font: 'impact',
        size: 50,
        color: 'black',
        x: null,
        y: null
    })
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}

function makeImgs() {
    const imgs = loadFromStorage('imgsDB')
    if (!imgs) {
        gImgs = [
            _createImg(['trump', 'pointing', 'man'], 'img/meme-imgs (square)/1.jpg'),
            _createImg(['dogs', 'happy', 'cute'], 'img/meme-imgs (square)/2.jpg'),
            _createImg(['baby', 'dog', 'cute', 'sleeping'], 'img/meme-imgs (square)/3.jpg'),
            _createImg(['cat', 'cute', 'sleeping'], 'img/meme-imgs (square)/4.jpg'),
            _createImg(['baby', 'happy'], 'img/meme-imgs (square)/5.jpg'),
            _createImg(['aliens', 'pointing', 'man'], 'img/meme-imgs (square)/6.jpg'),
            _createImg(['baby', 'surprised', 'cute'], 'img/meme-imgs (square)/7.jpg'),
            _createImg(['happy', 'man'], 'img/meme-imgs (square)/8.jpg'),
            _createImg(['baby', 'happy'], 'img/meme-imgs (square)/9.jpg'),
            _createImg(['man', 'happy'], 'img/meme-imgs (square)/10.jpg'),
            _createImg(['man', 'happy'], 'img/meme-imgs (square)/11.jpg'),
            _createImg(['man', 'pointing'], 'img/meme-imgs (square)/12.jpg')
        ]
        saveImgs()
    } else gImgs = imgs
}

function _createImg(keywords, url) {
    return {
        id: makeId(),
        keywords,
        url,
    }
}