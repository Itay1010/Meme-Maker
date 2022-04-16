'use strict'

let gImgs
let gMeme
let gSavedMemes
let gFilter
const CATEGORIES = ['trump', 'pointing', 'men', 'animal', 'happy', 'cute', 'baby', 'sleeping', 'aliens', 'surprised', 'movie']
const RAND_TOP = ['Seeing for the first time', 'My face when', 'The look I get when', 'You know it\'s bad when', 'The Government', 'Looking for', 'Going to the shop', 'My friends reaction when']
const RAND_BOTTOM = ['Confusing "pappies" with "poppies"', 'At a family reunion', 'The real MVP was in our hearts', 'It\'s about drive', 'The ants are in cahoots', 'Home by 5', 'Crack is cheaper at the gas station']

//get
function getImgs() {
    if (!gFilter) return gImgs
    let imgsToShow = gImgs.filter((img) => {
        if(img.keywords.includes(gFilter)) return img
    })
    return imgsToShow
}

function setFilter(val) {
    gFilter = val
}

function getSavedMemes() {
    if (!gSavedMemes) gSavedMemes = loadFromStorage('userMemes')
    return gSavedMemes
}

function getSavedById(id) {
    return gSavedMemes.find((meme) => meme.selectedImg.id === id)
}

function getMeme() {
    return gMeme
}
function getMemeFromSpecific(meme) {
    gMeme = meme
}
function getImgById(id) {
    return gImgs.find((img) => img.id === id)
}

function getMemeLine() {
    if (!gMeme) return null
    if (!gMeme.lines.length) return null
    return gMeme.lines[gMeme.selectedLineIdx]
}

function getRandomImg() {
    const imgs = getImgs()
    const randIdx = getRandomInt(0, imgs.length)
    return imgs[randIdx]
}

function getCat() {
    return CATEGORIES
}

//set
function setMeme(img) {
    gMeme = {
        selectedImg: img,
        selectedLineIdx: 0,
        isExport: false,
        lines: [
            {
                txt: 'Top Text',
                font: 'impact',
                size: 40,
                color: 'white',
                isStroke: true,
                strokeClr: 'black',

                x: null,
                y: null,
                isHeld: false
            },
            {
                txt: 'Bottom Text',
                font: 'impact',
                size: 40,
                color: 'white',
                isStroke: true,
                strokeClr: 'black',

                x: null,
                y: null,
                isHeld: false
            }
        ]

    }
}

function updateMeme(newMeme) {
    gMeme = newMeme
}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setFontSize(val) {
    const line = getMemeLine()
    const currSize = line.size
    const newSize = currSize + Number(val)
    line.size = newSize
}

function setColor(clr) {
    getMemeLine().color = clr
}

function setOutline(clr) {
    getMemeLine().strokeClr = clr
}

function setFontSize(font) {
    getMemeLine().font = font

}

function setRandomLines() {
    gMeme.lines.forEach((line, idx) => {
        let topStr = RAND_TOP[getRandomInt(0, RAND_TOP.length)]
        let bottomStr = RAND_BOTTOM[getRandomInt(0, RAND_BOTTOM.length)]
        if (idx % 2 === 0) line.txt = topStr
        else line.txt = bottomStr
        line.size = getRandomInt(10, 45)
        line.color = getRandomColor()
        line.strokeClr = getRandomColor()
        line.isStroke = ((Math.random() * 10) > 5) ? true : false

    })
    if (((Math.random() * 10)) > 5) {
        if ((Math.random() * 10) > 5) gMeme.lines.splice(0, 1)
        else gMeme.lines.splice(1, 1)
    }
}

//manipulation
function selectLine(idx) {
    gMeme.selectedLineIdx = idx
    gMeme.lines[idx].isHeld = true
}

function releaseLine() {
    const line = getMemeLine()
    if (!line) return
    line.isHeld = false
}

function moveLine(newX, newY) {
    const line = getMemeLine()
    const currX = line.x
    const currY = line.y
    line.x = newX
    line.y = newY
}


//save
function saveImgs() {
    saveToStorage('memesDB', gImgs)
}

function saveMeme() {
    let memes = loadFromStorage('userMemes')
    if (!memes || memes.length === 0) {
        const memes = new Array(gMeme)
        saveToStorage('userMemes', memes)
    }
    else {
        memes.push(gMeme)
        saveToStorage('userMemes', memes)
        gSavedMemes = memes
    }

}

//make
function makeLine(txt) {
    gMeme.lines.push({
        txt,
        font: 'impact',
        color: 'white',
        size: 40,
        isStroke: true,
        strokeClr: 'black',
        x: null,
        y: null,
        isHeld: false
    })
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx++
}

function makeImgs() {
    const imgs = loadFromStorage('imgsDB')
    if (!imgs) {
        gImgs = [
            _createImg(['trump', 'pointing', 'men'], 'img/meme-imgs (various aspect ratios)/1.jpg'),
            _createImg(['animal', 'happy', 'cute'], 'img/meme-imgs (various aspect ratios)/2.jpg'),
            _createImg(['baby', 'animal', 'cute', 'sleeping'], 'img/meme-imgs (various aspect ratios)/3.jpg'),
            _createImg(['animal', 'cute', 'sleeping'], 'img/meme-imgs (various aspect ratios)/4.jpg'),
            _createImg(['baby', 'happy'], 'img/meme-imgs (various aspect ratios)/5.jpg'),
            _createImg(['aliens', 'pointing', 'men'], 'img/meme-imgs (various aspect ratios)/6.jpg'),
            _createImg(['baby', 'surprised', 'cute'], 'img/meme-imgs (various aspect ratios)/7.jpg'),
            _createImg(['happy', 'men', 'movie'], 'img/meme-imgs (various aspect ratios)/8.jpg'),
            _createImg(['baby', 'happy'], 'img/meme-imgs (various aspect ratios)/9.jpg'),
            _createImg(['men', 'happy'], 'img/meme-imgs (various aspect ratios)/10.jpg'),
            _createImg(['men', 'happy'], 'img/meme-imgs (various aspect ratios)/11.jpg'),
            _createImg(['men', 'pointing'], 'img/meme-imgs (various aspect ratios)/12.jpg'),
            _createImg(['men', 'pointing', 'movie'], 'img/meme-imgs (various aspect ratios)/13.jpg'),
            _createImg(['men', 'movie'], 'img/meme-imgs (various aspect ratios)/14.jpg'),
            _createImg(['men', 'movie'], 'img/meme-imgs (various aspect ratios)/15.jpg'),
            _createImg(['men', 'movie'], 'img/meme-imgs (various aspect ratios)/16.jpg'),
            _createImg(['men', 'pointing'], 'img/meme-imgs (various aspect ratios)/17.jpg'),
            _createImg(['men', 'movie'], 'img/meme-imgs (various aspect ratios)/18.jpg')
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