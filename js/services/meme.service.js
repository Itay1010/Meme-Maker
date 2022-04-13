'use strict'

let gImgs
let gMeme

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getImgById(id) {
    return gImgs.find((img) => img.id === id )
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

function selectMeme(img) {
    console.log(img);
    gMeme = {

    }
}

function saveImgs() {
    saveToStorage('memesDB', gImgs)
}

function _createImg(keywords, url) {
    return {
        id: makeId(),
        keywords,
        url,
    }
}